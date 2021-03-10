import Db from '../../database/connect';

class Url implements IUrl {


  originalUrl: string;
  shortUrl: string;
  expDate: Date;

  constructor(obj: IUrl) {
    this.originalUrl = obj.originalUrl;
    this.shortUrl = obj.shortUrl;
    this.expDate = obj.expDate;
  }


  async save() {

    const cliente = await new Db().conection;
    let result;

    try {
      const result1 = await cliente.query(
        `INSERT INTO public.urls ("originalUrl", "shortUrl", "expDate") VALUES ($1, $2, $3) RETURNING *`,
        [this.originalUrl, this.shortUrl, this.expDate],
      );
      result = result1.rows[0];


    } catch (error) {
      cliente.release(true);

    } finally {

      cliente.release(true);
      return result;

    }

  }

  static async findOne(shortUrl: string) {

    const db = new Db();

    const cliente = await db.conection;

    const now = new Date(Date.now()).toISOString();
    let result;

    //const shortUrl = 's2ElwP';

    try {//find a valid url redirect
      let result1 = await cliente.query('select * from public.urls where "shortUrl" =$1 and "expDate" > $2', [shortUrl, now]);
      result = result1.rows[0];
    } catch (e) {

      cliente.release(true);
    }
    finally {

      cliente.release(true);
      return result;

    }

  }
}

export default Url;