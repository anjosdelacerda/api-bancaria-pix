import { User } from "../entities/user.entity";
import { PixKeyType } from "../entities/pix.entity";

export interface IPix {
  id?: string;
  key: string;
  type: PixKeyType;
  recipient: string;
  user: User;
}
