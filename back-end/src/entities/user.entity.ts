import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Exclude } from "class-transformer";
import { Pix } from "./pix.entity";
import {
  IsString,
  IsEmail,
  IsNotEmpty,
  Length,
  Matches,
} from "class-validator";
import { v4 as uuid } from "uuid";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  @IsString({ message: "O nome deve ser uma string." })
  @IsNotEmpty({ message: "O nome não pode estar vazio." })
  name: string;

  @Column()
  @IsString({ message: "O CPF deve ser uma string." })
  @Matches(/^\d{11}$/, { message: "O CPF deve conter exatamente 11 números." })
  cpf: string;

  @Column()
  @IsEmail({}, { message: "O email deve ser válido." })
  email: string;

  @Column()
  @Exclude()
  @IsString({ message: "A senha deve ser uma string." })
  @Length(8, 32, { message: "A senha deve ter entre 8 e 32 caracteres." })
  password: string;

  @OneToMany(() => Pix, (pix) => pix.user, { cascade: true })
  pix: Pix[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
