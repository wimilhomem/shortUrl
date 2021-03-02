import { Request, Response } from 'express';


import Url from '../models/Url';
class RedirectController {

  async find(req: Request, res: Response): Promise<Response | void> {

    const { urlHash } = req.params;


    if (!!urlHash) {
      //busca no banco o hash da url
      const url = await Url.findOne(urlHash);

      if (!!url) {
        return res.redirect(url.urlOriginal);
      } else {
        return res.sendStatus(404);
      }
    }


    return res.sendStatus(404);
  }


}
export default new RedirectController();