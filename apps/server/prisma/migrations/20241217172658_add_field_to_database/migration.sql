/*
  Warnings:

  - Added the required column `database` to the `Database` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Database" ADD COLUMN     "database" TEXT NOT NULL;
