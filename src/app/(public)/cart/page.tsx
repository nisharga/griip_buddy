/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
// import Image from "next/image";
import { toast } from "sonner";
import {
  ShoppingCart,
  Package,
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  CreditCard,
  Truck,
  Info,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { Input } from "@/src/components/ui/input";
import { Separator } from "@/src/components/ui/separator";
import { useAppDispatch, useAppSelector } from "@/src/redux/store";
import { selectCartItems } from "@/src/redux/features/cart-slice";
import { useGetProductByIdsQuery } from "@/src/redux/api/old/product-api";
import { Container } from "@/src/components/common/container";
import { Skeleton } from "@/src/components/ui/skeleton";

// import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
  removeItem as removeLocalItem,
  updateQty as updateLocalQty,
} from "@/src/redux/features/cart-slice";
import SmartImage from "@/src/components/shared/SmartImage";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Badge } from "@/components/ui/badge";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Separator } from "@/components/ui/separator";
// import { Container } from "@/components/common/container";
// import { Skeleton } from "@/components/ui/skeleton";

// import { useGetProductByIdsQuery } from "@/redux/api/product-api";

type ApiVariant = {
  _id: string;
  attributes?: string[];
  attribute_values?: Record<string, string>;
  regular_price?: number;
  sale_price?: number;
  sku?: string;
  barcode?: string;
  product?:
    | string
    | { _id: string; name?: string; slug?: string; thumbnail?: string };
};

type ApiProduct = {
  _id: string;
  name: string;
  slug?: string;
  thumbnail?: string;
  variants?: ApiVariant[];
  shipping_cost?: number;
  shipping_cost_per_unit?: number;
  is_free_delivery?: boolean;
  coin_per_order?: number;
};

type CartItemView = {
  id: string;
  product: {
    _id: string;
    name: string;
    thumbnail?: string | null;
    sku?: string;
  };
  variant: ApiVariant;
  attributes: Record<string, string>;
  quantity: number;
  unitPrice: number;
};

