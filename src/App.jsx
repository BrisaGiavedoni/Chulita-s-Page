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
    }, 50);
  };

  return (
    <CartProvider>
      <div id="carrito">
        <Cart />
      </div>
      <Navbar />

    </CartProvider>
  );
}

export default App;
