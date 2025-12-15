/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import { CheckCircle2, Info } from "lucide-react";
import { toast } from "sonner";

import { bangladeshDivisions } from "@/src/lib/data/bangladesh";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import { Label } from "@/src/components/ui/label";
import { Skeleton } from "@/src/components/ui/skeleton";
import { Container } from "@/src/components/common/container";

import { useAppDispatch, useAppSelector } from "@/src/redux/store";
import {
  removeItem as removeLocalItem,
  updateQty as updateLocalQty,
  selectCartItems,
} from "@/src/redux/features/cart-slice";

// import { API_BASE_URL } from "@/config";
// import { useGetProductByIdsQuery } from "@/src/redux/api/product-api";

import OrderSummary, { OrderItem } from "./_components/OrderSummary";
import ManualPayment, {
  ManualPaymentFields,
} from "./_components/ManualPayment";
import SuggestionDropdown from "./_components/SuggestionDropdown";
import { useGetProductByIdsQuery } from "@/src/redux/api/old/product-api";
import { API_BASE_URL } from "@/src/config";

type PaymentMethod = "cod" | "full";

type DeliveryForm = {
  customer_name: string;
  customer_phone: string;
  secondary_phone?: string;
  division: string;
  district: string;
  thana: string;
  address: string;
  order_note: string;
  payment_type: PaymentMethod;
};

type DistrictShape = { জেলা: string; উপজেলা: string[] };
type BDDataShape = { [division: string]: DistrictShape[] };

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

const initialForm: DeliveryForm = {
  customer_name: "",
  customer_phone: "",
  secondary_phone: "",
  division: "",
  district: "",
  thana: "",
  address: "",
  order_note: "",
  payment_type: "cod",
};

const normalize = (s: string) =>
  (s || "").toLowerCase().trim().replace(/\s+/g, " ");
const isDhakaDistrict = (district: string) => {
  const d = normalize(district);
  return d === "ঢাকা" || d === "dhaka";
};
const isGazipurDistrict = (district: string) => {
  const d = normalize(district);
  return d === "গাজীপুর" || d === "গাজিপুর" || d === "gazipur";
};

