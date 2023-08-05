import statusCodes from '../StatusCode';
import { Request, Response, NextFunction } from 'express';

const validateCashback = (req: Request, res: Response, next: NextFunction) => {
  const { transactionId, cashback } = req.body;
  if (!transactionId || !cashback) {
    return res.status(statusCodes.BAD_REQUEST).json({ "message": "Dados is not null" });
  } else if (typeof transactionId !== 'string' && typeof cashback !== 'number') {
    return res.status(statusCodes.BAD_REQUEST).json({ "message": "Values is not valid." });
  } else {
    next();
  }
};

export default validateCashback;