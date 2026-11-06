"use client";

import { useState } from "react";
import { Playfair_Display } from "next/font/google";

const fontElegante = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

interface Producto {
  id: number;
  nombre: string;
  categoria: string;
  tipo: "conjunto" | "camiseta" | "pantaloneta";
  precio: number;
  descripcion: string;
  detalles: string[];
  tallas: { talla: string; disponible: boolean }[];
  colores: { nombre: string; clase: string }[];
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
    nombre: "Conjunto Urban Black",
    categoria: "Edición Limitada",
    tipo: "conjunto",
    precio: 149900,
    descripcion: "Conjunto exclusivo de camiseta oversize y pantaloneta a juego. Misma talla coordinada para ambas prendas.",
    detalles: [
      "Camiseta 100% Algodón Peinado (240g)",
      "Pantaloneta en dril confort con cordón ajustable",
      "Confección 100% Colombiana"
    ],
    tallas: [
      { talla: "S", disponible: true },
      { talla: "M", disponible: true },
      { talla: "L", disponible: false },
      { talla: "XL", disponible: true }
    ],
    colores: [
      { nombre: "Negro Ónix", clase: "bg-zinc-900 border-zinc-300" },
      { nombre: "Gris Plomo", clase: "bg-zinc-600 border-transparent" }
    ]
  },
  {
    id: 2,
    nombre: "Camiseta Heavyweight Oversize",
    categoria: "Esenciales",
    tipo: "camiseta",
    precio: 89900,
    descripcion: "Camiseta de gramaje pesado con caída estructurada y corte boxy fit.",
    detalles: [
      "100% Algodón de 260g",
      "Cuello acanalado de alta densidad",
      "Costuras reforzadas"
    ],
    tallas: [
      { talla: "S", disponible: true },
      { talla: "M", disponible: true },
      { talla: "L", disponible: true }
    ],
    colores: [
      { nombre: "Negro Ónix", clase: "bg-zinc-900 border-zinc-300" },
      { nombre: "Blanco Crudo", clase: "bg-stone-200 border-zinc-400" }
    ]
  },
  {
    id: 3,
    nombre: "Conjunto Acid Wash Charcoal",
    categoria: "Exclusivo",
    tipo: "conjunto",
    precio: 179900,
    descripcion: "Proceso artesanal de teñido acid wash en tonos carbón. Camiseta boxy fit y pantaloneta a juego.",
    detalles: [
      "Efecto desgastado único en cada prenda",
      "Algodón premium con tacto suave",
      "Lavar con agua fría"
    ],
    tallas: [
      { talla: "S", disponible: true },
      { talla: "M", disponible: true },
      { talla: "L", disponible: true }
    ],
    colores: [
      { nombre: "Carbón Desgastado", clase: "bg-zinc-700 border-zinc-300" }
    ]
  },
  {
    id: 4,
    nombre: "Pantaloneta Cargo Tactical",
    categoria: "Nuevos Drops",
    tipo: "pantaloneta",
    precio: 95000,
    descripcion: "Pantaloneta urbana con bolsillos laterales y ajuste elástico con cordón.",
    detalles: [
      "Tela antifluido de alta resistencia",
      "Bolsillos tácticos con cierre",
      "Secado rápido"
    ],
    tallas: [
      { talla: "S", disponible: true },
      { talla: "M", disponible: true },
      { talla: "L", disponible: true },
      { talla: "XL", disponible: true }
    ],
    colores: [
      { nombre: "Negro Ónix", clase: "bg-zinc-900 border-zinc-300" },
      { nombre: "Verde Oliva", clase: "bg-emerald-900 border-transparent" }
    ]
  }
];

