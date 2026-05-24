import styles from "./Worlds.module.css";

const ShirtIcon = ({ color }) => (
  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.57a1 1 0 00.99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 002-2V10h2.15a1 1 0 00.99-.84l.58-3.57a2 2 0 00-1.34-2.23z"/>
  </svg>
);

const ScissorsIcon = ({ color }) => (
  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="6" cy="6" r="3"/>
    <circle cx="6" cy="18" r="3"/>
    <line x1="20" y1="4" x2="8.12" y2="15.88"/>
    <line x1="14.47" y1="14.48" x2="20" y2="20"/>
    <line x1="8.12" y1="8.12" x2="12" y2="12"/>
  </svg>
);

const HammerIcon = ({ color }) => (
  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 12l-8.5 8.5a2.12 2.12 0 01-3-3L12 9"/>
    <path d="M17.64 15L22 10.64"/>
    <path d="M20.91 11.7l-1.25-1.25c-.6-.6-.93-1.4-.93-2.25v-.86L16.01 4.6a5.56 5.56 0 00-3.94-1.64H9l.92.82A6.18 6.18 0 0112 8.4v1.56l2 2h2.47l2.26 1.91"/>
  </svg>
);

const WORLDS = [
  {
    id: "moda",
    title: "Ropa Femenina",
    description: "Moda para jóvenes y adultas. Estilo, comodidad y tendencia.",
    Icon: ShirtIcon,
    color: "#cc44ff",
  },
  {
    id: "stella",
    title:"Stella - Manualidades",
    description: "Creaciones artesanales hechas con amor y dedicación.",
    Icon: ScissorsIcon,
    color: "#00e5c0",
  },
  {
    id: "daniel",
    title: "Daniel - Portamacetas en hierro",
    description: "Piezas únicas trabajadas a mano con maestría en hierro.",
    Icon: HammerIcon,
    color: "#ff4dab",
  },
];

export default function Worlds({ onSelectWorld }) {
  const handleViewMore = (worldId) => {
    if (onSelectWorld) onSelectWorld(worldId);
  };

  return (
    <section className={styles.worldsSection}>
      <div className={styles.header}>
        <h2>Nuestros mundos</h2>
        <p>Tres emprendimientos unidos por la pasión y el amor familiar</p>
      </div>

      <div className={styles.worldsGrid}>
        {WORLDS.map((world) => (
          <div
            key={world.id}
            className={styles.worldCard}
            style={{ "--card-color": world.color, borderColor: world.color }}
          >
            <div className={styles.worldIcon}>
              <world.Icon color={world.color} />
            </div>
            <h3>{world.title}</h3>
            <p>{world.description}</p>
            <button
              onClick={() => handleViewMore(world.id)}
              className={styles.viewMoreBtn}
              style={{ backgroundColor: world.color }}
            >
              Ver más
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}