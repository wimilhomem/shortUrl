import { Pool, PoolClient } from 'pg';

class Db {


  constructor() {

  };

  private pool1 = new Pool(
    {


      connectionString: process.env.DATABASE_URL ? process.env.DATABASE_URL : 'postgres://postgres:postgres@localhost:5432/shorturl-db'
      //, ssl: { rejectUnauthorized: false }

    });

  get conection(): Promise<PoolClient> {


    return this.pool1.connect();


  }
  close() {
    this.pool1.end();
  }

}
export default Db;
