/*
  Warnings:

  - A unique constraint covering the columns `[txHash,eventType,contractId]` on the table `Event` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Event_txHash_eventType_contractId_key" ON "Event"("txHash", "eventType", "contractId");
