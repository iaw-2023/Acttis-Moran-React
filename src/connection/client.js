import axios from "axios";

const server_path = "http://localhost:8000/restapi";
const vercel_path = "https://best-ai-prompts-backend.vercel.app";

export default axios.create({
  baseURL: vercel_path,
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
