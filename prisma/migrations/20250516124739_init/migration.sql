-- AlterTable
ALTER TABLE "Todo" ADD COLUMN     "todo_id" SERIAL NOT NULL,
ALTER COLUMN "userid" DROP DEFAULT;
DROP SEQUENCE "Todo_userid_seq";
