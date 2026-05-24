import styles from "./Footer.module.css";
import {
  FiPhone,
  FiMapPin,
  FiHeart,
  FiStar,
  FiHome,
  FiMessageCircle,
  FiCreditCard,
  FiDollarSign,
  FiSmartphone,
  FiSend,
} from "react-icons/fi";
import { GiMoneyStack } from "react-icons/gi";

export default function Footer() {
  return (
    <footer id="footer" className={styles.footer}>
      <div className={styles.container}>
        {/* Sección Marca */}
        <div className={styles.section}>
          <h3 className={styles.brandName}>ChulisLovers</h3>
          <p className={styles.description}>
            Moda, arte y amor hecho a mano desde Rosario
          </p>
        </div>

        {/* Sección Contacto */}
        <div className={styles.section}>
          <h4 className={styles.sectionTitle}>Contacto</h4>
          <div className={styles.contactItem}>
            <FiPhone className={styles.icon} />
            <a href="tel:+5493412510579" className={styles.link}>
              +54 9 341 251-0579
            </a>
          </div>
          <div className={styles.contactItem}>
            <FiMapPin className={styles.icon} />
            <div>
              <p className={styles.text}>Rosario, Santa Fe</p>
              <p className={styles.subtext}>
                Solo entregas en Rosario (Centro, Norte, Sur, Noreste)
              </p>
            </div>
          </div>
        </div>

        {/* Sección Información */}
        <div className={styles.section}>
          <h4 className={styles.sectionTitle}>Información</h4>
          <div className={styles.infoItem}>
            <FiHeart className={styles.icon} />
            <p className={styles.text}>Ropa femenina para jovenes y adultas</p>
          </div>
          <div className={styles.infoItem}>
            <FiStar className={styles.icon} />
            <p className={styles.text}>Manualidades artesanales únicas</p>
          </div>
          <div className={styles.infoItem}>
            <FiHome className={styles.icon} />
            <p className={styles.text}>Entrega a domicilio en Rosario</p>
          </div>
          <div className={styles.infoItem}>
            <FiMessageCircle className={styles.icon} />
            <p className={styles.text}>Pago coordinado por WhatsApp</p>
          </div>
        </div>

        {/* Sección Métodos de Pago */}
        <div className={styles.section}>
          <h4 className={styles.sectionTitle}>Métodos de Pago</h4>
          <div className={styles.paymentMethods}>
            <div className={styles.paymentItem}>
              <FiCreditCard className={styles.paymentIcon} />
              <p>Tarjeta Débito/Crédito</p>
            </div>
            <div className={styles.paymentItem}>
              <GiMoneyStack className={styles.paymentIcon} />
              <p>Transferencia Bancaria</p>
            </div>
            <div className={styles.paymentItem}>
              <FiDollarSign className={styles.paymentIcon} />
              <p>Efectivo</p>
            </div>
            <div className={styles.paymentItem}>
              <FiSmartphone className={styles.paymentIcon} />
              <p>Billetera Virtual</p>
            </div>
          </div>
        </div>
      </div>

      {/* Sección Consultas */}
      <div className={styles.consultaSection}>
        <div className={styles.consultaContainer}>
          <h3 className={styles.consultaTitle}>¿Tenés alguna consulta?</h3>
          <p className={styles.consultaSubtitle}>
            Escribinos y te respondemos al toque
          </p>
          <button
            className={styles.whatsappBtn}
            onClick={() => {
              const mensaje = encodeURIComponent(
                "Hola! Tengo una consulta sobre sus productos. ¿Podrían ayudarme?",
              );
              window.open(
                `https://wa.me/5493412510579?text=${mensaje}`,
                "_blank",
              );
            }}
          >
            <FiSend className={styles.btnIcon} />
            Chateanos ahora
          </button>
        </div>
      </div>

      {/* Copyright */}
      <div className={styles.copyright}>
        <p>© 2026 Bri Soluciones Digitales • Todos los derechos reservados</p>
      </div>
    </footer>
  );
}
