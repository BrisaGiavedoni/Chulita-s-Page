import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import styles from "./AdminLogin.module.css";
import { IoClose } from "react-icons/io5";

export default function AdminLogin({ onClose }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (login(password)) {
      setPassword("");
      onClose();
    } else {
      setError("Contraseña incorrecta");
    }

    setLoading(false);
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>
          <IoClose size={24} />
        </button>

        <h2 className={styles.title}>Acceso de Administrador</h2>

        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
            disabled={loading}
            autoFocus
          />

          {error && <p className={styles.error}>{error}</p>}

          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? "Verificando..." : "Ingresar"}
          </button>
        </form>
      </div>
    </div>
  );
}
