import { useState, useRef, useEffect } from "react";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import AdminLogin from "../AdminLogin/AdminLogin";
import AdminPanel from "../AdminPanel/AdminPanel";
import logo from "../../assets/logo-chulitas.jpg";
import styles from "./Navbar.module.css";
import { IoLockClosed } from "react-icons/io5";

const NAV_LINKS = [
  { label: "Inicio", href: "#inicio" },
  { label: "Mundos", href: "#worlds" },
  { label: "Productos", href: "#productos" },
  { label: "Contacto", href: "#footer" },
];

function CartIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
    </svg>
  );
}

function CartDropdown({ onClose }) {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    getCartTotal,
    clearCart,
    openCartModal,
  } = useCart();
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);

  const handleFinalizarCompra = () => {
    onClose(); // cierra el dropdown
    openCartModal(); // abre el modal del carrito
  };

  return (
    <div className={styles.cartDropdown} ref={ref}>
      <div className={styles.dropdownHeader}>
        <span className={styles.dropdownTitle}>Mi carrito</span>
        <button className={styles.dropdownClose} onClick={onClose}>
          ✕
        </button>
      </div>

      {cartItems.length === 0 ? (
        <div className={styles.dropdownEmpty}>
          <p>El carrito está vacío</p>
        </div>
      ) : (
        <>
          <div className={styles.dropdownItems}>
            {cartItems.map((item) => (
              <div key={item.id} className={styles.dropdownItem}>
                <div className={styles.dropdownItemInfo}>
                  <span className={styles.dropdownItemName}>{item.name}</span>
                  <span className={styles.dropdownItemPrice}>
                    ${item.price.toLocaleString("es-AR")} c/u
                  </span>
                </div>
                <div className={styles.dropdownItemControls}>
                  <button
                    className={styles.qtyBtn}
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    −
                  </button>
                  <span className={styles.qtyNum}>{item.quantity}</span>
                  <button
                    className={styles.qtyBtn}
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                  <button
                    className={styles.removeBtn}
                    onClick={() => removeFromCart(item.id)}
                    aria-label="Eliminar"
                  >
                    🗑️
                  </button>
                </div>
                <span className={styles.dropdownItemTotal}>
                  ${(item.price * item.quantity).toLocaleString("es-AR")}
                </span>
              </div>
            ))}
          </div>

          <div className={styles.dropdownFooter}>
            <div className={styles.dropdownTotal}>
              <span>Total</span>
              <span>${getCartTotal().toLocaleString("es-AR")}</span>
            </div>
            {/* Botón que abre el modal — no hace scroll, no resetea nada */}
            <button
              className={styles.dropdownCheckout}
              onClick={handleFinalizarCompra}
            >
              Finalizar compra →
            </button>
            <button className={styles.dropdownClear} onClick={clearCart}>
              Vaciar carrito
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const { getCartCount } = useCart();
  const { isAuthenticated, isAdmin } = useAuth();
  const cartCount = getCartCount();

  const handleNavClick = (href) => {
    setMenuOpen(false);
    const id = href.replace("#", "");

    if (id === "inicio") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <a
          href="#"
          className={styles.logoLink}
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <img src={logo} alt="Chulita's Lovers" className={styles.logoImg} />
          <span className={styles.logoText}>ChulisLovers</span>
        </a>

        <ul className={styles.links}>
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className={styles.link}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className={styles.cartWrap}>
          {isAuthenticated && isAdmin() && (
            <button
              className={styles.adminBtn}
              onClick={() => setShowAdminPanel(true)}
              title="Panel de administración"
            >
              ⚙️
            </button>
          )}

          {!isAuthenticated && (
            <button
              className={styles.adminBtn}
              onClick={() => setShowAdminLogin(true)}
              title="Acceso de administrador"
            >
              <IoLockClosed />
            </button>
          )}

          <button
            className={`${styles.cartBtn} ${cartOpen ? styles.cartBtnActive : ""}`}
            aria-label="Ver carrito"
            onClick={() => setCartOpen((v) => !v)}
          >
            <CartIcon />
            {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
          </button>
          {cartOpen && <CartDropdown onClose={() => setCartOpen(false)} />}
        </div>

        <button
          className={styles.hamburger}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Abrir menú"
        >
          <span
            className={`${styles.bar} ${menuOpen ? styles.barOpen1 : ""}`}
          />
          <span
            className={`${styles.bar} ${menuOpen ? styles.barOpen2 : ""}`}
          />
          <span
            className={`${styles.bar} ${menuOpen ? styles.barOpen3 : ""}`}
          />
        </button>
      </div>

      {menuOpen && (
        <ul className={styles.mobileMenu}>
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className={styles.mobileLink}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}

      {showAdminLogin && (
        <AdminLogin onClose={() => setShowAdminLogin(false)} />
      )}

      {showAdminPanel && (
        <AdminPanel onClose={() => setShowAdminPanel(false)} />
      )}
    </nav>
  );
}
