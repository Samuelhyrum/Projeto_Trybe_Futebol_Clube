import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'seusecretdetoken';

export default function validateBody(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }
  const decoded = jwt.verify(token, secret);

  if (typeof decoded !== 'string') {
    return res.status(200).json({ role: decoded.role });
  }
  next();
}
