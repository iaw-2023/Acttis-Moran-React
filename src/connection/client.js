import axios from "axios";

const server_path = "http://localhost:8000/restapi";

export default axios.create({
  baseURL: server_path,
  headers: { "Content-Type": "application/json" },
});

export const axiosAuth = (accessToken) =>
  axios.create({
    baseURL: server_path,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
  });
