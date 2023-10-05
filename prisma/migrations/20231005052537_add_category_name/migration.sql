/*
  Warnings:

  - Added the required column `categoryName` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "categoryName" TEXT NOT NULL;
