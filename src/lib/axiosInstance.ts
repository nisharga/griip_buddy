// // lib/axiosInstance.ts  
// import { API_BASE_URL } from "@/config";
// import axios from "axios";
// import Cookies from "js-cookie";

// const axiosInstance = axios.create({
//   baseURL: API_BASE_URL || "", // adjust base URL
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // Request Interceptor — Attach token to every request
// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = Cookies.get('accessToken'); 

//     if (token) {
//       config.headers["Authorization"] = `${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // Response Interceptor — Handle token errors
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       // removeTokens(); // Logout
//       // Optionally redirect to login
//       console.warn("Unauthorized. Tokens removed.");
//     }
//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;
