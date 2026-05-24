import { useState } from "react";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar/Navbar";
import Products from "./components/Products/Products";
import Cart from "./components/Cart/Cart";

function App() {
  const [showCart, setShowCart] = useState(false);

  return (
    <CartProvider>
      <Navbar onCartClick={() => setShowCart(!showCart)} />
      {showCart && <Cart />}
      <Products />
    </CartProvider>
  );
}

export default App;
