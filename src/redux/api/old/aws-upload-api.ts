import apiSlice from "../api-slice";


const awsUploadApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // === create category  ===
    awsUploadFile: builder.mutation({
      query: ({ file }) => ({
        url: `/upload/single`,
        method: "POST",
        body: file,
      }),
    }), 

    // === get all categories  ===
    getAllCategories: builder.query({
      query: () => ({
        url: `/category?limit=100`,
        method: "GET",
      }),
    }),

    // === get all sub categories  ===
    getAllSubCategories: builder.query({
      query: () => ({
        url: `/subcategory?limit=100`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useAwsUploadFileMutation,
  useGetAllCategoriesQuery,
  useGetAllSubCategoriesQuery
} = awsUploadApi;
