import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import config from "../config/config";

interface MyRequest extends Request {
  userId?: string;
  email?: string;
}

export const authMiddleware = (
  req: MyRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Missing token" });
  }

  jwt.verify(token, config.jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const decodedToken = decoded as { userId: string; email: string };
    req.userId = decodedToken.userId;
    req.email = decodedToken.email;

    if (req.email === "admin@mail.com") {
      next();
    } else {
      // Si no es un administrador, verifica si la ruta actual está permitida
      const authorizedRoutes = [
        "/view/zones",
        "/view/species",
        "/view/animals",
        "/comment",
        "/:commentId/reply",
      ];
      if (authorizedRoutes.includes(req.path)) {
        next();
      } else {
        return res.status(403).json({ message: "Unauthorized" });
      }
    }
  });
};
