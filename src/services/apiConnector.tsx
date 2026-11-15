import axios, { AxiosRequestConfig, Method } from "axios";
import Cookies from "js-cookie";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("access_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

export const apiConnector = (
  method: Method,
  url: string,
  bodyData?: unknown,
  headers?: AxiosRequestConfig["headers"],
  params?: AxiosRequestConfig["params"],
) => {
  return axiosInstance({
    method,
    url,
    data: bodyData,
    headers,
    params,
  });
};
