import { Router } from "express";
import TransactionAccount from "../controllers/TransactionController";
import validateToken from "../middleware/validateToken";
import validateTransaction from "../middleware/validateTransaction";
import validateCashback from "../middleware/validateCashback";

const routerTransaction = Router();
const transaction = new TransactionAccount();

routerTransaction.post('/transaction', validateToken, validateTransaction, transaction.createTransaction);
/* routerTransaction.delete('/transaction/:userId', validateToken, transaction.deleteTransaction); */
routerTransaction.put('/transaction/', validateToken, validateCashback, transaction.createCashback);


export default routerTransaction;