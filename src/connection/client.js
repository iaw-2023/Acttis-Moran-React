import axios from "axios";

const server_path = "http://localhost:8000/restapi";
const vercel_path = "https://best-ai-prompts-backend.vercel.app/restapi";

export default axios.create({
  baseURL: vercel_path,
  cors: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
  },
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
