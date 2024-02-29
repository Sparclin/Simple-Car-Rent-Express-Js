/*
  Warnings:

  - You are about to drop the column `lama_sewa` on the `rent` table. All the data in the column will be lost.
  - You are about to drop the column `total_bayar` on the `rent` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `rent` DROP COLUMN `lama_sewa`,
    DROP COLUMN `total_bayar`,
    ADD COLUMN `lamaSewa` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `totalBayar` DECIMAL(65, 30) NOT NULL DEFAULT 0;
