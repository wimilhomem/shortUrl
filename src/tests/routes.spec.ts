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
let urlResponse;
let body = { url: "http://www.google.com" };


describe('Routes', () => {

  test("POST /short - success", async done => {


    const response = await request(app).post("/short").send(body);
    urlHash = String(JSON.parse(response.text).newUrl).split('/')[3];
    urlResponse = JSON.parse(response.text);
    expect(urlResponse).toHaveProperty('newUrl');

    expect(response.status).toEqual(201);
    done();
  });

  test("GET / - without params", async done => {
    const body = await request(app).get("/"); //uses the request function that calls on express app instance
    expect(body.status).toEqual(404);//http code 
    done();
  });
  test("GET /urlHash - redirect valid urlShort", async done => {
    const body = await request(app).get("/" + urlHash); //uses the request function that calls on express app instance
    expect(body.status).toEqual(302);//http code 
    done();
  });
  test("GET /url - urlHash nonexistent", async done => {
    const body = await request(app).get("/" + 'urlHash123478');
    expect(body.status).toEqual(404);//http code 
    done();
  });
  afterAll(done => {
    server.close();
    done();
  });

});


