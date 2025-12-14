
import apiSliceAuth from "./api-slice-auth";

const supplierApi = apiSliceAuth.injectEndpoints({
  endpoints: (builder) => ({
    // === create supplier === 
    createSupplier: builder.mutation({
      query: ({ payload }) => ({
        url: `/supplier`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["SUPPLIERS"],
    }),

    // === get all suppliers ===
    getAllSuppliers: builder.query({
      query: (params) => {
        const query = new URLSearchParams();

        if (params?.search_query) query.append("search_query", params.search_query);
        if (params?.status) query.append("status", params.status); 
        if (params?.sortBy) query.append("sortBy", params.sortBy);
        if (params?.sortOrder) query.append("sortOrder", params.sortOrder);
        if (params?.page) query.append("page", params.page);
        if (params?.limit) query.append("limit", params.limit);
        if (params?.type) query.append("type", params.type);

        return {
          url: `/supplier?${query.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["SUPPLIERS"],
    }),

    // === get single supplier ===
    getSingleSupplier: builder.query({
      query: ({ supplier_id }) => ({
        url: `/supplier/${supplier_id}`,
        method: "GET",
      }),
    }),

    // === update supplier ===
    updateSupplier: builder.mutation({
      query: ({ payload, supplier_id }) => ({
        url: `/supplier/${supplier_id}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["SUPPLIERS"],
    }),

    // === delete supplier ===
    deleteSupplier: builder.mutation({
      query: ({ supplier_id }) => ({
        url: `/supplier/${supplier_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SUPPLIERS"],
    }),
  }),
});

export const {
  useCreateSupplierMutation,
  useGetAllSuppliersQuery,
  useGetSingleSupplierQuery,
  useUpdateSupplierMutation,
  useDeleteSupplierMutation,
} = supplierApi;

export default supplierApi;
