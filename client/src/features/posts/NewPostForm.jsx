import { useNavigate } from "react-router-dom";
import { createPost } from "../../services/postService";
import PostForm from "./PostForm";

function NewPostForm() {
  const navigate = useNavigate();

  const handleCreateSubmit = async (rawData) => {
    // lets create the formData object
    const formData = new FormData();
    // Can't just be the raw fields,
    // needs to be wrappped in a post[field_name]
    formData.append("post[title]", rawData.title);
    formData.append("post[body]", rawData.body);
    formData.append("post[image]", rawData.image);
    try {
      const response = await createPost(formData);
      navigate(`/posts/${response.id}`);
    } catch (e) {
      console.error("Failed to create post: ", e);
    }
  };

  return (
    <PostForm
      headerText="Create a New Post"
      onSubmit={handleCreateSubmit}
      buttonText="Create Post"
    />
  );
}

export default NewPostForm;
