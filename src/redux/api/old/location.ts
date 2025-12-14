 
import apiSliceAuth from "../api-slice-auth";

const locationApi = apiSliceAuth.injectEndpoints({
  endpoints: (builder) => ({
    // === create location === 
    createLocation: builder.mutation({
      query: ({ payload }) => ({
        url: `/location`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["LOCATIONS"],
    }),

    // === get all locations ===
    getAllLocations: builder.query({
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
          url: `/location?${query.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["LOCATIONS"],
    }),

    // === get single location ===
    getSingleLocation: builder.query({
      query: ({ location_id }) => ({
        url: `/location/${location_id}`,
        method: "GET",
      }),
    }),

    // === update location ===
    updateLocation: builder.mutation({
      query: ({ payload, location_id }) => ({
        url: `/location/${location_id}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["LOCATIONS"],
    }),
  }),
});

export const {
  useCreateLocationMutation,
  useGetAllLocationsQuery,
  useGetSingleLocationQuery,
  useUpdateLocationMutation,
} = locationApi;

export default locationApi;
