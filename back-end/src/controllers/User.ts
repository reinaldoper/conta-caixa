import UserService from "../services/UserService";
import validateCpf from "../middleware/validateCpf";
import statusCodes from "../StatusCode";
import { Request, Response } from "express";
import jwt, { SignOptions } from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
require('dotenv/config');


const secretToken = process.env.JWT_SECRET || 'fluxor';

class UserController {
  private userService = new UserService();

  constructor() { }

  public UserCreated = async (req: Request, res: Response) => {
    try {
      const { cpf, email } = req.body;
      const valida = validateCpf(cpf);
      const verifyEmail = await this.userService.VerifyEmail(email);
      const verifyCpf = await this.userService.VerifyCpf(cpf);
      if (!valida) {
        return res.status(statusCodes.BAD_REQUEST).json({ "message": "Invalid cpf" });
      } else if (verifyEmail) {
        return res.status(statusCodes.BAD_REQUEST).json({ "message": 'Email already exist' });
      } else if (verifyCpf) {
        return res.status(statusCodes.BAD_REQUEST).json({ "message": 'Cpf already exist' });
      } else {
        const result = await this.userService.CreateUser(req.body);

        return res.status(statusCodes.CREATED).json({ "data": result });
      }
    } catch (error) {
      return res.status(statusCodes.ERROR).json({ "message": "Internal error." });
    }
  };

  public getTokenByEmail = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await this.userService.VerifyEmail(email);

    if (!user || !user.id) {
      return res.status(statusCodes.NOT_FOUND).json({
        "message": 'User not found',
      });
    };
    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(statusCodes.BAD_REQUEST).json({
        "message": 'Invalid password',
      });
    }
    const userData = {
      id: user.id,
      email,
    };

    const jwtConfig: SignOptions = {
      expiresIn: '5d',
      algorithm: 'HS256',
    };
    const token = jwt.sign(userData, secretToken as string, jwtConfig);

    return res.status(statusCodes.OK).json({
      "data": { token }
    });
  };

  public getTransactionByCpf = async (req: Request, res: Response) => {
    const { cpf } = req.body;
    const { id } = req.authenticatedUser;
    if (!cpf) return res.status(statusCodes.BAD_REQUEST).json({ "message": "Cpf is not null." });
    const transaction = await this.userService.VerifyId(id);
    if (!transaction) {
      return res.status(statusCodes.NOT_FOUND).json({ "message": "Account is not exist." });
    } else if (!transaction.status) {
      return res.status(statusCodes.NOT_FOUND).json({ "message": "Account not authorized." });
    }
    try {
      const verifyCpf = await this.userService.VerifyCpf(cpf);
      if (!verifyCpf) {
        return res.status(statusCodes.BAD_REQUEST).json({ "message": 'Cpf is not exist.' });
      }
      const result = await this.userService.getTransactionByCpf(cpf);
      if (result) {
        return res.status(statusCodes.OK).json({ "data": result.transactions });
      } else {
        return res.status(statusCodes.NOT_FOUND).json({ "message": 'Cpf is not have transaction.' });
      }
    } catch (error) {
      return res.status(statusCodes.ERROR).json({ "message": 'Internal error.' });
    }
  };

  public deleteUserByEmail = async (req: Request, res: Response) => {
    const { email } = req.body;
    if (!email || email.length === 0 || typeof email !== 'string') {
      return res.status(statusCodes.BAD_REQUEST).json({ "message": 'Dados is invalid.' });
    }
    try {
      const verifyEmail = await this.userService.VerifyEmail(email);
      if (!verifyEmail) {
        return res.status(statusCodes.NOT_FOUND).json({ "message": 'Email is not exist.' });
      } else {
        await this.userService.deleteUser(email);
        return res.status(statusCodes.OK).json({ "message": "Account has been deleted." });
      }
    } catch (error) {
      return res.status(statusCodes.ERROR).json({ "message": 'Internal error.' });
    }

  };

  public updateUser = async (req: Request, res: Response) => {
    const { email } = req.body;
    const verifyEmail = await this.userService.VerifyEmail(email);
    if (!verifyEmail) {
      return res.status(statusCodes.NOT_FOUND).json({ "message": 'Email is not exist.' });
    } else {
      await this.userService.updateUser(req.body);
      return res.status(statusCodes.OK).json({ "message": "Updated user." });
    }

  }

  public getUser = async (req: Request, res: Response) => {
    const { email } = req.body;
    if (!email || typeof email !== 'string') return res.status(statusCodes.BAD_REQUEST).json({ "message": 'Invalid data.' });
    try {
      const verifyEmail = await this.userService.getUser(email);
      if (!verifyEmail) {
        return res.status(statusCodes.NOT_FOUND).json({ "message": 'Email is not exist.' });
      } else {
        return res.status(statusCodes.OK).json({ "data": verifyEmail });
      }
    } catch (error) {
      return res.status(statusCodes.ERROR).json({ "message": 'Internal error.' });
    }
  }

  public recoverAccount = async (req: Request, res: Response) => {
    const { email } = req.body;
    if (!email || typeof email !== 'string') return res.status(statusCodes.BAD_REQUEST).json({ "message": 'Invalid data.' });
    try {
      const verify = await this.userService.VerifyEmail(email);
      if (!verify) {
        return res.status(statusCodes.NOT_FOUND).json({ "message": 'Email is not exist.' });
      } else {
        await this.userService.inUser(email);
        return res.status(statusCodes.OK).json({ "data": 'Recover account with success' });
      }
    } catch (error) {
      return res.status(statusCodes.ERROR).json({ "message": 'Internal error.' });
    }
  }

}



export default UserController;