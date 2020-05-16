import { Context } from "https://deno.land/x/oak/mod.ts";

import { IPost } from "../../interface/post.ts";
import { createPost } from "../../services/postService.ts";

export default async ({ request, response }: Context) => {
  if (!request.hasBody) {
    response.status = 400;
    response.body = { msg: "Invalid post data" };
    return;
  }

  const { value } = await request.body();
  const { title, body, is_published }: IPost = value;

  if (!title || !body) {
    response.status = 422;
    response.body = { msg: "Incorrect post data. Title and body are required" };
    return;
  }

  const post = await createPost({ title, body, is_published });

  response.body = { msg: "Post created", post };
};
