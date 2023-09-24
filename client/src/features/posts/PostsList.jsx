// API_URL comes from the .env.development file
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { deletePost, fetchAllPosts } from "../../services/postService";
import "./PostImage.css";

function PostsList() {
  const [posts, setPosts] = useState([]);
  const [, setLoading] = useState(true);
  const [, setError] = useState(null);
  // Fetch posts from the API
  useEffect(() => {
    async function loadPosts() {
      try {
        const data = await fetchAllPosts();
        setPosts(data);
        setLoading(false);
      } catch (e) {
        setError(e);
        setLoading(false);
        console.error("Failed to fetch posts: ", e);
      }
    }
    loadPosts();
  }, []);

  const deletePostHandler = async (id) => {
    try {
      await deletePost(id);
      setPosts(posts.filter((post) => post.id !== id));
    } catch (e) {
      console.error("Failed to delete the post: ", e);
    }
  };

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id} className="post-container">
          <h2>
            <Link to={`/posts/${post.id}`} className="post-title">
              {post.title}
            </Link>
          </h2>
          <div className="post-image-container">
            {/* Standard image if the url exists */}
            {/* If the url does not exist, render an empty div */}
            {/* of equal size to the standard post-image container */}
            {post.image_url ? (
              <img
                src={post.image_url}
                alt={post.title}
                className="post-image"
              />
            ) : (
              <div className="post-image-stub" />
            )}
          </div>
          <div className="post-links">
            <Link to={`/posts/${post.id}/edit`}>Edit</Link>
            {" | "}
            <button onClick={() => deletePostHandler(post.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PostsList;
