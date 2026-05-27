import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Verificar si hay sesión guardada
  useEffect(() => {
    const savedAuth = localStorage.getItem("authUser");
    if (savedAuth) {
      setUser(JSON.parse(savedAuth));
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = (password) => {
    // Contraseña configurada para admin (puedes cambiarla)
    const ADMIN_PASSWORD = "chulitas2026";

    if (password === ADMIN_PASSWORD) {
      const userData = { role: "admin", email: "admin@chulitas.com" };
      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem("authUser", JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("authUser");
  };

  const isAdmin = () => user?.role === "admin";

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, logout, isAdmin, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de AuthProvider");
  }
  return context;
}
