import { useState, useEffect } from "react";
import { useCart } from "../../context/CartContext";
import styles from "./Catalog.module.css";
import bolosImg from "../../assets/productos/bolsos.jpg";
import musculosaImg from "../../assets/productos/musculosa.jpg";
import poleraDalmataImg from "../../assets/productos/polera-dalmata.jpg";
import remeraLycraImg from "../../assets/productos/remeras-lycra.jpg";
import pantalonEngomadoImg from "../../assets/productos/pantalon-engomado.jpg";

const FILTERS = [
  { id: null, label: "Todos" },
  { id: "moda", label: "Ropa Femenina" },
  { id: "stella", label: "Stella - Manualidades" },
  { id: "daniel", label: "Daniel - Portamacetas en hierro" },
];

const DEFAULT_PRODUCTS = [
  {
    id: 1,
    name: "Musculosa",
    priceMinor: 15700,
    priceMayor: 10999,
    description: "Negra, blanca o gris",
    image: musculosaImg,
    imageIsUrl: true,
    world: "moda",
  },
  {
    id: 2,
    name: "Polera dálmata",
    priceMinor: 15500,
    priceMayor: 12000,
    description: "Blanca o cremita",
    image: poleraDalmataImg,
    imageIsUrl: true,
    world: "moda",
  },
  {
    id: 3,
    name: "Remera lycra",
    priceMinor: 16000,
    priceMayor: 11999,
    description: "Gris, negra o cremita",
    image: remeraLycraImg,
    imageIsUrl: true,
    world: "moda",
  },
  {
    id: 4,
    name: "Pantalón engomado",
    priceMinor: 19550,
    priceMayor: 18000,
    description: "Marrón o amarillo",
    image: pantalonEngomadoImg,
    imageIsUrl: true,
    world: "moda",
  },
  {
    id: 5,
    name: "Bolsos",
    priceMinor: 12000,
    priceMayor: 20000,
    description: "Hechos a mano con amor",
    image: bolosImg,
    imageIsUrl: true,
    world: "stella",
    minorLabel: "1 unidad",
    mayorLabel: "2 unidades pack",
  },
];

export default function Catalog({ selectedWorld, onClearWorld }) {
  // activeFilter syncs with selectedWorld prop (from Worlds card click)
  // but can also be changed locally via the filter buttons
  const [activeFilter, setActiveFilter] = useState(selectedWorld ?? null);
  const [products, setProducts] = useState(DEFAULT_PRODUCTS);
  const { addToCart } = useCart();

  // Cargar productos del localStorage si existen
  useEffect(() => {
    const savedProducts = localStorage.getItem("products");
    if (savedProducts) {
      try {
        setProducts(JSON.parse(savedProducts));
      } catch (e) {
        setProducts(DEFAULT_PRODUCTS);
      }
    }
  }, []);

  // When parent changes selectedWorld (via "Ver más"), sync it in
  useEffect(() => {
    setActiveFilter(selectedWorld ?? null);
  }, [selectedWorld]);

  const handleFilterClick = (filterId) => {
    setActiveFilter(filterId);
    // If user clicks "Todos" or a different filter, clear the parent selection too
    if (onClearWorld) onClearWorld();
  };

  const filtered = activeFilter
    ? products.filter((p) => p.world === activeFilter)
    : products;

  const handleAdd = (product, type) => {
    const price = type === "menor" ? product.priceMinor : product.priceMayor;
    addToCart({ ...product, price, type });
  };

  return (
    <section id="productos" className={styles.catalog}>
      {/* Header */}
      <div className={styles.header}>
        <h2 className={styles.title}>Catálogo</h2>
        <p className={styles.subtitle}>Descubrí todos nuestros productos</p>
      </div>

      {/* Filters */}
      <div className={styles.filters}>
        {FILTERS.map((f) => (
          <button
            key={String(f.id)}
            className={`${styles.filterBtn} ${activeFilter === f.id ? styles.filterActive : ""}`}
            onClick={() => handleFilterClick(f.id)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className={styles.empty}>
          <p>Próximamente más productos en esta categoría</p>
        </div>
      ) : (
        <div className={styles.grid}>
          {filtered.map((product) => (
            <div key={product.id} className={styles.card}>
              <div className={styles.imageWrap}>
                {product.image &&
                typeof product.image === "string" &&
                (product.image.startsWith("http") ||
                  product.image.startsWith("data:")) ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className={styles.img}
                  />
                ) : typeof product.image === "string" ? (
                  <span className={styles.emoji}>{product.image}</span>
                ) : null}
                <div className={styles.overlay}>
                  <h3 className={styles.cardName}>{product.name}</h3>
                  <p className={styles.cardDesc}>{product.description}</p>
                </div>
              </div>

              <div className={styles.prices}>
                <div className={styles.priceRow}>
                  <span className={styles.priceLabel}>
                    {product.minorLabel || "Por menor"}
                  </span>
                  <span className={styles.priceValue}>
                    ${product.priceMinor.toLocaleString("es-AR")}
                  </span>
                </div>
                <div className={styles.priceRow}>
                  <span className={styles.priceLabel}>
                    {product.mayorLabel || "Por mayor"}
                  </span>
                  <span className={`${styles.priceValue} ${styles.priceGreen}`}>
                    ${product.priceMayor.toLocaleString("es-AR")}
                  </span>
                </div>
              </div>

              <div className={styles.footer}>
                <button
                  className={styles.btnMinor}
                  onClick={() => handleAdd(product, "menor")}
                >
                  {product.minorLabel || "Por menor"}
                </button>
                <button
                  className={styles.btnMajor}
                  onClick={() => handleAdd(product, "mayor")}
                >
                  {product.mayorLabel || "Por mayor"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
