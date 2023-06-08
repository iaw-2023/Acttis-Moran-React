import axios from "axios";

//const server_path = "https://acttis-moran-laravel-pdib.vercel.app/restapi/";
const server_path = "http://127.0.0.1:8000/restapi/";

export default axios.create({
  baseURL: server_path,
  headers: { "Content-Type": "application/json" },
});
