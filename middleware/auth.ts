import { Context } from "https://deno.land/x/oak/mod.ts";
import { verifyJwtToken } from "../services/authService.ts";

export default async ({ response, request }: Context, next: any) => {
  const token = request.headers.get("Authorization")?.split(" ")[1];

  if (!token) {
    response.status = 403;
    response.body = { msg: "Unautherized, you need to login" };
  }

  try {
    const jwtObj = await verifyJwtToken(token);
    const userEmail = jwtObj?.payload?.userEmail?.toString() || "";
    request.headers.set("userEmail", userEmail);
    await next();
  } catch (error) {
    response.status = 403;
    response.body = { error: "Unauthorized" };
  }
};
