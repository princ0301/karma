-- CreateEnum
CREATE TYPE "MemberType" AS ENUM ('TEAM', 'VOLUNTEER');

-- CreateTable
CREATE TABLE "Member" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "MemberType" NOT NULL,
    "role" TEXT NOT NULL,
    "email" TEXT,
    "photo" TEXT,
    "city" TEXT,
    "bio" TEXT,
    "visible" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Member_pkey" PRIMARY KEY ("id")
);
