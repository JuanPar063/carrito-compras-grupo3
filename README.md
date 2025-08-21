# Carrito de Compras

Una aplicación web de carrito de compras básico desarrollada con tecnologías modernas de frontend y backend.

## Tabla de Contenidos

- [Descripción](#descripción)
- [Características](#características)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Uso](#uso)
- [Comandos Útiles](#comandos-útiles)
- [Colaboración](#colaboración)
- [Troubleshooting](#troubleshooting)
- [Licencia](#licencia)

## Descripción

Este proyecto es una aplicación de carrito de compras que permite a los usuarios navegar productos, añadirlos al carrito y gestionar sus compras de manera intuitiva. La aplicación está dividida en frontend y backend para una mejor organización y escalabilidad.

## Características

- Navegación de productos
- Funcionalidad de carrito de compras
- Persistencia de datos con base de datos
- Interfaz reactiva
- Diseño responsivo
- Gestión de estado segura

## Tecnologías Utilizadas

### Frontend
- React
- Node.js
- NPM

### Backend
- Node.js
- Express
- Prisma (ORM)
- PostgreSQL/Supabase

### Herramientas
- Git
- VS Code (recomendado)

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** >= 16 (https://nodejs.org/)
- **Git** instalado
- **Cuenta GitHub** configurada
- **Editor de código** (VS Code recomendado)

## Instalación

### 1. Clonar el Repositorio

```bash
git clone https://github.com/[TU-USUARIO]/carrito-compras-grupo3.git
cd carrito-compras-grupo3
```

### 2. Configurar Backend

```bash
cd backend
npm install
```

### 3. Configurar Base de Datos

```bash
npx prisma generate
npx prisma migrate dev
```

### 4. Configurar Frontend

```bash
cd ../frontend
npm install
```

## Configuración

### Variables de Entorno

Crea un archivo `.env` en la carpeta `backend/`:

```env
# Database (Proporcionará la URL de Supabase)
DATABASE_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT-ID].supabase.co:5432/postgres"

# App Config
PORT=3000
NODE_ENV=development
```

### Archivo .env.example

Para colaboradores, crea un archivo `backend/env.example`:

```env
# Database
DATABASE_URL="postgresql://user:password@host:port/database"

# App Config
PORT=3000
NODE_ENV=development
```

## Uso

### Ejecutar el Proyecto

Necesitarás **2 terminales**:

#### Terminal 1 - Backend:
```bash
cd backend
npm run start:dev
# Servidor corriendo en http://localhost:3000
```

#### Terminal 2 - Frontend:
```bash
cd frontend
npm start
# Aplicación corriendo en http://localhost:3001
```

### Verificar Funcionamiento

- **Backend**: http://localhost:3000/carrito
- **Frontend**: http://localhost:3001
- **Base de datos**: `npx prisma studio` (desde carpeta backend)

## Comandos Útiles

### Git Esenciales

```bash
# Ver estado del repo
git status

# Ver ramas
git branch -a

# Cambiar de rama
git checkout nombre-rama

# Actualizar desde remoto
git pull

# Ver cambios de otros
git log --oneline

# Resolver conflictos (si ocurren)
git merge develop
```

### Comandos del Proyecto

#### Backend
```bash
npm run start:dev    # Ejecutar en desarrollo
npm run build        # Construir para producción
npx prisma studio    # Abrir interfaz DB
npx prisma migrate dev # Aplicar cambios DB
```

#### Frontend
```bash
npm start           # Ejecutar en desarrollo
npm run build       # Construir para producción
npm test           # Ejecutar pruebas
```

## Colaboración

### Configuración del Equipo

#### Opción A: Proyecto Compartido (Recomendado)
1. Ve a tu proyecto en Supabase
2. Click en **Settings > Access Control**
3. Click en **Invite Member**
4. Ingresa emails de compañeros
5. Asigna rol **Developer** o **Admin**

#### Opción B: Solo URL de Conexión
- Comparte solo la `DATABASE_URL` por canal privado (Discord, WhatsApp)
- **NUNCA la subas al repositorio público**

### Flujo de Trabajo Recomendado

#### Cada compañero debe hacer SIEMPRE:

**1. Actualizar repositorio**
```bash
git checkout develop
git pull origin develop
```

**2. Crear rama para su feature**
```bash
git checkout -b feature/mi-funcionalidad
```

**3. Hacer cambios y commits**
```bash
git add .
git commit -m "feat: descripción de cambios"
```

**4. Subir rama**
```bash
git push origin feature/mi-funcionalidad
```

**5. Crear Pull Request en GitHub**

**6. Después de aprobación, hacer merge**

### Asignación de Responsabilidades

- **Compañero 1**: Backend + Patrón Builder
- **Compañero 2**: Frontend React + Integración
- **Compañero 3**: Patrón Adapter + Observer
- **Compañero 4**: Testing + Documentación

### Comunicación del Equipo

- **WhatsApp/Discord** para coordinación diaria
- **Reuniones semanales** para revisar progreso
- **Documentar decisiones técnicas** en GitHub Issues

## Troubleshooting

### Problema: "Cannot find module"

```bash
# Reinstalar dependencias
rm -rf node_modules package-lock.json
npm install
```

### Problema: Error de base de datos

```bash
# Verificar conexión y reiniciar Prisma
npx prisma generate
npx prisma db push
```

### Problemas Comunes

- **Puerto ocupado**: Cambiar puerto en `.env`
- **Módulos faltantes**: Ejecutar `npm install`
- **Base de datos**: Verificar URL en `.env`
- **Git conflicts**: Usar `git merge develop` cuidadosamente

## Licencia

Este proyecto es de uso educativo para el curso de desarrollo web.

## Contacto

Si tienes problemas con la configuración, contacta al equipo:

- **GitHub Issues**: Para problemas técnicos
- **WhatsApp del Grupo**: Para coordinación rápida

---

**Desarrollado por el equipo de desarrollo web**
