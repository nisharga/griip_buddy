"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Minus,
  Plus,
  Trash2,
  Truck,
  ShoppingBag,
  CreditCard,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Separator } from "@/src/components/ui/separator";
import { Skeleton } from "@/src/components/ui/skeleton";
import SmartImage from "@/src/components/shared/SmartImage";

export type OrderItem = {
  id: string;
  product: {
    _id: string;
    name: string;
    thumbnail?: string;
  };
  attributes: Record<string, string>;
  quantity: number;
  unitPrice: number;
  lineShipping: number;
};

type Props = {
  items: OrderItem[];
  isLoading: boolean;
  isFetching: boolean;
  onInc: (id: string, next: number) => void;
  onDec: (id: string, next: number) => void;
  onRemove: (id: string) => void;

  subTotal: number;
  perLineShippingTotal: number;
  deliveryCharge: number;
  totalDiscount: number;
  totalAmount: number;
  payableNow: number;

  ctaDisabled?: boolean;
  ctaLabel?: string;
  onPlaceOrder?: () => void;
};

export default function OrderSummary({
  items,
  isLoading,
  isFetching,
  onInc,
  onDec,
  onRemove,
  subTotal,
  perLineShippingTotal,
  deliveryCharge,
  totalDiscount,
  totalAmount,
  payableNow,
  ctaDisabled,
  ctaLabel = "Place Order",
  onPlaceOrder,
}: Props) {
  const isEmpty = !items.length;

  return (
    <Card className="sticky top-6 rounded-xl border-0 shadow-none">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-gray-900">
            Order Summary
          </CardTitle>
          <Truck className="h-5 w-5 text-[#ff5c00]" />
        </div>
      </CardHeader>
      <CardContent>
        {/* Items */}
        <div className="space-y-3">
          {isLoading ? (
            <>
              {[...Array(2)].map((_, i) => (
                <div
                  key={i}
                  className="flex gap-3 rounded-lg border border-gray-100 p-3"
                >
                  <Skeleton className="h-18 w-18 rounded-lg" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-2/3" />
                    <Skeleton className="h-3 w-1/2" />
                    <div className="flex items-center justify-between">
                      <Skeleton className="h-8 w-24" />
                      <Skeleton className="h-4 w-16" />
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : isEmpty ? (
            <div className="rounded-lg bg-gray-50 p-4 text-sm text-gray-700">
              Your cart is empty.
            </div>
          ) : (
            items.map((it) => (
              <motion.div
                key={it.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-3 rounded-lg border border-gray-100 p-3"
              >
                <SmartImage
                  src={it.product.thumbnail || "/placeholder.svg"}
                  alt={it.product.name}
                  width={72}
                  height={72}
                  className="h-18 w-18 rounded-lg object-cover"
                />
                <div className="min-w-0 flex-1">
                  <p className="line-clamp-2 text-sm font-medium text-gray-900">
                    {it.product.name}
                  </p>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {Object.entries(it.attributes || {}).map(([k, v]) => (
                      <span
                        key={k}
                        className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-700"
                      >
                        {k}: {String(v).replace(/,/g, ", ")}
                      </span>
                    ))}
                  </div>

                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => onDec(it.id, it.quantity - 1)}
                        className="rounded-md border border-gray-300 p-1 hover:bg-gray-50 disabled:opacity-50"
                        aria-label="Decrease quantity"
                        disabled={it.quantity <= 1}
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-8 text-center text-sm">
                        {it.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => onInc(it.id, it.quantity + 1)}
                        className="rounded-md border border-gray-300 p-1 hover:bg-gray-50 disabled:opacity-50"
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="text-sm font-medium text-gray-900">
                      Tk {(it.unitPrice * it.quantity).toLocaleString()}
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onRemove(it.id)}
                  className="self-start rounded-md p-1 text-red-600 hover:bg-red-50"
                  aria-label="Remove item"
                  title="Remove item"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </motion.div>
            ))
          )}
        </div>

        {/* Totals */}
        <div className="mt-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-medium">Tk {subTotal.toLocaleString()}</span>
          </div>

          {perLineShippingTotal > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Item Shipping</span>
              <span className="font-medium">
                Tk {perLineShippingTotal.toLocaleString()}
              </span>
            </div>
          )}

          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Delivery Charge</span>
            <span className="font-medium">
              Tk {deliveryCharge.toLocaleString()}{" "}
              {isFetching ? "(updating…)" : ""}
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Discounts</span>
            <span className="font-medium">
              -Tk {totalDiscount.toLocaleString()}
            </span>
          </div>

          <Separator className="my-2" />

          <div className="flex justify-between text-base font-semibold">
            <span>Total</span>
            <span className="text-[#ff5c00]">
              Tk {totalAmount.toLocaleString()}
            </span>
          </div>

          <div className="flex justify-between text-sm text-gray-600">
            <span>Pay now</span>
            <span className="font-medium text-gray-900">
              Tk {payableNow.toLocaleString()}
            </span>
          </div>
        </div>

        {/* CTA */}
        {!!onPlaceOrder && (
          <Button
            type="button"
            onClick={onPlaceOrder}
            disabled={!!ctaDisabled}
            className="mt-5 w-full rounded-lg bg-[#ff5c00] py-6 text-base font-semibold text-white shadow-lg transition hover:-translate-y-px hover:bg-[#ff5c00]/90"
          >
            {ctaLabel}
          </Button>
        )}

        <div className="mt-3 flex items-center justify-between text-sm">
          <Link
            href="/cart"
            className="text-[#ff5c00] hover:underline flex items-center gap-2"
          >
            <ShoppingBag className="h-4 w-4" /> Review Cart
          </Link>
          <Link
            href="/"
            className="text-[#ff5c00] hover:underline flex items-center gap-2"
          >
            <CreditCard className="h-4 w-4" /> Continue Shopping
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
