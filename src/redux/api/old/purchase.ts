 
import apiSliceAuth from "../api-slice-auth";

const purchaseApi = apiSliceAuth.injectEndpoints({
  endpoints: (builder) => ({
    // === create purchase ===
    createPurchase: builder.mutation({
      query: ({ payload }) => ({
        url: `/purchase`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["PURCHASES"],
    }),

    // === get all purchases ===
    getAllPurchases: builder.query({
      query: (params) => {
        const query = new URLSearchParams();

        if (params?.search_query) query.append("search_query", params.search_query);
        if (params?.status) query.append("status", params.status);
        if (params?.sortBy) query.append("sortBy", params.sortBy);
        if (params?.sortOrder) query.append("sortOrder", params.sortOrder);
        if (params?.page) query.append("page", params.page);
        if (params?.limit) query.append("limit", params.limit);

        return {
          url: `/purchase?${query.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["PURCHASES"],
    }),
 
   // === get purchases by vendorId ===
    getPurchaseByVendorId: builder.query({
    query: ({ id, ...params }) => {
      const query = new URLSearchParams();

      if (params?.search_query) query.append("search_query", params.search_query);
      if (params?.status) query.append("status", params.status);
      if (params?.sortBy) query.append("sortBy", params.sortBy);
      if (params?.sortOrder) query.append("sortOrder", params.sortOrder);
      if (params?.page) query.append("page", params.page);
      if (params?.limit) query.append("limit", params.limit);

      return {
        url: `/purchase/vendor/${id}?${query.toString()}`,
        method: "GET",
      };
    },
    providesTags: ["PURCHASES"],
    }),
  
    // === get single purchase ===
    getSinglePurchase: builder.query({
      query: ({ id }) => ({
        url: `/purchase/${id}`,
        method: "GET",
      }),
    }), 
     
    // === update purchase status ===
    updatePurchaseStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/purchase/${id}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["PURCHASES"],
    }),

    // === delete purchase ===
    deletePurchase: builder.mutation({
      query: ({ id }) => ({
        url: `/purchase/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["PURCHASES"],
    }),
  }),
});

export const {
  useCreatePurchaseMutation,
  useGetAllPurchasesQuery,
  useGetSinglePurchaseQuery,
  useUpdatePurchaseStatusMutation,
  useDeletePurchaseMutation,
  useGetPurchaseByVendorIdQuery
} = purchaseApi;

export default purchaseApi;
