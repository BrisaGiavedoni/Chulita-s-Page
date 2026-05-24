import { useState } from "react";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Worlds from "./components/Worlds/Worlds";
import Catalog from "./components/Catalog/Catalog";
import Cart from "./components/Cart/Cart";
import Footer from "./components/Footer/Footer";

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
      <Navbar />
      <main style={{ paddingTop: "70px" }}>
        <Hero id="inicio" />
        <section id="worlds">
          <Worlds onSelectWorld={handleSelectWorld} />
        </section>
        <section id="productos">
          <Catalog
            selectedWorld={selectedWorld}
            onClearWorld={() => setSelectedWorld(null)}
          />
        </section>
      </main>
      <Footer id="footer" />

      <Cart />
    </CartProvider>
  );
}

export default App;