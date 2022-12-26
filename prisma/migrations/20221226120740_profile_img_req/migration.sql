/*
  Warnings:

  - Made the column `profile_img` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "profile_img" SET NOT NULL;
