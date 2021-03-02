"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
class Db {
    //Conexão com a Base de Dados->
    constructor() {
        this.str = process.env.NODE_ENV;
        this.pool1 = new pg_1.Pool({
            //adicionar envconfig
            //     Host
            //     ec2-3-232-163-23.compute-1.amazonaws.com
            // Database
            //     d619r1cdchtcqm
            // User
            //     mjzmkkdaeirwun
            // Port
            //     5432
            // Password
            //     ed1ccedca8161c306fbfe44e6cb777295d48170ebb02f5d9bf24dcaab789aab0
            connectionString: process.env.DATABASE_URL
            //connectionString: "postgres://d619r1cdchtcqm:ed1ccedca8161c306fbfe44e6cb777295d48170ebb02f5d9bf24dcaab789aab0@ec2-3-232-163-23.compute-1.amazonaws.com:5432/shorturl-db"
            //connectionString: "postgresql://postgres:postgres@localhost:5432/shorturl-db"
            //connectionString: "postgres://postgres:postgres@postgres:5432/shorturl-db"
        });
    }
    ;
    get conection() {
        return this.pool1.connect();
    }
    close() {
        this.pool1.end();
    }
}
exports.default = Db;
