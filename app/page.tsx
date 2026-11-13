"use client";

import { useState } from "react";
import { Playfair_Display } from "next/font/google";

const fontElegante = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

interface VarianteStock {
  talla: string;
  logo: "A&M" | "UX" | "A";
  stock: number;
}

interface ProductoColor {
  nombre: string;
  clase: string;
  imagenUrl: string;
  inventario: VarianteStock[];
}

interface Producto {
  id: number;
  nombre: string;
  categoria: string;
  precio: number;
  descripcion: string;
  detalles: string[];
  colores: ProductoColor[];
}

interface DatosEnvio {
  nombre: string;
  cedula: string;
  telefono: string;
  direccion: string;
  barrio: string;
  ciudad: string;
  departamento: string;
  notas: string;
}

const PRODUCTOS: Producto[] = [
  {
    id: 1,
    nombre: "Conjunto Negro Ónix",
    categoria: "Colección Exclusiva",
    precio: 100000,
    descripcion: "Conjunto exclusivo de pantaloneta más camiseta en tejido texturizado premium.",
    detalles: ["Camiseta oversize + Pantaloneta a juego", "Confección 100% Colombiana", "Envío Gratis incluido"],
    colores: [
      {
        nombre: "Negro Ónix",
        clase: "bg-zinc-900 border-zinc-400",
        imagenUrl: "/negro-onix.jpg",
        inventario: [
          { talla: "S", logo: "A&M", stock: 1 },
          { talla: "S", logo: "UX", stock: 1 },
          { talla: "M", logo: "UX", stock: 1 },
          { talla: "M", logo: "A", stock: 1 },
          { talla: "L", logo: "UX", stock: 1 },
          { talla: "L", logo: "A&M", stock: 1 },
          { talla: "XL", logo: "A&M", stock: 1 },
          { talla: "XL", logo: "A", stock: 1 }
        ]
      }
    ]
  },
  {
    id: 2,
    nombre: "Conjunto Rosado Minimal",
    categoria: "Colección Exclusiva",
    precio: 100000,
    descripcion: "Conjunto exclusivo de pantaloneta más camiseta en tono rosado de alta elegancia.",
    detalles: ["Camiseta oversize + Pantaloneta a juego", "Confección 100% Colombiana", "Envío Gratis incluido"],
    colores: [
      {
        nombre: "Rosado",
        clase: "bg-pink-300 border-pink-400",
        imagenUrl: "/rosado.jpg",
        inventario: [
          { talla: "S", logo: "A&M", stock: 1 },
          { talla: "S", logo: "UX", stock: 1 },
          { talla: "M", logo: "A&M", stock: 1 },
          { talla: "M", logo: "UX", stock: 1 },
          { talla: "L", logo: "A&M", stock: 1 },
          { talla: "L", logo: "UX", stock: 1 },
          { talla: "XL", logo: "A&M", stock: 2 }
        ]
      }
    ]
  },
  {
    id: 3,
    nombre: "Conjunto Café Tostado",
    categoria: "Colección Exclusiva",
    precio: 100000,
    descripcion: "Conjunto exclusivo de pantaloneta más camiseta en sofisticado tono café.",
    detalles: ["Camiseta oversize + Pantaloneta a juego", "Confección 100% Colombiana", "Envío Gratis incluido"],
    colores: [
      {
        nombre: "Café",
        clase: "bg-amber-900 border-amber-600",
        imagenUrl: "/cafe.jpg",
        inventario: [
          { talla: "S", logo: "A&M", stock: 1 },
          { talla: "M", logo: "A&M", stock: 2 },
          { talla: "L", logo: "UX", stock: 1 },
          { talla: "L", logo: "A&M", stock: 1 },
          { talla: "XL", logo: "UX", stock: 1 },
          { talla: "XL", logo: "A", stock: 1 }
        ]
      }
    ]
  },
  {
    id: 4,
    nombre: "Conjunto Caqui Urbano",
    categoria: "Colección Exclusiva",
    precio: 100000,
    descripcion: "Conjunto exclusivo de pantaloneta más camiseta en color caqui neutro.",
    detalles: ["Camiseta oversize + Pantaloneta a juego", "Confección 100% Colombiana", "Envío Gratis incluido"],
    colores: [
      {
        nombre: "Caqui",
        clase: "bg-stone-400 border-stone-500",
        imagenUrl: "/caqui.jpg",
        inventario: [
          { talla: "S", logo: "UX", stock: 1 },
          { talla: "S", logo: "A", stock: 1 },
          { talla: "M", logo: "UX", stock: 1 },
          { talla: "XL", logo: "A", stock: 1 }
        ]
      }
    ]
  },
  {
    id: 5,
    nombre: "Conjunto Agua Marina",
    categoria: "Colección Exclusiva",
    precio: 100000,
    descripcion: "Conjunto exclusivo de pantaloneta más camiseta en fresco tono agua marina.",
    detalles: ["Camiseta oversize + Pantaloneta a juego", "Confección 100% Colombiana", "Envío Gratis incluido"],
    colores: [
      {
        nombre: "Agua Marina",
        clase: "bg-teal-300 border-teal-400",
        imagenUrl: "/aguamarina.jpg",
        inventario: [
          { talla: "S", logo: "A", stock: 1 },
          { talla: "M", logo: "A&M", stock: 1 },
          { talla: "L", logo: "A&M", stock: 2 }
        ]
      }
    ]
  },
  {
    id: 6,
    nombre: "Conjunto Azul Clásico",
    categoria: "Colección Exclusiva",
    precio: 100000,
    descripcion: "Conjunto exclusivo de pantaloneta más camiseta en tono azul versátil.",
    detalles: ["Camiseta oversize + Pantaloneta a juego", "Confección 100% Colombiana", "Envío Gratis incluido"],
    colores: [
      {
        nombre: "Azul",
        clase: "bg-blue-600 border-blue-700",
        imagenUrl: "/azul.jpg",
        inventario: [
          { talla: "S", logo: "A&M", stock: 1 },
          { talla: "M", logo: "A", stock: 1 },
          { talla: "M", logo: "A&M", stock: 1 },
          { talla: "L", logo: "A", stock: 1 },
          { talla: "L", logo: "A&M", stock: 1 },
          { talla: "XL", logo: "A&M", stock: 1 }
        ]
      }
    ]
  },
  {
    id: 7,
    nombre: "Conjunto Azul Claro",
    categoria: "Colección Exclusiva",
    precio: 100000,
    descripcion: "Conjunto exclusivo de pantaloneta más camiseta en tono celeste limpio.",
    detalles: ["Camiseta oversize + Pantaloneta a juego", "Confección 100% Colombiana", "Envío Gratis incluido"],
    colores: [
      {
        nombre: "Azul Claro",
        clase: "bg-sky-300 border-sky-400",
        imagenUrl: "/azul-claro.jpg",
        inventario: [
          { talla: "S", logo: "A&M", stock: 1 },
          { talla: "M", logo: "A&M", stock: 1 },
          { talla: "M", logo: "UX", stock: 1 },
          { talla: "XL", logo: "A&M", stock: 1 },
          { talla: "XL", logo: "UX", stock: 1 }
        ]
      }
    ]
  },
  {
    id: 8,
    nombre: "Conjunto Azul Oscuro",
    categoria: "Colección Exclusiva",
    precio: 100000,
    descripcion: "Conjunto exclusivo de pantaloneta más camiseta en profundo azul marino.",
    detalles: ["Camiseta oversize + Pantaloneta a juego", "Confección 100% Colombiana", "Envío Gratis incluido"],
    colores: [
      {
        nombre: "Azul Oscuro",
        clase: "bg-slate-900 border-slate-700",
        imagenUrl: "/azul-oscuro.jpg",
        inventario: [
          { talla: "S", logo: "UX", stock: 1 },
          { talla: "M", logo: "A", stock: 1 },
          { talla: "XL", logo: "UX", stock: 1 }
        ]
      }
    ]
  },
  {
    id: 10,
    nombre: "Conjunto Rojo Carmesí",
    categoria: "Colección Exclusiva",
    precio: 100000,
    descripcion: "Conjunto exclusivo de pantaloneta más camiseta en llamativo tono rojo.",
    detalles: ["Camiseta oversize + Pantaloneta a juego", "Confección 100% Colombiana", "Envío Gratis incluido"],
    colores: [
      {
        nombre: "Rojo",
        clase: "bg-red-600 border-red-700",
        imagenUrl: "/rojo.jpg",
        inventario: [
          { talla: "S", logo: "UX", stock: 1 },
          { talla: "M", logo: "UX", stock: 1 },
          { talla: "XL", logo: "UX", stock: 1 }
        ]
      }
    ]
  }
];

