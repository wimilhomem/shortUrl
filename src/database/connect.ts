import { Pool, PoolClient } from 'pg';

class Db {
  //Conexão com a Base de Dados->

  private pool1 = new Pool({
    //adicionar envconfig
    connectionString: "postgresql://postgres:postgres@localhost:5432/shorturl-db"
  });

  get conection(): Promise<PoolClient> {

    return this.pool1.connect();

  }

}
export default new Db();
