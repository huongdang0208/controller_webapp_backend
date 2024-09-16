-- CreateTable
CREATE TABLE `device` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userID` INTEGER NULL,
    `current_state` INTEGER NULL,
    `device_name` VARCHAR(200) NULL,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `userID`(`userID`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `command` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `deviceID` INTEGER NULL,
    `command` VARCHAR(200) NULL,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `deviceID`(`deviceID`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `device` ADD CONSTRAINT `device_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `command` ADD CONSTRAINT `command_ibfk_1` FOREIGN KEY (`deviceID`) REFERENCES `device`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `command` ADD CONSTRAINT `command_ibfk_2` FOREIGN KEY (`deviceID`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
