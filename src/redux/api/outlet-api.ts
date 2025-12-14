import apiSlice from "./api-slice";
import apiSliceAuth from "./api-slice-auth";

const outletApi = apiSliceAuth.injectEndpoints({
 endpoints: (builder) => ({
  getAllOutletAndWarehouse: builder.query({
   query: () => ({
    url: `/outlets`,
    method: "GET",
   }),
   providesTags: ["OUTLET_AND_WAREHOUSE"],
  }),
  getAllOutlet: builder.query({
   query: () => ({
    url: `/outlets/outlets`,
    method: "GET",
   }),
   providesTags: ["OUTLET_AND_WAREHOUSE"],
  }),

  // == Warehouse Queries ===
  getAllBusinessLocation: builder.query({
   query: () => ({
    url: `/location`,
    method: "GET",
   }),
   providesTags: ["OUTLET_AND_WAREHOUSE"],
  }),
  updateInventoryForWarehouse: builder.mutation({
   query: ({ payload }) => ({
    url: `/inventories`,
    method: "POST",
    body: payload,
   }),
   invalidatesTags: ["OUTLET_AND_WAREHOUSE"],
  }),
  updateInventoryWarehouseToOutlet: builder.mutation({
   query: ({ payload }) => ({
    url: `/inventories`,
    method: "POST",
    body: payload,
   }),
   invalidatesTags: ["OUTLET_AND_WAREHOUSE"],
  }),
 }),
});

export const {
 useGetAllOutletAndWarehouseQuery,
 useGetAllOutletQuery,
 useGetAllBusinessLocationQuery,
 useUpdateInventoryForWarehouseMutation,
 useUpdateInventoryWarehouseToOutletMutation,
} = outletApi;
