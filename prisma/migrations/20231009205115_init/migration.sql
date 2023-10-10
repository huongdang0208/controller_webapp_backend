/*
  Warnings:

  - Added the required column `cdn_path` to the `File` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `File` ADD COLUMN `cdn_path` VARCHAR(191) NOT NULL;
