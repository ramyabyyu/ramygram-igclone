import axios from "axios";
import * as API from "../../helper/apiUrl";

// Get Following Posts
const getFollowingPosts = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// Create New Post
const createPost = async (postData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API.GET_OR_CREATE_POST, postData, config);

  return response.data;
};
