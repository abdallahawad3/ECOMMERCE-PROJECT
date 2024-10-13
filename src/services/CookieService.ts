import Cookies from "universal-cookie";
import type { CookieOptions } from "../interfaces";

const cookies = new Cookies();

class CookieServices {
  //** GET
  get(name: string) {
    return cookies.get(name);
  }

  //*? SET
  set(name: string, val: string, options: CookieOptions) {
    return cookies.set(name, val, options);
  }

  //*! REMOVE
  remove(name: string) {
    return cookies.remove(name);
  }
}

export default new CookieServices();
