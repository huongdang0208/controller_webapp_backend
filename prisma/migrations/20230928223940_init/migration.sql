/*
  Warnings:

  - Added the required column `accessToken` to the `Session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expiredAt` to the `Session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `refreshToken` to the `Session` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Session` ADD COLUMN `accessToken` VARCHAR(191) NOT NULL,
    ADD COLUMN `expiredAt` DATETIME(3) NOT NULL,
    ADD COLUMN `refreshToken` VARCHAR(191) NOT NULL;
