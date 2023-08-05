import { TTransaction } from "./TTransaction"

interface TUser {
  id?: number,
  cpf: string,
  name: string,
  password: string,
  email: string,
  status: boolean,
  transactions: TTransaction[],
}

interface TUpdateUser {
  name: string,
  password: string,
  email: string,
  status: boolean
}

export {TUser, TUpdateUser};