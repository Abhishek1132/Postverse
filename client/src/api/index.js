import axios from "axios";

export const ENDPOINT = "http://localhost:5000/";

const APIURL = ENDPOINT + "api/v1";

const defaultConfig = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const loginUser = (payload) => {
  return axios.post(`${APIURL}/auth/login`, payload, defaultConfig);
};

export const registerUser = (payload) => {
  return axios.post(`${APIURL}/auth/register`, payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const searchUsers = (payload) => {
  return axios.get(`${APIURL}/users/search?q=${payload.q}`, {
    headers: {
      ...defaultConfig.headers,
      authorization: `Bearer ${payload.token}`,
    },
  });
};

export const followUser = (payload) => {
  return axios.patch(
    `${APIURL}/users/follow/${payload.userid}`,
    {},
    {
      headers: {
        ...defaultConfig.headers,
        authorization: `Bearer ${payload.token}`,
      },
    }
  );
};

export const unFollowUser = (payload) => {
  return axios.patch(
    `${APIURL}/users/unfollow/${payload.userid}`,
    {},
    {
      headers: {
        ...defaultConfig.headers,
        authorization: `Bearer ${payload.token}`,
      },
    }
  );
};

export const getUserProfile = (payload) => {
  return axios.get(`${APIURL}/users/profile/${payload.username}`, {
    headers: {
      ...defaultConfig.headers,
      authorization: `Bearer ${payload.token}`,
    },
  });
};
