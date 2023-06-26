import axios from "axios";

const server_path = "https://acttis-moran-laravel-pdib.vercel.app/restapi/";

export default axios.create({
  baseURL: server_path,
  headers: { "Content-Type": "application/json" },
});
