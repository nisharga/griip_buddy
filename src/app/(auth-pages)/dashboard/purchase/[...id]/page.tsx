"use client";
import { useParams } from "next/navigation";
import PurchaseDetailHeader from "./components/purchase-detail-header";
import PurchaseOverview from "./components/purchase-overview";
import PurchaseItems from "./components/purchase-items";
import PurchaseExpenses from "./components/purchase-expenses";
import PurchaseNotes from "./components/purchase-notes";
import GlobalLoader from "@/app/(auth-pages)/components/loading/GlobalLoader";
import { useGetSinglePurchaseQuery } from "@/redux/api/purchase";

const PurchaseDetailPage = () => {
  const params = useParams();
  const id = params?.id as string;

  const { data, isLoading: isPurchaseLoading } = useGetSinglePurchaseQuery({
    id,
  });
  const purchase = data?.data;
  console.log("🚀 ~ PurchaseDetailPage ~ purchase:", purchase);

  if (isPurchaseLoading) {
    return <GlobalLoader />;
  }

  if (!purchase) {
    return (
      <div className="container mx-auto p-3 md:p-6">
        <div className="text-center py-8 md:py-12">
          <h2 className="text-lg md:text-xl font-semibold text-muted-foreground">
            Purchase not found
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-3 md:p-6 space-y-4 md:space-y-6">
      <PurchaseDetailHeader purchase={purchase} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        <div className="lg:col-span-2 space-y-4 md:space-y-6">
          <PurchaseOverview purchase={purchase} />
          <PurchaseItems items={purchase?.items} />
          {purchase?.expenses_applied &&
            purchase.expenses_applied.length > 0 && (
              <PurchaseExpenses expenses={purchase.expenses_applied} />
            )}
        </div>

        <div className="space-y-4 md:space-y-6">
          <PurchaseNotes
            notes={purchase?.additional_note}
            attachments={purchase?.attachments}
          />
        </div>
      </div>
    </div>
  );
};

export default PurchaseDetailPage;
