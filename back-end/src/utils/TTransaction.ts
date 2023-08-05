interface TTransaction {
  id?: number,
  accountId: string,
  data: string,
  value: number,
  cashback?: number,
  transactionId: string,
}


export { TTransaction }
