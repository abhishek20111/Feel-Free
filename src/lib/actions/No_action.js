import axios from 'axios';

export async function fetchPostsByPage(page) {
  const pageSize = 3;
  try {
    const response = await axios.post("/api/post", { pageSize, page });
    return response.data.posts;
  } catch (error) {
    console.error("Error fetching data:", error.response.data);
    throw error;
  }
}

export const deletePost = async (id) => {
  try {
    const response = await axios.delete(`/api/post/${id}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    // If there's an error, log the error
    console.error('Error deleting post:', error);
    throw error;
  }
};

