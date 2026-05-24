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
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    getCartTotal,
    clearCart,
    cartModalOpen,
    closeCartModal,
  } = useCart();

  const [selectedShipping, setSelectedShipping] = useState(SHIPPING_OPTIONS[0].id);
  const [selectedPayment, setSelectedPayment] = useState(PAYMENT_METHODS[0].id);
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  if (!cartModalOpen) return null;

  const shippingCost =
    SHIPPING_OPTIONS.find((opt) => opt.id === selectedShipping)?.price || 0;
  const total = getCartTotal() + shippingCost;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo((prev) => ({ ...prev, [name]: value }));
  };

  const generateWhatsAppMessage = () => {
    if (!customerInfo.name || !customerInfo.phone || cartItems.length === 0) {
      alert("Por favor completá nombre y teléfono, y asegurate de tener productos en el carrito.");
      return null;
    }

    const shippingOption = SHIPPING_OPTIONS.find((opt) => opt.id === selectedShipping);
    const paymentMethod = PAYMENT_METHODS.find((opt) => opt.id === selectedPayment)?.name || "";

    let message = "NUEVA ORDEN - Chulitas Lovers\n";
    message += "════════════════════════════════\n\n";
    message += "DATOS DEL CLIENTE:\n";
    message += `Nombre: ${customerInfo.name}\n`;
    message += `Email: ${customerInfo.email || "No especificado"}\n`;
    message += `Teléfono: ${customerInfo.phone}\n`;
    message += `Dirección de envío: ${customerInfo.address || "No especificada"}\n\n`;
    message += "PRODUCTOS:\n";
    cartItems.forEach((item) => {
      message += `• ${item.name}\n  Cantidad: ${item.quantity} x $${item.price.toLocaleString("es-AR")}\n  Subtotal: $${(item.price * item.quantity).toLocaleString("es-AR")}\n`;
    });
    message += "\nRESUMEN DE PAGO:\n";
    message += `Subtotal: $${getCartTotal().toLocaleString("es-AR")}\n`;
    message += `Envío: $${shippingCost.toLocaleString("es-AR")}\n`;
    message += "────────────────────────────────\n";
    message += `TOTAL: $${total.toLocaleString("es-AR")}\n\n`;
    message += "OPCIONES SELECCIONADAS:\n";
    message += `Envío: ${shippingOption?.name}\n`;
    if (shippingOption?.address) message += `Ubicación: ${shippingOption.address}\n`;
    message += `Pago: ${paymentMethod}\n\n`;
    message += "════════════════════════════════\n";
    message += "Gracias por tu compra!";

    return message;
  };

  const handleSendToWhatsApp = () => {
    const message = generateWhatsAppMessage();
    if (!message) return;
    const phoneNumber = "5493412510579";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
    clearCart();
    closeCartModal();
    setCustomerInfo({ name: "", email: "", phone: "", address: "" });
  };

  return (
    /* Overlay oscuro — click fuera cierra el modal */
    <div style={overlayStyle} onClick={closeCartModal}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>

        {/* Header */}
        <div style={headerStyle}>
          <h2 style={{ margin: 0, fontSize: "1.2rem" }}>🛒 Mi Carrito</h2>
          <button onClick={closeCartModal} style={closeBtnStyle}>✕</button>
        </div>

        <div style={bodyStyle}>
          {cartItems.length === 0 ? (
            <p style={{ textAlign: "center", color: "#888", padding: "2rem 0" }}>
              El carrito está vacío
            </p>
          ) : (
            <>
              {/* Productos */}
              <div style={sectionStyle}>
                <h3 style={sectionTitleStyle}>Productos</h3>
                {cartItems.map((item) => (
                  <div key={item.id} style={itemRowStyle}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, fontSize: "0.9rem" }}>{item.name}</div>
                      <div style={{ color: "#888", fontSize: "0.8rem" }}>${item.price.toLocaleString("es-AR")}</div>
                    </div>
                    <div style={itemControlsStyle}>
                      <button style={qtyBtnStyle} onClick={() => updateQuantity(item.id, item.quantity - 1)}>−</button>
                      <span style={{ minWidth: 20, textAlign: "center" }}>{item.quantity}</span>
                      <button style={qtyBtnStyle} onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                      <button style={removeBtnStyle} onClick={() => removeFromCart(item.id)}>🗑️</button>
                    </div>
                    <div style={{ fontWeight: 700, minWidth: 70, textAlign: "right" }}>
                      ${(item.price * item.quantity).toLocaleString("es-AR")}
                    </div>
                  </div>
                ))}
              </div>

              {/* Datos personales */}
              <div style={sectionStyle}>
                <h3 style={sectionTitleStyle}>👤 Datos Personales</h3>
                <input style={inputStyle} type="text" name="name" placeholder="Nombre completo *" value={customerInfo.name} onChange={handleInputChange} />
                <input style={inputStyle} type="email" name="email" placeholder="Email" value={customerInfo.email} onChange={handleInputChange} />
                <input style={inputStyle} type="tel" name="phone" placeholder="Teléfono *" value={customerInfo.phone} onChange={handleInputChange} />
                <textarea style={{ ...inputStyle, resize: "vertical", minHeight: 60 }} name="address" placeholder="Dirección de envío" value={customerInfo.address} onChange={handleInputChange} />
              </div>

              {/* Envío */}
              <div style={sectionStyle}>
                <h3 style={sectionTitleStyle}>🚚 Opciones de Envío</h3>
                {SHIPPING_OPTIONS.map((option) => (
                  <label key={option.id} style={radioLabelStyle}>
                    <input type="radio" name="shipping" value={option.id} checked={selectedShipping === option.id} onChange={(e) => setSelectedShipping(Number(e.target.value))} />
                    <span style={{ marginLeft: 8 }}>
                      <strong>{option.name}</strong>
                      <small style={{ display: "block", color: "#aaa" }}>{option.time}</small>
                      {option.address && <small style={{ display: "block", color: "#e91e63", fontWeight: 600 }}>📍 {option.address}</small>}
                    </span>
                  </label>
                ))}
              </div>

              {/* Pago */}
              <div style={sectionStyle}>
                <h3 style={sectionTitleStyle}>💳 Método de Pago</h3>
                {PAYMENT_METHODS.map((method) => (
                  <label key={method.id} style={radioLabelStyle}>
                    <input type="radio" name="payment" value={method.id} checked={selectedPayment === method.id} onChange={(e) => setSelectedPayment(Number(e.target.value))} />
                    <span style={{ marginLeft: 8 }}>{method.name}</span>
                  </label>
                ))}
              </div>

              {/* Resumen */}
              <div style={summaryStyle}>
                <div style={summaryRowStyle}><span>Subtotal</span><span>${getCartTotal().toLocaleString("es-AR")}</span></div>
                <div style={summaryRowStyle}><span>Envío</span><span>${shippingCost.toLocaleString("es-AR")}</span></div>
                <div style={{ ...summaryRowStyle, fontWeight: 700, fontSize: "1.1rem", borderTop: "1px solid #333", paddingTop: 8, marginTop: 4 }}>
                  <span>TOTAL</span><span>${total.toLocaleString("es-AR")}</span>
                </div>
              </div>

              {/* Acciones */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 16 }}>
                <button onClick={handleSendToWhatsApp} style={btnPrimaryStyle}>📱 Confirmar Orden por WhatsApp</button>
                <button onClick={() => { clearCart(); closeCartModal(); }} style={btnSecondaryStyle}>Vaciar Carrito</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Estilos inline para no tocar el CSS module ── */