export default function Home() {
  const [categoriaActiva, setCategoriaActiva] = useState<string>("todos");
  const [productoSeleccionado, setProductoSeleccionado] = useState<Producto | null>(null);
  const [tallaElegida, setTallaElegida] = useState<string>("");
  const [colorElegido, setColorElegido] = useState<string>("");
  const [cantidadElegida, setCantidadElegida] = useState<number>(1);
  const [mostrarGuiaTallas, setMostrarGuiaTallas] = useState<boolean>(false);
  
  const [carrito, setCarrito] = useState<{ producto: Producto; talla: string; color: string; cantidad: number }[]>([]);
  const [carritoAbierto, setCarritoAbierto] = useState<boolean>(false);
  const [menuNavegacionAbierto, setMenuNavegacionAbierto] = useState<boolean>(false);

  const NUMERO_WHATSAPP = "573000000000";

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

  const productosFiltrados = categoriaActiva === "todos" 
    ? PRODUCTOS 
    : PRODUCTOS.filter(p => p.tipo === categoriaActiva);

  const seleccionarCategoria = (tipo: string) => {
    setCategoriaActiva(tipo);
    setProductoSeleccionado(null);
    setMenuNavegacionAbierto(false);
    const catalogoElem = document.getElementById("catalogo");
    if (catalogoElem) {
      catalogoElem.scrollIntoView({ behavior: "smooth" });
    }
  };

  const agregarAlCarrito = () => {
    if (!productoSeleccionado) return;
    if (!tallaElegida) {
      alert("Por favor selecciona una talla disponible.");
      return;
    }
    const colorFinal = colorElegido || productoSeleccionado.colores[0].nombre;

    setCarrito((prev) => {
      const existe = prev.find(
        (item) => item.producto.id === productoSeleccionado.id && item.talla === tallaElegida && item.color === colorFinal
      );
      if (existe) {
        return prev.map((item) =>
          item.producto.id === productoSeleccionado.id && item.talla === tallaElegida && item.color === colorFinal
            ? { ...item, cantidad: item.cantidad + cantidadElegida }
            : item
        );
      }
      return [...prev, { producto: productoSeleccionado, talla: tallaElegida, color: colorFinal, cantidad: cantidadElegida }];
    });

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

  const procesarPedido = (e: React.FormEvent) => {
    e.preventDefault();
    if (carrito.length === 0) return;

    let mensaje = "¡Hola! 👋 Deseo realizar la compra de los siguientes productos:\n\n";
    carrito.forEach((item, index) => {
      mensaje += `${index + 1}. *${item.producto.nombre}*\n`;
      mensaje += `   - Color: ${item.color} | Talla: *${item.talla}*\n`;
      mensaje += `   - Cantidad: ${item.cantidad} | Subtotal: $${(item.producto.precio * item.cantidad).toLocaleString("es-CO")} COP\n\n`;
    });

    mensaje += `💰 *TOTAL A PAGAR:* $${totalCarrito.toLocaleString("es-CO")} COP\n\n`;
    mensaje += "📍 *DATOS DE ENVÍO:* \n";
    mensaje += `• *Cliente:* ${datosEnvio.nombre} (CC: ${datosEnvio.cedula})\n`;
    mensaje += `• *Teléfono:* ${datosEnvio.telefono}\n`;
    mensaje += `• *Dirección:* ${datosEnvio.direccion}, ${datosEnvio.barrio}\n`;
    mensaje += `• *Ciudad:* ${datosEnvio.ciudad} (${datosEnvio.departamento})\n`;
    if (datosEnvio.notas) mensaje += `• *Notas:* ${datosEnvio.notas}\n`;

    mensaje += "\nQuedo atento al medio de pago (Nequi / Daviplata / Bancolombia). ¡Gracias!";

    const url = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank");
    setCarritoAbierto(false);
  };

  return (
    <div className="min-h-screen bg-[#faf9f6] text-zinc-900 font-sans selection:bg-stone-800 selection:text-white relative overflow-x-hidden">
      {/* BARRA DE NAVEGACIÓN STICKY */}
      <nav className="flex items-center justify-between px-6 md:px-12 py-5 border-b border-zinc-200/80 backdrop-blur-md bg-[#faf9f6]/90 sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setMenuNavegacionAbierto(true)}
            className="p-2 rounded-lg bg-stone-100 border border-zinc-200 hover:bg-stone-200 transition flex items-center gap-2"
            aria-label="Abrir menú"
          >
            <span className="text-xl leading-none text-zinc-900">☰</span>
            <span className="text-xs uppercase tracking-widest text-zinc-600 hidden sm:inline">Menú</span>
          </button>
        </div>

        <div 
          onClick={() => {
            setProductoSeleccionado(null);
            setCategoriaActiva("todos");
          }} 
          className={`${fontElegante.className} text-2xl md:text-3xl font-bold tracking-[0.35em] cursor-pointer select-none text-center text-zinc-950`}
        >
          ETERNUM<span className="text-stone-700 tracking-normal">.</span>
        </div>

        <button
          onClick={() => setCarritoAbierto(true)}
          className="relative px-4 py-2 bg-zinc-950 text-white rounded-full text-sm font-semibold hover:bg-zinc-800 transition flex items-center gap-2 shadow-sm"
        >
          <span>🛍️</span>
          <span className="hidden sm:inline">Carrito</span>
          {totalItems > 0 && (
            <span className="bg-stone-700 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
              {totalItems}
            </span>
          )}
        </button>
      </nav>

      {/* MENÚ DESPLEGABLE LATERAL (SLIDE-OVER) */}
      {menuNavegacionAbierto && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex">
          <div className="bg-[#faf9f6] border-r border-zinc-200 w-full max-w-sm h-full p-8 flex flex-col justify-between animate-in slide-in-from-left duration-300 shadow-2xl">
            <div>
              <div className="flex justify-between items-center mb-10">
                <span className={`${fontElegante.className} text-2xl font-bold tracking-[0.3em] text-zinc-950`}>
                  ETERNUM
                </span>
                <button 
                  onClick={() => setMenuNavegacionAbierto(false)}
                  className="text-zinc-500 hover:text-zinc-950 text-2xl font-bold"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                <span className="text-xs font-semibold uppercase tracking-widest text-zinc-400 block">Navegación & Colecciones</span>
                <nav className="flex flex-col space-y-4">
                  <button
                    onClick={() => seleccionarCategoria("todos")}
                    className={`text-left text-lg font-bold transition ${
                      categoriaActiva === "todos" ? "text-stone-900 pl-2 border-l-2 border-stone-900" : "text-zinc-700 hover:text-zinc-950"
                    }`}
                  >
                    Ver Todo el Catálogo
                  </button>
                  <button
                    onClick={() => seleccionarCategoria("conjunto")}
                    className={`text-left text-lg font-bold transition ${
                      categoriaActiva === "conjunto" ? "text-stone-900 pl-2 border-l-2 border-stone-900" : "text-zinc-700 hover:text-zinc-950"
                    }`}
                  >
                    Conjuntos Exclusivos
                  </button>
                  <button
                    onClick={() => seleccionarCategoria("camiseta")}
                    className={`text-left text-lg font-bold transition ${
                      categoriaActiva === "camiseta" ? "text-stone-900 pl-2 border-l-2 border-stone-900" : "text-zinc-700 hover:text-zinc-950"
                    }`}
                  >
                    Camisetas Heavyweight
                  </button>
                  <button
                    onClick={() => seleccionarCategoria("pantaloneta")}
                    className={`text-left text-lg font-bold transition ${
                      categoriaActiva === "pantaloneta" ? "text-stone-900 pl-2 border-l-2 border-stone-900" : "text-zinc-700 hover:text-zinc-950"
                    }`}
                  >
                    Pantalonetas
                  </button>
                </nav>
              </div>
            </div>

            <div className="border-t border-zinc-200 pt-6">
              <p className="text-xs text-zinc-500">Diseñado e inspirado en la elegancia minimalista contemporánea.</p>
            </div>
          </div>

          <div className="flex-1" onClick={() => setMenuNavegacionAbierto(false)}></div>
        </div>
      )}

      {/* PANTALLA 1: PRESENTACIÓN HERO CON IMAGEN EDITORIAL DE ALTA COSTURA */}
      {!productoSeleccionado && (
        <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-6 border-b border-zinc-200/60 overflow-hidden">
          
          {/* IMAGEN DE FONDO EDITORIAL CON CAPA OSCURA ELEGANTE */}
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=1920" 
              alt="Estética Eternum" 
              className="w-full h-full object-cover object-center filter brightness-[0.45] contrast-[1.1]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30"></div>
          </div>

          {/* CONTENIDO DEL HERO */}
          <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
            <span className="text-xs font-semibold tracking-[0.4em] text-stone-200 uppercase mb-6 border border-stone-300/40 px-5 py-2 rounded-full bg-black/40 backdrop-blur-md">
              High-End Streetwear
            </span>
            <h1 className={`${fontElegante.className} text-6xl md:text-9xl font-extrabold tracking-[0.25em] mb-6 text-white uppercase drop-shadow-2xl`}>
              ETERNUM
            </h1>
            <p className="text-zinc-200 text-sm md:text-lg max-w-xl font-light leading-relaxed mb-10 tracking-wide drop-shadow">
              Indumentaria atemporal de siluetas minimalistas y corte de autor. 
              Piezas concebidas para perdurar.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => {
                  const catalogoElem = document.getElementById("catalogo");
                  if (catalogoElem) catalogoElem.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-9 py-4 bg-stone-100 hover:bg-white text-zinc-950 font-bold rounded-full transition text-xs uppercase tracking-widest shadow-2xl"
              >
                Explorar Colección
              </button>
            </div>
          </div>
        </section>
      )}

      {/* DETALLE DE PRODUCTO O CATÁLOGO GENERAL */}
      {productoSeleccionado ? (
        <main className="max-w-7xl mx-auto px-6 md:px-12 py-12">
          <button
            onClick={() => setProductoSeleccionado(null)}
            className="text-xs text-zinc-500 hover:text-zinc-950 mb-8 flex items-center gap-2 transition"
          >
            &larr; Volver a la Colección
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <div className="h-[450px] md:h-[550px] bg-stone-200/60 rounded-2xl flex flex-col items-center justify-center text-zinc-400 font-bold border border-zinc-200 relative overflow-hidden">
                <span className="text-sm uppercase tracking-widest text-zinc-500">[ FOTO PRINCIPAL ]</span>
                <span className="absolute bottom-4 text-xs bg-white/80 px-4 py-1.5 rounded-full text-zinc-700 backdrop-blur-sm border border-zinc-200">
                  {productoSeleccionado.nombre}
                </span>
              </div>
            </div>

            <div className="flex flex-col justify-between">
              <div>
                <span className="text-xs font-semibold text-stone-700 uppercase tracking-widest">{productoSeleccionado.categoria}</span>
                <h1 className="text-3xl md:text-4xl font-black text-zinc-950 mt-1 mb-3">{productoSeleccionado.nombre}</h1>
                <p className="text-2xl font-extrabold text-zinc-900 mb-6">${productoSeleccionado.precio.toLocaleString("es-CO")} COP</p>
                <p className="text-zinc-600 text-sm leading-relaxed mb-6">{productoSeleccionado.descripcion}</p>

                <div className="mb-6">
                  <span className="text-xs font-bold text-zinc-700 uppercase tracking-wider block mb-2">Color:</span>
                  <div className="flex gap-3">
                    {productoSeleccionado.colores.map((color, index) => (
                      <button
                        key={index}
                        onClick={() => setColorElegido(color.nombre)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold border transition flex items-center gap-2 ${
                          (colorElegido === color.nombre || (!colorElegido && index === 0))
                            ? "border-stone-900 bg-stone-100 text-zinc-950"
                            : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300"
                        }`}
                      >
                        <span className={`w-3 h-3 rounded-full border ${color.clase}`}></span>
                        {color.nombre}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-zinc-700 uppercase tracking-wider">Selecciona Talla:</span>
                    <button onClick={() => setMostrarGuiaTallas(true)} className="text-xs text-stone-700 font-semibold hover:underline">
                      Guía de Tallas 📏
                    </button>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {productoSeleccionado.tallas.map((t) => (
                      <button
                        key={t.talla}
                        disabled={!t.disponible}
                        onClick={() => setTallaElegida(t.talla)}
                        className={`py-3 rounded-xl text-xs font-bold border transition ${
                          !t.disponible
                            ? "border-zinc-200 bg-stone-100 text-zinc-400 line-through cursor-not-allowed"
                            : tallaElegida === t.talla
                            ? "border-zinc-950 bg-zinc-950 text-white shadow-md font-extrabold"
                            : "border-zinc-200 bg-white text-zinc-800 hover:border-zinc-300"
                        }`}
                      >
                        {t.talla}
                      </button>
                    ))}
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

              <button
                onClick={agregarAlCarrito}
                className="w-full bg-zinc-950 hover:bg-zinc-800 text-white font-bold py-4 rounded-xl transition shadow-xl"
              >
                Añadir al Carrito
              </button>
            </div>
          </div>
        </main>
      ) : (
        /* PANTALLA 2: CATÁLOGO CLARO CON EFECTOS DE TARJETA */
        <main id="catalogo" className="px-6 md:px-12 py-20 max-w-7xl mx-auto">
          <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-200 pb-6">
            <div>
              <span className="text-xs font-semibold text-stone-700 uppercase tracking-widest">Catálogo Seleccionado</span>
              <h2 className="text-3xl font-bold tracking-tight capitalize mt-1 text-zinc-950">
                {categoriaActiva === "todos" ? "Todas las Prendas & Drops" : `${categoriaActiva}s`}
              </h2>
            </div>
            
            <div className="flex gap-2">
              <button 
                onClick={() => setCategoriaActiva("todos")} 
                className={`px-4 py-2 rounded-full text-xs font-semibold transition ${categoriaActiva === "todos" ? "bg-zinc-950 text-white" : "bg-stone-200/70 text-zinc-700 hover:bg-stone-300"}`}
              >
                Todos
              </button>
              <button 
                onClick={() => setCategoriaActiva("conjunto")} 
                className={`px-4 py-2 rounded-full text-xs font-semibold transition ${categoriaActiva === "conjunto" ? "bg-zinc-950 text-white" : "bg-stone-200/70 text-zinc-700 hover:bg-stone-300"}`}
              >
                Conjuntos
              </button>
              <button 
                onClick={() => setCategoriaActiva("camiseta")} 
                className={`px-4 py-2 rounded-full text-xs font-semibold transition ${categoriaActiva === "camiseta" ? "bg-zinc-950 text-white" : "bg-stone-200/70 text-zinc-700 hover:bg-stone-300"}`}
              >
                Camisetas
              </button>
              <button 
                onClick={() => setCategoriaActiva("pantaloneta")} 
                className={`px-4 py-2 rounded-full text-xs font-semibold transition ${categoriaActiva === "pantaloneta" ? "bg-zinc-950 text-white" : "bg-stone-200/70 text-zinc-700 hover:bg-stone-300"}`}
              >
                Pantalonetas
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {productosFiltrados.map((producto) => (
              <div
                key={producto.id}
                onClick={() => {
                  setProductoSeleccionado(producto);
                  setTallaElegida("");
                  setColorElegido(producto.colores[0].nombre);
                  setCantidadElegida(1);
                }}
                className="group border border-zinc-200/80 rounded-2xl p-5 bg-white hover:border-stone-400 hover:shadow-xl transition duration-300 cursor-pointer"
              >
                <div className="h-72 bg-stone-100 rounded-xl mb-5 flex flex-col items-center justify-center text-zinc-400 font-bold group-hover:scale-[1.02] transition duration-300 relative overflow-hidden">
                  <span className="text-xs uppercase tracking-widest text-zinc-400">[ FOTO PRENDA ]</span>
                </div>

                <span className="text-xs text-stone-700 font-semibold uppercase tracking-wider">{producto.categoria}</span>
                <h3 className="text-xl font-bold mt-1 mb-2 text-zinc-950">{producto.nombre}</h3>
                <p className="text-zinc-500 text-sm line-clamp-2 mb-4">{producto.descripcion}</p>
                
                <div className="flex justify-between items-center pt-3 border-t border-zinc-100">
                  <span className="text-lg font-extrabold text-zinc-950">${producto.precio.toLocaleString("es-CO")} COP</span>
                  <span className="text-xs bg-zinc-950 text-white font-bold px-4 py-2 rounded-full group-hover:bg-stone-800 transition">
                    Ver Prenda
                  </span>
                </div>
              </div>
            ))}
          </div>
        </main>
      )}

      {/* MODAL GUÍA DE TALLAS */}
      {mostrarGuiaTallas && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#faf9f6] border border-zinc-200 rounded-2xl max-w-md w-full p-6 relative shadow-2xl">
            <button onClick={() => setMostrarGuiaTallas(false)} className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-950 text-lg font-bold">✕</button>
            <h3 className="text-xl font-bold mb-4 text-zinc-950">Guía de Tallas</h3>
            <p className="text-xs text-zinc-500 mb-4">Medidas tomadas en superficie plana (cm):</p>
            
            <table className="w-full text-left text-xs border-collapse mb-6">
              <thead>
                <tr className="border-b border-zinc-200 text-stone-700">
                  <th className="py-2">Talla</th>
                  <th className="py-2">Ancho Pecho</th>
                  <th className="py-2">Largo</th>
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

      {/* DRAWER DEL CARRITO DE COMPRAS + FORMULARIO DE ENVÍO */}
      {carritoAbierto && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex justify-end">
          <div className="bg-[#faf9f6] border-l border-zinc-200 w-full max-w-lg h-full p-6 flex flex-col justify-between overflow-y-auto shadow-2xl">
            <div>
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-zinc-200">
                <h3 className="text-xl font-bold text-zinc-950">Tu Carrito ({totalItems})</h3>
                <button onClick={() => setCarritoAbierto(false)} className="text-zinc-400 hover:text-zinc-950 font-bold text-xl">✕</button>
              </div>

              {carrito.length === 0 ? (
                <p className="text-zinc-400 text-center py-12 text-sm">Tu carrito está completamente vacío.</p>
              ) : (
                <>
                  <div className="space-y-3 mb-6 max-h-[28vh] overflow-y-auto pr-1">
                    {carrito.map((item, index) => (
                      <div key={index} className="flex justify-between items-center bg-white p-3 rounded-xl border border-zinc-200 text-xs shadow-sm">
                        <div>
                          <h4 className="font-bold text-zinc-950">{item.producto.nombre}</h4>
                          <span className="text-zinc-500">Color: {item.color} | Talla: <strong>{item.talla}</strong> | Cant: {item.cantidad}</span>
                          <p className="font-bold text-stone-700 mt-0.5">${(item.producto.precio * item.cantidad).toLocaleString("es-CO")} COP</p>
                        </div>
                        <button onClick={() => eliminarDelCarrito(index)} className="text-red-600 hover:underline text-xs">Eliminar</button>
                      </div>
                    ))}
                  </div>

                  <form id="form-envio" onSubmit={procesarPedido} className="space-y-3 border-t border-zinc-200 pt-4">
                    <h4 className="text-xs font-bold text-stone-700 uppercase tracking-wider">Datos para el Envío:</h4>
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

            <div className="border-t border-zinc-200 pt-4 mt-4">
              <div className="flex justify-between text-base font-bold mb-4 text-zinc-950">
                <span>Total a Pagar:</span>
                <span className="text-stone-700">${totalCarrito.toLocaleString("es-CO")} COP</span>
              </div>
              <button
                type="submit"
                form="form-envio"
                disabled={carrito.length === 0}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center gap-2 shadow-md"
              >
                <span>💬</span>
                <span>Finalizar Compra por WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PIE DE PÁGINA */}
      <footer className="px-6 md:px-12 py-8 border-t border-zinc-200 text-zinc-500 text-xs flex flex-col md:flex-row justify-between items-center gap-4">
        <div>© 2026 ETERNUM. Todos los derechos reservados.</div>
        <div className="flex gap-4">
          <a href="#" className="hover:text-zinc-950">Términos</a>
          <a href="#" className="hover:text-zinc-950">Privacidad</a>
        </div>
      </footer>
    </div>
  );
}