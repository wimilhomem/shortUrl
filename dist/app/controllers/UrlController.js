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
const configApp_1 = require("../../config/configApp");
const utils_1 = require("../../utils/utils");
const Url_1 = __importDefault(require("../models/Url"));
class UrlController {
    store(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //salva url
            const { url } = req.body;
            if (!url) {
                return res.status(400).json({ error: 'url nao informada no body' });
            }
            try {
                const dataExp = new Date();
                const validadeRedir = configApp_1.DURACAO_RED; //validade do redirecionamento em minutos
                dataExp.setMinutes(dataExp.getMinutes() + validadeRedir);
                let stringAleatoria = utils_1.getStringAleatoria();
                let ok = true;
                do {
                    if (!(yield Url_1.default.findOne(stringAleatoria))) {
                        ok = false;
                    }
                    else {
                        stringAleatoria = utils_1.getStringAleatoria();
                    }
                } while (ok);
                const urlObj = {
                    urlOriginal: url,
                    codigoUrlCurta: stringAleatoria,
                    dataExpiracao: dataExp,
                };
                const urlEntity = new Url_1.default(urlObj);
                const retorno = yield urlEntity.save();
                const host = `${req.protocol}://${req.get('host')}/`; //monta newUrl
                const newUrl = host + retorno.codigoUrlCurta;
                return res.status(201).json({ newUrl });
            }
            catch (e) {
                console.error(e.message);
                return res.status(500).send();
            }
        });
    }
}
exports.default = new UrlController();
