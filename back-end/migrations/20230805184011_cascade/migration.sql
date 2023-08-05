-- DropForeignKey
ALTER TABLE `Transaction` DROP FOREIGN KEY `Transaction_accountId_fkey`;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_accountId_fkey` FOREIGN KEY (`accountId`) REFERENCES `Conta`(`cpf`) ON DELETE CASCADE ON UPDATE CASCADE;
