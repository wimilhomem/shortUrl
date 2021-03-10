export { };
declare global {
  namespace jest {
    interface Matchers<R> {
      toBeWithinRange(a: number, b: number): R;
    }
  }
  interface IUrl {
    originalUrl: string;
    shortUrl: string;
    expDate: Date;
  }
}