const LogoGrafico = ({ tipo, className = "w-8 h-8" }: { tipo: "A&M" | "UX" | "A"; className?: string }) => {
  if (tipo === "A&M") {
    return (
      <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor">
        <path d="M22 76 L34 22 L48 64 L64 22 L76 76" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M26 56 C38 42, 62 42, 74 56" strokeWidth="4.5" strokeLinecap="round" />
        <path d="M36 28 C20 35, 22 65, 42 70 C58 74, 78 60, 72 36" strokeWidth="3.5" strokeLinecap="round" />
      </svg>
    );
  }
  if (tipo === "UX") {
    return (
      <svg viewBox="0 0 110 100" className={className}>
        <path
          d="M15 44 H28 V63 C28 67, 34 67, 34 63 V44 H47 V76 H34 V71 C31 75, 24 77, 19 74 C16 72, 15 68, 15 63 Z"
          fill="currentColor"
        />
        <polygon
          points="54,28 69,28 76,43 85,28 99,28 84,52 100,76 85,76 76,60 67,76 52,76 68,52"
          fill="none"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 100 100" className={className} fill="currentColor">
      <path d="M50 16 L84 82 L67 82 L58 63 L39 63 L52 53 L43 35 L28 68 L48 68 L41 82 L16 82 Z" />
    </svg>
  );
};

export default function Home() {
  const [productoSeleccionado, setProductoSeleccionado] = useState<Producto | null>(null);
  const [tallaElegida, setTallaElegida] = useState<string>("");
  const [logoElegido, setLogoElegido] = useState<"A&M" | "UX" | "A">("A&M");
  const [cantidadElegida, setCantidadElegida] = useState<number>(1);
  const [mostrarGuiaTallas, setMostrarGuiaTallas] = useState<boolean>(false);

  const [carrito, setCarrito] = useState<{ producto: Producto; talla: string; logo: string; color: string; cantidad: number }[]>([]);
  const [carritoAbierto, setCarritoAbierto] = useState<boolean>(false);
  const [menuNavegacionAbierto, setMenuNavegacionAbierto] = useState<boolean>(false);
  const [pedidoConfirmado, setPedidoConfirmado] = useState<boolean>(false);

  // NÚMERO OFICIAL DE WHATSAPP ETERNUM COUTURE
  const NUMERO_WHATSAPP_TIENDA = "573144386824";

  const [datosEnvio, setDatosEnvio] = useState<DatosEnvio>({
    nombre: "",
    cedula: "",
    telefono: "",
    direccion: "",
    barrio: "",
    ciudad: "",
    departamento: "",
    notas: ""
  });

  const agregarAlCarrito = () => {
    if (!productoSeleccionado) return;
    if (!tallaElegida) {
      alert("Por favor selecciona una talla disponible.");
      return;
    }

    const colorActual = productoSeleccionado.colores[0].nombre;
    const variante = productoSeleccionado.colores[0].inventario.find(
      v => v.talla === tallaElegida && v.logo === logoElegido
    );

    if (!variante || variante.stock <= 0) {
      alert("Lo sentimos, esta combinación exacta (Color, Talla y Logo) está agotada.");
      return;
    }

    setCarrito((prev) => {
      const existe = prev.find(
        (item) => item.producto.id === productoSeleccionado.id && item.talla === tallaElegida && item.logo === logoElegido
      );
      if (existe) {
        return prev.map((item) =>
          item.producto.id === productoSeleccionado.id && item.talla === tallaElegida && item.logo === logoElegido
            ? { ...item, cantidad: item.cantidad + cantidadElegida }
            : item
        );
      }
      return [...prev, { producto: productoSeleccionado, talla: tallaElegida, logo: logoElegido, color: colorActual, cantidad: cantidadElegida }];
    });

    setPedidoConfirmado(false);
    setCarritoAbierto(true);
  };

  const eliminarDelCarrito = (index: number) => {
    setCarrito((prev) => prev.filter((_, i) => i !== index));
  };

  const totalCarrito = carrito.reduce((acc, item) => acc + item.producto.precio * item.cantidad, 0);
  const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  const handleChangeEnvio = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setDatosEnvio({ ...datosEnvio, [e.target.name]: e.target.value });
  };

  const procesarPedidoWeb = (e: React.FormEvent) => {
    e.preventDefault();
    if (carrito.length === 0) return;
    setPedidoConfirmado(true);
    setCarrito([]);
  };

  return (
    <div className="min-h-screen bg-[#faf9f6] text-zinc-900 font-sans selection:bg-stone-800 selection:text-white relative overflow-x-hidden">
      <nav className="flex items-center justify-between px-4 sm:px-8 py-3 border-b border-zinc-200/80 backdrop-blur-md bg-[#faf9f6]/90 sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setMenuNavegacionAbierto(true)}
            className="p-2 rounded-lg bg-stone-100 border border-zinc-200 hover:bg-stone-200 transition flex items-center gap-2"
          >
            <span className="text-lg leading-none text-zinc-900">☰</span>
            <span className="text-[11px] uppercase tracking-widest text-zinc-600 hidden sm:inline">Asesoría</span>
          </button>
        </div>

        <div 
          onClick={() => setProductoSeleccionado(null)} 
          className={`${fontElegante.className} text-xl sm:text-2xl font-bold tracking-[0.25em] cursor-pointer select-none text-center text-zinc-950`}
        >
          ETERNUM<span className="text-stone-700 tracking-normal">.</span>
        </div>

        <button
          onClick={() => {
            setPedidoConfirmado(false);
            setCarritoAbierto(true);
          }}
          className="relative px-3 py-1.5 bg-zinc-950 text-white rounded-full text-xs font-semibold hover:bg-zinc-800 transition flex items-center gap-1.5 shadow-sm"
        >
          <span>🛍️</span>
          <span className="hidden sm:inline">Carrito</span>
          {totalItems > 0 && (
            <span className="bg-stone-700 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
              {totalItems}
            </span>
          )}
        </button>
      </nav>

      {menuNavegacionAbierto && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex">
          <div className="bg-[#faf9f6] border-r border-zinc-200 w-full max-w-sm h-full p-6 flex flex-col justify-between shadow-2xl">
            <div>
              <div className="flex justify-between items-center mb-8">
                <span className={`${fontElegante.className} text-xl font-bold tracking-[0.25em] text-zinc-950`}>
                  ETERNUM
                </span>
                <button onClick={() => setMenuNavegacionAbierto(false)} className="text-zinc-500 hover:text-zinc-950 text-xl font-bold">✕</button>
              </div>

              <div className="space-y-4">
                <span className="text-[10px] font-semibold uppercase tracking-widest text-zinc-400 block">Atención al Cliente</span>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  ¿Necesitas asesoría personalizada sobre tallas, disponibilidad o envíos? Escríbenos directamente a nuestro WhatsApp oficial.
                </p>
                <a
                  href={`https://wa.me/${NUMERO_WHATSAPP_TIENDA}?text=${encodeURIComponent("Hola ETERNUM COUTURE, quiero recibir asesoría personalizada.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-xl transition flex items-center justify-center gap-2 text-[11px] uppercase tracking-widest shadow-md"
                >
                  <span>💬</span> Asesoría por WhatsApp
                </a>
              </div>
            </div>
          </div>
          <div className="flex-1" onClick={() => setMenuNavegacionAbierto(false)}></div>
        </div>
      )}

      {!productoSeleccionado && (
        <section className="relative py-12 sm:py-20 md:py-28 flex flex-col items-center justify-center text-center px-4 border-b border-zinc-200/60 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=1920" 
              alt="Eternum Couture" 
              className="w-full h-full object-cover object-center filter brightness-[0.45] contrast-[1.1]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30"></div>
          </div>

          <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
            <span className="text-[9px] sm:text-[10px] font-semibold tracking-[0.25em] text-stone-200 uppercase mb-3 sm:mb-4 border border-stone-300/40 px-3.5 py-1 rounded-full bg-black/40 backdrop-blur-md">
              Colección Exclusiva • Envío Gratis
            </span>
            <h1 className={`${fontElegante.className} text-4xl sm:text-6xl md:text-8xl font-extrabold tracking-[0.15em] mb-3 sm:mb-4 text-white uppercase drop-shadow-2xl`}>
              ETERNUM
            </h1>
            <p className="text-zinc-200 text-xs sm:text-sm md:text-base max-w-md font-light leading-relaxed mb-6 sm:mb-8 tracking-wide drop-shadow px-2">
              Conjuntos exclusivos de camiseta y pantaloneta con isotipos de autor. 
              $100.000 COP con envío nacional gratis.
            </p>
            <button 
              onClick={() => {
                const catalogoElem = document.getElementById("catalogo");
                if (catalogoElem) catalogoElem.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-7 py-3 bg-stone-100 hover:bg-white text-zinc-950 font-bold rounded-full transition text-[10px] sm:text-xs uppercase tracking-widest shadow-2xl"
            >
              Explorar Catálogo
            </button>
          </div>
        </section>
      )}

      {productoSeleccionado ? (
        <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
          <button
            onClick={() => setProductoSeleccionado(null)}
            className="text-xs text-zinc-500 hover:text-zinc-950 mb-6 flex items-center gap-2 transition"
          >
            &larr; Volver al Catálogo
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <div className="space-y-4">
              <div className="h-[350px] sm:h-[450px] md:h-[520px] rounded-2xl bg-stone-200 shadow-xl relative overflow-hidden border border-zinc-200">
                <img
                  src={productoSeleccionado.colores[0].imagenUrl}
                  alt={productoSeleccionado.nombre}
                  className="w-full h-full object-cover object-center"
                />
                <span className="absolute bottom-4 left-4 text-xs bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 text-white">
                  Incluye Camiseta + Pantaloneta
                </span>
              </div>
            </div>

            <div className="flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-semibold text-stone-700 uppercase tracking-widest">{productoSeleccionado.categoria}</span>
                <h1 className="text-2xl sm:text-3xl font-black text-zinc-950 mt-1 mb-2">{productoSeleccionado.nombre}</h1>
                <p className="text-xl font-extrabold text-zinc-900 mb-2">${productoSeleccionado.precio.toLocaleString("es-CO")} COP</p>
                <span className="inline-block text-[11px] font-bold bg-stone-200 text-stone-800 px-3 py-1 rounded-md mb-4">🚚 Envío Gratis a Todo Colombia</span>
                <p className="text-zinc-600 text-xs sm:text-sm leading-relaxed mb-6">{productoSeleccionado.descripcion}</p>

                <div className="mb-6">
                  <span className="text-xs font-bold text-zinc-700 uppercase tracking-wider block mb-2">1. Elige el Logo del Conjunto:</span>
                  <div className="grid grid-cols-3 gap-2 sm:gap-3">
                    {(["A&M", "UX", "A"] as const).map((logo) => (
                      <button
                        key={logo}
                        onClick={() => {
                          setLogoElegido(logo);
                          setTallaElegida("");
                          setCantidadElegida(1);
                        }}
                        className={`p-2.5 sm:p-3 rounded-xl border transition flex flex-col items-center justify-center gap-1.5 ${
                          logoElegido === logo
                            ? "border-zinc-950 bg-zinc-950 text-white shadow-md"
                            : "border-zinc-200 bg-white text-zinc-800 hover:border-zinc-300"
                        }`}
                      >
                        <LogoGrafico tipo={logo} className="w-7 h-7 sm:w-8 sm:h-8" />
                        <span className="text-[9px] sm:text-[10px] font-bold tracking-widest uppercase">Diseño {logo}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-zinc-700 uppercase tracking-wider">2. Selecciona Talla (Stock real):</span>
                    <button onClick={() => setMostrarGuiaTallas(true)} className="text-xs text-stone-700 font-semibold hover:underline">
                      Guía de Tallas 📏
                    </button>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {["S", "M", "L", "XL"].map((tallaStr) => {
                      const varianteEncontrada = productoSeleccionado.colores[0].inventario.find(
                        v => v.talla === tallaStr && v.logo === logoElegido
                      );
                      const stockDisponible = varianteEncontrada ? varianteEncontrada.stock : 0;
                      const hayStock = stockDisponible > 0;

                      return (
                        <button
                          key={tallaStr}
                          disabled={!hayStock}
                          onClick={() => {
                            setTallaElegida(tallaStr);
                            setCantidadElegida(1);
                          }}
                          className={`py-2.5 sm:py-3 rounded-xl text-xs font-bold border transition flex flex-col items-center gap-1 ${
                            !hayStock
                              ? "border-zinc-200 bg-stone-100 text-zinc-400 line-through cursor-not-allowed opacity-60"
                              : tallaElegida === tallaStr
                              ? "border-zinc-950 bg-zinc-950 text-white shadow-md font-extrabold"
                              : "border-zinc-200 bg-white text-zinc-800 hover:border-zinc-300"
                          }`}
                        >
                          <span className="text-sm">{tallaStr}</span>
                          <span className={`text-[9px] ${tallaElegida === tallaStr ? "text-stone-300" : "text-zinc-500"}`}>
                            {hayStock ? `${stockDisponible} disp.` : "Agotado"}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="mb-6">
                  <span className="text-xs font-bold text-zinc-700 uppercase tracking-wider block mb-2">Cantidad:</span>
                  <div className="flex items-center gap-4 bg-white border border-zinc-200 rounded-xl w-fit px-4 py-2">
                    <button onClick={() => setCantidadElegida(prev => Math.max(1, prev - 1))} className="text-zinc-500 hover:text-zinc-950 font-bold text-lg px-2">-</button>
                    <span className="font-bold text-sm text-zinc-950 w-6 text-center">{cantidadElegida}</span>
                    <button onClick={() => setCantidadElegida(prev => prev + 1)} className="text-zinc-500 hover:text-zinc-950 font-bold text-lg px-2">+</button>
                  </div>
                </div>
              </div>

              <div className="space-y-2.5 mt-2">
                <button
                  onClick={agregarAlCarrito}
                  className="w-full bg-zinc-950 hover:bg-zinc-800 text-white font-bold py-3.5 rounded-xl transition shadow-lg text-xs uppercase tracking-widest"
                >
                  Añadir al Carrito
                </button>
                <a
                  href={`https://wa.me/${NUMERO_WHATSAPP_TIENDA}?text=${encodeURIComponent(
                    `Hola ETERNUM COUTURE, quiero asesoría personalizada sobre el *${productoSeleccionado.nombre}* (Logo ${logoElegido}${tallaElegida ? `, Talla ${tallaElegida}` : ""}).`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl transition shadow-sm text-xs uppercase tracking-widest flex items-center justify-center gap-2"
                >
                  <span>💬</span> Asesoría Personalizada por WhatsApp
                </a>
              </div>
            </div>
          </div>
        </main>
      ) : (
        <main id="catalogo" className="px-4 sm:px-8 py-12 sm:py-16 max-w-7xl mx-auto">
          <div className="mb-8 sm:mb-10 border-b border-zinc-200 pb-5 flex flex-col md:flex-row md:items-end justify-between gap-3">
            <div>
              <span className="text-[11px] font-semibold text-stone-700 uppercase tracking-widest">Catálogo Físico Disponible</span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mt-1 text-zinc-950">
                Elige tu Color ($100.000 • Envío Gratis)
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {PRODUCTOS.map((producto) => {
              const totalUnidadesColor = producto.colores[0].inventario.reduce((sum, item) => sum + item.stock, 0);
              return (
                <div
                  key={producto.id}
                  onClick={() => {
                    setProductoSeleccionado(producto);
                    setTallaElegida("");
                    setLogoElegido("A&M");
                    setCantidadElegida(1);
                  }}
                  className="group border border-zinc-200/80 rounded-2xl p-4 sm:p-5 bg-white hover:border-stone-400 hover:shadow-xl transition duration-300 cursor-pointer"
                >
                  <div className="h-60 sm:h-68 rounded-xl mb-4 bg-stone-100 group-hover:scale-[1.02] transition duration-300 relative overflow-hidden shadow-sm">
                    <img
                      src={producto.colores[0].imagenUrl}
                      alt={producto.nombre}
                      className="w-full h-full object-cover object-center"
                    />
                    <span className="absolute top-3 right-3 text-[10px] bg-black/60 text-white px-2.5 py-1 rounded-full backdrop-blur-sm">
                      {totalUnidadesColor} unid. stock
                    </span>
                    <span className="absolute bottom-3 left-3 text-[10px] bg-black/50 text-white px-2.5 py-1 rounded-full backdrop-blur-sm">
                      Pantaloneta + Camiseta
                    </span>
                  </div>

                  <span className="text-[11px] text-stone-700 font-semibold uppercase tracking-wider">{producto.categoria}</span>
                  <h3 className="text-lg font-bold mt-1 mb-1.5 text-zinc-950">{producto.nombre}</h3>
                  <p className="text-zinc-500 text-xs sm:text-sm line-clamp-2 mb-4">{producto.descripcion}</p>
                  
                  <div className="flex justify-between items-center pt-3 border-t border-zinc-100">
                    <div>
                      <span className="text-base font-extrabold text-zinc-950">${producto.precio.toLocaleString("es-CO")}</span>
                      <span className="block text-[10px] text-emerald-600 font-bold">Envío Gratis</span>
                    </div>
                    <span className="text-xs bg-zinc-950 text-white font-bold px-3 py-2 rounded-full group-hover:bg-stone-800 transition">
                      Ver Tallas
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      )}

      {mostrarGuiaTallas && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#faf9f6] border border-zinc-200 rounded-2xl max-w-md w-full p-6 relative shadow-2xl">
            <button onClick={() => setMostrarGuiaTallas(false)} className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-950 text-lg font-bold">✕</button>
            <h3 className="text-xl font-bold mb-4 text-zinc-950">Guía de Tallas (Conjuntos)</h3>
            <p className="text-xs text-zinc-500 mb-4">Medidas aproximadas en superficie plana:</p>
            
            <table className="w-full text-left text-xs border-collapse mb-6">
              <thead>
                <tr className="border-b border-zinc-200 text-stone-700">
                  <th className="py-2">Talla</th>
                  <th className="py-2">Ancho Pecho</th>
                  <th className="py-2">Largo Camiseta</th>
                </tr>
              </thead>
              <tbody className="text-zinc-700">
                <tr className="border-b border-zinc-200/60"><td className="py-2 font-bold">S</td><td>52 cm</td><td>70 cm</td></tr>
                <tr className="border-b border-zinc-200/60"><td className="py-2 font-bold">M</td><td>55 cm</td><td>72 cm</td></tr>
                <tr className="border-b border-zinc-200/60"><td className="py-2 font-bold">L</td><td>58 cm</td><td>74 cm</td></tr>
                <tr><td className="py-2 font-bold">XL</td><td>61 cm</td><td>76 cm</td></tr>
              </tbody>
            </table>

            <button onClick={() => setMostrarGuiaTallas(false)} className="w-full bg-zinc-950 text-white font-bold py-2.5 rounded-xl text-xs transition hover:bg-zinc-800">
              Entendido
            </button>
          </div>
        </div>
      )}

      {carritoAbierto && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex justify-end">
          <div className="bg-[#faf9f6] border-l border-zinc-200 w-full max-w-lg h-full p-6 flex flex-col justify-between overflow-y-auto shadow-2xl">
            <div>
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-zinc-200">
                <h3 className="text-xl font-bold text-zinc-950">Tu Carrito ({totalItems})</h3>
                <button onClick={() => setCarritoAbierto(false)} className="text-zinc-400 hover:text-zinc-950 font-bold text-xl">✕</button>
              </div>

              {pedidoConfirmado ? (
                <div className="bg-white border border-stone-300 rounded-2xl p-6 text-center space-y-4 my-8 shadow-sm">
                  <div className="w-12 h-12 rounded-full bg-zinc-950 text-white flex items-center justify-center mx-auto text-xl">✓</div>
                  <h4 className="text-lg font-bold text-zinc-950">¡Orden Web Registrada!</h4>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    Hemos recibido los datos de tu envío para <strong>{datosEnvio.nombre}</strong> en <strong>{datosEnvio.ciudad}</strong>.
                  </p>
                  <button
                    onClick={() => setCarritoAbierto(false)}
                    className="w-full bg-zinc-950 text-white font-bold py-3 rounded-xl text-xs uppercase tracking-widest"
                  >
                    Seguir Explorando
                  </button>
                </div>
              ) : carrito.length === 0 ? (
                <p className="text-zinc-400 text-center py-12 text-sm">Tu carrito está completamente vacío.</p>
              ) : (
                <>
                  <div className="space-y-3 mb-6 max-h-[26vh] overflow-y-auto pr-1">
                    {carrito.map((item, index) => (
                      <div key={index} className="flex justify-between items-center bg-white p-3 rounded-xl border border-zinc-200 text-xs shadow-sm">
                        <div>
                          <h4 className="font-bold text-zinc-950">{item.producto.nombre}</h4>
                          <span className="text-zinc-500">Color: {item.color} | Talla: <strong>{item.talla}</strong> | Logo: <strong>{item.logo}</strong> | Cant: {item.cantidad}</span>
                          <p className="font-bold text-stone-700 mt-0.5">${(item.producto.precio * item.cantidad).toLocaleString("es-CO")} COP</p>
                        </div>
                        <button onClick={() => eliminarDelCarrito(index)} className="text-red-600 hover:underline text-xs">Eliminar</button>
                      </div>
                    ))}
                  </div>

                  <form id="form-envio" onSubmit={procesarPedidoWeb} className="space-y-3 border-t border-zinc-200 pt-4">
                    <h4 className="text-xs font-bold text-stone-700 uppercase tracking-wider">Datos para el Envío (Gratis):</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <input type="text" name="nombre" placeholder="Nombre Completo *" required value={datosEnvio.nombre} onChange={handleChangeEnvio} className="bg-white border border-zinc-200 rounded-lg px-3 py-2 text-xs text-zinc-950 focus:outline-none focus:border-stone-800" />
                      <input type="text" name="cedula" placeholder="Cédula / NIT *" required value={datosEnvio.cedula} onChange={handleChangeEnvio} className="bg-white border border-zinc-200 rounded-lg px-3 py-2 text-xs text-zinc-950 focus:outline-none focus:border-stone-800" />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <input type="tel" name="telefono" placeholder="Teléfono *" required value={datosEnvio.telefono} onChange={handleChangeEnvio} className="bg-white border border-zinc-200 rounded-lg px-3 py-2 text-xs text-zinc-950 focus:outline-none focus:border-stone-800" />
                      <input type="text" name="ciudad" placeholder="Ciudad / Municipio *" required value={datosEnvio.ciudad} onChange={handleChangeEnvio} className="bg-white border border-zinc-200 rounded-lg px-3 py-2 text-xs text-zinc-950 focus:outline-none focus:border-stone-800" />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <input type="text" name="departamento" placeholder="Departamento *" required value={datosEnvio.departamento} onChange={handleChangeEnvio} className="bg-white border border-zinc-200 rounded-lg px-3 py-2 text-xs text-zinc-950 focus:outline-none focus:border-stone-800" />
                      <input type="text" name="barrio" placeholder="Barrio *" required value={datosEnvio.barrio} onChange={handleChangeEnvio} className="bg-white border border-zinc-200 rounded-lg px-3 py-2 text-xs text-zinc-950 focus:outline-none focus:border-stone-800" />
                    </div>
                    <input type="text" name="direccion" placeholder="Dirección exacta de entrega *" required value={datosEnvio.direccion} onChange={handleChangeEnvio} className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-2 text-xs text-zinc-950 focus:outline-none focus:border-stone-800" />
                    <textarea name="notas" placeholder="Indicaciones adicionales" rows={2} value={datosEnvio.notas} onChange={handleChangeEnvio} className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-2 text-xs text-zinc-950 focus:outline-none focus:border-stone-800"></textarea>
                  </form>
                </>
              )}
            </div>

            {!pedidoConfirmado && (
              <div className="border-t border-zinc-200 pt-4 mt-4">
                <div className="flex justify-between text-base font-bold mb-1 text-zinc-950">
                  <span>Total a Pagar:</span>
                  <span className="text-stone-700">${totalCarrito.toLocaleString("es-CO")} COP</span>
                </div>
                <p className="text-[11px] text-emerald-600 font-bold mb-4">✓ Envío gratis incluido</p>
                <button
                  type="submit"
                  form="form-envio"
                  disabled={carrito.length === 0}
                  className="w-full bg-zinc-950 hover:bg-zinc-800 text-white font-bold py-3.5 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center gap-2 shadow-md text-xs uppercase tracking-widest"
                >
                  <span>Confirmar Compra Web</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <footer className="px-4 sm:px-8 py-8 border-t border-zinc-200 text-zinc-500 text-xs flex flex-col md:flex-row justify-between items-center gap-4">
        <div>© 2026 ETERNUM. Todos los derechos reservados.</div>
        <div className="flex gap-4">
          <a href={`https://wa.me/${NUMERO_WHATSAPP_TIENDA}`} target="_blank" rel="noopener noreferrer" className="hover:text-zinc-950">WhatsApp</a>
          <a href="#" className="hover:text-zinc-950">Términos</a>
          <a href="#" className="hover:text-zinc-950">Privacidad</a>
        </div>
      </footer>
    </div>
  );
}