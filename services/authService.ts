import { hashpw, checkpw } from "https://deno.land/x/bcrypt/mod.ts";
import { validateJwt } from "https://deno.land/x/djwt/validate.ts";
import {
  makeJwt,
  setExpiration,
  Jose,
  Payload,
} from "https://deno.land/x/djwt/create.ts";

import { accounts } from "../db/db.ts";
import { JWT_SECRET } from "../config/jwt.ts";
import { IAccount } from "../interface/account.ts";

const createJwtToken = (email: string) => {
  const payload: Payload = {
    userEmail: email,
    exp: setExpiration(new Date().getTime() + 60 * 60 * 1000),
  };

  const header: Jose = {
    alg: "HS256",
    typ: "JWT",
  };

  const token = makeJwt({ header, payload, key: JWT_SECRET });

  return token;
};

export const verifyJwtToken = async (token?: string) => {
  if (!token) {
    throw new Error("Invalid token");
  }
  const jwtObj = await validateJwt(token, JWT_SECRET, { isThrowing: false });

  if (!jwtObj) {
    throw new Error("Invalid token");
  }

  return jwtObj;
};

export const login = ({ email, password }: IAccount) => {
  const foundAcc = accounts.find((acc) => acc.email === email);
  if (!foundAcc) {
    throw new Error("Email or password incorrect!");
  }

  const isPasswordMatch = checkpw(password, foundAcc.password);
  if (!isPasswordMatch) {
    throw new Error("Email or password incorrect!");
  }

  return createJwtToken(email);
};

export const register = ({ email, password }: IAccount) => {
  if (accounts.find((acc) => acc.email === email)) {
    throw new Error("Email already exists");
  }

  const hashPassword = hashpw(password);

  accounts.push({ email, password: hashPassword });

  return createJwtToken(email);
};
