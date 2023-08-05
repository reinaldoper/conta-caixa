import { PrismaClient } from '@prisma/client';
import { TTransaction } from '../utils/TTransaction';
import { v4 as uuidv4 } from 'uuid';


class Transaction {
  private prisma = new PrismaClient();

  constructor() { }

  public CreateTransaction = async (body: TTransaction): Promise<TTransaction[]> => {
    const { accountId, value } = body;
   
    const transaction = await this.prisma.transaction.create({
      data: {
        value: value,
        accountId: accountId,
        transactionId: uuidv4(),
      },
    });
    return transaction as unknown as TTransaction[];
  };

  public CreateCashback = async (body: TTransaction): Promise<TTransaction[]> => {
    const { cashback, transactionId } = body;
   
    const transaction = await this.prisma.transaction.update({
      where: { transactionId: transactionId },
      data: {
        cashback: Number(cashback),
      },
    });
    return transaction as unknown as TTransaction[];
  };

  /* public deleteTransaction = async (id: number): Promise<TTransaction> => {
    const transaction = await this.prisma.transaction.delete({
      where: {id: id},
    });
    return transaction as unknown as TTransaction;
  } */

  public GetTransaction = async (transactionId: string): Promise<TTransaction> => {
    const transaction = await this.prisma.transaction.findUnique({
      where: {transactionId: transactionId},
    });
    return transaction as unknown as TTransaction;
  }
  
}

export default Transaction;