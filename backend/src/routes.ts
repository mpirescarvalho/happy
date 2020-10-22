import { Router } from 'express';
import multer from 'multer';

import uploadConfig from './config/upload';

import OrphanagesController from './controllers/OrphanagesController';
import UsersController from './controllers/UsersController';
import SessionController from './controllers/SessionController';

const routes = Router();
const upload = multer(uploadConfig);

routes.get('/orphanages', OrphanagesController.index);
routes.get('/orphanages/:id', OrphanagesController.show);
routes.delete('/orphanages/:id', OrphanagesController.delete);
routes.post('/orphanages', upload.array('images'), OrphanagesController.create);
routes.put(
  '/orphanages/:id',
  upload.array('images'),
  OrphanagesController.update
);

routes.post('/users', UsersController.create);
routes.post('/session', SessionController.create);

export default routes;
