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
