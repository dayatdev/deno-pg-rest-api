import { Router } from "https://deno.land/x/oak/mod.ts";

import home from "./controllers/home.ts";
import getPosts from "./controllers/getPosts.ts";
import getPostDetails from "./controllers/getPostDetails.ts";
import createPost from "./controllers/createPost.ts";
import updatePost from "./controllers/updatePost.ts";
import deletePost from "./controllers/deletePost.ts";

const router = new Router();

router
  .get("/", home)
  .get("/posts", getPosts)
  .get("/posts/:id", getPostDetails)
  .post("/posts", createPost)
  .put("/posts/:id", updatePost)
  .delete("/posts/:id", deletePost);

export default router;
