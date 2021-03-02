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
const connect_1 = __importDefault(require("../../database/connect"));
class Url {
    constructor(obj) {
        this.urlOriginal = obj.urlOriginal;
        this.codigoUrlCurta = obj.codigoUrlCurta;
        this.dataExpiracao = obj.dataExpiracao;
    }
    save() {
        return __awaiter(this, void 0, void 0, function* () {
            const cliente = yield new connect_1.default().conection;
            let result;
            try {
                const result1 = yield cliente.query(`INSERT INTO public.urls ("urlOriginal", "codigoUrlCurta", "dataExpiracao") VALUES ($1, $2, $3) RETURNING *`, [this.urlOriginal, this.codigoUrlCurta, this.dataExpiracao]);
                result = result1.rows[0];
            }
            catch (error) {
                cliente.release(true);
            }
            finally {
                cliente.release(true);
                return result;
            }
        });
    }
    static findOne(codigoUrlCurta) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = new connect_1.default();
            const cliente = yield db.conection;
            const dataAtual = new Date(Date.now()).toISOString();
            let result;
            //const codigoUrlCurta = 's2ElwP';
            try { //busca url que ainda não expirou
                let result1 = yield cliente.query('select * from public.urls where "codigoUrlCurta" =$1 and "dataExpiracao" > $2', [codigoUrlCurta, dataAtual]);
                result = result1.rows[0];
            }
            catch (e) {
                console.error(e.message, e.stack);
                cliente.release(true);
            }
            finally {
                cliente.release(true);
                return result;
            }
        });
    }
}
exports.default = Url;
