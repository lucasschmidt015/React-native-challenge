-- CreateTable
CREATE TABLE "Task" (
    "id" SERIAL NOT NULL,
    "message" VARCHAR(100) NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);
