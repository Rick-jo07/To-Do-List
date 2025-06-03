/*
  Warnings:

  - Made the column `title` on table `todo` required. This step will fail if there are existing NULL values in that column.
  - Made the column `completed` on table `todo` required. This step will fail if there are existing NULL values in that column.
  - Made the column `createdate` on table `todo` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
CREATE SEQUENCE todo_id_seq;
ALTER TABLE "todo" ALTER COLUMN "id" SET DEFAULT nextval('todo_id_seq'),
ALTER COLUMN "title" SET NOT NULL,
ALTER COLUMN "title" SET DATA TYPE TEXT,
ALTER COLUMN "completed" SET NOT NULL,
ALTER COLUMN "completed" SET DEFAULT false,
ALTER COLUMN "createdate" SET NOT NULL,
ALTER COLUMN "createdate" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "createdate" SET DATA TYPE TIMESTAMP(6);
ALTER SEQUENCE todo_id_seq OWNED BY "todo"."id";
