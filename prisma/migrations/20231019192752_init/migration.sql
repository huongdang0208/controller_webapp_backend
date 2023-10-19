/*
  Warnings:

  - You are about to drop the column `product_thumbnail_id` on the `Product` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Product` DROP FOREIGN KEY `Product_product_thumbnail_id_fkey`;

-- AlterTable
ALTER TABLE `Product` DROP COLUMN `product_thumbnail_id`,
    ADD COLUMN `images_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_images_id_fkey` FOREIGN KEY (`images_id`) REFERENCES `File`(`file_id`) ON DELETE SET NULL ON UPDATE CASCADE;
