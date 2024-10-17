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
        return `products?populate=*&sort=createdAt`;
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
    updateDashboardProduct: build.mutation({
      query: ({ id, formBody }) => ({
        url: `products/${id}`,
        method: "PUT",
        body: formBody,
        headers: {
          Authorization: `Bearer ${jwt}`,
          Accept: "multipart/form-data",
        },
      }),
      onQueryStarted: async ({ id, ...patch }, { dispatch, queryFulfilled }) => {
        const patchResult = dispatch(
          apiSlice.util.updateQueryData("getDashboardProducts", id, (draft) => {
            Object.assign(draft, patch);
          })
        );
        try {
          await queryFulfilled;
        } catch (error) {
          console.error("Request failed:", error);
          patchResult.undo();
        }
      },
      invalidatesTags: [{ type: "Products", id: "LIST" }],
    }),
  }),
});

export const {
  useGetDashboardProductsQuery,
  useDeleteDashboardProductMutation,
  useUpdateDashboardProductMutation,
} = apiSlice;
export default apiSlice;
