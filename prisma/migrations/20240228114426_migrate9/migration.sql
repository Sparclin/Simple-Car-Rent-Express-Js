/*
  Warnings:

  - You are about to drop the column `namapenyewa` on the `rent` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `rent` DROP COLUMN `namapenyewa`,
    ADD COLUMN `namaPenyewa` VARCHAR(191) NOT NULL DEFAULT '';
