import postRepo from "../repositories/postRepo.ts";

import { IPost } from "../interface/post.ts";

// =================
// ==GET ALL POST ==
// =================
export const getPosts = async (): Promise<IPost[]> => {
  const posts = await postRepo.selectAll();

  let result: IPost[] = [];

  posts.rows.map((post) => {
    let obj: any = {};

    posts.rowDescription.columns.map((el, i) => {
      obj[el.name] = post[i];
    });
    result.push(obj);
  });

  return result;
};

// =================
// ==GET ONE POST ==
// =================
export const getPost = async (postId: string): Promise<IPost | null> => {
  const posts = await postRepo.selectById(postId);

  var obj: any = {};

  posts.rows.map((post) => {
    posts.rowDescription.columns.map((el, i) => {
      obj[el.name] = post[i];
    });
  });

  if (Object.keys(obj).length === 0) {
    return null;
  }
  return obj;
};

// ==================
// ==CREATE A POST ==
// ==================
export const createPost = async (postData: IPost): Promise<IPost> => {
  const newPost = {
    title: String(postData.title),
    body: String(postData.body),
    is_published: "is_published" in postData
      ? Boolean(postData.is_published)
      : false,
  };

  await postRepo.create(newPost);

  return newPost;
};

// ==================
// ==UPDATE A POST ==
// ==================
export const updatePost = async (
  postId: string,
  postData: IPost,
): Promise<void> => {
  const post = await getPost(postId);

  if (!post) throw new Error(`Post with id ${postId} not found.`);

  if (Object.keys(post).length === 0 && post.constructor === Object) {
    throw new Error("Post not found");
  }

  const updatedPost = {
    title: postData.title !== undefined ? String(postData.title) : post.title,
    body: postData.body !== undefined ? String(postData.body) : post.body,
    is_published: postData.is_published !== undefined
      ? Boolean(postData.is_published)
      : post.is_published,
  };

  postRepo.update(postId, updatedPost);
};

// ==================
// ==DELETE A POST ==
// ==================
export const deletePost = async (postId: string): Promise<void> => {
  postRepo.delete(postId);
};
