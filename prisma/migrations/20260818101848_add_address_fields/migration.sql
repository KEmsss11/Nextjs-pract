/*
  Warnings:

  - You are about to drop the column `address` on the `User` table. All the data in the column will be lost.
  - Added the required column `barangay` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cityMunicipality` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `province` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `region` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `streetAddress` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "address",
ADD COLUMN     "barangay" TEXT NOT NULL,
ADD COLUMN     "cityMunicipality" TEXT NOT NULL,
ADD COLUMN     "province" TEXT NOT NULL,
ADD COLUMN     "region" TEXT NOT NULL,
ADD COLUMN     "streetAddress" TEXT NOT NULL;
