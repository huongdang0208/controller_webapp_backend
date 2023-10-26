/*
  Warnings:

  - You are about to drop the `Contact` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `Contact`;

-- CreateTable
CREATE TABLE `ContactRequest` (
    `contact_id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`contact_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
