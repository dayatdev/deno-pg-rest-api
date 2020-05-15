import { Context, Middleware } from "https://deno.land/x/oak/mod.ts";

export default async ({ response }: Context, nextFn: any) => {
  try {
    await nextFn();
  } catch (err) {
    response.status = 500;
    response.body = { msg: err.message };
  }
};
