import { useState } from "react";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar/Navbar";
import Cart from "./components/Cart/Cart";

function App() {
   const [selectedWorld, setSelectedWorld] = useState(null);
 
  const handleSelectWorld = (worldId) => {
    setSelectedWorld(worldId);
    setTimeout(() => {
      document.getElementById("productos")?.scrollIntoView({ behavior: "smooth" });
import Hero from "./components/Hero/Hero";
import Worlds from "./components/Worlds/Worlds";
import Catalog from "./components/Catalog/Catalog";
import Cart from "./components/Cart/Cart";

function App() {
  const [showCart, setShowCart] = useState(false);
  const [selectedWorld, setSelectedWorld] = useState(null);

  const handleSelectWorld = (worldId) => {
    setSelectedWorld(worldId);
    // Small timeout lets React re-render with the new filter before scrolling
    setTimeout(() => {
      const section = document.getElementById("productos");
      if (section) section.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  return (
    <CartProvider>
      <div id="carrito">
        <Cart />
      </div>
      <Navbar />

      <Navbar onCartClick={() => setShowCart(!showCart)} />
        <Hero />
      {showCart && <Cart />}
      <Worlds onSelectWorld={handleSelectWorld} />
      <Catalog
        selectedWorld={selectedWorld}
        onClearWorld={() => setSelectedWorld(null)}
      />
    </CartProvider>
  );
}

export default App;