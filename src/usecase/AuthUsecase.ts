import { Request, Response } from 'express';
import Authentication from '../utils/Authentication';

const db = require('../db/models');

class AuthUsecase {
    register = async (req: Request, res: Response): Promise<Response> => {
      const { username, password } = req.body;
      const hashedPassword: string = await Authentication.passwordHash(password);

      await db.user.create({ username, password: hashedPassword });

      return res.send('registrasi sukses !!');
    }

    login = async (req: Request, res: Response): Promise<Response> => {
      // cari data user by username
      const { username, password } = req.body;

      const user = await db.user.findOne({
        where: { username },
      });

      // check password
      const compare = await Authentication.passwordCompare(password, user.password);

      // generate token
      if (compare) {
        const token = Authentication.generateToken(user.id, username, user.password);
        return res.send({
          token,
        });
      }

      return res.send('auth failed');
    }

    profile = (req: Request, res: Response): Response => res.send(req.app.locals.credential)
}

export default new AuthUsecase();
