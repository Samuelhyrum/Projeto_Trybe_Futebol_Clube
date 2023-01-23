import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import User from '../models/UserModel';
import Login, { Usuario } from '../interfaces/userInterface';

export default class UserService {
  public generateToken = (user: Usuario) => {
    const payload = { username: user.username, email: user.email, role: user.role };
    return jwt.sign(
      payload,
      process.env.JWT_SECRET as string,
      { algorithm: 'HS256', expiresIn: '1d' },
    );
  };

  public login = async (data: Login) => {
    const { email, password } = data;

    const findByUser = await User.findOne({ where: { email } });

    if (!findByUser) {
      return { type: 'UNAUTHORIZED', message: 'Incorrect email or password' };
    }

    if (bcrypt.compareSync(password, findByUser.dataValues.password)) {
      const token = this.generateToken(
        findByUser,
      );
      return { type: null, message: token };
    }
    return { type: 'unauthorized', message: 'Incorrect email or password' };
  };
}
