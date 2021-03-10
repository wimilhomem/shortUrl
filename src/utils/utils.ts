import { MIN_HASH, MAX_HASH } from '../config/configApp';

//generate a random stringHash
export function getStringHash(): string {
  const min = MIN_HASH;
  const max = MAX_HASH;
  const size = Math.floor(Math.random() * (max - min)) + min;

  const chrs = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let hash: string = '';
  for (let i = 0; i < size; i++) {
    hash += chrs.charAt(Math.floor(Math.random() * chrs.length));
  }
  return hash;
} 