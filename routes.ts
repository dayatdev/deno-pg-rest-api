import { Router } from "https://deno.land/x/oak/mod.ts";

import home from "./controllers/home.ts";
import protectedRoute from "./controllers/protected.ts";
import getPosts from "./controllers/post/getPosts.ts";
import getPostDetails from "./controllers/post/getPostDetails.ts";
import createPost from "./controllers/post/createPost.ts";
import updatePost from "./controllers/post/updatePost.ts";
import deletePost from "./controllers/post/deletePost.ts";

import login from "./controllers/auth/login.ts";
import register from "./controllers/auth/register.ts";

import auth from "./middleware/auth.ts";

const router = new Router();

router
  .get("/", home)
  .get("/posts", getPosts)
  .get("/posts/:id", getPostDetails)
  .get("/protected", auth, protectedRoute)
  .post("/posts", createPost)
  .post("/login", login)
  .post("/register", register)
  .put("/posts/:id", updatePost)
  .delete("/posts/:id", deletePost);

export default router;
