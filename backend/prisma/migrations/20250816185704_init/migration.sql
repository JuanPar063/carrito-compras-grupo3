-- CreateEnum
CREATE TYPE "public"."EstadoCarrito" AS ENUM ('ACTIVO', 'ABANDONADO', 'CONVERTIDO');

-- CreateTable
CREATE TABLE "public"."usuarios" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."productos" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "precio" DOUBLE PRECISION NOT NULL,
    "stock" INTEGER NOT NULL,
    "categoria" TEXT NOT NULL,
    "imagen" TEXT,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "productos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."carritos" (
    "id" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "estado" "public"."EstadoCarrito" NOT NULL DEFAULT 'ACTIVO',
    "descuento" DOUBLE PRECISION,
    "tipoEnvio" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "carritos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."carrito_items" (
    "id" TEXT NOT NULL,
    "carritoId" TEXT NOT NULL,
    "productoId" TEXT NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "precioUnitario" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "carrito_items_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "public"."usuarios"("email");

-- CreateIndex
CREATE UNIQUE INDEX "carrito_items_carritoId_productoId_key" ON "public"."carrito_items"("carritoId", "productoId");

-- AddForeignKey
ALTER TABLE "public"."carritos" ADD CONSTRAINT "carritos_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "public"."usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."carrito_items" ADD CONSTRAINT "carrito_items_carritoId_fkey" FOREIGN KEY ("carritoId") REFERENCES "public"."carritos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."carrito_items" ADD CONSTRAINT "carrito_items_productoId_fkey" FOREIGN KEY ("productoId") REFERENCES "public"."productos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
