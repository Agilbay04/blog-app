/*
  Warnings:

  - You are about to drop the column `address_id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `company_id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Address` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Company` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `address` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `company` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_address_id_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_company_id_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "address_id",
DROP COLUMN "company_id",
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "company" VARCHAR(50) NOT NULL;

-- DropTable
DROP TABLE "Address";

-- DropTable
DROP TABLE "Company";
