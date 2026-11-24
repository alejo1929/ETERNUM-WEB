"use client";

import React, { useEffect, useState } from "react";

type Product = {
  id: string;
  name: string;
  category: "Conjuntos" | "Shorts" | "Camisetas";
  priceCop: number;
  image: string;
  description: string;
  sizes: string[];
};

type CartItem = {
  product: Product;
  size: string;
  quantity: number;
};

declare global {
  interface Window {
    WidgetCheckout?: new (config: {
      currency: string;
      amountInCents: number;
      reference: string;
      publicKey: string;
      redirectUrl?: string;
      signature?: {
        integrity: string;
      };
      customerData?: {
        email?: string;
        fullName?: string;
        phoneNumber?: string;
        phoneNumberPrefix?: string;
        legalId?: string;
        legalIdType?: string;
      };
      shippingAddress?: {
        addressLine1?: string;
        city?: string;
        phoneNumber?: string;
        region?: string;
        country?: string;
      };
    }) => {
      open: (callback?: (result: unknown) => void) => void;
    };
  }
}

const WOMPI_PUBLIC_KEY =
  process.env.NEXT_PUBLIC_WOMPI_PUBLIC_KEY ||
  "pub_prod_b7gj9S8keQypRkwnPg9MZWk1RkOMZqhO";

const PRODUCTS: Product[] = [
  {
    id: "set-aym-blanco",
    name: "Set ETERNUM Essential Blanco",
    category: "Conjuntos",
    priceCop: 100000,
    image: "/portada.jpg",
    description:
      "Conjunto de camiseta y pantaloneta con acabado limpio, caída estructurada y detalle minimalista para uso diario.",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "set-aym-terracota",
    name: "Set ETERNUM Terracota & Arena",
    category: "Conjuntos",
    priceCop: 115000,
    image: "/portada.jpg",
    description:
      "Combinación en tonos tierra y azul profundo con tela suave de alta densidad y ajuste cómodo.",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "camiseta-aym-white",
    name: "Camiseta ETERNUM Studio White",
    category: "Camisetas",
    priceCop: 65000,
    image: "/portada.jpg",
    description:
      "Camiseta unisex de algodón premium con corte moderno y estampado discreto.",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "short-aym-classic",
    name: "Pantaloneta ETERNUM Classic",
    category: "Shorts",
    priceCop: 60000,
    image: "/portada.jpg",
    description:
      "Pantaloneta ligera con cintura ajustable y diseño versátil para climas cálidos y urbanos.",
    sizes: ["S", "M", "L", "XL"],
  },
];

