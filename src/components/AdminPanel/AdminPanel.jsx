import { useState, useEffect, useRef } from "react";
import { useAuth } from "../../context/AuthContext";
import styles from "./AdminPanel.module.css";
import { IoClose, IoSave, IoAdd, IoTrash } from "react-icons/io5";

export default function AdminPanel({ onClose }) {
  const { logout } = useAuth();
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem("products");
    return saved ? JSON.parse(saved) : [];
  });
  const [newProduct, setNewProduct] = useState({
    name: "",
    priceMinor: "",
    priceMayor: "",
    description: "",
    world: "moda",
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const [saveMessage, setSaveMessage] = useState("");

  const handleSaveProducts = () => {
    localStorage.setItem("products", JSON.stringify(products));
    setSaveMessage("✓ Cambios guardados");
    setTimeout(() => setSaveMessage(""), 2000);
  };

  const handleImageSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageData = event.target?.result;
        setNewProduct({ ...newProduct, image: imageData });
        setImagePreview(imageData);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.priceMinor && newProduct.priceMayor) {
      const product = {
        id: Date.now(),
        name: newProduct.name,
        priceMinor: parseFloat(newProduct.priceMinor),
        priceMayor: parseFloat(newProduct.priceMayor),
        description: newProduct.description,
        world: newProduct.world,
        image: newProduct.image,
        imageIsUrl: false,
      };
      setProducts([...products, product]);
      setNewProduct({
        name: "",
        priceMinor: "",
        priceMayor: "",
        description: "",
        world: "moda",
        image: null,
      });
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm("¿Estás segura que quieres eliminar este producto?")) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  const handleUpdateProduct = (id, field, value) => {
    setProducts(
      products.map((p) => (p.id === id ? { ...p, [field]: value } : p)),
    );
  };

  const handleLogout = () => {
    logout();
    onClose();
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.panel} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>Panel de Administración</h2>
          <button className={styles.closeBtn} onClick={onClose}>
            <IoClose size={24} />
          </button>
        </div>

        <div className={styles.content}>
          {/* Sección de Productos */}
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>📦 Gestionar Productos</h3>

            {/* Agregar nuevo producto */}
            <div className={styles.addProduct}>
              <h4>Agregar Producto Nuevo</h4>
              <div className={styles.formContainer}>
                <div className={styles.form}>
                  <input
                    type="text"
                    placeholder="Nombre del producto"
                    value={newProduct.name}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, name: e.target.value })
                    }
                    className={styles.input}
                  />
                  <input
                    type="number"
                    placeholder="Precio mayorista"
                    value={newProduct.priceMayor}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        priceMayor: e.target.value,
                      })
                    }
                    className={styles.input}
                  />
                  <input
                    type="number"
                    placeholder="Precio minorista"
                    value={newProduct.priceMinor}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        priceMinor: e.target.value,
                      })
                    }
                    className={styles.input}
                  />
                  <input
                    type="text"
                    placeholder="Descripción"
                    value={newProduct.description}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        description: e.target.value,
                      })
                    }
                    className={styles.input}
                  />
                  <select
                    value={newProduct.world}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, world: e.target.value })
                    }
                    className={styles.input}
                  >
                    <option value="moda">Ropa Femenina</option>
                    <option value="stella">Stella - Manualidades</option>
                    <option value="daniel">Daniel - Portamacetas</option>
                  </select>

                  {/* Input de archivo oculto */}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageSelect}
                    style={{ display: "none" }}
                  />

                  {/* Botón para seleccionar imagen */}
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className={styles.imageBtn}
                  >
                    📸 Seleccionar Imagen
                  </button>

                  <button onClick={handleAddProduct} className={styles.addBtn}>
                    <IoAdd size={18} /> Agregar Producto
                  </button>
                </div>

                {/* Vista previa de imagen */}
                {imagePreview && (
                  <div className={styles.imagePreview}>
                    <img src={imagePreview} alt="Vista previa" />
                    <button
                      type="button"
                      onClick={() => {
                        setImagePreview(null);
                        setNewProduct({ ...newProduct, image: null });
                        if (fileInputRef.current)
                          fileInputRef.current.value = "";
                      }}
                      className={styles.removeImageBtn}
                    >
                      Cambiar foto
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Lista de productos existentes */}
            <div className={styles.productsList}>
              <h4>Productos Existentes ({products.length})</h4>
              {products.length === 0 ? (
                <p className={styles.emptyMessage}>
                  No hay productos aún. ¡Agrega el primero!
                </p>
              ) : (
                <div className={styles.productsGrid}>
                  {products.map((product) => (
                    <div key={product.id} className={styles.productCard}>
                      {/* Imagen del producto */}
                      {product.image && (
                        <div className={styles.productImage}>
                          <img src={product.image} alt={product.name} />
                        </div>
                      )}

                      {/* Campos editables */}
                      <div className={styles.productCardFields}>
                        <input
                          type="text"
                          value={product.name}
                          onChange={(e) =>
                            handleUpdateProduct(
                              product.id,
                              "name",
                              e.target.value,
                            )
                          }
                          className={styles.inputSmall}
                          placeholder="Nombre"
                        />
                        <input
                          type="text"
                          value={product.description}
                          onChange={(e) =>
                            handleUpdateProduct(
                              product.id,
                              "description",
                              e.target.value,
                            )
                          }
                          className={styles.inputSmall}
                          placeholder="Descripción"
                        />
                        <div className={styles.priceRow}>
                          <input
                            type="number"
                            value={product.priceMayor}
                            onChange={(e) =>
                              handleUpdateProduct(
                                product.id,
                                "priceMayor",
                                parseFloat(e.target.value),
                              )
                            }
                            className={styles.inputSmall}
                            placeholder="Mayor"
                          />
                          <input
                            type="number"
                            value={product.priceMinor}
                            onChange={(e) =>
                              handleUpdateProduct(
                                product.id,
                                "priceMinor",
                                parseFloat(e.target.value),
                              )
                            }
                            className={styles.inputSmall}
                            placeholder="Menor"
                          />
                        </div>
                        <select
                          value={product.world}
                          onChange={(e) =>
                            handleUpdateProduct(
                              product.id,
                              "world",
                              e.target.value,
                            )
                          }
                          className={styles.inputSmall}
                        >
                          <option value="moda">Ropa Femenina</option>
                          <option value="stella">Stella - Manualidades</option>
                          <option value="daniel">Daniel - Portamacetas</option>
                        </select>
                      </div>

                      {/* Botón eliminar */}
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className={styles.deleteBtn}
                      >
                        <IoTrash size={16} /> Eliminar
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* Botón guardar */}
          <div className={styles.actions}>
            <button onClick={handleSaveProducts} className={styles.saveBtn}>
              <IoSave size={18} /> Guardar Cambios
            </button>
            {saveMessage && (
              <span className={styles.saveMessage}>{saveMessage}</span>
            )}
          </div>

          {/* Botón logout */}
          <div className={styles.footer}>
            <button onClick={handleLogout} className={styles.logoutBtn}>
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
