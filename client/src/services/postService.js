import { POSTS_API_URL, SEARCH_API_URL } from "../constants";

async function fetchAllPosts(page = 1) {
  const response = await fetch(`${POSTS_API_URL}?page=${page}`);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
}

async function fetchPost(id) {
  const response = await fetch(`${POSTS_API_URL}/${id}`);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
}

async function createPost(postData) {
  const response = await fetch(`${POSTS_API_URL}`, {
    method: "POST",
    // Doesn't  need headers because it's a formData
    body: postData,
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
}

async function updatePost(id, postData) {
  const response = await fetch(`${POSTS_API_URL}/${id}`, {
    method: "PUT",
    body: postData,
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
}

async function deletePost(id) {
  const response = await fetch(`${POSTS_API_URL}/${id}`, {
    method: "DELETE",
  });

  // 204 is No Content status
  if (response.status === 204) {
    return null;
  }

  throw new Error(response.statusText);
}

async function searchPosts(query, page = 1) {
  // => api/v1/search + /posts/?q=...
  const response = await fetch(
    `${SEARCH_API_URL}/posts/?q=${query}&page=${page}`
  );
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
}

export {
  createPost,
  deletePost,
  fetchAllPosts,
  fetchPost,
  updatePost,
  searchPosts,
};
