/*
  Warnings:

  - You are about to drop the `CategoriesOnPosts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `CategoriesOnPosts` DROP FOREIGN KEY `CategoriesOnPosts_blogId_fkey`;

-- DropForeignKey
ALTER TABLE `CategoriesOnPosts` DROP FOREIGN KEY `CategoriesOnPosts_productId_fkey`;

-- DropTable
DROP TABLE `CategoriesOnPosts`;

-- CreateTable
CREATE TABLE `_BlogToProduct` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_BlogToProduct_AB_unique`(`A`, `B`),
    INDEX `_BlogToProduct_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`product_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_BlogToProduct` ADD CONSTRAINT `_BlogToProduct_A_fkey` FOREIGN KEY (`A`) REFERENCES `Blog`(`blog_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_BlogToProduct` ADD CONSTRAINT `_BlogToProduct_B_fkey` FOREIGN KEY (`B`) REFERENCES `Product`(`product_id`) ON DELETE CASCADE ON UPDATE CASCADE;
