import { Context } from "https://deno.land/x/oak/mod.ts";
import { accounts } from "../db/db.ts";

export default ({ request, response }: Context) => {
  response.type = "text/html";
  response.body = `
    <h1>Deno Project</h1>
    <h3>by dayat.dev</h3>
    <p>Deno.js, Postgress, CRUD, REST API</p>

    <h2>API</h2>
    <ul>
      <li>Get all posts: <a href="/posts">GET /posts</a></li>
      <li>Get post by id: <a href="/posts/1">GET /posts/1</a></li>
      <li>Get protected route: <a href="/protected">GET /protected</a> (Set Authorization Header with 'Bearer {Token}')</li>
      <li>Create a post: POST /posts</li>
      <li>Update a post: PUT /posts/:id</li>
      <li>Delete a post: DELETE /posts/:id</li>
      <li>Register: POST /register (with email and password)</li>
      <li>Login: POST /login (with email and password)</li>
    </ul>
  `;
};
