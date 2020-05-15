import { Context } from "https://deno.land/x/oak/mod.ts";

export default ({ response }: Context) => {
  response.type = "text/html";
  response.body = `
    <h1>Deno Project</h1>
    <h3>by dayat.dev</h3>
    <p>Deno.js, Postgress, CRUD, REST API</p>

    <h2>API</h2>
    <ul>
      <li>Get all posts: <a href="http://localhost:9000/posts">GET /posts</a></li>
      <li>Get post by id: <a href="http://localhost:9000/posts/1">GET /posts/1</a></li>
      <li>Create a post: CREATE /posts</li>
      <li>Update a post: PUT /posts/:id</li>
      <li>Delete a post: DELETE /posts/:id</li>
    </ul>
  `;
};
