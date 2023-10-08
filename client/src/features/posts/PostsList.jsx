// API_URL comes from the .env.development file
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { deletePost } from "../../services/postService";
import "./PostImage.css";

import SearchBar from "./SearchBar";
import usePostsData from "../../hooks/usePostsData";
import useURLSearchParam from "../../hooks/useURLSearchParam";

function PostsList() {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] =
    useURLSearchParam("search");
  const {
    posts: fetchedPosts,
    loading,
    error,
  } = usePostsData(debouncedSearchTerm); // Note the change here

  useEffect(() => {
    if (fetchedPosts) {
      setPosts(fetchedPosts); // Update the posts state once fetchedPosts is available
    }
  }, [fetchedPosts]);
  console.log("Test");

  const deletePostHandler = async (id) => {
    try {
      await deletePost(id);
      setPosts(posts.filter((post) => post.id !== id));
    } catch (e) {
      console.error("Failed to delete the post: ", e);
    }
  };

  const handleImmediateSearchChange = (searchValue) => {
    setSearchTerm(searchValue);
  };

  const handleDebouncedSearchChange = (searchValue) => {
    setDebouncedSearchTerm(searchValue);
  };

  return (
    <div>
      <SearchBar
        value={searchTerm}
        onSearchChange={handleDebouncedSearchChange}
        onImmediateChange={handleImmediateSearchChange}
      />
      {loading && <p>Loading...</p>}
      {error && <p>Error loading posts.</p>}
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
              <div className="post-image-stub" data-testid="post-image-stub" />
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
