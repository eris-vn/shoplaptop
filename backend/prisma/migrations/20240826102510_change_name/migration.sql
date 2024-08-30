/*
  Warnings:

  - You are about to drop the column `slug` on the `attribute_values` table. All the data in the column will be lost.
  - You are about to drop the column `slug` on the `attributes` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[value]` on the table `attribute_values` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[value]` on the table `attributes` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `attribute_values` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `attributes` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "attribute_values_slug_key";

-- DropIndex
DROP INDEX "attributes_slug_key";

-- AlterTable
ALTER TABLE "attribute_values" DROP COLUMN "slug",
ADD COLUMN     "name" VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE "attributes" DROP COLUMN "slug",
ADD COLUMN     "value" VARCHAR(255) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "attribute_values_value_key" ON "attribute_values"("value");

-- CreateIndex
CREATE UNIQUE INDEX "attributes_value_key" ON "attributes"("value");
