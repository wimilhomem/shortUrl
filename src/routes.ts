import { Router } from 'express';
import UrlController from './app/controllers/UrlController';

const routes = Router();

routes.post('/encurtador', UrlController.store);
routes.get('/:idUrl', UrlController.find);
routes.get('/', UrlController.find);


export default routes;
