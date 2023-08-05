import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { TUpdateUser, TUser } from '../utils/TUser';


class UserService {
  private prisma = new PrismaClient();

  constructor() {}

  public CreateUser = async (body: TUser): Promise<TUser []> => {
    const { cpf, name, password, email } = body;
    const salt = bcrypt.genSaltSync();
    const hashPassword = bcrypt.hashSync(password, salt);
    const newUser = await this.prisma.conta.create({
      data: {
        cpf: cpf,
        name: name,
        password: hashPassword,
        email: email,
        status: true,
      },
      select: { email: true, cpf: true, status: true, name: true},
    })
  
    return newUser as unknown as TUser[];
  };
  
  public VerifyEmail = async (email: string): Promise<TUser> => {
    const result = await this.prisma.conta.findUnique({
      where: { email: email },
    });
    return result as unknown as TUser;
  
  }

  public VerifyCpf = async (cpf: string): Promise<TUser> => {
    const result = await this.prisma.conta.findUnique({
      where: { cpf: cpf },
    });
    return result as unknown as TUser;
  
  }

  public VerifyId = async (id: number): Promise<TUser> => {
    const result = await this.prisma.conta.findUnique({
      where: { id: id },
    });
    return result as unknown as TUser;
  
  }

  public getTransactionByCpf = async (cpf: string): Promise<TUser> => {
    const result = await this.prisma.conta.findUnique({
      where: { cpf: cpf },
      include: { transactions: true },
    });
    return result as unknown as TUser;
  
  }

  public updateUser = async (body: TUpdateUser): Promise<TUpdateUser> => {
    const { name, password, email } = body;
    const salt = bcrypt.genSaltSync();
    const hashPassword = bcrypt.hashSync(password, salt);
    const update = await this.prisma.conta.update({
      where: { email: email },
      data: { name: name, password: hashPassword, status: true, email: email },
    })

    return update as unknown as TUpdateUser;
  };

  public deleteUser = async (email: string): Promise<TUser> => {
    const user = await this.prisma.conta.update({
      where: { email: email },
      data: { status: false },
    })

    return user as unknown as TUser;
  };

  public getUser = async (email: string): Promise<TUser> => {
    const user = await this.prisma.conta.findUnique({
      where: { email: email },
      select: { name: true, status: true, email: true, cpf: true},
    })

    return user as unknown as TUser;
  }

  public inUser = async (email: string): Promise<TUser> => {
    const user = await this.prisma.conta.update({
      where: { email: email },
      data: { status: true },
      select: { name: true, status: true, email: true },
    })

    return user as unknown as TUser;
  };
}



export default UserService;