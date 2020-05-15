import { RouterContext } from "https://deno.land/x/oak/mod.ts";

import { getPost, deletePost } from "../services/postService.ts";

export default async ({
  params,
  response,
}: RouterContext) => {
  const postId = params.id;

  if (!postId) {
    response.status = 400;
    response.body = { msg: "Invalid post id" };
    return;
  }

  const foundPost = await getPost(postId);

  if (!foundPost) {
    response.status = 404;
    response.body = { msg: `Post with ID ${postId} not found` };
    return;
  }

  await deletePost(postId);
  response.body = { msg: "Post deleted" };
};
