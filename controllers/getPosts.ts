import { Context } from "https://deno.land/x/oak/mod.ts";

import { getPosts } from "../services/postService.ts";

export default async ({
  response,
}: Context) => {
  response.body = await getPosts();
};
