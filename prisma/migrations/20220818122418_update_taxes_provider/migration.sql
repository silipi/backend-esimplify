/*
  Warnings:

  - The `taxes` column on the `Provider` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Provider" DROP COLUMN "taxes",
ADD COLUMN     "taxes" JSONB;
