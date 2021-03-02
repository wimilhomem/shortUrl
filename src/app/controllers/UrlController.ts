import { Request, Response } from 'express';
import { DURACAO_RED } from '../../config/configApp';
import { getStringAleatoria } from '../../utils/utils';

import Url from '../models/Url';

class UrlController {
  async store(req: Request, res: Response): Promise<Response> {
    //salva url
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ error: 'url nao informada no body' });
    }

    try {
      const dataExp = new Date();
      const validadeRedir = DURACAO_RED;//validade do redirecionamento em minutos
      dataExp.setMinutes(dataExp.getMinutes() + validadeRedir);
      let stringAleatoria = getStringAleatoria();

      let ok = true;
      do {
        if (!await Url.findOne(stringAleatoria)) {
          ok = false;

        } else {
          stringAleatoria = getStringAleatoria();
        }
      }
      while (ok);
      const urlObj = {
        urlOriginal: url,
        codigoUrlCurta: stringAleatoria,
        dataExpiracao: dataExp,

      };


      const urlEntity = new Url(urlObj);
      const retorno = await urlEntity.save();

      const host = `${req.protocol}://${req.get('host')}/`; //monta newUrl

      const newUrl = host + retorno.codigoUrlCurta;

      return res.status(201).json({ newUrl });

    } catch (e) {
      console.error(e.message);
      return res.status(500).send();

    }

  }

}
export default new UrlController();