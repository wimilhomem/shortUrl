import { Request, Response } from 'express';


import Url from '../models/Url';
class RedirectController {

  async find(req: Request, res: Response): Promise<Response | void> {

    const { urlHash } = req.params;


    if (!!urlHash) {
      //Find url hash
      const url: IUrl = await Url.findOne(urlHash);

      if (!!url) {

        return res.redirect(url.originalUrl);//redirect to url
      } else {
        return res.sendStatus(404);
      }
    }


    return res.sendStatus(404);
  }


}
export default new RedirectController();