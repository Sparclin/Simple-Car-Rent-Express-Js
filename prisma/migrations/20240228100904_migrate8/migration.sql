/*
  Warnings:

  - You are about to drop the column `hargaPerhari` on the `car` table. All the data in the column will be lost.
  - You are about to drop the column `merkMobil` on the `car` table. All the data in the column will be lost.
  - You are about to drop the column `namaPenyewa` on the `rent` table. All the data in the column will be lost.
  - You are about to drop the column `totalBayar` on the `rent` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `car` DROP COLUMN `hargaPerhari`,
    DROP COLUMN `merkMobil`,
    ADD COLUMN `hargaperhari` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `merkmobil` VARCHAR(191) NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE `rent` DROP COLUMN `namaPenyewa`,
    DROP COLUMN `totalBayar`,
    ADD COLUMN `namapenyewa` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `totalbayar` DECIMAL(65, 30) NOT NULL DEFAULT 0;
