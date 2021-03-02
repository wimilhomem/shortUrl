
import request from 'supertest';
import express from 'express';
import routes from '../routes';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(routes); //routes
let server = app.listen();

let urlHash: string;
let urlRetorno;
let body = { url: "http://www.google.com" };

let aux: string;
let aux2;
describe('Testando rotas', () => {

  test("POST /encurtador - success", async done => {


    const response = await request(app).post("/encurtador").send(body);
    urlHash = String(JSON.parse(response.text).newUrl).split('/')[3];
    urlRetorno = JSON.parse(response.text);
    expect(urlRetorno).toHaveProperty('newUrl');

    expect(response.status).toEqual(201);
    done();
  });

  test("GET / - sem parametro", async done => {
    const body = await request(app).get("/"); //uses the request function that calls on express app instance
    expect(body.status).toEqual(404);//http code 
    done();
  });
  test("GET / - redireciona urlHash valido", async done => {
    const body = await request(app).get("/" + urlHash); //uses the request function that calls on express app instance
    expect(body.status).toEqual(302);//http code 
    done();
  });
  test("GET /url - urlHash inexistente", async done => {
    const body = await request(app).get("/" + 'urlHash123478'); //uses the request function that calls on express app instance
    expect(body.status).toEqual(404);//http code 
    done();
  });
  afterAll(done => {
    server.close();
    done();
  });

});


