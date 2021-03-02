import { MIN_HASH, MAX_HASH } from '../config/configApp';


export function getStringAleatoria(): string {
  const min = MIN_HASH;
  const max = MAX_HASH;
  const tamanho = Math.floor(Math.random() * (max - min)) + min;

  const charsPossiveis = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let retorno = '';
  for (let i = 0; i < tamanho; i++) {
    retorno += charsPossiveis.charAt(Math.floor(Math.random() * charsPossiveis.length));
  }
  return retorno;
}