import { Request, Response } from 'express';



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
  async store(req: Request, res: Response) {
    //salva url
    // const { url } = req.body;

    const host = `${req.protocol}://${req.get('host')}/`;

    const stringAlet = getStringAleatoria();

    const newUrl = host + stringAlet;



    return res.status(200).json({ newUrl });

  }

  async find(req: Request, res: Response) {

    const { idUrl } = req.params;
    console.log(req.protocol);


    const redirecionaUrl = 'https://www.globo.com';

    if (idUrl) {
      //busca no banco a url
      if (idUrl === 'aaa') {
        return res.redirect(redirecionaUrl);
      } else {
        return res.sendStatus(404);
      }
    }


    return res.sendStatus(404);
  }

}
export default new UrlController();