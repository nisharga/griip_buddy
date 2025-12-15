"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  Heart,
  Share2,
  Tag,
  CheckCircle,
  Info,
  Check,
  Truck,
  Shield,
  RotateCcw,
  Zap,
  Plus,
  Minus,
  ShoppingCart,
} from "lucide-react";
import { toast } from "sonner";
import { Container } from "@/src/components/common/container";

import ProductImageGallery from "./_components/ProductImageGallery";
import ProductTitleSkeleton from "../../../../components/skeleton/ProductTitleSkeleton";
import VariantSelectorSkeleton from "../../../../components/skeleton/VariantSelectorSkeleton";
import ProductDescription from "./_components/ProductDescription";

import { useAppDispatch } from "@/src/redux/store";
import { addItem } from "@/src/redux/features/cart-slice";
import { useGetProductBySlugQuery } from "@/src/redux/api/old/publicApi";
import { WHATSAPP_NUMBER } from "@/src/config";
import ExploreMore from "./_components/ExploreMore";
import WhatsAppChat from "./_components/WhatsApp";

/* ----------------------------- Local Types ------------------------------ */
type Variant = {
  _id: string;
  attributes?: string[];
  attribute_values?: Record<string, string>;
  regular_price: number;
  sale_price?: number;
  sku?: string;
  image?: string;
};

type ProductData = {
  _id: string;
  name?: string;
  slug?: string;
  sku?: string;
  description?: string;
  thumbnail?: string;
  slider_images?: string[];
  category?: { _id?: string; name?: string } | null;
  variants: Variant[];
  min_order_qty?: number;
  max_order_qty?: number;
  total_sold?: number;
  approximately_delivery_time?: string;
  is_free_delivery?: boolean;
  shipping_cost?: number;
  shipping_cost_per_unit?: number;
  warranty?: string;
  return_policy?: string;
  search_tags?: string[];
  offer_tags?: string[];
  social_links?: { name?: string; url?: string }[];
  coin_per_order?: number;
};

const makeAttributesPayload = (
  variant: Variant | undefined,
  selected: Record<string, string>
) => {
  const base = variant?.attribute_values ?? {};
  return { ...base, ...selected };
};

