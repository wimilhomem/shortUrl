import { Request, Response } from 'express';
import { DURACAO_RED } from '../../config/configApp';

import Url from '../models/Url';

function getStringAleatoria() {
  const min = 5;
  const max = 10;
  const tamanho = Math.floor(Math.random() * (max - min)) + min;

  const charsPossiveis = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let retorno = '';
  for (let i = 0; i < tamanho; i++) {
    retorno += charsPossiveis.charAt(Math.floor(Math.random() * charsPossiveis.length));
  }
  return retorno;
}
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
        console.log('existe hash valido?');

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
      console.log(retorno);

      const host = `${req.protocol}://${req.get('host')}/`; //monta newUrl

      const newUrl = host + retorno.codigoUrlCurta;

      return res.status(201).json({ newUrl });

    } catch (e) {
      console.error(e.message);
      return res.status(500).send();

    }

  }

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
export default new UrlController();