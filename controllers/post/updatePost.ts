import { RouterContext } from "https://deno.land/x/oak/mod.ts";

import { IPost } from "../../interface/post.ts";
import { updatePost } from "../../services/postService.ts";

export default async (
  { params, request, response }: RouterContext,
) => {
  const postId = params.id;

  if (!postId) {
    response.status = 400;
    response.body = { msg: "Invalid post id" };
    return;
  }

  if (!request.hasBody) {
    response.status = 400;
    response.body = { msg: "Invalid post data" };
    return;
  }

  const { value } = await request.body();
  const { title, body, is_published }: IPost = value;

  try {
    await updatePost(postId, { title, body, is_published });
    response.body = { msg: "Post updated" };
  } catch (error) {
    response.status = 404;
    response.body = { msg: error.message };
  }
};
