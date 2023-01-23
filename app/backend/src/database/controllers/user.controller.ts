import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import UserService from '../services/user.service';

require('dotenv/config');

const secret = process.env.JWT_SECRET || 'seusecretdetoken';

export default class UserCrotroller {
  constructor(private userSevice = new UserService()) { }

  public login = async (req: Request, res: Response) => {
    const { body } = req;

    if (!body.email || !body.password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    const { type, message } = await this.userSevice.login(body);
    if (type) {
      return res.status(401).json({ message });
    }

    res.status(200).json({ token: message });
  };

  public validateToken = async (req: Request, res: Response) => {
    const token = req.header('Authorization');
    if (!token) {
      return res.status(401).json({ message: 'Token not found' });
    }
    try {
      const decoded = jwt.verify(token, secret);

      if (typeof decoded === 'string') {
        return res.status(401).json({ message: 'Expired or invalid token' });
      }
      return res.status(200).json({ role: decoded.role });
    } catch (err) {
      return res.status(401).json({ message: 'Expired or invalid token' });
    }
  };
}
