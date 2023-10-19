/*
  Warnings:

  - You are about to drop the `_ProductImages` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_ProductImages` DROP FOREIGN KEY `_ProductImages_A_fkey`;

-- DropForeignKey
ALTER TABLE `_ProductImages` DROP FOREIGN KEY `_ProductImages_B_fkey`;

-- AlterTable
ALTER TABLE `File` ADD COLUMN `product_image_id` INTEGER NULL;

-- DropTable
DROP TABLE `_ProductImages`;

-- AddForeignKey
ALTER TABLE `File` ADD CONSTRAINT `File_product_image_id_fkey` FOREIGN KEY (`product_image_id`) REFERENCES `Product`(`product_id`) ON DELETE SET NULL ON UPDATE CASCADE;
