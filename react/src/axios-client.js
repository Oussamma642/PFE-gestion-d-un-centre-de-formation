import axios from "axios";

// const axiosClient = axios.create({
//   baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
// });

const axiosClient = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
  },
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("ACCESS_TOKEN");
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  
  (error) => {

    try {
      const { response } = error;
      if (response === 401) {
        localStorage.removeItem("ACCESS_TOKEN");
      }
    } catch (error) {
      console.error(error);
    }

    throw error;
  }
);

export default axiosClient;
