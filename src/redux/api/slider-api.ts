 
import { sideCards, slides } from "@/src/static/category";
import apiSlice from "./api-slice"; 
 
const sliderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // === create category  === 
    getAllSlides: builder.query({
      async queryFn() {
        // ⏳ simulate 1s loading
        await new Promise((resolve) => setTimeout(resolve, 1000)); 
        return {
          data: slides,
        };
      },
      providesTags: ["SLIDER"],
    }), 

    getAllSlideCard: builder.query({
      async queryFn() {
        // ⏳ simulate 1s loading
        await new Promise((resolve) => setTimeout(resolve, 1000)); 
        return {
          data: sideCards,
        };
      },
      providesTags: ["SLIDER"],
    }), 
  }),
});

export const {
  useGetAllSlidesQuery,
  useGetAllSlideCardQuery
} = sliderApi;
