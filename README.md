# Ecommerce Full Stack --- Docker Multi-stage

Proyecto de ecommerce desarrollado con **Next.js** para el frontend y
**Laravel** para la API, con **MySQL** como base de datos y **Nginx**
como servidor web para publicar la API.

El objetivo es levantar los servicios con un solo comando usando Docker
Compose:

``` bash
docker compose up --build
```

## Tecnologías

-   **Frontend:** Next.js, React y TypeScript.
-   **Backend:** Laravel y PHP.
-   **Base de datos:** MySQL 8.
-   **Servidor web de la API:** Nginx.
-   **Contenedores:** Docker y Docker Compose.

## Arquitectura

Docker Compose administra cuatro servicios:

  Servicio     Función                     Acceso desde el equipo
  ------------ --------------------------- ------------------------------
  `frontend`   Aplicación Next.js          http://localhost:3000
  `api-web`    Nginx que publica Laravel   http://localhost:8000
  `backend`    Aplicación Laravel/PHP      Solo dentro de la red Docker
  `mysql`      Base de datos MySQL         Solo dentro de la red Docker

Los servicios se comunican mediante la red interna `ecommerce-internal`.
Laravel se conecta a MySQL usando `DB_HOST=mysql`; el frontend realiza
las peticiones a la API mediante `BASE_URL=http://api-web`.

La base de datos utiliza el volumen `mysql_data` para conservar los
datos aunque se detengan o se vuelvan a crear los contenedores.

## Requisitos previos

Instala:

-   Docker Desktop.
-   Git, si vas a clonar el repositorio.

En Windows, asegúrate de que Docker Desktop esté iniciado y que Docker
Compose esté disponible.

## Estructura del proyecto

La estructura principal esperada es:

``` text
Bootcamp-FSJ35-Grupo7/
├── backend/
│   ├── Dockerfile
│   └── ...
├── frontend/
│   ├── Dockerfile
│   ├── .dockerignore
│   ├── next.config.ts
│   └── ...
├── mysql/
│   └── init.sql
├── nginx/
│   └── default.conf
├── .env.example
├── .gitignore
├── docker-compose.yml
└── README.md
```

Los archivos y carpetas internos de `backend/` y `frontend/` pueden
variar según la implementación.

## Configuración inicial

1.  Clona el repositorio o descarga el proyecto.
2.  Abre una terminal en la carpeta raíz, donde se encuentra
    `docker-compose.yml`.
3.  Crea el archivo local `.env` a partir del ejemplo.

En Windows CMD:

``` cmd
copy .env.example .env
```

En macOS/Linux:

``` bash
cp .env.example .env
```

4.  Abre `.env` y configura las variables necesarias. Como mínimo, el
    `docker-compose.yml` utiliza:

``` dotenv
MYSQL_ROOT_PASSWORD=define_una_clave_local
MYSQL_DATABASE=ecommerce_api
MYSQL_USER=ecommerce_user
MYSQL_PASSWORD=define_otra_clave_local
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_REEMPLAZAR_CON_TU_CLAVE_PUBLICA
```

El backend también necesita las variables de Laravel que utilice la
aplicación. Revisa `.env.example` y el `Dockerfile` del backend para
confirmar que estén incluidas.

**No copies secretos reales al README ni subas `.env` a GitHub.**
`.env.example` debe contener únicamente valores de ejemplo o marcadores
de posición. No uses las claves privadas de Stripe en variables
`NEXT_PUBLIC_*`.

## Ejecutar el proyecto

Desde la raíz del proyecto:

``` bash
docker compose up --build
```

Este comando construye las imágenes y levanta los servicios. La primera
ejecución puede tardar mientras Docker descarga las imágenes e instala
dependencias.

Para ejecutarlo en segundo plano:

``` bash
docker compose up --build -d
```

## Verificar los servicios

Consultar el estado de los contenedores:

``` bash
docker compose ps
```

Ver los registros de todos los servicios:

``` bash
docker compose logs -f
```

Ver los registros de un servicio específico:

