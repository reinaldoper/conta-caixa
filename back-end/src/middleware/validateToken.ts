import statusCodes from '../StatusCode';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      authenticatedUser?: any;
    }
  }
}


const { JWT_SECRET } = process.env

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  const { authorization: token } = req.headers;
  
  if (!token) return res.status(statusCodes.UNAUTHORIZED).json({
    "message": 'Token not found',
   });
  try {
    const user = jwt.verify(token, JWT_SECRET as string);
    req.authenticatedUser = user;
    next();
  } catch (e) {
    return res.status(statusCodes.UNAUTHORIZED).json({
      "message": 'Expired or invalid token',
     });
  } 
};

export default validateToken;
