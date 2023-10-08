import { useState, useEffect } from "react";
import { fetchAllPosts, searchPosts } from "../services/postService";

function usePostsData(searchTerm, page = 1) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPosts, setTotalPosts] = useState(0); // New state for total posts count
  const [perPage, setPerPage] = useState(10); // New state for per page count

  useEffect(() => {
    async function loadPosts() {
      try {
        let data;
        if (searchTerm) {
          data = await searchPosts(searchTerm, page);
        } else {
          data = await fetchAllPosts(page);
        }
        if (data.posts) {
          setPosts(data.posts);
          setTotalPosts(data.total_count); // Update total posts count
          setPerPage(data.per_page); // Update per page count
        }
        setLoading(false);
      } catch (e) {
        setError(e);
        setLoading(false);
        console.error("Failed to fetch posts: ", e);
      }
    }
    loadPosts();
  }, [searchTerm, page]);

  return { posts, loading, error, totalPosts, perPage };
}

export default usePostsData;
