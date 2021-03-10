import { Router } from 'express';
import RedirectController from './app/controllers/RedirectController';
import UrlController from './app/controllers/UrlController';

const routes = Router();

routes.post('/short', UrlController.store);
routes.get('/:urlHash', RedirectController.find);
routes.get('/', RedirectController.find);


export default routes;
