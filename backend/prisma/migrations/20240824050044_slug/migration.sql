/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `attribute_values` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `attributes` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `attribute_values` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `attributes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "attribute_values" ADD COLUMN     "slug" VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE "attributes" ADD COLUMN     "slug" VARCHAR(255) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "attribute_values_slug_key" ON "attribute_values"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "attributes_slug_key" ON "attributes"("slug");
