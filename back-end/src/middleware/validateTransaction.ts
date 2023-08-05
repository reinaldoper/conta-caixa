import statusCodes from '../StatusCode';
import { Request, Response, NextFunction } from 'express';
import validateCpf from './validateCpf';

const validateTransaction = (req: Request, res: Response, next: NextFunction) => {
  const { accountId, value } = req.body;
  const validate = validateCpf(accountId);
  if (!validate) {
    return res.status(statusCodes.BAD_REQUEST).json({ "message": "Invalid accountId" });
  } else if (!value || !accountId) {
    return res.status(statusCodes.BAD_REQUEST).json({ "message": "Dados is not null" });
  } else if (typeof value !== 'number' && typeof accountId !== 'string') {
    return res.status(statusCodes.BAD_REQUEST).json({ "message": "Values is not valid." });
  } else {
    next();
  }
};


export default validateTransaction;







