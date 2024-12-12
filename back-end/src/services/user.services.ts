import { IUser } from "../interfaces/user.interface";
import { User } from "../entities/user.entity";
import { AppDataSource } from "../data-source";

const createUser = async (data: IUser) => {
  const userRepository = AppDataSource.getRepository(User);
  const users = await userRepository.find();

  const emailAlreadyExists = users.find((user) => user.email === data.email);

  if (emailAlreadyExists) {
    throw new Error("Email already exists");
  }
};
