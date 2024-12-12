import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authUserMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  try {
    let token = req.headers.authorization;
    console.log("1: token recebido", token)

    if (!token) {
      return res.status(401).json({ message: "Token is missing" });
    }

    token = token.split(" ")[1];

    jwt.verify(token, process.env.SECRET_KEY as string, (err, decoded: any) => {
      if (err) {
        return res.status(401).json({ message: "Invalid Token" });
      }

      req.user = {
        id: decoded.id,
      };

      next();
    });
  } catch (err) {
    return res.status(401).json({ message: "Invalid Token" });
  }
};
