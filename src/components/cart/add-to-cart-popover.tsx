"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ShoppingCart, Check, X } from "lucide-react"
import type { Product_data } from "@/lib/data"
import { cn } from "@/lib/utils"
import { useAppDispatch, useAppSelector } from "@/redux/store"
import { addToCart, openCart } from "@/redux/features/cart-slice"

// Hardcoded colors for products
const AVAILABLE_COLORS = [
  { name: "Black", value: "#000000" },
  { name: "Brown", value: "#8B4513" },
  { name: "Tan", value: "#D2B48C" },
  { name: "Navy", value: "#000080" },
  { name: "Burgundy", value: "#800020" },
]

interface AddToCartPopoverProps {
  product: Product_data
  className?: string
}

const AddToCartPopover = ({ product, className }: AddToCartPopoverProps) => {
  const dispatch = useAppDispatch()
  const { items, isHydrated } = useAppSelector((state) => state.cart)
  const [isOpen, setIsOpen] = useState(false)
  const [selectedSize, setSelectedSize] = useState<number | undefined>(undefined)
  const [selectedColor, setSelectedColor] = useState<string | undefined>(undefined)
  const popoverRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  // Calculate current cart quantity for this specific product variant
  const cartQuantity = isHydrated
    ? items
        .filter(
          (item) =>
            item.product.sku === product.sku &&
            item.selectedSize === selectedSize &&
            item.selectedColor === selectedColor,
        )
        .reduce((sum, item) => sum + item.quantity, 0)
    : 0

  // Calculate total quantity for this product (all variants)
  const totalProductQuantity = isHydrated
    ? items.filter((item) => item.product.sku === product.sku).reduce((sum, item) => sum + item.quantity, 0)
    : 0

  const isMaxQuantity = cartQuantity >= 5

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  const handleAddToCart = () => {
    // If product has sizes but none selected, don't add
    if (product.availableSizes && product.availableSizes.length > 0 && !selectedSize) {
      return
    }

    dispatch(addToCart({ product, selectedSize, selectedColor }))
    setIsOpen(false)

    // Auto-open cart after adding item
    setTimeout(() => {
      dispatch(openCart())
    }, 100)
  }

  const canAddToCart = () => {
    if (isMaxQuantity) return false
    if (product.availableSizes && product.availableSizes.length > 0 && !selectedSize) return false
    return true
  }

  const getButtonText = () => {
    if (isMaxQuantity) return "Max (5)"
    if (totalProductQuantity > 0) return `In Cart (${totalProductQuantity})`
    return "Add to Cart"
  }

  const getButtonIcon = () => {
    if (isMaxQuantity) return <ShoppingCart className="size-3 sm:size-4" />
    if (totalProductQuantity > 0) return <Check className="size-3 sm:size-4" />
    return <ShoppingCart className="size-3 sm:size-4" />
  }

  const getMobileButtonText = () => {
    if (isMaxQuantity) return "Max"
    if (totalProductQuantity > 0) return `+${totalProductQuantity}`
    return "Add"
  }

  return (
    <div className="relative">
      <button
        ref={triggerRef}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center justify-center gap-1 sm:gap-2 py-1.5 sm:py-2 rounded-lg text-[10px] sm:text-xs font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#EFBB29] focus:ring-offset-2 relative",
          isMaxQuantity
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : totalProductQuantity > 0
              ? "bg-green-500 text-white hover:bg-green-600 shadow-md"
              : "bg-[#023344] text-white hover:bg-[#023344]/90 hover:shadow-md",
          className,
        )}
        disabled={isMaxQuantity}
      >
        {getButtonIcon()}
        <span className="hidden sm:inline">{getButtonText()}</span>
        <span className="sm:hidden">{getMobileButtonText()}</span>

        {/* Pulse animation for items in cart */}
        {totalProductQuantity > 0 && (
          <motion.div
            className="absolute -top-1 -right-1 bg-[#EFBB29] text-[#023344] text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            {totalProductQuantity}
          </motion.div>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Popover */}
            <motion.div
              ref={popoverRef}
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-full left-0 mb-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 p-5 z-50 max-h-96 overflow-y-auto"
              style={{
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
            >
              {/* Arrow */}
              <div className="absolute top-full left-4 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white"></div>

              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-[#023344] text-base flex items-center gap-2">
                  <ShoppingCart className="h-4 w-4" />
                  Select Options
                </h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="h-4 w-4 text-gray-500" />
                </button>
              </div>

              {/* Product Info */}
              <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-sm text-gray-900 mb-1">{product.name}</h4>
                <p className="text-xs text-gray-600">{product.brand}</p>
                <p className="text-sm font-bold text-[#023344] mt-1">৳{Math.ceil(product.priceDiscount)}</p>
              </div>

              {/* Size Selection */}
              {product.availableSizes && product.availableSizes.length > 0 && (
                <div className="mb-5">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Size <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {product.availableSizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={cn(
                          "px-3 py-2 text-sm border rounded-lg transition-all duration-200 font-medium",
                          selectedSize === size
                            ? "border-[#EFBB29] bg-[#EFBB29] text-[#023344] shadow-md transform scale-105"
                            : "border-gray-300 hover:border-[#EFBB29] hover:bg-[#EFBB29]/10 hover:shadow-sm",
                        )}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Color Selection */}
              <div className="mb-5">
                <label className="block text-sm font-semibold text-gray-700 mb-3">Color (Optional)</label>
                <div className="grid grid-cols-2 gap-2">
                  {AVAILABLE_COLORS.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(selectedColor === color.name ? undefined : color.name)}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 text-sm border rounded-lg transition-all duration-200",
                        selectedColor === color.name
                          ? "border-[#EFBB29] bg-[#EFBB29]/10 text-[#023344] font-semibold shadow-md"
                          : "border-gray-300 hover:border-[#EFBB29] hover:bg-[#EFBB29]/5 hover:shadow-sm",
                      )}
                    >
                      <div
                        className="w-4 h-4 rounded-full border-2 border-gray-300 shadow-sm"
                        style={{ backgroundColor: color.value }}
                      />
                      {color.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Selected Options Summary */}
              {(selectedSize || selectedColor) && (
                <div className="mb-5 p-3 bg-gradient-to-r from-[#EFBB29]/10 to-[#023344]/10 rounded-lg border border-[#EFBB29]/20">
                  <p className="text-xs font-medium text-gray-700 mb-2">Selected Options:</p>
                  <div className="flex gap-2 flex-wrap">
                    {selectedSize && (
                      <span className="px-3 py-1 bg-[#EFBB29] text-[#023344] text-xs rounded-full font-bold shadow-sm">
                        Size {selectedSize}
                      </span>
                    )}
                    {selectedColor && (
                      <span className="px-3 py-1 bg-[#023344] text-white text-xs rounded-full font-bold shadow-sm">
                        {selectedColor}
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                disabled={!canAddToCart()}
                className={cn(
                  "w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all duration-200 shadow-md",
                  canAddToCart()
                    ? "bg-[#EFBB29] text-[#023344] hover:bg-[#EFBB29]/90 hover:shadow-lg transform hover:scale-[1.02]"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed",
                )}
              >
                {getButtonIcon()}
                {getButtonText()}
              </button>

              {/* Validation Message */}
              {product.availableSizes && product.availableSizes.length > 0 && !selectedSize && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs text-red-500 mt-3 text-center font-medium bg-red-50 py-2 px-3 rounded-lg"
                >
                  ⚠️ Please select a size to continue
                </motion.p>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

export default AddToCartPopover
