import statusCodes from '../StatusCode';
import { Request, Response, NextFunction } from 'express';

const validateGetByUser = (req: Request, res: Response, next: NextFunction) => {
  const { password, email } = req.body;
  if (!password || !email) {
    return res.status(statusCodes.BAD_REQUEST).json({ "message": "Dados invalid." });
  } else if ((password.length === 0) || (email.length === 0)) {
    return res.status(statusCodes.BAD_REQUEST).json({ "message": "Dados is not null." });
  } else if ((typeof password !== 'string') || (typeof email !== 'string')) {
    return res.status(statusCodes.BAD_REQUEST).json({ "message": "Dados is not string." })
  } else {
    next();
  }
};


export default validateGetByUser;