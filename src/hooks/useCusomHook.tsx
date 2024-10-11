import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../config/axios.config";
import type { AxiosRequestConfig } from "axios";

interface IAuthenticationQuery {
  queryKey: string[];
  url: string;
  config?: AxiosRequestConfig;
}
const useAuthenticationQuery = ({ queryKey, url, config }: IAuthenticationQuery) => {
  return useQuery({
    queryKey,
    queryFn: async () => {
      const { data } = await axiosInstance.get(url, config);
      return data;
    },
  });
};

export default useAuthenticationQuery;
