import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import User from '../models/User';
import userView from '../views/users_view';
import * as Yup from 'yup';
import jwt from 'jsonwebtoken';
import authConfig from '../config/auth';

export default {
  async create(req: Request, res: Response) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required().min(5),
    });

    await schema.validate(req.body, {
      abortEarly: false,
    });

    const { email, password } = req.body;

    const usersRepository = getRepository(User);
    const user = await usersRepository.findOne({
      where: { email },
    });

    if (!user) {
      return res
        .status(401)
        .json({ message: 'User not found', errors: { email: true } });
    }

    if (!(await user.checkPassword(password))) {
      return res
        .status(401)
        .json({
          message: 'Password does not match',
          errors: { password: true },
        });
    }

    return res.json({
      user: userView.render(user),
      token: jwt.sign({ id: user.id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  },
};
