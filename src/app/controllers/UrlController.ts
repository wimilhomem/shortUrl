import { Request, Response } from 'express';
import * as yup from 'yup';
import { getStringHash } from '../../utils/utils';

import Url from '../models/Url';

interface IBodyUrl {
  url: string;
  expiresOn?: number;
}
class UrlController {


  async store(req: Request, res: Response): Promise<Response> {

    let body: IBodyUrl;

    const schema = yup.object()
      .shape({
        url: yup.string().required(),
        expiresOn: yup.number().positive().integer()
      })
      .noUnknown(true);


    try {
      //validate json from body
      body = await schema.validate(req.body);
    } catch (error) {

      return res.status(400).json({ error });

    }


    try {
      const dataExp = new Date();
      const validadeRedir = body.expiresOn ? body.expiresOn : 30;//redirect expiration time:default 30 minutes
      dataExp.setMinutes(dataExp.getMinutes() + validadeRedir);
      let ramdomHashString = getStringHash();

      let ok: boolean = true;
      do {
        //build a valid urlHash
        if (!await Url.findOne(ramdomHashString)) {
          ok = false;

        } else {
          ramdomHashString = getStringHash();
        }
      }
      while (ok);

      const urlObj = {
        originalUrl: body.url,
        shortUrl: ramdomHashString,
        expDate: dataExp,

      };


      const urlEntity = new Url(urlObj);

      const result = await urlEntity.save();

      const host = `${req.protocol}://${req.get('host')}/`; //build newUrl

      const newUrl = host + result.shortUrl;

      return res.status(201).json({ newUrl });

    } catch (e) {

      return res.status(500).send();

    }

  }

}
export default new UrlController();