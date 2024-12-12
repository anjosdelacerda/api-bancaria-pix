import { Request, Response } from "express";
import { createUser, loginUser } from "../services/user.services";
import { ILogin } from "../interfaces/login.interface";
import { IUser } from "../interfaces/user.interface";

export const createUserController = async (req: Request, res: Response):Promise<any> => {
  const data = req.body;

  try {
    const user: IUser = await createUser(data);
    return res.status(201).json(user);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message });
    } else {
      return res
        .status(500)
        .json({ message: "An unknown error occurred. Please try again." }); 
    }
  }
};

export const loginUserController = async (req: Request, res: Response):Promise<any> => {
  const data: ILogin = req.body;

  try {
    const token = await loginUser(data);
    return res.status(200).json({ token });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message });
    } else {
      return res
        .status(500)
        .json({ message: "An unknown error occurred. Please try again." });
    }
  }
};
