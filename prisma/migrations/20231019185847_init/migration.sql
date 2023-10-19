/*
  Warnings:

  - You are about to drop the column `images_id` on the `Product` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Product` DROP FOREIGN KEY `Product_images_id_fkey`;

-- AlterTable
ALTER TABLE `Product` DROP COLUMN `images_id`,
    ADD COLUMN `product_thumbnail_id` INTEGER NULL;

-- CreateTable
CREATE TABLE `_ProductImages` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ProductImages_AB_unique`(`A`, `B`),
    INDEX `_ProductImages_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_product_thumbnail_id_fkey` FOREIGN KEY (`product_thumbnail_id`) REFERENCES `File`(`file_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ProductImages` ADD CONSTRAINT `_ProductImages_A_fkey` FOREIGN KEY (`A`) REFERENCES `File`(`file_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ProductImages` ADD CONSTRAINT `_ProductImages_B_fkey` FOREIGN KEY (`B`) REFERENCES `Product`(`product_id`) ON DELETE CASCADE ON UPDATE CASCADE;
