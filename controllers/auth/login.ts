import { Context } from "https://deno.land/x/oak/mod.ts";

import { login } from "../../services/authService.ts";
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

  try {
    const token = login({ email, password });
    request.headers.set("Authorization", `Bearer ${token}`);
    response.status = 200;
    response.body = { msg: "Login success", token };
  } catch (error) {
    response.status = 400;
    response.body = { msg: error.message };
  }
};
