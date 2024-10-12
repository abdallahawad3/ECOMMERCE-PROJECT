import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../config/axios.config";
import type { AxiosRequestConfig } from "axios";
import type { IProduct } from "../interfaces";

interface IAuthenticationQuery {
  queryKey: string[];
  url: string;
  config?: AxiosRequestConfig;
}
const useAuthenticationQuery = ({ queryKey, url, config }: IAuthenticationQuery) => {
  return useQuery<IProduct[]>({
    queryKey,
    queryFn: async () => {
      const { data } = await axiosInstance.get(url, config);
      return data.data;
    },
  });
};

export default useAuthenticationQuery;
