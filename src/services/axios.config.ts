import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
    "https://sushiserver-bbabf5dvhsdperbb.southeastasia-01.azurewebsites.net/api",
});

axiosInstance.interceptors.request.use(
  (request) => {
    console.log(request);
    // Edit request config
    return request;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    console.log(response);
    // Edit response config
    return response;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
