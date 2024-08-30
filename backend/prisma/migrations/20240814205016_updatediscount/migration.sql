/*
  Warnings:

  - Made the column `discount` on table `products` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "order_details" ALTER COLUMN "discount" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "products" ALTER COLUMN "discount" SET NOT NULL,
ALTER COLUMN "discount" SET DEFAULT 0;
