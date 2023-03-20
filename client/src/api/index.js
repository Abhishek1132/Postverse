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
