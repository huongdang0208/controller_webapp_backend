-- DropForeignKey
ALTER TABLE `Blog` DROP FOREIGN KEY `Blog_images_id_fkey`;

-- AlterTable
ALTER TABLE `Blog` MODIFY `images_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Blog` ADD CONSTRAINT `Blog_images_id_fkey` FOREIGN KEY (`images_id`) REFERENCES `File`(`file_id`) ON DELETE SET NULL ON UPDATE CASCADE;
