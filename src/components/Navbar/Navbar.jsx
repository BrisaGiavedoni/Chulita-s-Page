import { useState } from "react";
import { useCart } from "../../context/CartContext";
import logo from "../../assets/logo-chulitas.jpg";
import styles from "./Navbar.module.css";

const NAV_LINKS = [
  { label: "Inicio", href: "#inicio" },
  { label: "Productos", href: "#productos" },
  { label: "Catálogo", href: "#catalogo" },
  { label: "Contacto", href: "#contacto" },
];

export default function Navbar({ onCartClick }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        {/* Logo */}
        <a href="#" className={styles.logoLink}>
          <img src={logo} alt="Chulita's Lovers" className={styles.logoImg} />
          <span className={styles.logoText}>ChulisLovers</span>
        </a>

        {/* Links desktop */}
        <ul className={styles.links}>
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <a href={link.href} className={styles.link}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Carrito */}
        <button
          className={styles.cartBtn}
          aria-label="Ver carrito"
          onClick={onCartClick}
        >
          <CartIcon />
          {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
        </button>

        {/* Hamburger mobile */}
        <button
          className={styles.hamburger}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Abrir menú"
        >
          <span className={styles.bar} />
          <span className={styles.bar} />
          <span className={styles.bar} />
        </button>
      </div>

      {/* Menú mobile */}
      {menuOpen && (
        <ul className={styles.mobileMenu}>
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className={styles.mobileLink}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}

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
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  );
}
