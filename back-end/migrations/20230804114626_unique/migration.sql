/*
  Warnings:

  - A unique constraint covering the columns `[transactionId]` on the table `Transaction` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Transaction_transactionId_key` ON `Transaction`(`transactionId`);
