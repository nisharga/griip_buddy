/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

interface PurchaseItemsProps {
  items: any[];
}

const PurchaseItems = ({ items }: PurchaseItemsProps) => {
  if (!items || items.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-base md:text-lg">Items</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">No items found</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-3 md:pb-4">
        <CardTitle className="text-base md:text-lg">
          Items ({items.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 md:space-y-4">
        {items.map((item, index) => (
          <div
            key={item?._id || index}
            className="border rounded-lg p-3 md:p-4 space-y-3"
          >
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <div className="flex-shrink-0">
                <Image
                  src={
                    item?.product?.thumbnail ||
                    "/placeholder.svg?height=60&width=60"
                  }
                  alt={item?.product?.name || "Product"}
                  width={60}
                  height={60}
                  className="rounded-md object-cover"
                />
              </div>

              <div className="flex-1 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                  <div>
                    <h4 className="text-sm md:text-base font-semibold text-primary">
                      {item?.product?.name || "Unknown Product"}
                    </h4>
                    <p className="text-xs md:text-sm text-muted-foreground">
                      SKU: {item?.product?.sku || "N/A"}
                    </p>
                  </div>
                  <Badge variant="secondary" className="text-xs text-white">
                    Qty: {item?.qty || 0}
                  </Badge>
                </div>

                {/* Variant Info */}
                {item?.variant && (
                  <div className="flex flex-wrap gap-1 md:gap-2">
                    {Object.entries(item.variant.attribute_values || {}).map(
                      ([key, value]) => (
                        <Badge key={key} variant="outline" className="text-xs">
                          {key}: {value as string}
                        </Badge>
                      )
                    )}
                  </div>
                )}

                {/* Pricing */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs md:text-sm">
                  <div>
                    <p className="text-muted-foreground">Unit Cost</p>
                    <p className="font-medium">
                      ৳{item?.unit_cost?.toFixed(2) || "0.00"}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Discount</p>
                    <p className="font-medium">
                      ৳{item?.discount?.toFixed(2) || "0.00"}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Tax</p>
                    <p className="font-medium">
                      ৳{item?.tax?.toFixed(2) || "0.00"}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Total</p>
                    <p className="font-semibold text-primary">
                      ৳
                      {(
                        (item?.unit_cost || 0) * (item?.qty || 0) -
                        (item?.discount || 0) +
                        (item?.tax || 0)
                      ).toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Additional Info */}
                {(item?.lot_number || item?.expiry_date) && (
                  <div className="flex flex-col sm:flex-row gap-2 text-xs">
                    {item?.lot_number && (
                      <span className="text-muted-foreground">
                        Lot: {item.lot_number}
                      </span>
                    )}
                    {item?.expiry_date && (
                      <span className="text-muted-foreground">
                        Expires:{" "}
                        {new Date(item.expiry_date).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default PurchaseItems;
