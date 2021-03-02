"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("../routes"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = express_1.default();
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(routes_1.default); //routes
let server = app.listen();
let urlHash;
let urlRetorno;
let body = { url: "http://www.google.com" };
let aux;
let aux2;
describe('Testando rotas', () => {
    test("POST /encurtador - success", (done) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield supertest_1.default(app).post("/encurtador").send(body);
        urlHash = String(JSON.parse(response.text).newUrl).split('/')[3];
        urlRetorno = JSON.parse(response.text);
        expect(urlRetorno).toHaveProperty('newUrl');
        expect(response.status).toEqual(201);
        done();
    }));
    test("GET / - sem parametro", (done) => __awaiter(void 0, void 0, void 0, function* () {
        const body = yield supertest_1.default(app).get("/"); //uses the request function that calls on express app instance
        expect(body.status).toEqual(404); //http code 
        done();
    }));
    test("GET / - redireciona urlHash valido", (done) => __awaiter(void 0, void 0, void 0, function* () {
        const body = yield supertest_1.default(app).get("/" + urlHash); //uses the request function that calls on express app instance
        expect(body.status).toEqual(302); //http code 
        done();
    }));
    test("GET /url - urlHash inexistente", (done) => __awaiter(void 0, void 0, void 0, function* () {
        const body = yield supertest_1.default(app).get("/" + 'urlHash123478'); //uses the request function that calls on express app instance
        expect(body.status).toEqual(404); //http code 
        done();
    }));
    afterAll(done => {
        server.close();
        done();
    });
});
