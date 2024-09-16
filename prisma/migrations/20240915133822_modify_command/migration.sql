-- DropForeignKey
ALTER TABLE `device` DROP FOREIGN KEY `device_ibfk_1`;

-- AlterTable
ALTER TABLE `command` ADD COLUMN `receiver` VARCHAR(200) NULL,
    ADD COLUMN `sender` VARCHAR(200) NULL;

-- AddForeignKey
ALTER TABLE `device` ADD CONSTRAINT `device_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;
