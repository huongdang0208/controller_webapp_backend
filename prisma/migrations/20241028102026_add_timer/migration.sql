-- CreateTable
CREATE TABLE `timer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `deviceID` INTEGER NULL,
    `userID` INTEGER NOT NULL,
    `action` VARCHAR(200) NULL,
    `time` DATETIME(0) NULL,
    `date` DATETIME(0) NULL,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `deviceID`(`deviceID`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `timer` ADD CONSTRAINT `timer_ibfk_1` FOREIGN KEY (`deviceID`) REFERENCES `device`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `timer` ADD CONSTRAINT `timer_ibfk_2` FOREIGN KEY (`userID`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
