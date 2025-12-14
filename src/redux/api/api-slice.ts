import { API_BASE_URL } from "@/config";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

const baseQuery = fetchBaseQuery({
    baseUrl: API_BASE_URL,
    credentials: "include",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization : "Bearer " +  Cookies.get("accessToken")
    }
});
const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: baseQuery,
    endpoints: () => ({}),
    tagTypes: [
        "USER",
        "CLIENT_PROFILE",
        "VENDORS",
        "CATEGORIES",
        "SUB_CATEGORIES",
        "SUB_CATEGORIES_BY_CATEGORY_ID",
        "PRODUCTS",
        "warehouse",
    ],
});

export default apiSlice;
