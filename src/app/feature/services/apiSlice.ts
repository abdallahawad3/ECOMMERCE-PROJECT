import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import CookieService from "../../../services/CookieService";
import type { IProduct } from "../../../interfaces";
const jwt = CookieService.get("jwt");
const apiSlice = createApi({
  reducerPath: "api",
  tagTypes: ["Products"],
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:1337/api" }),
  endpoints: (build) => ({
    getDashboardProducts: build.query({
      query: () => {
        return `products?populate=*`;
      },
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }: IProduct) => ({
                type: "Products" as const,
                id,
              })),
              { type: "Products", id: "LIST" },
            ]
          : [{ type: "Products", id: "LIST" }],
    }),
    deleteDashboardProduct: build.mutation({
      query: (id) => {
        return {
          url: `products/${id}`,
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        };
      },
      invalidatesTags: [{ type: "Products", id: "LIST" }],
    }),
  }),
});

export const { useGetDashboardProductsQuery, useDeleteDashboardProductMutation } = apiSlice;
export default apiSlice;
