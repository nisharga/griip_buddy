import apiSlice from "./api-slice";

export enum CATEGORY_STATUS_ENUM {
  PENDING_APPROVAL = "pending_approval",
  APPROVED = "approved",
  DISABLED = "disabled",
  REJECTED = "rejected",
}

const categoryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // === create category  ===
    createCategory: builder.mutation({
      query: ({ payload }) => ({
        url: `/category`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["CATEGORIES"],
    }),
    // === get all categories  ===
    getAllCategories: builder.query({
      query: () => ({
        url: `/category`,
        method: "GET",
      }),
      providesTags: ["CATEGORIES"],
    }),
    // === get single category  ===
    getSingleCategory: builder.query({
      query: ({ category_id }) => ({
        url: `/category/${category_id}`,
        method: "GET",
      }),
      providesTags: ["CATEGORIES"],
    }),
    // === update category  ===
    updateCategory: builder.mutation({
      query: ({ payload, category_id }) => ({
        url: `/category/${category_id}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["CATEGORIES"],
    }),

    // === update category status ===
    updateCategoryStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/category/${id}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["CATEGORIES"],
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useGetAllCategoriesQuery,
  useGetSingleCategoryQuery,
  useUpdateCategoryMutation,
  useUpdateCategoryStatusMutation,
} = categoryApi;
