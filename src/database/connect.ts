import { Pool, PoolClient } from 'pg';

class Db {
  //Conexão com a Base de Dados->

  constructor() {

  };

  str = process.env.NODE_ENV;

  private pool1 = new Pool({


    //adicionar envconfig

    connectionString: process.env.DATABASE_URL

  });

  get conection(): Promise<PoolClient> {


    return this.pool1.connect();


  }
  close() {
    this.pool1.end();
  }

}
export default Db;
