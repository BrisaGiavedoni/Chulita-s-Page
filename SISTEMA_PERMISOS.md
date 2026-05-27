# Sistema de Permisos - Guía de Uso

## 🔐 Datos de Acceso

**Contraseña de Administrador:** `chulitas2026`

> **Importante:** Cambia esta contraseña después de la primera vez que accedas. Puedes hacerlo editando `src/context/AuthContext.jsx` en la variable `ADMIN_PASSWORD`.

---

## 🚀 Cómo Usar

### Para la Clienta (Admin)

1. **Acceder al Panel de Admin:**
   - Haz clic en el icono de candado 🔒 en la barra de navegación (parte superior derecha)
   - Ingresa la contraseña: `chulitas2026`
   - Se abrirá el **Panel de Administración**

2. **Agregar Productos con Foto:**
   - Rellena los datos: nombre, precio mayorista, precio minorista, descripción
   - Selecciona la categoría (Ropa Femenina, Stella - Manualidades, Daniel - Portamacetas)
   - Haz clic en **"📸 Seleccionar Imagen"** para cargar una foto
   - Verás una vista previa de la imagen
   - Haz clic en **"Agregar Producto"**
   - ¡Listo! El producto aparecerá en la lista

3. **Editar Productos Existentes:**
   - Los productos aparecen como tarjetas con la imagen
   - Puedes modificar directamente el nombre, descripción, precios y categoría
   - Los cambios se guardan automáticamente en la lista

4. **Eliminar Productos:**
   - Haz clic en **"Eliminar"** en cada tarjeta de producto
   - Se te pedirá confirmación antes de eliminar
   - El producto se quitará de la lista

5. **Guardar Cambios:**
   - Haz clic en **"Guardar Cambios"** para confirmar todos los cambios
   - Verás un mensaje verde confirmando que se guardó

6. **Cerrar sesión:**
   - Haz clic en **"Cerrar Sesión"** en la parte inferior del panel

### Para los Usuarios (Clientes)

- ✅ Pueden ver todos los productos
- ✅ Pueden agregar productos al carrito
- ✅ Pueden finalizar compras
- ❌ No pueden editar ni agregar productos
- ❌ No pueden acceder al panel de administración

---

## 📱 Funcionalidades Técnicas

### Contexto de Autenticación (`AuthContext.jsx`)

- Gestiona el login/logout del administrador
- Guarda la sesión en `localStorage` para persistencia
- Proporciona funciones: `login()`, `logout()`, `isAdmin()`

### Componentes Principales

1. **AdminLogin.jsx** - Modal de login
2. **AdminPanel.jsx** - Panel de gestión de productos con carga de imágenes
3. **Catalog.jsx** - Muestra productos (lectura desde localStorage)
4. **Navbar.jsx** - Botón de acceso admin

### Almacenamiento de Imágenes

- Las imágenes se convierten a base64 automáticamente
- Se guardan junto con los productos en `localStorage`
- Las imágenes se pueden cargar desde archivos JPG, PNG, GIF, WebP, etc.
- Las imágenes persisten aunque cierres el navegador

### Almacenamiento General

- Los productos se guardan en `localStorage` bajo la clave `"products"`
- Los datos de usuario se guardan bajo `"authUser"`
- Todo es cliente-side (no se requiere backend)

---

## 🔒 Cambiar la Contraseña

Para cambiar la contraseña de admin:

1. Abre el archivo `src/context/AuthContext.jsx`
2. Busca la línea: `const ADMIN_PASSWORD = "chulitas2026";`
3. Reemplaza con tu contraseña: `const ADMIN_PASSWORD = "tu-nueva-contraseña";`
4. Guarda el archivo y recarga la página

---

## ⚠️ Consideraciones Importantes

- Los datos se guardan localmente en el navegador
- Si se limpia el localStorage, se perderán todos los productos editados
- Se recomienda hacer backups periódicos de los productos
- El sistema es simple, sin base de datos. Para un proyecto más grande, considera agregar un backend

---

## 🎨 Colores del Sistema

- **Botón Admin:** 🟠 Naranja (`#f59e0b`) - Con acceso
- **Botón Admin:** 🔒 Candado - Sin acceso
- **Botón Carrito:** 💜 Púrpura (`#c026d3`)

---

## 📝 Próximas Mejoras Recomendadas

- [x] ✅ Agregar imágenes a productos desde el panel
- [x] ✅ Eliminar productos fácilmente
- [ ] Crear categorías dinámicas
- [ ] Exportar/importar datos de productos
- [ ] Conectar con una base de datos real
- [ ] Agregar edición de otros contenidos (Hero, Worlds, etc.)
- [ ] Comprimir automáticamente las imágenes grandes
- [ ] Hacer backup de los datos
