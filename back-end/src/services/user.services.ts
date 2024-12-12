import { IUser } from "../interfaces/user.interface";
import { ILogin } from "../interfaces/login.interface";
import { User } from "../entities/user.entity";
import { AppDataSource } from "../data-source";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const createUser = async (data: IUser) => {
  const userRepository = AppDataSource.getRepository(User);

  const emailAlreadyExists = await userRepository.findOne({ where: { email: data.email } });

  if (emailAlreadyExists) {
    throw new Error("Email already exists");
  }

  const hashPassword = bcrypt.hashSync(data.password, 10)
  

  const user = new User()

  user.name = data.name 
  user.email = data.email 
  user.cpf = data.cpf
  user.password = hashPassword
  
  userRepository.create(user)
  await userRepository.save(user)

  return user
};

export const loginUser = async (data: ILogin) => {

  const userRepository = AppDataSource.getRepository(User)
  const user = await userRepository.findOne({ where: { email: data.email } });

  if (!user) {
    throw new Error("Invalid email or Password ");
  }

  if (!bcrypt.compareSync(data.password, user.password)) {
    throw new Error("Invalid email or Password ");
  }

  const token = jwt.sign(
    { id: user.id },
    String(process.env.SECRET_KEY),
    {
      expiresIn: "1d",
    }
  );

  return token
}