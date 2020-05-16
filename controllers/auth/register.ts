import { Context } from "https://deno.land/x/oak/mod.ts";
import { hashpw } from "https://deno.land/x/bcrypt/mod.ts";

import { register } from "../../services/authService.ts";
import { IAccount } from "../../interface/account.ts";

export default async ({ request, response }: Context) => {
  if (!request.hasBody) {
    response.status = 400;
    response.body = { msg: "Email and password is required" };
    return;
  }

  const { value } = await request.body();
  const { email, password }: IAccount = value;

  if (!email) {
    response.status = 400;
    response.body = { msg: "Email is required" };
    return;
  }

  if (!password) {
    response.status = 400;
    response.body = { msg: "Password is required" };
    return;
  }

  if (password && password.length < 6) {
    response.status = 400;
    response.body = { msg: "Password at least 6 characters" };
    return;
  }

  try {
    const token = register({ email, password });
    request.headers.set("Authorization", `Bearer ${token}`);
    response.status = 200;
    response.body = {
      msg: "Register success",
      token,
    };
  } catch (error) {
    response.status = 400;
    response.body = { msg: error.message };
  }
};
