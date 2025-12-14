// hooks/useVendor.ts
import { getVendorId } from "@/app/(auth-pages)/store/user";
import { useGetSingleVendorQuery } from "@/redux/api/vendor";

// Suppose this is how you get your user_id

export const useVendorId = () => {
 const user_id = getVendorId(); // dynamically get vendor id

 // Call RTK Query only if user_id exists
 const { data, error, isLoading, isFetching, refetch } =
  useGetSingleVendorQuery(
   { user_id },
   { skip: !user_id }, // prevents running query if no id
  );

 return data?.data?._id;
};
