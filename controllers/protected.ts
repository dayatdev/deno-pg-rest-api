import { Context } from "https://deno.land/x/oak/mod.ts";
import {} from "../services/authService.ts";

export default async ({ request, response }: Context) => {
  const userEmail = request.headers.get("userEmail");
  response.status = 200;
  response.body = { msg: "this is protected route", userEmail };
};
