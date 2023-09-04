import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  deletePost as deletePostService,
  fetchPost,
} from "../../services/postService";

function PostDetails() {
  const [post, setPost] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCurrentPost = async () => {
      try {
        const json = await fetchPost(id);
        setPost(json);
      } catch (e) {
        console.log("An error occurred:", e);
      }
    };
    fetchCurrentPost();
  }, [id]);

  const deletePost = async () => {
    try {
      await deletePostService(post.id);
      navigate("/");
    } catch (error) {
      console.error("Failed to delete the post: ", error);
    }
  };

  if (!post) return <h2>Loading...</h2>;

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <Link to={`/posts/${post.id}/edit`}>Edit</Link>
      {" | "}
      <Link to="/">Back to Posts</Link>
      {" | "}
      <button onClick={deletePost}>Delete</button>
    </div>
  );
}

export default PostDetails;
