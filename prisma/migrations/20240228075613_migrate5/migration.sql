/*
  Warnings:

  - You are about to drop the column `harga_perhari` on the `car` table. All the data in the column will be lost.
  - You are about to drop the column `merk_mobil` on the `car` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `car` DROP COLUMN `harga_perhari`,
    DROP COLUMN `merk_mobil`,
    ADD COLUMN `hargaPerhari` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `merkMobil` VARCHAR(191) NOT NULL DEFAULT '';
