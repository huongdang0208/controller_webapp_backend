/*
  Warnings:

  - Added the required column `userID` to the `command` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `command` DROP FOREIGN KEY `command_ibfk_2`;

-- AlterTable
ALTER TABLE `command` ADD COLUMN `userID` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `command` ADD CONSTRAINT `command_ibfk_2` FOREIGN KEY (`userID`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
