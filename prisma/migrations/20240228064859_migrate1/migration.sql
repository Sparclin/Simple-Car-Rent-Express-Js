-- CreateTable
CREATE TABLE `Admin` (
    `adminID` INTEGER NOT NULL AUTO_INCREMENT,
    `namaAdmin` VARCHAR(191) NOT NULL DEFAULT '',
    `email` VARCHAR(191) NOT NULL DEFAULT '',
    `password` VARCHAR(191) NOT NULL DEFAULT '',

    UNIQUE INDEX `Admin_email_key`(`email`),
    PRIMARY KEY (`adminID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Car` (
    `carID` INTEGER NOT NULL AUTO_INCREMENT,
    `nopol` VARCHAR(191) NOT NULL DEFAULT '',
    `merk_mobil` VARCHAR(191) NOT NULL DEFAULT '',
    `harga_perhari` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `Car_nopol_key`(`nopol`),
    PRIMARY KEY (`carID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Rent` (
    `rentID` INTEGER NOT NULL AUTO_INCREMENT,
    `car_id` INTEGER NOT NULL,
    `nama_penyewa` VARCHAR(191) NOT NULL DEFAULT '',
    `tanggal` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `lama_sewa` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `total_bayar` DECIMAL(65, 30) NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`rentID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Rent` ADD CONSTRAINT `Rent_car_id_fkey` FOREIGN KEY (`car_id`) REFERENCES `Car`(`carID`) ON DELETE RESTRICT ON UPDATE CASCADE;
