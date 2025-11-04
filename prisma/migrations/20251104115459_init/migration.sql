-- CreateTable
CREATE TABLE `amb_form` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name_table` VARCHAR(191) NOT NULL,
    `name_route` VARCHAR(191) NULL,
    `menu_name` VARCHAR(191) NULL,
    `menu_description` VARCHAR(191) NULL,
    `help` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,
    `created_user` INTEGER NULL,
    `updated_user` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `amb_profile` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `description` VARCHAR(191) NOT NULL,
    `created_user` INTEGER NULL,
    `updated_user` INTEGER NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `amb_profile_autoriza` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `amb_profile_id` INTEGER NOT NULL,
    `amb_form_id` INTEGER NOT NULL,
    `direitos` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `amb_profile_autoriza` ADD CONSTRAINT `amb_profile_autoriza_amb_profile_id_fkey` FOREIGN KEY (`amb_profile_id`) REFERENCES `amb_profile`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `amb_profile_autoriza` ADD CONSTRAINT `amb_profile_autoriza_amb_form_id_fkey` FOREIGN KEY (`amb_form_id`) REFERENCES `amb_form`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
