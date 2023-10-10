-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_images_id_fkey` FOREIGN KEY (`images_id`) REFERENCES `File`(`file_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
