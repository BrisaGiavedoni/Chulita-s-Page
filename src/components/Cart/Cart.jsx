import { useState } from "react";
import { useCart } from "../../context/CartContext";
import styles from "./Cart.module.css";

const SHIPPING_OPTIONS = [
  { id: 1, name: "Envío a domicilio", price: 0, time: "3-5 días hábiles" },
  {
    id: 2,
    name: "Retiro en depósitos",
    price: 0,
    time: "Inmediato",
    address: "Ravignani 1395 o Tucumán 3571",
  },
];

const PAYMENT_METHODS = [
  { id: 1, name: "Transferencia bancaria" },
  { id: 2, name: "Efectivo" },
];

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } =
    useCart();
  const [selectedShipping, setSelectedShipping] = useState(
    SHIPPING_OPTIONS[0].id,
  );
  const [selectedPayment, setSelectedPayment] = useState(PAYMENT_METHODS[0].id);
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const shippingCost =
    SHIPPING_OPTIONS.find((opt) => opt.id === selectedShipping)?.price || 0;
  const total = getCartTotal() + shippingCost;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo((prev) => ({ ...prev, [name]: value }));
  };

  const generateWhatsAppMessage = () => {
    if (!customerInfo.name || !customerInfo.phone || cartItems.length === 0) {
      alert(
        "Por favor completa todos los datos y asegúrate de tener productos en el carrito",
      );
      return null;
    }

    const shippingOption = SHIPPING_OPTIONS.find(
      (opt) => opt.id === selectedShipping,
    );
    const shippingMethod = shippingOption?.name || "";
    const shippingAddress = shippingOption?.address || "";
    const paymentMethod =
      PAYMENT_METHODS.find((opt) => opt.id === selectedPayment)?.name || "";

    let message = "NUEVA ORDEN - Chulitas Lovers\n";
    message += "════════════════════════════════\n\n";

    message += "DATOS DEL CLIENTE:\n";
    message += `Nombre: ${customerInfo.name}\n`;
    message += `Email: ${customerInfo.email || "No especificado"}\n`;
    message += `Teléfono: ${customerInfo.phone}\n`;
    message += `Dirección de envío: ${customerInfo.address || "No especificada"}\n\n`;

    message += "PRODUCTOS:\n";
    cartItems.forEach((item) => {
      message += `• ${item.name}\n  Cantidad: ${item.quantity} x $${item.price.toFixed(2)}\n  Subtotal: $${(item.price * item.quantity).toFixed(2)}\n`;
    });

    message += "\nRESUMEN DE PAGO:\n";
    message += `Subtotal: $${getCartTotal().toFixed(2)}\n`;
    message += `Envío: $${shippingCost.toFixed(2)}\n`;
    message += "────────────────────────────────\n";
    message += `TOTAL: $${total.toFixed(2)}\n\n`;

    message += "OPCIONES SELECCIONADAS:\n";
    message += `Envío: ${shippingMethod}\n`;
    if (shippingAddress) {
      message += `Ubicación: ${shippingAddress}\n`;
    }
    message += `Pago: ${paymentMethod}\n\n`;

    message += "════════════════════════════════\n";
    message += "Gracias por tu compra!";

    return message;
  };

  const handleSendToWhatsApp = () => {
    const message = generateWhatsAppMessage();
    if (message) {
      const phoneNumber = "5493412510579";
      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
      window.open(whatsappUrl, "_blank");
      clearCart();
      setCustomerInfo({ name: "", email: "", phone: "", address: "" });
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className={styles.cartContainer}>
        <h2>Tu carrito está vacío</h2>
        <p>Agrega productos para comenzar a comprar</p>
      </div>
    );
  }

  return (
    <div className={styles.cartContainer}>
      <h2>🛒 Mi Carrito</h2>

      {/* Productos */}
      <div className={styles.cartItems}>
        <h3>Productos</h3>
        {cartItems.map((item) => (
          <div key={item.id} className={styles.cartItem}>
            <div className={styles.itemInfo}>
              <h4>{item.name}</h4>
              <p>${item.price.toFixed(2)}</p>
            </div>
            <div className={styles.itemControls}>
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className={styles.btnSmall}
              >
                −
              </button>
              <span>{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className={styles.btnSmall}
              >
                +
              </button>
              <button
                onClick={() => removeFromCart(item.id)}
                className={styles.btnRemove}
              >
                🗑️
              </button>
            </div>
            <div className={styles.itemTotal}>
              ${(item.price * item.quantity).toFixed(2)}
            </div>
          </div>
        ))}
      </div>

      {/* Datos del cliente */}
      <div className={styles.section}>
        <h3>👤 Datos Personales</h3>
        <input
          type="text"
          name="name"
          placeholder="Nombre completo *"
          value={customerInfo.name}
          onChange={handleInputChange}
          className={styles.input}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={customerInfo.email}
          onChange={handleInputChange}
          className={styles.input}
        />
        <input
          type="tel"
          name="phone"
          placeholder="Teléfono *"
          value={customerInfo.phone}
          onChange={handleInputChange}
          className={styles.input}
          required
        />
        <textarea
          name="address"
          placeholder="Dirección de envío"
          value={customerInfo.address}
          onChange={handleInputChange}
          className={styles.textarea}
          rows="3"
        />
      </div>

      {/* Opciones de envío */}
      <div className={styles.section}>
        <h3>🚚 Opciones de Envío</h3>
        <div className={styles.options}>
          {SHIPPING_OPTIONS.map((option) => (
            <label key={option.id} className={styles.radioLabel}>
              <input
                type="radio"
                name="shipping"
                value={option.id}
                checked={selectedShipping === option.id}
                onChange={(e) => setSelectedShipping(Number(e.target.value))}
              />
              <span className={styles.radioContent}>
                <strong>{option.name}</strong>
                <small>{option.time}</small>
                {option.address && (
                  <small style={{ color: "#e91e63", fontWeight: "bold" }}>
                    📍 {option.address}
                  </small>
                )}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Métodos de pago */}
      <div className={styles.section}>
        <h3>💳 Método de Pago</h3>
        <div className={styles.options}>
          {PAYMENT_METHODS.map((method) => (
            <label key={method.id} className={styles.radioLabel}>
              <input
                type="radio"
                name="payment"
                value={method.id}
                checked={selectedPayment === method.id}
                onChange={(e) => setSelectedPayment(Number(e.target.value))}
              />
              <span>{method.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Resumen */}
      <div className={styles.summary}>
        <div className={styles.summaryRow}>
          <span>Subtotal:</span>
          <span>${getCartTotal().toFixed(2)}</span>
        </div>
        <div className={styles.summaryRow}>
          <span>
            Envío (
            {SHIPPING_OPTIONS.find((opt) => opt.id === selectedShipping)?.name}
            ):
          </span>
          <span>${shippingCost.toFixed(2)}</span>
        </div>
        <div className={styles.summaryRow + " " + styles.total}>
          <span>TOTAL:</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      {/* Botones de acción */}
      <div className={styles.actions}>
        <button onClick={handleSendToWhatsApp} className={styles.btnPrimary}>
          📱 Confirmar Orden por WhatsApp
        </button>
        <button onClick={clearCart} className={styles.btnSecondary}>
          Vaciar Carrito
        </button>
      </div>
    </div>
  );
}
