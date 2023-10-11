-- DropForeignKey
ALTER TABLE `Product` DROP FOREIGN KEY `Product_images_id_fkey`;

-- AlterTable
ALTER TABLE `Product` MODIFY `detail_description` LONGTEXT NULL,
    MODIFY `instruction` LONGTEXT NULL,
    MODIFY `images_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_images_id_fkey` FOREIGN KEY (`images_id`) REFERENCES `File`(`file_id`) ON DELETE SET NULL ON UPDATE CASCADE;
