import apiSlice from "./api-slice";

const subcategoryApi = apiSlice.injectEndpoints({
 endpoints: (builder) => ({
  // === create sub category  ===
  createSubCategory: builder.mutation({
   query: ({ payload }) => ({
    url: `/subcategory`,
    method: "POST",
    body: payload,
   }),
   invalidatesTags: ["SUB_CATEGORIES"],
  }),
  // === get all sub categories  ===
  getAllSubCategories: builder.query({
   query: (params?: {
    page?: number;
    limit?: number;
    search_query?: string;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
   }) => ({
    url: `/subcategory`,
    method: "GET",
    params,
   }),
   providesTags: ["SUB_CATEGORIES"],
  }),
  // === get all sub categories by category id  ===
  getAllSubCategoriesByCategoryId: builder.query({
   query: ({ category_id }) => ({
    url: `/subcategory/by-category/${category_id}`,
    method: "GET",
   }),
   providesTags: ["SUB_CATEGORIES_BY_CATEGORY_ID"],
  }),
  // === get single sub category  ===
  getSingleSubCategory: builder.query({
   query: ({ sub_category_id }) => ({
    url: `/subcategory/${sub_category_id}`,
    method: "GET",
   }),
  }),
  // === update sub category  ===
  updateSubCategory: builder.mutation({
   query: ({ payload, sub_category_id }) => ({
    url: `/subcategory/${sub_category_id}`,
    method: "PATCH",
    body: payload,
   }),
   invalidatesTags: ["SUB_CATEGORIES"],
  }),
 }),
});

export const {
 useCreateSubCategoryMutation,
 useGetAllSubCategoriesQuery,
 useGetAllSubCategoriesByCategoryIdQuery,
 useGetSingleSubCategoryQuery,
 useUpdateSubCategoryMutation,
} = subcategoryApi;
