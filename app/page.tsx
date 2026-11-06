"use client";

import React, { useState } from 'react';
import { ShoppingBag, X, Check, Trash2, ShieldCheck, Truck } from 'lucide-react';

interface Producto {
  id: string;
  nombre: string;
  precio: number;
  imagen: string;
  categoria: string;
  tallas: string[];
}

const PRODUCTOS: Producto[] = [
  {
    id: "1",
    nombre: "Vestido Gala Seda ETERNUM",
    precio: 1200000,
    imagen: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80",
    categoria: "Alta Costura",
    tallas: ["S", "M", "L"]
  },
  {
    id: "2",
    nombre: "Suit Tailored Noir",
    precio: 950000,
    imagen: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80",
    categoria: "Trajes",
    tallas: ["M", "L", "XL"]
  },
  {
    id: "3",
    nombre: "Abrigo Velvet Imperial",
    precio: 1450000,
    imagen: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=800&q=80",
    categoria: "Abrigos",
    tallas: ["S", "M"]
  }
];

export default function EternumStore() {
  const [carrito, setCarrito] = useState<{ producto: Producto; cantidad: number; talla: string }[]>([]);
  const [carritoAbierto, setCarritoAbierto] = useState(false);
  const [pedidoExitoso, setPedidoExitoso] = useState(false);

  const agregarAlCarrito = (producto: Producto, talla: string) => {
    setCarrito(prev => {
      const existe = prev.find(item => item.producto.id === producto.id && item.talla === talla);
      if (existe) {
        return prev.map(item =>
          item.producto.id === producto.id && item.talla === talla
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }
      return [...prev, { producto, cantidad: 1, talla }];
    });
    setCarritoAbierto(true);
  };

  const eliminarDelCarrito = (index: number) => {
    setCarrito(prev => prev.filter((_, i) => i !== index));
  };

  const total = carrito.reduce((acc, item) => acc + item.producto.precio * item.cantidad, 0);

  const finalizarCompra = (e: React.FormEvent) => {
    e.preventDefault();
    if (carrito.length === 0) return;
    setPedidoExitoso(true);
    setCarrito([]);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans antialiased">
      {/* NAVEGACIÓN PRINCIPAL */}
      <nav className="fixed top-0 left-0 w-full bg-neutral-950/80 backdrop-blur-md border-b border-neutral-800 z-40 px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-[0.3em] uppercase text-white">ETERNUM</h1>
        
        {/* BOTÓN DEL CARRITO DE COMPRAS CON ICONO PROFESIONAL */}
        <button
          onClick={() => setCarritoAbierto(true)}
          className="relative flex items-center gap-2 bg-neutral-900 border border-neutral-700 px-4 py-2 rounded-full hover:bg-neutral-800 transition"
        >
          <ShoppingBag className="w-5 h-5 text-white" />
          <span className="text-sm font-medium">Carrito</span>
          {carrito.length > 0 && (
            <span className="bg-white text-black text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
              {carrito.reduce((acc, item) => acc + item.cantidad, 0)}
            </span>
          )}
        </button>
      </nav>

      {/* HERO BANNER */}
      <header className="pt-32 pb-16 px-6 text-center max-w-4xl mx-auto">
        <span className="text-xs tracking-[0.4em] uppercase text-neutral-400 font-semibold">Colección Exclusiva 2026</span>
        <h2 className="text-4xl md:text-6xl font-light tracking-wide mt-2 mb-4 text-white">HAUTE COUTURE</h2>
        <p className="text-neutral-400 text-sm max-w-lg mx-auto">
          Piezas únicas elaboradas artesanalmente con los más altos estándares de confección internacional.
        </p>
      </header>

      {/* CATÁLOGO DE PRODUCTOS */}
      <main className="max-w-6xl mx-auto px-6 pb-24 grid grid-cols-1 md:grid-cols-3 gap-8">
        {PRODUCTOS.map((prod) => (
          <div key={prod.id} className="bg-neutral-900 border border-neutral-800 rounded-lg overflow-hidden flex flex-col group">
            <div className="relative h-96 overflow-hidden">
              <img
                src={prod.imagen}
                alt={prod.nombre}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
              <span className="absolute top-4 left-4 bg-neutral-950/80 backdrop-blur-md text-xs px-3 py-1 rounded-full border border-neutral-700 text-neutral-300">
                {prod.categoria}
              </span>
            </div>
            <div className="p-6 flex flex-col flex-grow justify-between">
              <div>
                <h3 className="text-lg font-medium text-white">{prod.nombre}</h3>
                <p className="text-neutral-400 text-sm mt-1 font-semibold">
                  ${prod.precio.toLocaleString('es-CO')} COP
                </p>
              </div>
              <div className="mt-6">
                <span className="text-xs text-neutral-400 block mb-2 uppercase tracking-wider">Seleccionar Talla</span>
                <div className="flex gap-2">
                  {prod.tallas.map((talla) => (
                    <button
                      key={talla}
                      onClick={() => agregarAlCarrito(prod, talla)}
                      className="flex-1 bg-neutral-800 hover:bg-white hover:text-black text-xs font-semibold py-2 rounded transition border border-neutral-700"
                    >
                      {talla}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </main>

      {/* MODAL DEL CARRITO */}
      {carritoAbierto && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-md bg-neutral-900 h-full p-6 overflow-y-auto flex flex-col justify-between border-l border-neutral-800">
            <div>
              <div className="flex justify-between items-center pb-4 border-b border-neutral-800">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-white" />
                  <h3 className="text-lg font-semibold text-white">Tu Carrito de Compra</h3>
                </div>
                <button onClick={() => setCarritoAbierto(false)} className="text-neutral-400 hover:text-white">
                  <X className="w-6 h-6" />
                </button>
              </div>

              {pedidoExitoso ? (
                <div className="py-12 text-center">
                  <div className="w-16 h-16 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/20">
                    <Check className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">¡Pedido Realizado!</h4>
                  <p className="text-sm text-neutral-400 mb-6">
                    Gracias por tu compra en ETERNUM COUTURE. Nos pondremos en contacto contigo pronto.
                  </p>
                  <button
                    onClick={() => { setPedidoExitoso(false); setCarritoAbierto(false); }}
                    className="bg-white text-black font-semibold text-xs py-3 px-6 rounded uppercase tracking-wider hover:bg-neutral-200 transition"
                  >
                    Seguir Viendo la Tienda
                  </button>
                </div>
              ) : (
                <>
                  <div className="py-4 divide-y divide-neutral-800">
                    {carrito.length === 0 ? (
                      <p className="text-center text-neutral-500 py-8 text-sm">Tu carrito está vacío.</p>
                    ) : (
                      carrito.map((item, index) => (
                        <div key={index} className="py-3 flex justify-between items-center">
                          <div>
                            <h4 className="text-sm font-medium text-white">{item.producto.nombre}</h4>
                            <p className="text-xs text-neutral-400">Talla: {item.talla} | Cant: {item.cantidad}</p>
                            <p className="text-xs text-neutral-300 font-semibold mt-1">
                              ${(item.producto.precio * item.cantidad).toLocaleString('es-CO')} COP
                            </p>
                          </div>
                          <button
                            onClick={() => eliminarDelCarrito(index)}
                            className="text-neutral-500 hover:text-red-400 p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))
                    )}
                  </div>

                  {carrito.length > 0 && (
                    <form onSubmit={finalizarCompra} className="mt-6 border-t border-neutral-800 pt-4 space-y-3">
                      <h4 className="text-xs uppercase tracking-wider text-neutral-400 font-bold mb-2">Datos de Envío</h4>
                      <input
                        type="text"
                        placeholder="Nombre Completo"
                        required
                        className="w-full bg-neutral-800 border border-neutral-700 text-xs text-white rounded p-2.5 focus:outline-none focus:border-white"
                      />
                      <input
                        type="tel"
                        placeholder="Teléfono / WhatsApp"
                        required
                        className="w-full bg-neutral-800 border border-neutral-700 text-xs text-white rounded p-2.5 focus:outline-none focus:border-white"
                      />
                      <input
                        type="text"
                        placeholder="Dirección de entrega"
                        required
                        className="w-full bg-neutral-800 border border-neutral-700 text-xs text-white rounded p-2.5 focus:outline-none focus:border-white"
                      />

                      <div className="pt-4 border-t border-neutral-800">
                        <div className="flex justify-between items-center text-sm font-bold text-white mb-4">
                          <span>TOTAL</span>
                          <span>${total.toLocaleString('es-CO')} COP</span>
                        </div>
                        <button
                          type="submit"
                          className="w-full bg-white text-black font-bold text-xs py-3 rounded uppercase tracking-wider hover:bg-neutral-200 transition"
                        >
                          Confirmar Pedido
                        </button>
                      </div>
                    </form>
                  )}
                </>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-neutral-800 flex justify-around text-neutral-500 text-[10px]">
              <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> Envíos Seguros</span>
              <span className="flex items-center gap-1"><Truck className="w-3 h-3" /> Cobertura Nacional</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}