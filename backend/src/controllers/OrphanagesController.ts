import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Orphanage from '../models/Orphanage';
import Image from '../models/Image';
import orphanageView from '../views/orphanages_view';
import * as Yup from 'yup';

export default {
  async index(req: Request, res: Response) {
    const orphanagesRepository = getRepository(Orphanage);

    const { pending } = req.query;

    let where = {
      pending: pending === 'true',
    };

    const orphanages = await orphanagesRepository.find({
      relations: ['images'],
      where,
    });

    return res.json(orphanageView.renderMany(orphanages));
  },

  async show(req: Request, res: Response) {
    const { id } = req.params;

    const orphanagesRepository = getRepository(Orphanage);

    const orphanage = await orphanagesRepository.findOneOrFail(id, {
      relations: ['images'],
    });

    return res.json(orphanageView.render(orphanage));
  },

  async create(req: Request, res: Response) {
    const {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
    } = req.body;

    const orphanagesRepository = getRepository(Orphanage);

    const requestImages = req.files as Express.Multer.File[];

    const images = requestImages.map(image => ({
      path: image.filename,
    }));

    const data = {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends: open_on_weekends === 'true',
      pending: true,
      images,
    };

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
      about: Yup.string().required().max(300),
      instructions: Yup.string().required(),
      opening_hours: Yup.string().required(),
      open_on_weekends: Yup.boolean().required(),
      images: Yup.array(
        Yup.object().shape({
          path: Yup.string().required(),
        })
      ),
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    const orphanage = orphanagesRepository.create(data);

    await orphanagesRepository.save(orphanage);

    return res.status(201).json(orphanageView.render(orphanage));
  },

  async update(req: Request, res: Response) {
    const { id } = req.params;

    const {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
      pending,
    } = req.body;

    const orphanagesRepository = getRepository(Orphanage);
    const imagesRepository = getRepository(Image);

    const requestImages = req.files as Express.Multer.File[];

    const images = requestImages.map(image => ({
      path: image.filename,
    }));

    const data = {
      id: Number(id),
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends: open_on_weekends === 'true',
      pending: !pending || pending === 'true',
      images,
    };

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
      about: Yup.string().required().max(300),
      instructions: Yup.string().required(),
      opening_hours: Yup.string().required(),
      open_on_weekends: Yup.boolean().required(),
      pending: Yup.boolean().required(),
      images: Yup.array(
        Yup.object().shape({
          path: Yup.string().required(),
        })
      ),
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    const exists = await orphanagesRepository.findOne(id);

    if (!exists) {
      return res.status(404).json({ message: 'Orphanage not found' });
    }

    //TODO: improve images updating

    await imagesRepository.delete({ orphanage_id: Number(id) });

    const orphanage = await orphanagesRepository.save(data);

    return res.status(201).json(orphanageView.render(orphanage));
  },

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    const orphanagesRepository = getRepository(Orphanage);

    const orphanage = await orphanagesRepository.findOne(id);

    if (!orphanage) {
      return res.status(404).json({ message: 'Orphanage not found' });
    }

    await orphanagesRepository.remove(orphanage);

    return res.status(200).json({ message: 'Orphanage deleted' });
  },
};
