# 🌸 ChulisLovers — Tienda Online

Sitio web de e-commerce desarrollado para **Chulitas Lovers**, una marca de Rosario que vende ropa femenina y manualidades artesanales hechas a mano.

> Primer proyecto freelance desarrollado por [Brisa Giavedoni](https://github.com/BrisaGiavedoni).

---

## ✨ Funcionalidades

- 🛍️ **Catálogo de productos** con filtrado por "mundos" (categorías temáticas)
- 🛒 **Carrito de compras** con dropdown en navbar y modal de checkout
- 📱 **Integración con WhatsApp** — el pedido se envía automáticamente formateado al número de la vendedora
- 🚚 **Opciones de envío** — domicilio o retiro en depósito
- 💳 **Métodos de pago** — transferencia bancaria o efectivo
- 📍 **Cobertura de entrega** — Rosario (Centro, Norte, Sur, Noreste)
- 📲 **Diseño responsive** — adaptado para mobile y desktop

---

## 🛠️ Tecnologías

| Tecnología | Uso |
|---|---|
| [React 19](https://react.dev/) | UI y manejo de estado |
| [Vite](https://vitejs.dev/) | Bundler y dev server |
| [React Icons](https://react-icons.github.io/react-icons/) | Iconografía |
| CSS Modules | Estilos por componente |
| Context API | Estado global del carrito |
| WhatsApp API (`wa.me`) | Envío de pedidos |

---

## 📁 Estructura del proyecto

```
src/
├── assets/              # Imágenes y recursos estáticos
├── components/
│   ├── Navbar/          # Navegación + carrito dropdown
│   ├── Hero/            # Sección principal
│   ├── Worlds/          # Selector de categorías
│   ├── Catalog/         # Grilla de productos
│   ├── Cart/            # Modal de checkout
│   └── Footer/          # Contacto y métodos de pago
├── context/
│   └── CartContext.jsx  # Estado global del carrito
└── App.jsx
```

---

## 🚀 Instalación y uso

```bash
# Clonar el repositorio
git clone https://github.com/BrisaGiavedoni/Chulita-s-Page.git
cd Chulita-s-Page

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Build para producción
npm run build
```

---

## 🛒 Flujo de compra

1. El cliente navega el catálogo y filtra por categoría
2. Agrega productos al carrito (badge se actualiza en tiempo real)
3. Abre el dropdown del carrito desde el navbar
4. Hace click en **"Finalizar compra"** → se abre el modal
5. Completa nombre, teléfono, dirección y elige envío y método de pago
6. Hace click en **"Confirmar Orden por WhatsApp"** → se abre WhatsApp con el pedido ya formateado listo para enviar

---

## 📬 Contacto del cliente

**Chulitas Lovers**
📍 Rosario, Santa Fe, Argentina
📞 +54 9 341 251-0579

---

## 👩‍💻 Desarrollado por

**Brisa Giavedoni** — Desarrolladora Frontend  
[github.com/BrisaGiavedoni](https://github.com/BrisaGiavedoni)

---

*© 2026 Bri Soluciones Digitales — Todos los derechos reservados*