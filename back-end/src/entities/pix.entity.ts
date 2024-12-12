import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { IsNotEmpty, IsString, IsEnum, IsUUID } from "class-validator";
import { User } from "./user.entity";
import { v4 as uuid } from "uuid";

export enum PixKeyType {
  CPF = "cpf",
  PHONE = "phone",
  EMAIL = "email",
}

@Entity()
export class Pix {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  @IsNotEmpty({ message: "A chave Pix não pode estar vazia." })
  @IsString({ message: "A chave Pix deve ser uma string." })
  key: string;

  @Column({ type: "enum", enum: PixKeyType })
  @IsEnum(PixKeyType, {
    message: "O tipo de chave Pix deve ser 'cpf', 'phone' ou 'email'.",
  })
  type: PixKeyType;

  @Column({ default: "fernando lacerda" })
  @IsNotEmpty({ message: "O destinatário não pode estar vazio." })
  @IsString({ message: "O destinatário deve ser uma string." })
  recipient: string;

  @ManyToOne(() => User, (user) => user.pix)
  @IsNotEmpty({ message: "O usuário associado ao Pix não pode estar vazio." })
  @IsUUID("4", { message: "O ID do usuário deve ser um UUID válido." })
  user: User;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
