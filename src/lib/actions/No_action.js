import axios from 'axios';

export async function fetchPostsByPage(page, size, skips) {
  const pageSize = size || 3;
  try {
    const response = await axios.post("/api/post", { pageSize, page, skips });
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

export const followUser = async (friendId) => {
  try {
    const response = await axios.put(`/api/user/follow/${friendId}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error following user:', error);
    throw error;
  }
}

export const Unfollow = async (friendId) => {
  try {
    const response = await axios.put(`/api/user/unfollow/${friendId}`);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error following user:', error);
    throw error;
  }
}

export const LikePost = async (postId) => {
  try {
    const response = await axios.put(`/api/post/like/${postId}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error liking post:', error);
    return { error: 'Internal Server Error' };
  }
};

export const DislikePost = async (postId) => {
  try {
    const response = await axios.put(`/api/post/unlike/${postId}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error disliking post:', error);
    return { error: 'Internal Server Error' };
  }
};

export const saveUserPost = async (postId) => {
  try {
    const response = await axios.put(`/api/user/savePost/${postId}`);
    return response.data;
  } catch (error) {
    console.error('Error saving post:', error);
    return { message: 'Internal Server Error' };
  }
};

export const removeUserSavedPost = async (postId) => {
  try {
    const response = await axios.put(`/api/user/unsavePost/${postId}`);
    return response.data;
  } catch (error) {
    console.error('Error removing saved post:', error);
    return { message: 'Internal Server Error' };
  }
};
export const GetUser = async (id) => {
  try {
    const response = await axios.get(`/api/user/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error removing saved post:', error);
    return { message: 'Internal Server Error' };
  }
};


export const GetPopularStar = async () => {
  try {
    const response = await axios.get(`/api/user/trending`);
    const users = response.data.user;

    // Sort the users based on the number of followers in descending order
    users.sort((a, b) => b.followers.length - a.followers.length);

    // Get the top 5 users with the maximum number of followers
    const topUsers = users.slice(0, 5);

    return topUsers;
  } catch (error) {
    console.error('Error fetching popular users:', error);
    return { message: 'Internal Server Error' };
  }
};

export const GetSavePostData = async (id) => {
  try {
    const response = await axios.get(`/api/user/getSavePost/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error getting user:', error);
    return { message: 'Internal Server Error' };
  }
};
