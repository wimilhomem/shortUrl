"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStringAleatoria = void 0;
const configApp_1 = require("../config/configApp");
function getStringAleatoria() {
    const min = configApp_1.MIN_HASH;
    const max = configApp_1.MAX_HASH;
    const tamanho = Math.floor(Math.random() * (max - min)) + min;
    const charsPossiveis = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let retorno = '';
    for (let i = 0; i < tamanho; i++) {
        retorno += charsPossiveis.charAt(Math.floor(Math.random() * charsPossiveis.length));
    }
    return retorno;
}
exports.getStringAleatoria = getStringAleatoria;
