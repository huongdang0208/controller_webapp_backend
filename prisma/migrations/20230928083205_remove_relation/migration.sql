/*
  Warnings:

  - You are about to drop the column `blogId` on the `File` table. All the data in the column will be lost.
  - You are about to drop the column `categoryId` on the `File` table. All the data in the column will be lost.
  - Added the required column `images` to the `Blog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `images` to the `Category` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `File` DROP FOREIGN KEY `File_blogId_fkey`;

-- DropForeignKey
ALTER TABLE `File` DROP FOREIGN KEY `File_categoryId_fkey`;

-- AlterTable
ALTER TABLE `Blog` ADD COLUMN `images` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Category` ADD COLUMN `images` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `File` DROP COLUMN `blogId`,
    DROP COLUMN `categoryId`;
