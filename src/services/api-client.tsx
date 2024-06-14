import axios, { AxiosError } from "axios";
import { API_URL, TokenKey } from "../constant";
import { useQuery } from "@tanstack/react-query";

const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem(TokenKey);

  if (token) {
    console.log("parsedToken.access", token);
    config.headers.Authorization = `Bearer ${token}`;
    config.headers["Content-Type"] = "application/json";
  }

  return config;
});

class APIClient {
  getAll = <T,>(key: string, enabled: boolean) =>
    useQuery<T, AxiosError>({
      queryKey: [key],
      queryFn: () => axiosInstance.get<T>(key).then((res) => res.data),
      staleTime: 24 * 60 * 60 * 1000,
      retry: 0,
      enabled: enabled,
    });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  post = (endpoint: string, options?: any) =>
    axiosInstance.post(endpoint, options).then((res) => res.data);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  put = (endpoint: string, options?: any) =>
    axiosInstance.put(endpoint, options).then((res) => res.data);

  delete = (endpoint: string) =>
    axiosInstance.delete(endpoint).then((res) => res.data);
}

// eslint-disable-next-line react-refresh/only-export-components
export { axiosInstance };

export default APIClient;
