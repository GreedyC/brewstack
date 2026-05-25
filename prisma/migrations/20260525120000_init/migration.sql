-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- CreateTable
CREATE TABLE "Bean" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "roaster" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "origin" TEXT NOT NULL,
    "variety" TEXT,
    "process" TEXT NOT NULL,
    "roastDate" TIMESTAMP(3) NOT NULL,
    "openDate" TIMESTAMP(3),
    "isFinished" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Bean_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BrewLog" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "beanId" TEXT NOT NULL,
    "method" TEXT NOT NULL,
    "doseGrams" DOUBLE PRECISION NOT NULL,
    "yieldMl" DOUBLE PRECISION NOT NULL,
    "waterTempC" DOUBLE PRECISION NOT NULL,
    "grindSetting" TEXT NOT NULL,
    "brewTimeMin" INTEGER NOT NULL,
    "brewTimeSec" INTEGER NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "tastingNotes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BrewLog_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BrewLog" ADD CONSTRAINT "BrewLog_beanId_fkey" FOREIGN KEY ("beanId") REFERENCES "Bean"("id") ON DELETE CASCADE ON UPDATE CASCADE;
