import { Request, Response } from 'express';

import UserService from '../services/user.service';

require('dotenv/config');

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
    const { decoded } = req.body;

    if (typeof decoded !== 'string') {
      return res.status(200).json({ role: decoded.role });
    }
  };
}
