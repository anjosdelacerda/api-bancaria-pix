import { createPix } from "../services/pix.service";
import { Request, Response } from "express";

export const createPixController = async (
  req: Request,
  res: Response
): Promise<any> => {
  const userId = req.user.id;
  const data = req.body;
  console.log("2: userId capturado", userId)
  console.log("3: data recebido", data)
  try {
    const pix = await createPix(data, userId);
    return pix;
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
