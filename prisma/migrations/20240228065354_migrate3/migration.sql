/*
  Warnings:

  - You are about to drop the column `nama_penyewa` on the `rent` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `rent` DROP COLUMN `nama_penyewa`,
    ADD COLUMN `namaPenyewa` VARCHAR(191) NOT NULL DEFAULT '';