export default function ProductDetailsPage() {
  const pathname = usePathname();
  const slug = pathname?.split("/").filter(Boolean).pop() || "";

  const { data, isLoading, error } = useGetProductBySlugQuery(slug);
  const productDetails = (data?.data ?? null) as ProductData | null;

  const productImages =
    productDetails?.slider_images?.map((url: string, index: number) => ({
      url,
      id: index.toString(),
      alt: `Product image ${index + 1}`,
    })) || [];

  if (productDetails?.thumbnail) {
    productImages.unshift({
      url: productDetails.thumbnail,
      id: "thumbnail",
      alt: "Main product image",
    });
  }

  const dispatch = useAppDispatch();
  const router = useRouter();

  /* ----------------------------- UI State ------------------------------ */
  // const [selectedImage, setSelectedImage] = useState<number>(0);
  const [isWishlisted, setIsWishlisted] = useState<boolean>(false);
  const [selectedAttributes, setSelectedAttributes] = useState<
    Record<string, string>
  >({});
  const [quantity, setQuantity] = useState<number>(1);
  const [isAdding, setIsAdding] = useState<boolean>(false);

  /* -------------------- Variants & Attribute Options ------------------- */
  const variants: Variant[] = useMemo(
    () => productDetails?.variants ?? [],
    [productDetails?.variants]
  );

  // Aggregate available attribute values across variants to keep it dynamic
  const attributeOptions: Record<string, string[]> = useMemo(() => {
    const map = variants.reduce<Record<string, Set<string>>>((acc, v) => {
      (v.attributes ?? []).forEach((attrName) => {
        acc[attrName] = acc[attrName] || new Set<string>();
        const val = v.attribute_values?.[attrName];
        if (val) acc[attrName].add(val);
      });
      return acc;
    }, {});
    return Object.fromEntries(
      Object.entries(map).map(([k, set]) => [k, Array.from(set)])
    );
  }, [variants]);

  // Pick current variant based on current attribute selections
  const currentVariant: Variant | undefined = useMemo(() => {
    if (!variants.length) return undefined;
    // If selection is incomplete, try to match partially; fall back to first
    const match = variants.find((v) =>
      Object.entries(selectedAttributes).every(
        ([k, val]) => v.attribute_values?.[k] === val
      )
    );
    return match ?? variants[0];
  }, [variants, selectedAttributes]);

  // Initialize default selection to the first variant’s attributes (nice UX)
  useEffect(() => {
    if (variants.length) {
      const first = variants[0];
      const init = first.attribute_values ?? {};
      // only set once on initial load (or when variants list changes)
      setSelectedAttributes((prev) => (Object.keys(prev).length ? prev : init));
    }
  }, [variants]);

  // Quantity guards (no stock system per your note; still respect min/max if present)
  const minOrderQty = productDetails?.min_order_qty ?? 1;
  const maxOrderQty = productDetails?.max_order_qty ?? 10;
  useEffect(() => {
    setQuantity((q) => Math.min(Math.max(q, minOrderQty), maxOrderQty));
  }, [minOrderQty, maxOrderQty]);

  /* ----------------------------- Pricing ------------------------------- */
  const regularPrice =
    currentVariant?.regular_price ?? variants[0]?.regular_price ?? 0;
  const salePrice =
    currentVariant?.sale_price ?? variants[0]?.sale_price ?? regularPrice;
  const discountPercentage =
    regularPrice > 0
      ? Math.round(((regularPrice - salePrice) / regularPrice) * 100)
      : 0;

  const requiredAttributes = Object.keys(attributeOptions);
  const isSelectionComplete =
    requiredAttributes.length === 0 ||
    requiredAttributes.every((attr) => !!selectedAttributes[attr]);

  /* ------------------- Actions: add to cart / buy now ------------------ */
  const validateBeforeAdd = (): boolean => {
    if (!productDetails?._id || !currentVariant?._id) {
      toast.error("Invalid product/variant");
      return false;
    }
    if (!isSelectionComplete) {
      toast.error("Please select all required options");
      return false;
    }
    if (quantity < minOrderQty) {
      toast.error(`Minimum order is ${minOrderQty}`);
      return false;
    }
    if (maxOrderQty && quantity > maxOrderQty) {
      toast.error(`Maximum order is ${maxOrderQty}`);
      return false;
    }
    return true;
  };

  const doAddToCart = async (): Promise<boolean> => {
    if (!validateBeforeAdd()) return false;

    try {
      setIsAdding(true);
      dispatch(
        addItem({
          productId: productDetails!._id,
          variantId: currentVariant!._id,
          attributes: makeAttributesPayload(currentVariant, selectedAttributes),
          quantity,
          priceSnapshot: salePrice ?? 0,
        })
      );
      const size = currentVariant?.attribute_values?.Size;
      const color = currentVariant?.attribute_values?.Color;
      const suffix = [size, color].filter(Boolean).join("/");
      toast.success(
        `Added: ${productDetails?.name ?? "Product"}${
          suffix ? ` • ${suffix}` : ""
        } × ${quantity}`
      );
      return true;
    } catch {
      toast.error("Failed to add to cart");
      return false;
    } finally {
      setIsAdding(false);
    }
  };

  const handleAddToCartClick = async () => {
    await doAddToCart();
  };

  const handleBuyNowClick = async () => {
    const ok = await doAddToCart();
    if (ok) router.push("/checkout");
  };

  /* ------------------------------ Render ------------------------------- */
  const name = productDetails?.name ?? "Product";
  const description = productDetails?.description ?? "";
  const categoryName = productDetails?.category?.name;
  const offerTags = productDetails?.offer_tags ?? [];
  const coinPerOrder = productDetails?.coin_per_order ?? 0;

  const deliveryTime =
    productDetails?.approximately_delivery_time ?? "Standard delivery";
  const isFreeDelivery = productDetails?.is_free_delivery ?? false;
  const shippingCost = productDetails?.shipping_cost ?? 0;
  const shippingCostPerUnit = productDetails?.shipping_cost_per_unit ?? 0;
  const warranty = productDetails?.warranty ?? "No warranty";
  const returnPolicy = productDetails?.return_policy ?? "No returns";
  const hasPreOrder = offerTags.includes("pre-order");

  return (
    <div className="min-h-screen bg-gray-50">
      <Container className="py-8">
        {/* Loading / error */}
        {isLoading ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 mb-16">
            <ProductImageGallery images={[]} isLoading />
            <div className="space-y-6">
              <ProductTitleSkeleton />
              <VariantSelectorSkeleton />
            </div>
          </div>
        ) : error || !productDetails ? (
          <div className="py-12 text-center">
            <h2 className="text-2xl font-medium text-gray-900 mb-4">
              Product Not Found
            </h2>
            <p className="text-gray-600">
              Sorry, we couldn&apos;t find the product you&apos;re looking for.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-16">
              {/* LEFT: Image gallery */}
              <div className="space-y-4">
                <ProductImageGallery images={productImages} isLoading={false} />
              </div>

              {/* RIGHT: Content */}
              <div className="space-y-6">
                {/* Header row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 flex-wrap">
                    {!!categoryName && (
                      <span className="text-sm font-medium text-primary-mid bg-primary/10 px-3 py-1 rounded-full flex items-center gap-1">
                        <Tag className="w-3 h-3" />
                        {categoryName}
                      </span>
                    )}
                    {offerTags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="text-sm font-medium text-orange-700 bg-orange-100 px-3 py-1 rounded-full flex items-center gap-1"
                      >
                        <Zap className="w-3 h-3" />
                        {tag.replace("-", " ").toUpperCase()}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setIsWishlisted((v) => !v)}
                      className={`p-2 rounded-full border transition-all duration-200 ${
                        isWishlisted
                          ? "bg-primary border-primary text-white"
                          : "border-gray-300 hover:border-primary hover:text-primary"
                      }`}
                      aria-label={
                        isWishlisted
                          ? "Remove from wishlist"
                          : "Add to wishlist"
                      }
                    >
                      <Heart
                        className={`w-5 h-5 ${
                          isWishlisted ? "fill-current" : ""
                        }`}
                      />
                    </button>
                    <button
                      onClick={async () => {
                        const shareData = {
                          title: name,
                          text: `Check out ${name}!`,
                          url: window.location.href,
                        };
                        try {
                          if (navigator.share) {
                            await navigator.share(shareData);
                          } else {
                            await navigator.clipboard.writeText(
                              window.location.href
                            );
                            toast.success("Product link copied to clipboard!");
                          }
                        } catch {
                          try {
                            await navigator.clipboard.writeText(
                              window.location.href
                            );
                            toast.success("Product link copied to clipboard!");
                          } catch {
                            toast.error(
                              "Unable to share. Please copy the URL manually."
                            );
                          }
                        }
                      }}
                      className="p-2 rounded-full border border-gray-300 hover:border-primary hover:text-primary transition-all duration-200"
                      aria-label="Share product"
                    >
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Title */}
                <div>
                  <p className="text-primary font-medium text-sm">
                    {categoryName}
                  </p>
                  <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 mt-1">
                    {name}
                  </h1>
                </div>

                {/* Price */}
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl font-semibold text-gray-900">
                      Tk {Number(salePrice).toLocaleString()}
                    </span>
                    {regularPrice > salePrice && (
                      <>
                        <span className="text-xl text-gray-500 line-through">
                          Tk {Number(regularPrice).toLocaleString()}
                        </span>
                        <span className="bg-green-100 text-green-800 text-sm font-medium px-2 py-1 rounded-full flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" />
                          {discountPercentage}% OFF
                        </span>
                      </>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <p className="flex items-center gap-1">
                      <Info className="w-4 h-4" />
                      Inclusive of all taxes •{" "}
                      {isFreeDelivery
                        ? "Free shipping"
                        : `Shipping: Tk ${shippingCost}`}
                    </p>
                    {coinPerOrder > 0 && (
                      <p className="flex items-center gap-1 text-yellow-700">
                        <CheckCircle className="w-4 h-4" />
                        Earn {coinPerOrder} coins
                      </p>
                    )}
                  </div>
                </div>

                {/* Dynamic Attribute Selectors */}
                {Object.entries(attributeOptions).map(
                  ([attributeName, options]) => (
                    <div key={attributeName} className="space-y-3">
                      <label className="block text-sm font-medium text-gray-900">
                        Select {attributeName}
                      </label>
                      <div className="flex gap-2 flex-wrap">
                        {options.map((option) => {
                          const selected =
                            selectedAttributes[attributeName] === option;
                          return (
                            <button
                              key={`${attributeName}:${option}`}
                              onClick={() =>
                                setSelectedAttributes((prev) => ({
                                  ...prev,
                                  [attributeName]: option,
                                }))
                              }
                              className={`px-4 text-xs py-2 border-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center min-w-[64px] ${
                                selected
                                  ? "border-primary bg-primary text-white"
                                  : "border-gray-300 hover:border-primary hover:text-primary"
                              }`}
                              aria-label={`${attributeName} ${option}`}
                            >
                              {selected && <Check className="w-3 h-3 mr-1" />}
                              {option}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )
                )}

                {/* Quantity */}
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-900">
                    Quantity
                  </label>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border border-gray-200 rounded-lg">
                      <button
                        onClick={() =>
                          setQuantity((q) => Math.max(minOrderQty, q - 1))
                        }
                        className="p-2 hover:bg-gray-50 transition-colors"
                        disabled={isAdding}
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-4 py-2 font-medium min-w-[3rem] text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={() =>
                          setQuantity((q) =>
                            Math.min(q + 1, Math.max(1, maxOrderQty))
                          )
                        }
                        className="p-2 hover:bg-gray-50 transition-colors"
                        disabled={isAdding}
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <span className="text-xs text-gray-500">
                      Min: {minOrderQty}, Max: {maxOrderQty}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="md:flex md:gap-4">
                  <button
                    onClick={handleAddToCartClick}
                    disabled={!isSelectionComplete || isAdding}
                    className="w-full bg-primary hover:bg-[#c460b5] disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 px-6 rounded-lg text-lg font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    {isAdding ? "Adding..." : "Add to Cart"}
                  </button>
                  <button
                    onClick={handleBuyNowClick}
                    disabled={!isSelectionComplete || isAdding}
                    className="w-full border-2 border-primary text-primary hover:bg-primary/10 py-3 px-6 rounded-lg text-lg font-medium transition-colors"
                  >
                    {isAdding
                      ? "Processing..."
                      : hasPreOrder
                      ? "Pre-Order"
                      : "Buy Now"}
                  </button>
                </div>

                {/* Delivery / Warranty / Returns */}
                <div className="grid grid-cols-3 gap-1 md:gap-4 pt-6">
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <Truck className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="text-sm font-medium text-blue-900">
                        {isFreeDelivery ? "Free Shipping" : "Shipping"}
                      </p>
                      <p className="text-xs text-blue-700">
                        {isFreeDelivery
                          ? deliveryTime
                          : `Tk ${shippingCost}${
                              shippingCostPerUnit > 0
                                ? ` + Tk ${shippingCostPerUnit}/unit`
                                : ""
                            }`}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <Shield className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="text-sm font-medium text-green-900">
                        Warranty
                      </p>
                      <p className="text-xs text-green-700">{warranty}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                    <RotateCcw className="w-5 h-5 text-orange-600" />
                    <div>
                      <p className="text-sm font-medium text-orange-900">
                        Returns
                      </p>
                      <p className="text-xs text-orange-700">{returnPolicy}</p>
                    </div>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="grid grid-cols-3 mb-10 gap-4 pt-6 border-t">
                  <WhatsAppChat
                    phoneNumber={WHATSAPP_NUMBER}
                    message="Hi! I'm interested in this product."
                  />
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-3">
              <h3 className="font-medium text-gray-900">Key Features</h3>
              <ProductDescription description={description} isLoading={false} />
            </div>
          </>
        )}
      </Container>

      {/* Explore More */}
      <ExploreMore />

      {/* Mobile sticky buttons */}
      {!isLoading && productDetails && (
        <div className="lg:hidden fixed bottom-14 left-0 right-0 bg-white border-t border-gray-200 p-4 z-50 shadow-lg">
          <div className="flex gap-3">
            <button
              onClick={handleBuyNowClick}
              disabled={!isSelectionComplete || isAdding}
              className="flex-1 bg-primary hover:bg-[#c460b5] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium py-2 text-sm px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
            >
              {isAdding
                ? "Processing..."
                : hasPreOrder
                ? "Pre-Order"
                : "Buy Now"}
            </button>
            <button
              onClick={handleAddToCartClick}
              disabled={!isSelectionComplete || isAdding}
              className="flex-1 border-2 border-primary text-primary hover:bg-primary hover:text-white disabled:border-gray-300 disabled:text-gray-300 disabled:cursor-not-allowed font-medium py-2 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
            >
              {isAdding ? "Adding..." : "Cart"}
            </button>
          </div>
          {!isSelectionComplete && requiredAttributes.length > 0 && (
            <p className="text-center text-sm text-red-500 mt-2 flex items-center justify-center gap-1">
              <Info className="w-4 h-4" />
              Please select all required options to continue
            </p>
          )}
        </div>
      )}
    </div>
  );
}
