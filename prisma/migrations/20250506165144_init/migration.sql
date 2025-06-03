/*
  Warnings:

  - You are about to drop the column `createdAt` on the `todo` table. All the data in the column will be lost.
  - You are about to alter the column `title` on the `todo` table. The data in that column could be lost. The data in that column will be cast from `Text` to `Char(1)`.

*/
-- AlterTable
ALTER TABLE "todo" DROP COLUMN "createdAt",
ADD COLUMN     "createdate" DATE,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "title" DROP NOT NULL,
ALTER COLUMN "title" SET DATA TYPE CHAR(1),
ALTER COLUMN "completed" DROP NOT NULL,
ALTER COLUMN "completed" DROP DEFAULT;
DROP SEQUENCE "todo_id_seq";
