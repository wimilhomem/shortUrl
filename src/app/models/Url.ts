import Db from '../../database/connect';

interface IUrl {
  urlOriginal: string;
  codigoUrlCurta: string;
  dataExpiracao: Date;
}

class Url implements IUrl {


  urlOriginal: string; codigoUrlCurta: string; dataExpiracao: Date;

  constructor(obj: IUrl) {
    this.urlOriginal = obj.urlOriginal;
    this.codigoUrlCurta = obj.codigoUrlCurta;
    this.dataExpiracao = obj.dataExpiracao;
  }


  async save() {

    const cliente = await Db.conection;
    let result;

    try {
      const result1 = await cliente.query(
        `INSERT INTO public.urls ("urlOriginal", "codigoUrlCurta", "dataExpiracao") VALUES ($1, $2, $3) RETURNING *`,
        [this.urlOriginal, this.codigoUrlCurta, this.dataExpiracao],
      );
      result = result1.rows[0];

    } catch (error) {

    } finally {
      return result;
      cliente.release(true);
    }

  }

  static async findOne(codigoUrlCurta: string) {
    const cliente = await Db.conection;
    const dataAtual = new Date(Date.now()).toISOString();
    let result;
    //const codigoUrlCurta = 's2ElwP';

    try {//busca url que ainda não expirou
      let result1 = await cliente.query('select * from public.urls where "codigoUrlCurta" =$1 and "dataExpiracao" > $2', [codigoUrlCurta, dataAtual])
      console.log('hello from', result1.rows[0])
      result = result1.rows[0];
    } catch (e) { console.error(e.message, e.stack) }
    finally {
      return result;
      cliente.release(true);
    }

  }
}

export default Url;