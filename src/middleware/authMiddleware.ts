// src/middleware/authMiddleware.ts

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { RequestWithUser, Role, TokenByRole, User } from "../interfaces";
import { RoleModel, UserModel } from "../models";

export const authMiddleware = (allowedRoles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header("Authorization");

    if (!token) {
      return res.status(401).json({ error: "Unauthorized - Token sağlanmadı " });
    }

    try {
      const decoded: TokenByRole = jwt.verify(token, process.env.SECRET_TOKEN || "") as TokenByRole;

      if (!decoded) {
        return res.status(401).json({ error: "Unauthorized - Geçersiz token" });
      }

      const role: Role | null = await RoleModel.findById(decoded.role_id);
      if (allowedRoles.length > 0) {
        if (!allowedRoles.includes(role?.name || "")) {
          return res.status(403).json({ error: "Forbidden - Yetkisiz erişim" });
        }
      }
      const foundUser: User | null = await UserModel.findById(decoded._id);

      if (!foundUser) {
        return res.status(404).json({ message: "authMiddleware - Kullanıcı bulunamadı" });
      }

      (req as RequestWithUser).user = foundUser;
      next();
    } catch (error) {
      return res.status(401).json({ error: "Unauthorized - Geçersiz token" });
    }
  };
};