const CartItemComponent: React.FC<{
  item: CartItemView;
  onUpdateQty: (id: string, q: number) => void;
  onRemove: (id: string) => void;
}> = ({ item, onUpdateQty, onRemove }) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const [draftQty, setDraftQty] = useState(String(item.quantity));

  useEffect(() => {
    setQuantity(item.quantity);
    setDraftQty(String(item.quantity));
  }, [item.quantity]);

  const priceEach = item.unitPrice;
  const subtotal = useMemo(() => priceEach * quantity, [priceEach, quantity]);

  const commitQuantity = (newQuantity: number) => {
    const q = Number.isNaN(newQuantity) ? 1 : Math.max(1, newQuantity);
    if (q === quantity) {
      setDraftQty(String(quantity));
      return;
    }
    onUpdateQty(item.id, q);
    setQuantity(q);
    setDraftQty(String(q));
    toast.success("Item quantity updated.");
  };

  const increment = () => commitQuantity(quantity + 1);
  const decrement = () => commitQuantity(quantity - 1);

  const onInputChange = (value: string) =>
    setDraftQty(value.replace(/\D+/g, ""));
  const onInputBlur = () => commitQuantity(parseInt(draftQty || "1", 10));
  const onInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") (e.currentTarget as HTMLInputElement).blur();
  };

  const title = item.product.name || `Item • ${item.product._id.slice(-6)}`;

  return (
    <Card className="group relative rounded-2xl border border-gray-200 shadow-none bg-white transition-shadow hover:shadow-md">
      <CardContent className="px-4 py-3 md:px-5 md:py-0">
        <div className="grid grid-cols-[88px_1fr_auto] sm:grid-cols-[104px_1fr_auto] items-start gap-4">
          <div className="relative aspect-square w-22 sm:w-26 overflow-hidden rounded-xl bg-gray-50 ring-1 ring-gray-200">
            <SmartImage
              src={
                item.product.thumbnail ||
                "/placeholder.svg?height=208&width=208&query=product"
              }
              alt={title}
              width={208}
              height={208}
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          <div className="min-w-0 space-y-2">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h3 className="line-clamp-2 text-sm sm:text-base font-medium text-gray-900">
                  {title}
                </h3>
                {item.variant?.sku && (
                  <p className="mt-0.5 text-xs text-gray-500">
                    SKU: {item.variant.sku}
                  </p>
                )}
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => onRemove(item.id)}
                aria-label="Remove item"
                className="h-9 w-9 shrink-0 text-gray-500 hover:text-red-600"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            {!!item.attributes && Object.keys(item.attributes).length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {Object.entries(item.attributes).map(([key, value]) => (
                  <Badge
                    key={key}
                    variant="outline"
                    className="rounded-md text-[10px] font-medium border-[#ff5c00] text-[#ff5c00]"
                  >
                    <span className="mr-1 uppercase text-gray-500">{key}:</span>
                    {String(value)}
                  </Badge>
                ))}
              </div>
            )}

            {/* Price & Qty */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-1.5">
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-semibold text-[#ff5c00] sm:text-xl">
                  Tk {priceEach.toFixed(2)}
                </span>
                <span className="text-xs text-gray-500 sm:text-sm">each</span>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={decrement}
                  disabled={quantity <= 1}
                  className="size-7 rounded-lg border-[#ff5c00] text-[#ff5c00] hover:bg-[#ff5c00] hover:text-white"
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-4 w-4" />
                </Button>

                <Input
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={draftQty}
                  onChange={(e) => onInputChange(e.target.value)}
                  onBlur={onInputBlur}
                  onKeyDown={onInputKeyDown}
                  className="h-7 w-12 rounded-lg border-[#ff5c00] text-center focus-visible:ring-[#ff5c00] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  aria-label="Quantity"
                />

                <Button
                  variant="outline"
                  size="icon"
                  onClick={increment}
                  className="size-7 rounded-lg border-[#ff5c00] text-[#ff5c00] hover:bg-[#ff5c00] hover:text-white"
                  aria-label="Increase quantity"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Subtotal */}
            <div className="mt-2 flex items-center justify-between border-t pt-3">
              <span className="text-sm text-gray-500">Subtotal</span>
              <span className="text-lg font-semibold text-[#ff5c00] sm:text-xl">
                Tk {subtotal.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const CartSummary: React.FC<{
  itemCount: number;
  totalPrice: number;
  isFetching?: boolean;
}> = ({ itemCount, totalPrice, isFetching }) => {
  const shipping = 0;
  const finalTotal = totalPrice + shipping;

  return (
    <Card className="sticky top-20 shadow-none border-gray-200">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 font-medium text-gray-800">
          <ShoppingBag className="h-5 w-5 text-[#ff5c00]" />
          <span>Order Summary</span>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Items ({itemCount})</span>
            <span className="font-medium">
              Tk {totalPrice.toFixed(2)} {isFetching ? "(updating…)" : ""}
            </span>
          </div>
        </div>

        <Separator />

        <div className="flex justify-between items-center">
          <span className="font-medium text-lg">Total</span>
          <span className="text-lg font-semibold text-[#ff5c00]">
            Tk {finalTotal.toFixed(2)}
          </span>
        </div>

        <div className="space-y-2 pt-2">
          <Link href="/checkout">
            <Button
              className="w-full bg-[#ff5c00] hover:bg-[#ff5c00]/90 text-white text-sm py-3"
              size="lg"
            >
              <CreditCard className="h-4 w-4 mr-2" />
              Proceed to Checkout
            </Button>
          </Link>

          <Link href="/">
            <Button
              variant="outline"
              className="w-full border-[#ff5c00] text-[#ff5c00] hover:bg-[#ff5c00] hover:text-white bg-transparent shadow-none mt-3"
              size="lg"
            >
              <Truck className="h-4 w-4 mr-2" />
              Continue Shopping
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

const CartPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const lines = useAppSelector(selectCartItems);

  const productIds = useMemo(
    () => Array.from(new Set(lines.map((l) => l.productId))),
    [lines]
  );
  const {
    data: productsRes,
    isLoading,
    isFetching,
    isError,
  } = useGetProductByIdsQuery(
    { product_ids: productIds },
    { skip: productIds.length === 0 }
  );

  const productMap = useMemo(() => {
    const arr: ApiProduct[] = (productsRes as any)?.data ?? [];
    const map = new Map<string, ApiProduct>();
    for (const p of arr) map.set(p._id, p);
    return map;
  }, [productsRes]);

  useEffect(() => {
    if (!productsRes || productIds.length === 0) return;
    const toRemove = new Set<string>();
    for (const line of lines) {
      const product = productMap.get(line.productId);
      if (!product) {
        toRemove.add(line.id);
        continue;
      }
      const variant = (product.variants || []).find(
        (v) => v._id === line.variantId
      );
      if (!variant) toRemove.add(line.id);
    }
    if (toRemove.size > 0) {
      toast.error(
        "Some items are no longer available and were removed from your cart."
      );
      toRemove.forEach((id) => dispatch(removeLocalItem({ id })));
    }
  }, [productsRes, productIds.length, lines, productMap, dispatch]);

  const viewItems: CartItemView[] = useMemo(() => {
    const out: CartItemView[] = [];
    for (const line of lines) {
      const p = productMap.get(line.productId);
      if (!p) continue;
      const v = (p.variants || []).find((vv) => vv._id === line.variantId);
      if (!v) continue;

      const unitPrice = Number(
        v.sale_price ?? v.regular_price ?? line.priceSnapshot ?? 0
      );
      out.push({
        id: line.id,
        product: { _id: p._id, name: p.name, thumbnail: p.thumbnail },
        variant: v,
        attributes: (v.attribute_values ?? line.attributes ?? {}) as Record<
          string,
          string
        >,
        quantity: line.quantity,
        unitPrice,
      });
    }
    return out;
  }, [lines, productMap]);

  const totalPrice = useMemo(
    () => viewItems.reduce((sum, it) => sum + it.unitPrice * it.quantity, 0),
    [viewItems]
  );

  const isEmpty = viewItems.length === 0;

  return (
    <div>
      {/* Header */}
      <div className="py-6">
        <Container>
          <div className="flex max-w-6xl mx-auto items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <ShoppingCart className="h-6 w-6 text-[#ff5c00]" />
                <h1 className="text-xl font-medium">
                  <span className="text-[#ff5c00]">Shopping</span> Cart
                </h1>
              </div>
            </div>
            <div className="text-sm opacity-90">
              {viewItems.length} {viewItems.length === 1 ? "item" : "items"}
            </div>
          </div>
        </Container>
      </div>

      <Container className="py-8">
        <div className="max-w-6xl mx-auto">
          {/* API error hint (non-blocking) */}
          {isError && (
            <div className="mb-4 flex items-center gap-2 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              <Info className="h-4 w-4" />
              Could not validate products at the moment. You can still review
              your cart.
            </div>
          )}

          {/* Loading skeleton */}
          {isLoading ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-32 w-full rounded-xl" />
                ))}
              </div>
              <div className="lg:col-span-1">
                <Skeleton className="h-96 w-full rounded-xl" />
              </div>
            </div>
          ) : isEmpty ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-orange-50 flex items-center justify-center">
                <Package className="h-12 w-12 text-[#ff5c00]" />
              </div>
              <h2 className="text-2xl font-medium text-gray-900 mb-3">
                Your cart is empty
              </h2>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Looks like you haven&apos;t added any items to your cart yet.
                Start shopping to fill it up!
              </p>
              <Link href="/">
                <Button className="px-8 py-3 bg-[#ff5c00] hover:bg-[#ff5c00]/90 text-white">
                  Start Shopping
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Items */}
              <div className="lg:col-span-2">
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-medium text-gray-900">
                      Cart Items{" "}
                      <span className="text-[#ff5c00]">
                        ({viewItems.length})
                      </span>
                    </h2>

                    <div className="text-sm text-gray-600">
                      Total:&nbsp;
                      <span className="font-medium text-[#ff5c00]">
                        Tk {totalPrice.toFixed(2)}
                      </span>
                      {isFetching ? " (updating…)" : ""}
                    </div>
                  </div>

                  {viewItems.map((item) => (
                    <CartItemComponent
                      key={item.id}
                      item={item}
                      onUpdateQty={(id, q) =>
                        dispatch(updateLocalQty({ id, quantity: q }))
                      }
                      onRemove={(id) => {
                        dispatch(removeLocalItem({ id }));
                        toast.success("Item removed from cart.");
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Summary */}
              <div className="lg:col-span-1">
                <CartSummary
                  itemCount={viewItems.length}
                  totalPrice={totalPrice}
                  isFetching={isFetching}
                />
              </div>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default CartPage;
