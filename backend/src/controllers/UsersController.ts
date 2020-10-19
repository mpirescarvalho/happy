import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import User from '../models/User';
import userView from '../views/users_view';
import * as Yup from 'yup';
import bcrypt from 'bcryptjs';

export default {
  async create(req: Request, res: Response) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(5),
    });

    await schema.validate(req.body, {
      abortEarly: false,
    });

    const password_hash = await await bcrypt.hash(req.body.password, 8);

    const data = {
      name: req.body.name,
      email: req.body.email,
      password: password_hash,
    };

    const usersRepository = getRepository(User);
    const user = usersRepository.create(data);

    await usersRepository.save(user);

    return res.status(201).json(userView.render(user));
  },
};
