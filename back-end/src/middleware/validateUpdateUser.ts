import statusCodes from '../StatusCode';
import { Request, Response, NextFunction } from 'express';

const validateUpdateUser = (req: Request, res: Response, next: NextFunction) => {
  const { cpf, name, password, email } = req.body;
  if (!name || !password || !email || !cpf) {
    return res.status(statusCodes.BAD_REQUEST).json({ "message": "Dados is not invalid." });
  } else if ((typeof name !== 'string') || (typeof password !== 'string') || (typeof email !== 'string') || (typeof cpf !== 'string')) {
    return res.status(statusCodes.BAD_REQUEST).json({ "message": "Dados is not string." });
  } else if ((name.length === 0) || (password.length === 0) || (email.length === 0) || (cpf.length === 0)) {
    return res.status(statusCodes.BAD_REQUEST).json({ "message": "Dados is not null." });
  } else {
    next();
  }
};


export default validateUpdateUser;

