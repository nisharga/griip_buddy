/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarDays, MapPin, User, Building2 } from "lucide-react";

interface PurchaseOverviewProps {
  purchase: any;
}

const PurchaseOverview = ({ purchase }: PurchaseOverviewProps) => {
  return (
    <Card>
      <CardHeader className="pb-3 md:pb-4">
        <CardTitle className="text-base md:text-lg">
          Purchase Overview
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 md:space-y-6">
        {/* Purchase Dates */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
          <div className="flex items-center gap-2 md:gap-3">
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-xs md:text-sm text-muted-foreground">
                Purchase Date
              </p>
              <p className="text-sm md:text-base font-medium">
                {purchase?.purchase_date
                  ? new Date(purchase.purchase_date).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-xs md:text-sm text-muted-foreground">
                Received Date
              </p>
              <p className="text-sm md:text-base font-medium">
                {purchase?.received_at
                  ? new Date(purchase.received_at).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>
          </div>
        </div>

        {/* People */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
          <div className="flex items-center gap-2 md:gap-3">
            <User className="h-4 w-4 text-muted-foreground" />
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6 md:h-8 md:w-8">
                <AvatarImage
                  src={
                    purchase?.created_by?.profile_picture || "/placeholder.svg"
                  }
                />
                <AvatarFallback className="text-xs">
                  {purchase?.created_by?.name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-xs md:text-sm text-muted-foreground">
                  Created By
                </p>
                <p className="text-sm md:text-base font-medium">
                  {purchase?.created_by?.name || "Unknown"}
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            <User className="h-4 w-4 text-muted-foreground" />
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6 md:h-8 md:w-8">
                <AvatarImage
                  src={
                    purchase?.received_by?.profile_picture || "/placeholder.svg"
                  }
                />
                <AvatarFallback className="text-xs">
                  {purchase?.received_by?.name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-xs md:text-sm text-muted-foreground">
                  Received By
                </p>
                <p className="text-sm md:text-base font-medium">
                  {purchase?.received_by?.name || "Unknown"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Location & Supplier */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
          <div className="flex items-start gap-2 md:gap-3">
            <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
            <div>
              <p className="text-xs md:text-sm text-muted-foreground">
                Location
              </p>
              <p className="text-sm md:text-base font-medium">
                {purchase?.location?.name || "Unknown"}
              </p>
              <p className="text-xs text-muted-foreground">
                {purchase?.location?.local_address || ""}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-2 md:gap-3">
            <Building2 className="h-4 w-4 text-muted-foreground mt-0.5" />
            <div>
              <p className="text-xs md:text-sm text-muted-foreground">
                Supplier
              </p>
              <p className="text-sm md:text-base font-medium">
                {purchase?.supplier?.name || "Unknown"}
              </p>
              <p className="text-xs text-muted-foreground">
                {purchase?.supplier?.email || ""}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PurchaseOverview;
