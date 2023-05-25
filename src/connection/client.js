import axios from "axios";

const server_path = "https://acttis-moran-laravel-pdib.vearcel.app/restapi/";

export default axios.create({
  baseURL: server_path,
  headers: { "Content-Type": "application/json" },
});

export const handleResponse = (response) => {
  return response;
};

export const handleError = (error) => {
  // Hubo un error en la solicitud
  if (error.response) {
    // El servidor respondió con un código de estado diferente de 2xx
    console.log("Estado de la respuesta:", error.response.status);
    console.log("Datos de la respuesta:", error.response.data);
  } else if (error.request) {
    // No se recibió una respuesta del servidor
    console.log("No se recibió una respuesta del servidor");
  } else {
    // Ocurrió un error al realizar la solicitud
    console.log("Error al realizar la solicitud:", error.message);
  }

  return error;
};