``` bash
docker compose logs -f frontend
docker compose logs -f backend
docker compose logs -f api-web
docker compose logs -f mysql
```

### URLs locales

-   Frontend: http://localhost:3000
-   Salud de Laravel: http://localhost:8000/up
-   Endpoint de productos: http://localhost:8000/api/products

La ruta `/api/products` debe responder con JSON si la API y su base de
datos están configuradas correctamente.

## Detener el proyecto

Para detener y eliminar los contenedores y la red creada por Compose:

``` bash
docker compose down
```

Los datos de MySQL se conservan en el volumen `mysql_data`.

Para eliminar también el volumen y borrar los datos persistidos de
MySQL:

``` bash
docker compose down -v
```

**Advertencia:** `docker compose down -v` elimina los datos guardados en
el volumen de la base de datos. Úsalo solo si realmente quieres
reiniciar la base desde cero.

## Optimización de imágenes Docker

El frontend usa un Dockerfile multi-stage con etapas separadas para:

1.  Instalar dependencias con `npm ci`.
2.  Compilar la aplicación de Next.js.
3.  Crear una imagen final de producción con los archivos necesarios de
    salida `standalone`.

El `.dockerignore` del frontend excluye archivos que no son necesarios
para construir la imagen, como `node_modules`, `.next`, archivos de
entorno locales y metadatos de Git.

El backend cuenta con su propio Dockerfile. Revisa ese archivo para
confirmar las etapas de construcción, las dependencias incluidas en la
imagen final y la ejecución en modo producción.

## Variables y secretos

-   Mantén `.env` fuera del control de versiones.
-   Conserva `.env.example` en el repositorio, sin contraseñas ni claves
    reales.
-   Usa claves de Stripe de prueba para desarrollo.
-   No expongas `STRIPE_SECRET` ni `STRIPE_WEBHOOK_SECRET` al frontend.
-   Si alguna clave secreta real se compartió por error, revócala o
    rótala desde el proveedor y actualiza el `.env` local.

## Solución de problemas

### Docker indica que falta `.env`

Comprueba que ejecutas `docker compose` desde la raíz y que existe el
archivo `.env`. Puedes crearlo copiando `.env.example`.

### La página abre, pero no aparecen los productos

Revisa que la API responda:

``` bash
curl -i http://localhost:8000/api/products
```

Luego consulta los logs:

``` bash
docker compose logs -f frontend api-web backend mysql
```

Dentro de la red de Compose, el frontend debe usar el nombre del
servicio de la API (`api-web`), no `localhost`. `localhost` dentro de un
contenedor apunta al propio contenedor.

### MySQL no inicia

Revisa las variables `MYSQL_*` del archivo `.env` y los logs:

``` bash
docker compose logs -f mysql
```

Si cambias las credenciales después de que MySQL inicializó el volumen,
los valores nuevos no necesariamente reconfiguran el usuario ya creado.
Para una base de datos local que puedas borrar, puedes reiniciar el
volumen con `docker compose down -v` y volver a ejecutar
`docker compose up --build`.

### Cambios de código no aparecen

Reconstruye y levanta los servicios:

``` bash
docker compose up --build
```

## Comprobaciones realizadas

Durante la validación local del proyecto se comprobó que:

-   La imagen Docker del frontend se construye correctamente.
-   Los cuatro servicios (`frontend`, `api-web`, `backend` y `mysql`)
    aparecen levantados con `docker compose ps`.
-   `http://localhost:8000/up` respondió HTTP `200 OK`.
-   `http://localhost:8000/api/products` respondió HTTP `200 OK` con una
    lista de productos.
-   El frontend mostró los productos obtenidos de la API.

Estas comprobaciones corresponden al entorno local utilizado para la
prueba. Si cambias la configuración, las variables o los archivos de
Docker, vuelve a ejecutar las pruebas antes de entregar.

## Autoría

Proyecto realizado como parte de la actividad de optimización de
imágenes Docker mediante multi-stage builds, uso eficiente de capas y
orquestación de servicios con Docker Compose.
