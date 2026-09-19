-- CreateEnum
CREATE TYPE "MediaType" AS ENUM ('VIDEO', 'AUDIO');

-- CreateTable
CREATE TABLE "Media" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "type" "MediaType" NOT NULL,
    "url" TEXT NOT NULL,
    "thumbnail" TEXT,
    "category" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Media_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KeyBinding" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "mediaId" TEXT NOT NULL,

    CONSTRAINT "KeyBinding_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "KeyBinding_key_idx" ON "KeyBinding"("key");

-- AddForeignKey
ALTER TABLE "KeyBinding" ADD CONSTRAINT "KeyBinding_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "Media"("id") ON DELETE CASCADE ON UPDATE CASCADE;
