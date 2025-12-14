import apiSlice from "../api-slice"; 

const publicApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // === Dropdown search products ===
    searchProductsDropdown: builder.query({
      query: ({ search_query, fields, is_published }) => {
        const query = new URLSearchParams();
        if (is_published !== undefined) query.append("is_published", String(is_published));
        if (search_query) query.append("search_query", search_query);
        if (fields) query.append("fields", fields);

        return {
          url: `/product/dropdown?${query.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["PRODUCTS"],
    }),

    // === Get product by slug ===
    getProductBySlug: builder.query({
      query: (slug) => ({
        url: `/product/web/slug/${slug}`,
        method: "GET",
      }),
      providesTags: ["PRODUCTS"],
    }),

    // === Published products with filters ===
    getPublishedProducts: builder.query({
      query: ({
        page,
        limit,
        sortBy,
        sortOrder,
        search_query,
        category,
        min_price,
        max_price,
      }) => {
        const query = new URLSearchParams();
        if (page) query.append("page", page);
        if (limit) query.append("limit", limit);
        if (sortBy) query.append("sortBy", sortBy);
        if (sortOrder) query.append("sortOrder", sortOrder);
        if (search_query) query.append("search_query", search_query);
        if (category) query.append("category", category);
        if (min_price !== undefined) query.append("min_price", min_price);
        if (max_price !== undefined) query.append("max_price", max_price);

        return {
          url: `/product/web/published?${query.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["PRODUCTS"],
    }),

  }),
});

export const {
  useSearchProductsDropdownQuery,
  useGetProductBySlugQuery,
  useGetPublishedProductsQuery
} = publicApi;

export default publicApi;
