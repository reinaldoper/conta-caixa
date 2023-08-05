import statusCodes from "../StatusCode";
import { Request, Response } from "express";
import TransactionService from "../services/TransactionService";
import UserService from "../services/UserService";


class TransactionAccount {
  private transactionService = new TransactionService();
  private userService = new UserService();

  constructor() { }

  public createTransaction = async (req: Request, res: Response) => {
    const { accountId } = req.body;
    try {
      const { id } = req.authenticatedUser;
      const transaction = await this.userService.VerifyId(id);
      const verifyCpf = await this.userService.VerifyCpf(accountId);
      if (!transaction) {
        return res.status(statusCodes.NOT_FOUND).json({ "message": "Account is not exist." });
      } else if (!transaction.status) {
        return res.status(statusCodes.NOT_FOUND).json({ "message": "Account not authorized." });
      } else if(!verifyCpf){
        return res.status(statusCodes.NOT_FOUND).json({ "message": "AccountId is not exist." });
      } else {
        const data  = await this.transactionService.CreateTransaction(req.body);
        return res.status(statusCodes.OK).json({ "data": data});
      }
    } catch (error) {
      console.error(error);
      return res.status(statusCodes.BAD_REQUEST).json({ "message": "Internal error." });
    }

  }

  public createCashback = async (req: Request, res: Response) => {
    const { transactionId } = req.body;
    try {
      const { id } = req.authenticatedUser;
      const transaction = await this.userService.VerifyId(id);
      const verifyTransaction = await this.transactionService.GetTransaction(transactionId);
      if (!transaction) {
        return res.status(statusCodes.NOT_FOUND).json({ "message": "Account is not exist." });
      } else if (!transaction.status) {
        return res.status(statusCodes.NOT_FOUND).json({ "message": "Account not authorized." });
      } else if(!verifyTransaction){
        return res.status(statusCodes.NOT_FOUND).json({ "message": "TransactionId is not exist." });
      } else {
        await this.transactionService.CreateCashback(req.body);
        return res.status(statusCodes.OK).json({ "data": "Create cashback!" });
      }
    } catch (error) {
      console.error(error); 
      return res.status(statusCodes.BAD_REQUEST).json({ "message": "Internal error." });
    }

  }

  /* public deleteTransaction = async (req: Request, res: Response) => {
    try {
      const { id } = req.authenticatedUser;
      const { userId } = req.params;
      const transaction = await this.userService.VerifyId(id);
      if (!transaction) {
        return res.status(statusCodes.NOT_FOUND).json({ "message": "Account is not exist." });
      } else if (!transaction.status) {
        return res.status(statusCodes.NOT_FOUND).json({ "message": "Account not authorized." });
      } else {
        const newTransaction = await this.transactionService.deleteTransaction(Number(userId));
        return res.status(statusCodes.OK).json({ "data": "Delete success!" });
      }
    } catch (error) {
      return res.status(statusCodes.BAD_REQUEST).json({ "message": "Internal error." });
    }
  } */
}


export default TransactionAccount;