const CheckoutPageMain: React.FC = () => {
  const dispatch = useAppDispatch();
  const lines = useAppSelector(selectCartItems);

  const productIds = useMemo(
    () => Array.from(new Set(lines.map((l) => l.productId))),
    [lines]
  );
  const {
    data: productsRes,
    isLoading: cartLoading,
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

  const items: OrderItem[] = useMemo(() => {
    const out: OrderItem[] = [];
    for (const line of lines) {
      const product = productMap.get(line.productId);
      if (!product) continue;
      const variant = (product.variants || []).find(
        (v) => v._id === line.variantId
      );
      if (!variant) continue;

      const price = (variant?.sale_price ??
        variant?.regular_price ??
        line.priceSnapshot ??
        0) as number;

      let shippingBase = Number(product.shipping_cost ?? 0);
      let shippingPerUnit = Number(product.shipping_cost_per_unit ?? 0);
      if (product.is_free_delivery) {
        shippingBase = 0;
        shippingPerUnit = 0;
      }
      const qty = line.quantity;
      const lineShipping =
        qty > 0 ? shippingBase + Math.max(0, qty - 1) * shippingPerUnit : 0;

      out.push({
        id: line.id,
        product: {
          _id: product._id,
          name: product.name,
          thumbnail: product.thumbnail,
        },
        attributes: (variant.attribute_values ?? {}) as Record<string, string>,
        quantity: qty,
        unitPrice: price,
        lineShipping,
      });
    }
    return out;
  }, [lines, productMap]);

  const sub_total = useMemo(
    () => items.reduce((s, it) => s + it.unitPrice * it.quantity, 0),
    [items]
  );

  const [form, setForm] = useState<DeliveryForm>(initialForm);
  const [bdData, setBdData] = useState<BDDataShape>(
    bangladeshDivisions as unknown as BDDataShape
  );
  const divisions = useMemo(() => Object.keys(bdData), [bdData]);
  const districts = useMemo(
    () =>
      form.division ? bdData[form.division]?.map((d) => d.জেলা) ?? [] : [],
    [form.division, bdData]
  );
  const thanas = useMemo(() => {
    if (!form.division || !form.district) return [];
    const districtObj = (bdData[form.division] || []).find(
      (d) => d.জেলা === form.district
    );
    return districtObj?.উপজেলা ?? [];
  }, [form.division, form.district, bdData]);

  const addressDeliveryCharge = useMemo(() => {
    if (isDhakaDistrict(form.district)) return 100;
    if (isGazipurDistrict(form.district)) return 70;
    return 150;
  }, [form.district]);

  const perLineShippingTotal = useMemo(
    () => items.reduce((s, it) => s + it.lineShipping, 0),
    [items]
  );
  const delivery_charge = addressDeliveryCharge;
  const total_discount = 0;
  const total_amount = sub_total - total_discount + delivery_charge;

  const [pay, setPay] = useState<ManualPaymentFields>({
    senderPhone: "",
    trxId: "",
    amount: 0,
  });
  const COD_ADVANCE = 200;
  const expectedPayNow =
    form.payment_type === "cod" ? COD_ADVANCE : total_amount;

  const setField = (k: keyof DeliveryForm, v: string) => {
    setForm((p) => {
      const next = { ...p, [k]: v };
      if (k === "division") {
        next.district = "";
        next.thana = "";
      }
      if (k === "district") {
        next.thana = "";
      }
      return next;
    });
  };
  const createDivision = (name: string) =>
    setBdData((prev) => (prev[name] ? prev : { ...prev, [name]: [] }));
  const createDistrict = (divisionName: string, districtName: string) =>
    setBdData((prev) => {
      const list = prev[divisionName] ?? [];
      if (list.some((d) => d.জেলা.toLowerCase() === districtName.toLowerCase()))
        return prev;
      return {
        ...prev,
        [divisionName]: [...list, { জেলা: districtName, উপজেলা: [] }],
      };
    });

  const changeQty = (lineId: string, newQty: number) => {
    if (newQty < 1) return;
    dispatch(updateLocalQty({ id: lineId, quantity: newQty }));
  };
  const removeItem = (lineId: string) =>
    dispatch(removeLocalItem({ id: lineId }));

  const validate = () => {
    const required: (keyof DeliveryForm)[] = [
      "customer_name",
      "customer_phone",
      "division",
      "district",
      "thana",
      "address",
    ];
    for (const k of required) {
      if (!String(form[k] || "").trim()) {
        toast.error(`${k.replace("_", " ")} is required`);
        return false;
      }
    }
    const onlyDigits = form.customer_phone.replace(/\D/g, "");
    if (onlyDigits.length < 11) {
      toast.error("Please enter a valid phone number");
      return false;
    }
    if (!items.length) {
      toast.error("Your cart is empty");
      return false;
    }

    const senderDigits = pay.senderPhone.replace(/\D/g, "");
    if (senderDigits.length < 11) {
      toast.error("Enter a valid bKash/Nagad number used to send money");
      return false;
    }
    if (!pay.trxId || pay.trxId.trim().length < 6) {
      toast.error("Enter a valid transaction ID");
      return false;
    }
    if (pay.amount !== expectedPayNow) {
      toast.error(`Paid amount must be exactly Tk ${expectedPayNow}`);
      return false;
    }
    return true;
  };

  const payment_type_api =
    form.payment_type === "cod" ? "CASH_ON_DELIVERY" : "FULL_PAYMENT";
  const payable_amount = expectedPayNow;
  const paid_amount = expectedPayNow;
  const COD_amount = total_amount - paid_amount;
  const is_delivery_charge_paid = paid_amount >= delivery_charge;

  const [orderLoading, setOrderLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState<{ id?: string } | null>(null);

  const placeOrder = async () => {
    if (!validate()) return;
    setOrderLoading(true);

    const productsBody = items.map((it) => {
      const p = productMap.get(it.product._id)!;
      const v = (p.variants || []).find(
        (vv) => vv._id === lines.find((l) => l.id === it.id)?.variantId
      )!;

      const shipping_cost = Number(p.shipping_cost ?? 0);
      const shipping_cost_per_unit = Number(p.shipping_cost_per_unit ?? 0);
      const total_shipping_cost = p.is_free_delivery ? 0 : it.lineShipping;

      return {
        product: p._id,
        product_name: p.name,
        total_quantity: it.quantity,
        total_price: it.unitPrice * it.quantity,
        discount_type: "FLAT",
        discount_amount: 0,
        total_discount: 0,
        shipping_cost,
        shipping_cost_per_unit,
        total_shipping_cost,
        is_free_delivery: Boolean(p.is_free_delivery),
        coin_per_order: Number(p.coin_per_order ?? 0),
        selected_variant: {
          _id: String(v._id),
          attributes: (v.attributes ?? []) as string[],
          attribute_values: (v.attribute_values ?? {}) as Record<
            string,
            string
          >,
          regular_price: Number(v.regular_price ?? it.unitPrice),
          sale_price: Number(v.sale_price ?? it.unitPrice),
          sku: String(v.sku ?? ""),
          barcode: String(v.barcode ?? ""),
          product: {
            _id: p._id,
            name: p.name,
            slug: p.slug,
            thumbnail: p.thumbnail,
          },
        },
      };
    });

    const payload = {
      order_by: "customer",
      customer_name: form.customer_name,
      customer_phone: form.customer_phone,

      payment_type: payment_type_api,
      payment_id: pay.trxId,

      sub_total,
      total_discount,
      delivery_charge,
      total_amount,

      payable_amount,
      COD: COD_amount,
      paid_amount,

      products: productsBody,
      is_delivery_charge_paid,

      delivery_address: {
        division: form.division,
        district: form.district,
        thana: form.thana,
        address: form.address,
      },

      order_note: `${form.order_note || ""}\n[Payment] Sender: ${
        pay.senderPhone
      }, Amount: ${pay.amount}, Trx: ${pay.trxId}`,
    } as const;

    try {
      const res = await fetch(`${API_BASE_URL}/order/web`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: Cookies.get("cbd_atkn_91f2a") ?? "",
          "x-refresh-token": Cookies.get("cbd_rtkn_7c4d1") ?? "",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.message || `Order failed (${res.status})`);
      }

      const data = await res.json();
      setOrderPlaced({ id: data?.data?._id || undefined });
      toast.success("Order placed successfully!");
    } catch (e: any) {
      toast.error(e?.message || "Failed to place order");
    } finally {
      setOrderLoading(false);
    }
  };

  if (orderPlaced) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center max-w-md px-6">
          <div className="mx-auto mb-5 h-16 w-16 rounded-full bg-green-50 flex items-center justify-center">
            <CheckCircle2 className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            Order placed
          </h1>
          {orderPlaced.id && (
            <p className="text-gray-600 mb-6">
              Your order id:{" "}
              <span className="font-medium">{orderPlaced.id}</span>
            </p>
          )}
          <div className="flex items-center justify-center gap-3">
            <Link href="/">
              <Button className="bg-[#ff5c00] hover:bg-[#ff5c00]/90 text-white">
                Back to Home
              </Button>
            </Link>
            <Link href="/cart">
              <Button
                variant="outline"
                className="border-[#ff5c00] text-[#ff5c00] hover:bg-[#ff5c00] hover:text-white"
              >
                View Cart
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const isEmpty = items.length === 0;

  return (
    <div className="bg-linear-to-b from-white via-[#fff8f4] to-white">
      <Container className="py-6">
        {isError && (
          <div className="mb-4 flex items-center gap-2 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            <Info className="h-4 w-4" />
            Could not validate products at the moment. You can still review your
            cart.
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* LEFT */}
          <div className="md:col-span-2 space-y-6">
            {/* Delivery Form */}
            <Card className="rounded-xl border-0  shadow-none">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold text-gray-900">
                  Delivery Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cartLoading ? (
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <Skeleton className="h-12 w-full rounded-lg" />
                    <Skeleton className="h-12 w-full rounded-lg" />
                    <Skeleton className="h-12 w-full rounded-lg" />
                    <Skeleton className="h-12 w-full rounded-lg" />
                    <Skeleton className="h-12 w-full rounded-lg" />
                    <Skeleton className="h-24 w-full rounded-lg md:col-span-2" />
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div>
                        <Label className="mb-2 block text-gray-600 text-xs">
                          Full Name *
                        </Label>
                        <Input
                          className="h-12 rounded-lg focus-visible:ring-[#ff5c00]"
                          value={form.customer_name}
                          onChange={(e) =>
                            setField("customer_name", e.target.value)
                          }
                          placeholder="Your full name"
                          required
                        />
                      </div>
                      <div>
                        <Label className="mb-2 block text-gray-600 text-xs">
                          Phone Number *
                        </Label>
                        <Input
                          type="tel"
                          className="h-12 rounded-lg focus-visible:ring-[#ff5c00]"
                          value={form.customer_phone}
                          onChange={(e) =>
                            setField("customer_phone", e.target.value)
                          }
                          placeholder="01XXXXXXXXX"
                          required
                        />
                      </div>
                    </div>

                    {/* Division / District / Thana */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                      <div>
                        <Label className="mb-2 block text-gray-600 text-xs">
                          Division *
                        </Label>
                        <SuggestionDropdown
                          value={form.division}
                          onChange={(v) => setField("division", v)}
                          options={divisions}
                          placeholder="Select or add Division"
                          required
                          creatable
                          onCreate={(name) => {
                            createDivision(name);
                            setField("division", name);
                          }}
                        />
                      </div>

                      <div>
                        <Label className="mb-2 block text-gray-600 text-xs">
                          District *
                        </Label>
                        <SuggestionDropdown
                          value={form.district}
                          onChange={(v) => setField("district", v)}
                          options={districts}
                          placeholder="Select or add District"
                          disabled={!form.division}
                          required
                          creatable
                          onCreate={(name) => {
                            if (!form.division)
                              return toast.error("Select a division first");
                            createDistrict(form.division, name);
                            setField("district", name);
                          }}
                        />
                      </div>

                      <div>
                        <Label className="mb-2 block text-gray-600 text-xs">
                          Thana / Upazila *
                        </Label>
                        <SuggestionDropdown
                          value={form.thana}
                          onChange={(v) => setField("thana", v)}
                          options={thanas}
                          placeholder="Select Thana / Upazila"
                          disabled={!form.district}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label className="mb-2 block text-gray-600 text-xs">
                        Delivery Point *
                      </Label>
                      <Input
                        className="h-12 rounded-lg focus-visible:ring-[#ff5c00]"
                        placeholder="House / Road / Area"
                        value={form.address}
                        onChange={(e) => setField("address", e.target.value)}
                        required
                      />
                    </div>

                    <div>
                      <Label className="mb-2 block text-gray-600 text-xs">
                        Order Note
                      </Label>
                      <Textarea
                        className="rounded-lg focus-visible:ring-[#ff5c00]"
                        rows={2}
                        placeholder="Any special instruction (optional)"
                        value={form.order_note}
                        onChange={(e) => setField("order_note", e.target.value)}
                      />
                    </div>

                    {/* Payment method */}
                    <div className="pt-2">
                      <Label className="mb-2 block text-gray-600 text-xs">
                        Payment Type
                      </Label>
                      <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                        <button
                          type="button"
                          onClick={() => setField("payment_type", "cod")}
                          className={`rounded-lg border px-4 py-3 text-sm ${
                            form.payment_type === "cod"
                              ? "border-[#ff5c00] bg-[#ff5c00]/5 text-[#ff5c00]"
                              : "border-gray-300 hover:border-[#ff5c00]"
                          }`}
                        >
                          Cash on Delivery (Advance ৳200)
                        </button>
                        <button
                          type="button"
                          onClick={() => setField("payment_type", "full")}
                          className={`rounded-lg border px-4 py-3 text-sm ${
                            form.payment_type === "full"
                              ? "border-[#ff5c00] bg-[#ff5c00]/5 text-[#ff5c00]"
                              : "border-gray-300 hover:border-[#ff5c00]"
                          }`}
                        >
                          Full Payment (Manual)
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Manual Payment Panel (NEW) */}
            <ManualPayment
              mode={form.payment_type}
              amountNow={expectedPayNow}
              fields={pay}
              onChange={(patch) => setPay((p) => ({ ...p, ...patch }))}
              instructionImageSrc="/order-instruction.png"
            />
          </div>

          {/* RIGHT: Summary (separate component) */}
          <div className="md:col-span-1">
            <OrderSummary
              items={items}
              isLoading={cartLoading}
              isFetching={isFetching}
              onInc={(id, next) => changeQty(id, next)}
              onDec={(id, next) => changeQty(id, next)}
              onRemove={(id) => removeItem(id)}
              subTotal={sub_total}
              perLineShippingTotal={perLineShippingTotal}
              deliveryCharge={delivery_charge}
              totalDiscount={total_discount}
              totalAmount={total_amount}
              payableNow={expectedPayNow}
              ctaDisabled={cartLoading || isEmpty || orderLoading}
              ctaLabel={orderLoading ? "Placing..." : "Place Order"}
              onPlaceOrder={placeOrder}
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CheckoutPageMain;
