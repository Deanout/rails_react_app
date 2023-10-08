import { useState, useEffect } from "react";
import { fetchAllPosts, searchPosts } from "../services/postService";

function usePostsData(searchTerm) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadPosts() {
      try {
        let data;
        if (searchTerm) {
          data = await searchPosts(searchTerm);
        } else {
          data = await fetchAllPosts();
        }
        setPosts(data);
        setLoading(false);
      } catch (e) {
        setError(e);
        setLoading(false);
        console.error("Failed to fetch posts: ", e);
      }
    }
    loadPosts();
  }, [searchTerm]);

  return { posts, loading, error };
}

export default usePostsData;
