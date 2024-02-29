/*
  Warnings:

  - You are about to drop the column `car_id` on the `rent` table. All the data in the column will be lost.
  - Added the required column `carID` to the `Rent` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `rent` DROP FOREIGN KEY `Rent_car_id_fkey`;

-- AlterTable
ALTER TABLE `rent` DROP COLUMN `car_id`,
    ADD COLUMN `carID` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Rent` ADD CONSTRAINT `Rent_carID_fkey` FOREIGN KEY (`carID`) REFERENCES `Car`(`carID`) ON DELETE RESTRICT ON UPDATE CASCADE;
