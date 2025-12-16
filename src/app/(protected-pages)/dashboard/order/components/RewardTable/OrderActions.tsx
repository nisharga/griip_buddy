/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Badge } from "@/src/components/ui/badge";
import { Separator } from "@/src/components/ui/separator";
import {
  CalendarDays,
  CreditCard,
  MapPin,
  Package,
  Receipt,
  User,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { useEffect, useState } from "react";
import { Button } from "@/src/components/ui/button";
import { toast } from "sonner";
// import { ConfirmActionDialog } from "@/app/(auth-pages)/components/confirm-action/ConfirmAction";
// import { formatDate, getStatusColor } from "@/lib/utils";
// import axiosInstance from "@/lib/axiosInstance";
import Link from "next/link";
import { formatDate, getStatusColor } from "@/src/lib/utils";
import { ConfirmActionDialog } from "@/src/app/(protected-pages)/components/confirm-action/ConfirmAction";
// import { API_BASE_URL } from "@/config";

const OrderActions = ({ id }: { id: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="flex items-center justify-center gap-1 lg:gap-2 min-w-50">
        {/* view product */}
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger className="border border-sm p-1 lg:p-2 rounded-sm cursor-pointer text-xs! text-[#09090b] font-medium">
            View Order
          </DialogTrigger>
          <DialogContent className="max-w-[95%] lg:max-w-[50%] p-4">
            <DialogHeader>
              <div className="lg:min-w-2xl h-125 overflow-y-scroll">
                <OrderDetails id={id} setIsOpen={setIsOpen} />
              </div>
            </DialogHeader>
          </DialogContent>
        </Dialog>
        <Link
          href={`/order-track/${id}`}
          className="border p-1 lg:p-2 rounded-[6px] text-xs font-medium"
        >
          Track Your Order
        </Link>
      </div>
    </>
  );
};

export default OrderActions;

export const OrderDetails = ({
  id,
  setIsOpen,
}: {
  id?: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [orderData, setOrderData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    if (!id) return;

    /* const fetchOrder = async () => {
      setIsLoading(true);
      setIsFetching(true);
      try {
        const res = await axiosInstance.get(
          `${API_BASE_URL}/order/details/${id}`
        );
        setOrderData(res.data); // ✅ To support: orderData?.data?.order_id
      } catch (err) {
        console.error("Failed to fetch order details", err);
        setOrderData(null);
      } finally {
        setIsLoading(false);
        setIsFetching(false);
      }
    }; */

    // fetchOrder();
  }, [id]);

  return (
    <>
      {isLoading || isFetching ? (
        <div className="">
          <div className="animate-pulse space-y-4 p-4">
            {/* Title */}
            <div className="h-6 bg-gray-300 rounded w-1/3"></div>

            {/* Lines */}
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>

            {/* Fake section break */}
            <div className="h-6 bg-gray-300 rounded w-1/2 mt-6"></div>

            {/* More lines */}
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-4/5"></div>
            <div className="h-4 bg-gray-200 rounded w-2/5"></div>
          </div>
        </div>
      ) : (
        <div className="lg:max-w-4xl mx-auto p-2 lg:p-6 space-y-2 lg:space-y-6">
          {/* Order Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold">
                Order #{orderData?.data?.order_id}
              </h2>
              <p className="text-muted-foreground">
                Invoice: {orderData?.data?.invoice_number}
              </p>
            </div>
            <div className="flex flex-col sm:items-end gap-2">
              <Badge className={getStatusColor(orderData?.data?.status)}>
                {orderData?.data?.status}
              </Badge>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CalendarDays className="h-4 w-4" />
                {formatDate(orderData?.data?.order_date)}
              </div>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Products */}
            <Card className="">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Products
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {orderData?.data.products.map((item: any, index: any) => (
                  <div key={index} className="flex gap-4">
                    <div className="relative h-16 w-16 rounded-lg overflow-hidden bg-gray-100">
                      <Image
                        src={item?.product?.thumbnail || "/no_image.png"}
                        alt={"thumbnail"}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{item?.product_name}</h4>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-sm text-muted-foreground">
                          Qty: {item?.total_quantity}
                        </span>
                        <span className="font-medium">
                          ${item?.total_price}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Receipt className="h-5 w-5" />
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${orderData?.data?.sub_total}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>${orderData?.data?.shipping_charge}</span>
                </div>
                {orderData?.total_discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-${orderData?.data?.total_discount}</span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>${orderData?.data?.total_amount}</span>
                </div>
              </CardContent>
            </Card>

            {/* Billing Address */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Billing Address
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="font-medium">
                    {orderData?.data?.billing_address?.first_name}{" "}
                    {orderData?.data?.billing_address?.last_name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {orderData?.data?.billing_address?.email}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {orderData?.data?.billing_address?.phone}
                  </p>
                  <div className="text-sm text-muted-foreground">
                    <p>{orderData?.data?.billing_address?.address}</p>
                    {orderData?.data?.billing_address?.apartment && (
                      <p>{orderData?.data.billing_address?.apartment}</p>
                    )}
                    <p>
                      {orderData?.data.billing_address?.city},{" "}
                      {orderData?.data.billing_address?.state}{" "}
                      {orderData?.data.billing_address?.zip_code}
                    </p>
                    <p>{orderData?.data.billing_address?.country}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Payment Information
                </CardTitle>
                <Badge
                  className={
                    orderData?.data?.payment_info?.payment_status === "paid"
                      ? "bg-green-100 text-green-800 hover:bg-green-100"
                      : "bg-red-100 text-red-800 hover:bg-red-100"
                  }
                >
                  {orderData?.data?.payment_info?.payment_status}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span>Payment Status</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Order Type</span>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span className="text-sm">{orderData?.data?.order_by}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Note */}
          {orderData?.data?.order_note && (
            <Card>
              <CardHeader>
                <CardTitle>Order Note</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {orderData?.data?.order_note}
                </p>
              </CardContent>
            </Card>
          )}

          <div className="flex items-center justify-end">
            <CancelOrderButton
              id={orderData?.data?.id}
              orderData={orderData}
              setIsOpen={setIsOpen}
            />
          </div>
        </div>
      )}
    </>
  );
};

const CancelOrderButton = ({
  id,
  orderData,
  setIsOpen,
}: {
  id: string;
  orderData: any;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCancel = async () => {
    try {
      setLoading(true);
      /*  const res = await axiosInstance.patch(
        `${API_BASE_URL}/order/${id}/cancel`
      );
      if (res?.data?.statusCode === 200) {
        toast("Order cancelled successfully ✅");
        setOpen(false); // Close modal
        setIsOpen(false);
        setLoading(false);
        window.location.reload();
      }  */
      /*  else {
        toast("Something went wrong ❌");
        setLoading(false);
      } */
    } catch (error: any) {
      toast(error?.response?.data?.message || "Failed to cancel order");
      console.error("Cancel order error:", error);
      setLoading(false);
    }
  };

  return (
    <div className="space-y-2">
      <Button
        onClick={() => setOpen(true)}
        variant="destructive"
        /* disabled={
          orderData?.data?.status === "IN_TRANSIT" ||
          orderData?.data?.status === "DELIVERED" ||
          orderData?.data?.status === "CANCELLED" ||
          orderData?.data?.status === "RETURNED"
        } */
      >
        {false ? "Cancelling..." : "Cancel Order"}
      </Button>
      <ConfirmActionDialog
        open={open}
        setOpen={setOpen}
        title="Cancel Order"
        actionName="Cancel"
        itemName={"this order"}
        onConfirm={() => handleCancel()}
        isLoading={loading}
      />
    </div>
  );
};
