 
import apiSlice from "./api-slice";
import { product_data } from "@/src/lib/data";
 
const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // === create category  ===
  /*   createCategory: builder.mutation({
      query: ({ payload }) => ({
        url: `/category`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["CATEGORIES"],
    }), */
    // === get all categories  ===
    /* getAllCategories: builder.query({
      query: () => ({
        url: `/category`,
        method: "GET",
      }),
      providesTags: ["CATEGORIES"],
    }), */

    getAllProducts: builder.query({
      async queryFn() {
        // ⏳ simulate 1s loading
        await new Promise((resolve) => setTimeout(resolve, 1000)); 
        return {
          data: product_data,
        };
      },
      providesTags: ["PRODUCTS"],
    }),

    getSearchProducts: builder.query({
      async queryFn(searchTerm) {
        // ⏳ simulate real API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        if (!searchTerm.trim()) {
          return { data: [] };
        }
        await new Promise((resolve) => setTimeout(resolve, 1000)); 
        const filtered = product_data?.filter((item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        return { data: filtered };
      },
    }),

    getSingleProduct: builder.query({
      async queryFn(slug: string) {
        // ⏳ simulate 1s loading
        await new Promise((resolve) => setTimeout(resolve, 2000));

        const product = product_data.find(
          (item) => item.slug === slug
        );

        if (!product) {
          return {
            error: {
              status: 404,
              data: "Product not found",
            },
          };
        }

        return {
          data: product,
        };
      },
      providesTags: (_result, _error, slug) => [
        { type: "PRODUCTS", id: slug },
      ],
    }),


   /*  getAllSideCards: builder.query({
      async queryFn() {
        // ⏳ simulate 1s loading
        await new Promise((resolve) => setTimeout(resolve, 1000)); 
        return {
          data: sideCards,
        };
      },
      providesTags: ["CATEGORIES"],
    }),

    getAllSlides: builder.query({
      async queryFn() {
        // ⏳ simulate 1s loading
        await new Promise((resolve) => setTimeout(resolve, 1000)); 
        return {
          data: slides,
        };
      },
      providesTags: ["CATEGORIES"],
    }), */


    // === get single category  ===
   /*  getSingleCategory: builder.query({
      query: ({ category_id }) => ({
        url: `/category/${category_id}`,
        method: "GET",
      }),
      providesTags: ["CATEGORIES"],
    }), */
    // === update category  ===
  /*   updateCategory: builder.mutation({
      query: ({ payload, category_id }) => ({
        url: `/category/${category_id}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["CATEGORIES"],
    }), */

    // === update category status ===
    /* updateCategoryStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/category/${id}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["CATEGORIES"],
    }), */
  }),
});

export const {
  useGetAllProductsQuery,
  useGetSearchProductsQuery,
  useGetSingleProductQuery
} = productApi;