const overlayStyle = {
  position: "fixed", inset: 0,
  background: "rgba(0,0,0,0.65)",
  backdropFilter: "blur(4px)",
  zIndex: 1000,
  display: "flex", alignItems: "center", justifyContent: "center",
  padding: "1rem",
};

const modalStyle = {
  background: "#1a1a1a",
  color: "#fff",
  borderRadius: 16,
  width: "100%",
  maxWidth: 520,
  maxHeight: "90vh",
  display: "flex",
  flexDirection: "column",
  boxShadow: "0 24px 80px rgba(0,0,0,0.6)",
  overflow: "hidden",
};

const headerStyle = {
  display: "flex", justifyContent: "space-between", alignItems: "center",
  padding: "1rem 1.25rem",
  borderBottom: "1px solid #2a2a2a",
  flexShrink: 0,
};

const closeBtnStyle = {
  background: "none", border: "none", color: "#aaa",
  fontSize: "1.1rem", cursor: "pointer", lineHeight: 1,
};

const bodyStyle = {
  overflowY: "auto",
  padding: "1rem 1.25rem",
  flex: 1,
};

const sectionStyle = { marginBottom: "1.25rem" };

const sectionTitleStyle = {
  fontSize: "0.85rem", textTransform: "uppercase",
  letterSpacing: "0.08em", color: "#888", margin: "0 0 0.6rem",
};

const itemRowStyle = {
  display: "flex", alignItems: "center", gap: 10,
  padding: "0.5rem 0", borderBottom: "1px solid #2a2a2a",
};

const itemControlsStyle = {
  display: "flex", alignItems: "center", gap: 6,
};

const qtyBtnStyle = {
  width: 26, height: 26, borderRadius: 6,
  border: "1px solid #444", background: "#2a2a2a",
  color: "#fff", cursor: "pointer", fontSize: "1rem", lineHeight: 1,
};

const removeBtnStyle = {
  background: "none", border: "none", cursor: "pointer", fontSize: "1rem",
};

const inputStyle = {
  display: "block", width: "100%", boxSizing: "border-box",
  background: "#111", border: "1px solid #333", borderRadius: 8,
  color: "#fff", padding: "0.55rem 0.75rem",
  fontSize: "0.9rem", marginBottom: 8, outline: "none",
};

const radioLabelStyle = {
  display: "flex", alignItems: "flex-start",
  gap: 4, marginBottom: 8, cursor: "pointer", fontSize: "0.9rem",
};

const summaryStyle = {
  background: "#111", borderRadius: 10,
  padding: "0.75rem 1rem", marginTop: 8,
};

const summaryRowStyle = {
  display: "flex", justifyContent: "space-between",
  padding: "4px 0", fontSize: "0.9rem",
};

const btnPrimaryStyle = {
  width: "100%", padding: "0.8rem",
  background: "linear-gradient(135deg, #e91e63, #9c27b0)",
  color: "#fff", border: "none", borderRadius: 10,
  fontSize: "0.95rem", fontWeight: 700, cursor: "pointer",
};

const btnSecondaryStyle = {
  width: "100%", padding: "0.65rem",
  background: "transparent", color: "#888",
  border: "1px solid #333", borderRadius: 10,
  fontSize: "0.85rem", cursor: "pointer",
};