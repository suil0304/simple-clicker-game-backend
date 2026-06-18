-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` CHAR(10) NOT NULL,
    `password` CHAR(22) NOT NULL,
    `nickname` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Stats` (
    `userId` INTEGER NOT NULL,
    `gold` INTEGER NOT NULL DEFAULT 0,
    `goldPerClick` INTEGER NOT NULL DEFAULT 0,
    `goldPerSecond` INTEGER NOT NULL DEFAULT 0,
    `criticalMult` DECIMAL(10, 2) NOT NULL DEFAULT 0,
    `criticalRate` DECIMAL(3, 2) NOT NULL DEFAULT 0,
    `clickCount` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Upgrade` (
    `userId` INTEGER NOT NULL,
    `goldPerClickLevel` INTEGER NOT NULL DEFAULT 0,
    `goldPerSecondLevel` INTEGER NOT NULL DEFAULT 0,
    `criticalMultLevel` INTEGER NOT NULL DEFAULT 0,
    `criticalRateLevel` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Stats` ADD CONSTRAINT `Stats_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Upgrade` ADD CONSTRAINT `Upgrade_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
