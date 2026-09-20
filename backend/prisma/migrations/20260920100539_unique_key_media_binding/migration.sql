/*
  Warnings:

  - A unique constraint covering the columns `[key,mediaId]` on the table `KeyBinding` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "KeyBinding_key_mediaId_key" ON "KeyBinding"("key", "mediaId");
