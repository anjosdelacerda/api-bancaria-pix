import { Pix } from "../entities/pix.entity";

export interface IUser {
  id?: string;
  name: string;
  cpf: string;
  email: string;
  password: string;
  pix: Pix[];
}
