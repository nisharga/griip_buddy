import apiSliceAuth from "../api-slice-auth";

const vendorApi = apiSliceAuth.injectEndpoints({
 endpoints: (builder) => ({
  // === get single vendor  ===
  getSingleVendor: builder.query({
   query: ({ user_id }) => ({
    url: `/vendor/${user_id}`,
    method: "GET",
   }),
  }),

  // === get all products  ===
  getAllProductsByVendor: builder.query({
   query: ({ vendor_id, params }) => {
    const query = new URLSearchParams();
    if (params?.search_query) query.append("search_query", params.search_query);
    if (params?.status) query.append("status", params.status);
    if (params?.order_id) query.append("order_id", params.order_id);
    if (params?.billing_address?.city)
     query.append("billing_address.city", params.billing_address.city);
    if (params?.order_date?.from)
     query.append("order_date[from]", params.order_date.from);
    if (params?.order_date?.to)
     query.append("order_date[to]", params.order_date.to);
    if (params?.sortBy) query.append("sortBy", params.sortBy);
    if (params?.sortOrder) query.append("sortOrder", params.sortOrder);
    if (params?.page) query.append("page", params.page);
    if (params?.limit) query.append("limit", params.limit);

    return {
     url: `/product/by-vendor/${vendor_id}`, // }?${query.toString()}

     method: "GET",
    };
   },
   providesTags: ["VENDORS"],
  }),

  // === get all vendors  ===
  getAllVendors: builder.query({
   query: () => ({
    url: `/vendor?limit=100`,
    method: "GET",
   }),
   providesTags: ["VENDORS"],
  }),

  // === get all products  ===
  getAllStockByVendorId: builder.query({
   query: ({ vendor_id, params }) => {
    const query = new URLSearchParams();
    if (params?.search_query) query.append("search_query", params.search_query);
    if (params?.status) query.append("status", params.status);
    if (params?.order_id) query.append("order_id", params.order_id);
    if (params?.billing_address?.city)
     query.append("billing_address.city", params.billing_address.city);
    if (params?.order_date?.from)
     query.append("order_date[from]", params.order_date.from);
    if (params?.order_date?.to)
     query.append("order_date[to]", params.order_date.to);
    if (params?.sortBy) query.append("sortBy", params.sortBy);
    if (params?.sortOrder) query.append("sortOrder", params.sortOrder);
    if (params?.page) query.append("page", params.page);
    if (params?.limit) query.append("limit", params.limit);

    return {
     url: `/stock/vendor/${vendor_id}`, // }?${query.toString()}

     method: "GET",
    };
   },
   providesTags: ["VENDORS"],
  }),

  // === update product  ===
  updateVendorProductProductId: builder.mutation({
   query: ({ product_id }) => ({
    url: `/product/${product_id}/toggle-visibility`,
    method: "PATCH",
   }),
   invalidatesTags: ["VENDORS"],
  }),

  // === get all search variants ===
  getAllSearchVariants: builder.query({
   query: ({ page, limit, barcode, vendorId, searchQuery, product_id }) => ({
    url: `/variant/search-by-sku?vendor_id=${vendorId}&search_query=${searchQuery}&page=${page}&limit=${limit}&barcode=${barcode}&product_id=${product_id}`,
    method: "GET",
   }),
   providesTags: ["VENDORS"],
  }),
 }),
});

export const {
 useGetSingleVendorQuery,
 useGetAllProductsByVendorQuery,
 useUpdateVendorProductProductIdMutation,
 useGetAllSearchVariantsQuery,
 useGetAllVendorsQuery,
 useGetAllStockByVendorIdQuery,
} = vendorApi;

export default vendorApi;
