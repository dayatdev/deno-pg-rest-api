import client from "../db/database.ts";

import { IPost } from "../interface/post.ts";

class PostRepo {
  create(post: IPost) {
    return client.query(
      "INSERT INTO posts (title, body, is_published) VALUES ($1, $2, $3)",
      post.title,
      post.body,
      post.is_published,
    );
  }

  selectAll() {
    return client.query("SELECT * FROM posts ORDER BY id");
  }

  selectById(id: string) {
    return client.query(`SELECT * FROM posts WHERE id = $1`, id);
  }

  update(id: string, post: IPost) {
    var query = `UPDATE posts `;
    var hasSet = false;
    if (post.title !== undefined) {
      query += ` SET title = '${post.title}'` +
        ((post.body !== undefined || post.is_published !== undefined)
          ? ","
          : "");
      hasSet = true;
    }

    if (post.body !== undefined) {
      if (!hasSet) query += " SET ";
      query += ` body = '${post.body}'` +
        (post.is_published !== undefined ? "," : "");
      hasSet = true;
    }

    if (post.is_published !== undefined) {
      if (!hasSet) query += " SET ";
      query += ` is_published = '${post.is_published}'`;
    }

    query += ` WHERE id = ${id}`;
    return client.query(query);
  }

  delete(id: string) {
    return client.query(`DELETE FROM posts WHERE id = $1`, id);
  }
}

export default new PostRepo();
