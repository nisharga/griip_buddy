"use client";
import GlobalLoader from "@/src/app/(protected-pages)/components/loading/GlobalLoader";
import { useGetSinglePurchaseQuery } from "@/src/redux/api/old/purchase";
import { useParams } from "next/navigation";

const UpdatePage = () => {
  const params = useParams();
  const id = params?.id as string;
  console.log("🚀 ~ UpdatePage ~ id:", id);

  const { data, isLoading: isPurchaseLoading } = useGetSinglePurchaseQuery({
    id,
  });
  const purchase = data?.data;
  console.log("purchase: ", purchase);

  if (isPurchaseLoading) {
    return <GlobalLoader />;
  }

  return (
    <div className="container mx-auto p-3 md:p-6 space-y-4 md:space-y-6">
      UpdatePage
    </div>
  );
};

export default UpdatePage;
