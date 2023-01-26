import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'seusecretdetoken';

export default class validateBody {
  public validateJwt = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const token = req.header('Authorization');
    if (!token) {
      return res.status(401).json({ message: 'Token not found' });
    }
    try {
      const decoded = jwt.verify(token, secret);
      req.body.decoded = decoded;
      next();
    } catch (error) {
      return res.status(401).json({ message: 'TOKEN ERROR' });
    }
  };
}
