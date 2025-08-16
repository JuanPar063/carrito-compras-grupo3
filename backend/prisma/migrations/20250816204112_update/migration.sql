-- DropForeignKey
ALTER TABLE "public"."carrito_items" DROP CONSTRAINT "carrito_items_carritoId_fkey";

-- AlterTable
ALTER TABLE "public"."carritos" ADD COLUMN     "total" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- AddForeignKey
ALTER TABLE "public"."carrito_items" ADD CONSTRAINT "carrito_items_carritoId_fkey" FOREIGN KEY ("carritoId") REFERENCES "public"."carritos"("id") ON DELETE CASCADE ON UPDATE CASCADE;
