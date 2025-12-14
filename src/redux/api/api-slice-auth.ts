import { API_BASE_URL } from "@/config";
import { getAccessToken } from "@/lib/cookies";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
 baseUrl: API_BASE_URL,
 prepareHeaders: (headers) => {
  const accessToken = getAccessToken();
  if (accessToken) {
   headers.set("Authorization", `${accessToken}`);
  }
  return headers;
 },
});

const apiSliceAuth = createApi({
 reducerPath: "apiAuth",
 baseQuery: baseQuery,
 endpoints: () => ({}),
 tagTypes: ["VENDORS", "PRODUCTS", "warehouse", "OUTLET_AND_WAREHOUSE", "LOCATIONS", "PURCHASES", "SUPPLIERS"],
});

export default apiSliceAuth;
