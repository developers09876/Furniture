declare module 'js-cookie' {
    interface CookiesStatic {
      get(key: string): string | undefined;
      set(key: string, value: string, options?: any): void;
      remove(key: string): void;
    }
  
    const Cookies: CookiesStatic;
    export default Cookies;
  }