function formatCop(value: number): string {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<
    "Todos" | "Conjuntos" | "Shorts" | "Camisetas"
  >("Todos");
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({
    "set-aym-blanco": "M",
    "set-aym-terracota": "M",
    "camiseta-aym-white": "M",
    "short-aym-classic": "M",
  });
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [city, setCity] = useState("Barranquilla");
  const [region, setRegion] = useState("Atlántico");
  const [addressLine1, setAddressLine1] = useState("");
  const [legalId, setLegalId] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  useEffect(() => {
    const existingScript = document.querySelector(
      'script[src="https://checkout.wompi.co/widget.js"]'
    );
    if (existingScript) return;

    const script = document.createElement("script");
    script.src = "https://checkout.wompi.co/widget.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const filteredProducts =
    selectedCategory === "Todos"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === selectedCategory);

  const totalCop = cart.reduce(
    (acc, item) => acc + item.product.priceCop * item.quantity,
    0
  );

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleAddToCart = (product: Product) => {
    const chosenSize = selectedSizes[product.id] || product.sizes[0] || "M";
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.size === chosenSize
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + 1,
        };
        return updated;
      }
      return [...prev, { product, size: chosenSize, quantity: 1 }];
    });
    setStatusMessage(null);
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (index: number, delta: number) => {
    setCart((prev) => {
      const updated = [...prev];
      const nextQty = updated[index].quantity + delta;
      if (nextQty <= 0) {
        updated.splice(index, 1);
      } else {
        updated[index] = { ...updated[index], quantity: nextQty };
      }
      return updated;
    });
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);

    if (cart.length === 0) {
      setStatusMessage("Tu carrito está vacío.");
      return;
    }

    if (!fullName.trim() || !email.trim() || !phoneNumber.trim() || !addressLine1.trim()) {
      setStatusMessage("Completa nombre, correo, teléfono y dirección de envío.");
      return;
    }

    if (!window.WidgetCheckout) {
      setStatusMessage(
        "El widget de Wompi aún está cargando. Espera un momento e inténtalo de nuevo."
      );
      return;
    }

    setIsProcessing(true);
    const reference = `ETERNUM-${Date.now()}`;
    const amountInCents = totalCop * 100;
    const cleanPhone = phoneNumber.replace(/\D/g, "");

    try {
      let integritySignature: string | undefined;

      try {
        const sigRes = await fetch("/api/wompi-signature", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            reference,
            amountInCents,
            currency: "COP",
          }),
        });
        if (sigRes.ok) {
          const sigData = await sigRes.json();
          if (sigData?.signature) {
            integritySignature = sigData.signature;
          }
        }
      } catch {
        // Si no existe el endpoint de firma, el widget continuará con los parámetros base
      }

      const web3FormsKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
      if (web3FormsKey) {
        await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            access_key: web3FormsKey,
            subject: `Nuevo pedido ETERNUM - ${reference}`,
            from_name: fullName,
            email,
            phone: `+57 ${cleanPhone}`,
            city,
            region,
            address: addressLine1,
            legalId,
            totalCop,
            items: cart
              .map(
                (i) =>
                  `${i.product.name} (Talla ${i.size}) x${i.quantity} - ${formatCop(
                    i.product.priceCop * i.quantity
                  )}`
              )
              .join(" | "),
          }),
        }).catch(() => {});
      }

      const checkout = new window.WidgetCheckout({
        currency: "COP",
        amountInCents,
        reference,
        publicKey: WOMPI_PUBLIC_KEY,
        ...(integritySignature
          ? { signature: { integrity: integritySignature } }
          : {}),
        customerData: {
          email: email.trim(),
          fullName: fullName.trim(),
          phoneNumber: cleanPhone,
          phoneNumberPrefix: "+57",
          ...(legalId.trim()
            ? { legalId: legalId.trim(), legalIdType: "CC" }
            : {}),
        },
        shippingAddress: {
          addressLine1: addressLine1.trim(),
          city: city.trim() || "Barranquilla",
          phoneNumber: cleanPhone,
          region: region.trim() || "Atlántico",
          country: "CO",
        },
      });

      checkout.open((result) => {
        console.log("Resultado Wompi:", result);
      });
    } catch (error) {
      console.error("Error al abrir Wompi:", error);
      setStatusMessage("No se pudo iniciar el pago con Wompi. Intenta nuevamente.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col">
      {/* Barra superior */}
      <header className="sticky top-0 z-40 border-b border-neutral-800 bg-neutral-950/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <span className="text-xl font-bold tracking-[0.25em] text-white">
              ETERNUM
            </span>
            <span className="hidden text-xs uppercase tracking-widest text-neutral-400 sm:inline">
              Colección Exclusiva • Envío Gratis
            </span>
          </div>

          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="rounded-full border border-neutral-700 bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition hover:border-white hover:bg-neutral-800"
          >
            Tu Carrito ({totalItems})
          </button>
        </div>
      </header>

      {/* Portada principal optimizada para PC, iPad y celular */}
      <section className="relative h-[62vh] min-h-[420px] max-h-[760px] w-full overflow-hidden border-b border-neutral-800 bg-neutral-900 sm:h-[68vh] lg:h-[78vh]">
        <img
          src="/portada.jpg"
          alt="ETERNUM Colección Exclusiva"
          className="h-full w-full object-cover object-top sm:object-center brightness-[0.62] contrast-[1.08] transition-all duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/35 to-black/30" />

        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-4 pb-10 sm:px-6 sm:pb-14">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-neutral-300">
            Nueva Temporada • Envío Gratis a Todo el País
          </p>
          <h1 className="max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Estilo limpio, presencia eterna.
          </h1>
          <p className="mt-3 max-w-xl text-sm text-neutral-200 sm:text-base">
            Conjuntos, camisetas y pantalonetas diseñados para verse impecables en cualquier ocasión.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="#catalogo"
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-neutral-200"
            >
              Ver Colección
            </a>
          </div>
        </div>
      </section>

      {/* Catálogo */}
      <main id="catalogo" className="mx-auto w-full max-w-7xl flex-1 px-4 py-12 sm:px-6">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Catálogo Destacado
            </h2>
            <p className="mt-1 text-sm text-neutral-400">
              Selecciona talla y añade tus piezas favoritas al carrito.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {(["Todos", "Conjuntos", "Shorts", "Camisetas"] as const).map(
              (category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider transition ${
                    selectedCategory === category
                      ? "bg-white text-neutral-950"
                      : "border border-neutral-800 bg-neutral-900 text-neutral-300 hover:border-neutral-600"
                  }`}
                >
                  {category}
                </button>
              )
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filteredProducts.map((product) => {
            const activeSize = selectedSizes[product.id] || product.sizes[0];
            return (
              <article
                key={product.id}
                className="flex flex-col justify-between overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/70"
              >
                <div>
                  <div className="aspect-[4/3] w-full overflow-hidden bg-neutral-950">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover object-center transition duration-300 hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <span className="text-[11px] font-semibold uppercase tracking-widest text-neutral-400">
                      {product.category}
                    </span>
                    <h3 className="mt-1 text-base font-semibold text-white">
                      {product.name}
                    </h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-neutral-400">
                      {product.description}
                    </p>

                    <div className="mt-4">
                      <span className="block text-[11px] uppercase tracking-wider text-neutral-400">
                        Talla: {activeSize}
                      </span>
                      <div className="mt-1.5 flex gap-1.5">
                        {product.sizes.map((size) => (
                          <button
                            key={size}
                            type="button"
                            onClick={() =>
                              setSelectedSizes((prev) => ({
                                ...prev,
                                [product.id]: size,
                              }))
                            }
                            className={`h-8 w-8 rounded-lg text-xs font-semibold transition ${
                              activeSize === size
                                ? "bg-white text-neutral-950"
                                : "border border-neutral-700 bg-neutral-800 text-neutral-200 hover:border-neutral-500"
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-neutral-800 p-4">
                  <span className="text-base font-bold text-white">
                    {formatCop(product.priceCop)}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleAddToCart(product)}
                    className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-neutral-950 transition hover:bg-neutral-200"
                  >
                    Agregar
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </main>

      {/* Modal / Panel lateral del carrito y pago con Wompi */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-xs">
          <div className="flex h-full w-full max-w-lg flex-col justify-between overflow-y-auto border-l border-neutral-800 bg-neutral-950 p-6">
            <div>
              <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
                <h2 className="text-lg font-bold text-white">
                  Tu Carrito ({totalItems})
                </h2>
                <button
                  type="button"
                  onClick={() => setIsCartOpen(false)}
                  className="rounded-lg border border-neutral-700 px-3 py-1 text-xs text-neutral-300 hover:border-white hover:text-white"
                >
                  Cerrar
                </button>
              </div>

              {cart.length === 0 ? (
                <p className="py-10 text-center text-sm text-neutral-400">
                  Aún no has agregado productos a tu carrito.
                </p>
              ) : (
                <div className="mt-4 space-y-3">
                  {cart.map((item, idx) => (
                    <div
                      key={`${item.product.id}-${item.size}`}
                      className="flex items-center justify-between rounded-xl border border-neutral-800 bg-neutral-900 p-3"
                    >
                      <div>
                        <p className="text-sm font-semibold text-white">
                          {item.product.name}
                        </p>
                        <p className="text-xs text-neutral-400">
                          Talla {item.size} • {formatCop(item.product.priceCop)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleUpdateQuantity(idx, -1)}
                          className="h-7 w-7 rounded-md border border-neutral-700 text-sm text-white"
                        >
                          -
                        </button>
                        <span className="w-5 text-center text-sm font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleUpdateQuantity(idx, 1)}
                          className="h-7 w-7 rounded-md border border-neutral-700 text-sm text-white"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <form onSubmit={handleCheckout} className="mt-6 space-y-3">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-300">
                  Datos de Envío
                </h3>

                <input
                  type="text"
                  placeholder="Nombre completo"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full rounded-xl border border-neutral-800 bg-neutral-900 px-3.5 py-2.5 text-sm text-white placeholder-neutral-500 focus:border-white focus:outline-none"
                  required
                />

                <input
                  type="email"
                  placeholder="Correo electrónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-neutral-800 bg-neutral-900 px-3.5 py-2.5 text-sm text-white placeholder-neutral-500 focus:border-white focus:outline-none"
                  required
                />

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <input
                    type="tel"
                    placeholder="Celular (ej. 3001234567)"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full rounded-xl border border-neutral-800 bg-neutral-900 px-3.5 py-2.5 text-sm text-white placeholder-neutral-500 focus:border-white focus:outline-none"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Cédula / Documento (opcional)"
                    value={legalId}
                    onChange={(e) => setLegalId(e.target.value)}
                    className="w-full rounded-xl border border-neutral-800 bg-neutral-900 px-3.5 py-2.5 text-sm text-white placeholder-neutral-500 focus:border-white focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <input
                    type="text"
                    placeholder="Ciudad"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full rounded-xl border border-neutral-800 bg-neutral-900 px-3.5 py-2.5 text-sm text-white placeholder-neutral-500 focus:border-white focus:outline-none"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Departamento"
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    className="w-full rounded-xl border border-neutral-800 bg-neutral-900 px-3.5 py-2.5 text-sm text-white placeholder-neutral-500 focus:border-white focus:outline-none"
                    required
                  />
                </div>

                <input
                  type="text"
                  placeholder="Dirección completa de entrega"
                  value={addressLine1}
                  onChange={(e) => setAddressLine1(e.target.value)}
                  className="w-full rounded-xl border border-neutral-800 bg-neutral-900 px-3.5 py-2.5 text-sm text-white placeholder-neutral-500 focus:border-white focus:outline-none"
                  required
                />

                {statusMessage && (
                  <p className="rounded-xl border border-amber-500/40 bg-amber-950/40 p-3 text-xs text-amber-200">
                    {statusMessage}
                  </p>
                )}

                <div className="border-t border-neutral-800 pt-4">
                  <div className="mb-3 flex items-center justify-between text-base font-bold text-white">
                    <span>Total a Pagar:</span>
                    <span>{formatCop(totalCop)}</span>
                  </div>
                  <p className="mb-4 text-xs text-emerald-400">
                    ✓ Envío gratis a todo el país incluido
                  </p>

                  <button
                    type="submit"
                    disabled={isProcessing || cart.length === 0}
                    className="w-full rounded-full bg-white py-3 text-sm font-bold text-neutral-950 transition hover:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isProcessing
                      ? "ABRIENDO WOMPI..."
                      : "Confirmar y Pagar con Wompi"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}