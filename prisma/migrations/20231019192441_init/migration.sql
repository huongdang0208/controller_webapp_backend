/*
  Warnings:

  - You are about to drop the column `product_image_id` on the `File` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `File` DROP FOREIGN KEY `File_product_image_id_fkey`;

-- AlterTable
ALTER TABLE `File` DROP COLUMN `product_image_id`;
