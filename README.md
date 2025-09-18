BarrioPay - Plataforma de Pagos con Open Payments

BarrioPay es una plataforma de pagos descentralizada construida sobre el protocolo Open Payments, diseñada para facilitar transacciones seguras entre comercios y clientes.

🚀 Características

    ✅ Registro de comercios con wallets Open Payments

    ✅ Catálogo de comercios registrados

    ✅ Procesamiento de pagos con flujo ILP

    ✅ Interfaz intuitiva y responsive

    ✅ Transacciones seguras con encriptación

    ✅ Gestión de permisos y concesiones (grants)

🛠️ Tecnologías Utilizadas
Backend

    Node.js + Express.js

    Prisma ORM con PostgreSQL

    Open Payments SDK (@interledger/open-payments)

    CORS para manejo de dominios

Frontend

    React 18 con Vite

    FontAwesome para iconografía

    React Toastify para notificaciones

    CSS3 con diseño responsive

📋 Requisitos Previos

    Node.js v18 o superior

    npm o yarn

    PostgreSQL 15+

    VS Code (recomendado)

🚀 Instalación y Configuración
1. Clonar el repositorio
bash

git clone <url-del-repositorio>
cd barriopay

2. Configurar Backend
bash

cd backend

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env

Editar el archivo .env con tus configuraciones:
env

DATABASE_URL="postgresql://<usuario>:<contraseña>@localhost:<puerto>/<nombrebd>?schema=public"
KEY_ID=<key-id clienteopenpayments>

3. Configurar Base de Datos
bash

# Ejecutar migraciones
npx prisma migrate dev

# Generar cliente Prisma
npx prisma generate

4. Configurar Frontend
bash

cd frontend

# Instalar dependencias
npm install


5. Ejecutar la aplicación
bash

# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend  
cd frontend
npm run dev

La aplicación estará disponible en:

    Frontend: http://localhost:5173

    Backend: http://localhost:3000

📁 Estructura del Proyecto
text

barriopay/
├── backend/
│   ├── config/
│   │   ├── prismaClient.js
│   │   └── openPaymentsClient.js
│   ├── controllers/
│   │   │   ├── MerchantController.js
│   │   │   ├── PaymentController.js
│   │   |   └── openPaymentsClient.js
│   ├── middleware/
│   │   │   ├── merchant.middleware.js
│   │   │   ├── transaction.middleware.js
│   │   │   ├── validateErrors.middleware.js
│   │   |   └── wallet.middleware.js
│   ├── routes/
│   │   └── router.js
│   ├── prisma/
│   │   └── schema.prisma
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── MerchantCard.jsx
│   │   │   ├── MerchantDetail.jsx
│   │   │   ├── FormPago.jsx
│   │   │   └── Otros
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
└── README.md

🔄 Flujo de Pagos

    Selección de Comercio: Usuario elige un comercio del listado

    Inicio de Pago: Click en "Iniciar Pago" abre el modal de formulario

    Datos de Pago: Usuario ingresa wallet y monto a enviar

    Procesamiento:

        Creación de concesión (grant) para pago entrante

        Creación de pago entrante (incoming payment)

        Generación de cotización (quote)

        Solicitud de concesión para pago saliente

    Redirección: Usuario es redirigido a su wallet para autorizar el pago

    Confirmación: Finalización de la transacción y actualización de estado


🧪 API Endpoints
Backend Routes

    GET /api/getmerchant - Listar todos los comercios

    POST /api/incoming-payment - Iniciar flujo de pago

    POST /api/complete-payment - Completar transacción

    POST /api/register-merchant - Registrar nuevo comercio

🎨 Personalización
Modificar estilos

Los estilos principales se encuentran en:

    frontend/src/App.css - Estilos globales

    Estilos individuales por componente

Añadir nuevos campos a comercios

    Editar backend/prisma/schema.prisma

    Actualizar interfaz en el frontend

    Modificar formularios correspondientes

🔧 Troubleshooting
Error de migraciones de Prisma
bash

# Si hay conflictos con migraciones
npx prisma migrate reset
npx prisma migrate dev

Error de CORS

Verificar que las URLs estén correctamente configuradas en el backend.
Error de conexión a base de datos

Verificar la cadena de conexión en .env y que PostgreSQL esté ejecutándose.
📝 Próximos Pasos

    Añadir sistema de notificaciones

    Agregar chat entre clientes y comerciantes

    Funcionalidad tipo marketplace

    Sistema de login

🤝 Contribución

    Fork el proyecto

    Crea una rama para tu feature (git checkout -b feature/AmazingFeature)

    Commit tus cambios (git commit -m 'Add some AmazingFeature')

    Push a la rama (git push origin feature/AmazingFeature)

    Abre un Pull Request

📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo LICENSE para más detalles.
🏆 CASHCODERS

Desarrollado con ❤️ durante el Hackatón Open Payments 2024 por:

    [Eduardo Salinas Pavón, Emmanuel Bobadilla Díaz, Juan Antonio NUñez Campos, Rodrigo Miranda Díaz]