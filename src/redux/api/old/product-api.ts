import apiSliceAuth from "../api-slice-auth";

const productApi = apiSliceAuth.injectEndpoints({
    endpoints: (builder) => ({
        // === create product  ===
        createProduct: builder.mutation({
            query: ({ payload }) => ({
                url: `/product`,
                method: "POST",
                body: payload,
            }),
            invalidatesTags: ["PRODUCTS", "VENDORS"],
        }),
        // === delete product  ===
        deleteProduct: builder.mutation({
            query: ({ product_id }) => ({
                url: `/product/${product_id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["PRODUCTS"],
        }),

        // === get single product  ===
        getSingleProductById: builder.query({
            query: ({ product_id }) => ({
                url: `/product/${product_id}`,
                method: "GET",
            }),
            keepUnusedDataFor: 0,
        }),
        // getProductsByVendor: builder.query({
        //  query: ({ page, limit, vendor_id, search_query }) => ({
        //   url: `/product/by-vendor/${vendor_id}?page=${page}&limit=${limit}&search_query={search_query}`,
        //   method: "GET",
        //  }),
        //  keepUnusedDataFor: 0,
        // }),
        // === get single product for admin view ===
        getSingleProductByIdForAdminView: builder.query({
            query: ({ product_id }) => ({
                url: `/product/${product_id}`,
                method: "GET",
            }),
            keepUnusedDataFor: 0,
        }),
        // === update product  ===
        updateProduct: builder.mutation({
            query: ({ payload, product_id }) => ({
                url: `/product/${product_id}`,
                method: "PATCH",
                body: payload,
            }),
            invalidatesTags: ["PRODUCTS"],
        }),
        // === update product  ===
        updateVariantsByProductId: builder.mutation({
            query: ({ payload, product_id }) => ({
                url: `/variant/by-product/${product_id}`,
                method: "PATCH",
                body: payload,
            }),
            invalidatesTags: ["PRODUCTS"],
        }),

        // === get all search variants ===
        //   getAllSearchVariants: builder.query({
        //    query: ({ page, limit, barcode, searchQuery, product_id }) => ({
        //     url: `/variant/search-by-sku?search_query=${searchQuery}&page=${page}&limit=${limit}&barcode=${barcode}&product_id=${product_id}`,
        //     method: "GET",
        //    }),
        //    providesTags: ["PRODUCTS"],
        //   }),
        getProductByIds: builder.query({
            query: ({ product_ids }) => ({
                url: `/product/web/by-ids?ids=${product_ids.join(",")}`,
                method: "GET",
            }),
        }),
    }),
});

export const {
    useCreateProductMutation,
    useGetSingleProductByIdQuery,
    useGetSingleProductByIdForAdminViewQuery,
    useUpdateVariantsByProductIdMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
    useGetProductByIdsQuery
    //  useGetProductsByVendorQuery,
    //  useGetAllSearchVariantsQuery,
} = productApi;
