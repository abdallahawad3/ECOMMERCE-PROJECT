import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiSlice = createApi({
  reducerPath: "api",
  tagTypes: ["Products"],
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:1337/api" }),
  endpoints: (build) => ({
    getDashboardProducts: build.query({
      query: (arg) => {
        console.log(arg);
        return `products?populate=*`;
      },
    }),
  }),
});

export const { useGetDashboardProductsQuery } = apiSlice;
export default apiSlice;
