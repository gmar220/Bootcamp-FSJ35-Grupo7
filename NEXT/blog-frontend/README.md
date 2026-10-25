# 📦 Proyecto E-Commerce - Módulo Frontend (Next.js) & Backend (Laravel 12)

Este proyecto comprende la entrega final del módulo de frontend, en el cual se ha migrado, adaptado e integrado la lógica estructural CRUD y de autenticación explicada en las sesiones asíncronas de la rama `feat/blog-app-frontend`, pero aplicada en su totalidad sobre nuestro modelo de negocio de **E-Commerce**.

---

## 🚀 Resumen de los Cambios Implementados

A diferencia del proyecto base del Blog (el cual utilizaba una API manual/PHP para publicaciones), este ecosistema ha sido reestructurado para administrar un **Catálogo de Productos comercial** completamente dinámico, utilizando componentes robustos y desacoplados en Node.js/React.

### 1. Centralización del Servicio y Consumo de la API (`/lib/api.ts`)
* Se creó un módulo unificado (`apiEcommerce`) que centraliza todas las peticiones HTTP (`fetch`) hacia nuestro backend local en el puerto `:8000`.
* **Inyección de Seguridad:** Se configuró un lector dinámico de cabeceras (`getHeaders`) que inyecta automáticamente el token Bearer provisto por **Laravel Sanctum** en cada petición protegida.
* Se estructuraron los métodos del CRUD completo de productos: `getProducts`, `createProduct`, `updateProduct`, y `deleteProduct`, además de la ruta para el procesamiento de checkout.

### 2. Control de Acceso y Protección de Interfaz (`/components/ProductCard.tsx`)
* **Requisito Obligatorio:** Se implementó una directiva condicional basada en el estado `isAuthenticated` del contexto global de autenticación.
* **Resultado:** Los botones administrativos de **Editar** y **Eliminar** se ocultan/deshabilitan automáticamente si el visitante de la tienda es un usuario público no autenticado. El botón **Añadir al Carrito** permanece público para garantizar el flujo comercial.

### 3. Formulario Autónomo y Gestión de Estados (`/components/ProductForm.tsx`)
* Se adaptó el antiguo formulario de posts para procesar las propiedades comerciales del catálogo: *Nombre del producto*, *Descripción/Especificaciones*, y *Precio (\$)*.
* Se aisló el tipado de la interfaz `Product` directamente dentro de sus respectivos componentes, resolviendo problemas de dependencias circulares y optimizando el tiempo de compilación del servidor de TypeScript en Next.js.

### 4. Mapeo Dinámico en el Catálogo Principal (`/app/page.tsx`)
* Se integró el bucle e iteración `.map()` para renderizar de forma fluida la colección de productos recuperados en tiempo real desde la base de datos MySQL (alimentada previamente por nuestros seeders de Laravel).
* Mantiene un control estricto sobre el ciclo de vida del componente mediante una lógica de montaje/desmontaje controlado (`isMounted`), mitigando fugas de memoria (*memory leaks*) en el cliente.

### 5. Sincronización del Estado Global de Sesión (`/context/AuthContext.tsx`)
* Se unificaron las llaves de persistencia en el navegador utilizando `'token_ecommerce'` y `'user_ecommerce'` para evitar conflictos con otras aplicaciones locales.
* Se blindaron las llamadas de lectura y escritura envolviéndolas en la condicional `typeof window !== 'undefined'`, garantizando una hidratación limpia y libre de errores críticos durante el renderizado del lado del servidor (SSR) de Node.

---

## 🛠️ Instrucciones para la Ejecución Local (Localhost)

De acuerdo con los lineamientos de la entrega, **todo el flujo se ejecuta y prueba localmente** (carrito, simulación de pasarela de Stripe, etc.), prescindiendo de despliegues externos.

### Backend (Laravel 12)
1. Asegurarse de tener la base de datos MySQL activa y con las migraciones y seeders ejecutados.
2. Iniciar el servidor local:
   ```bash
   php artisan serve
   ```

### Frontend (Next.js)
1. Instalar las dependencias de Node basadas en el archivo `package.json`:
   ```bash
   npm install
   ```
2. Levantar el servidor de desarrollo en el puerto local por defecto (normalmente `:3000`):
   ```bash
   npm run dev
   ```
