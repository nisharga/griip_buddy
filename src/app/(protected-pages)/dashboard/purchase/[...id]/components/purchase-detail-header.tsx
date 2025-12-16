/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";

interface PurchaseDetailHeaderProps {
  purchase: any;
}

const PurchaseDetailHeader = ({ purchase }: PurchaseDetailHeaderProps) => {
  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "received":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 md:gap-4">
      <div className="flex items-center gap-3 md:gap-4">
        <Link href="/dashboard/purchase/all">
          <Button
            variant="outline"
            size="sm"
            className="h-8 w-8 p-0 md:h-9 md:w-9 bg-transparent"
          >
            <ArrowLeft className="h-3 w-3 md:h-4 md:w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-lg md:text-2xl font-bold text-primary">
            Purchase #{purchase?.purchase_number}
          </h1>
          <p className="text-xs md:text-sm text-muted-foreground">
            {purchase?.createdAt
              ? new Date(purchase.createdAt).toLocaleDateString()
              : "N/A"}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-3">
        <Badge className={getStatusColor(purchase?.status)}>
          {purchase?.status || "Unknown"}
        </Badge>
        <div className="text-right">
          <p className="text-xs md:text-sm text-muted-foreground">Total Cost</p>
          <p className="text-lg md:text-xl font-bold text-primary">
            ৳{purchase?.total_cost?.toFixed(2) || "0.00"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PurchaseDetailHeader;
