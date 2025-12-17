import React from "react";
import {
  Trophy,
  Truck,
  CheckCircle,
  ShieldCheck,
  ChevronRight,
  CreditCard,
} from "lucide-react"; // Using Lucide for clean icons

const ProductTrustSection = ({ title = "#21 BEST-SELLING ITEM" }) => {
  return (
    <div className="text-sm md:text-base space-y-2">
      {/* 1. Best Seller Header */}
      <div className="flex items-center justify-between border-b border-gray-100 group cursor-pointer">
        <div className="flex items-center gap-2">
          <div className="bg-primary text-white px-2 py-0.5 rounded-sm flex items-center gap-1 text-[11px] font-bold uppercase tracking-tight">
            <Trophy size={12} fill="white" />
            {title}
          </div>
          <span className="text-gray-500 text-xs">
            in Maintenance, Upkee...
          </span>
        </div>
        <ChevronRight size={16} className="text-gray-400" />
      </div>

      {/* 2. Shipping & Credits Section (Top Circle) */}
      <div className="  border-b border-gray-100 space-y-2 cursor-pointer">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-white text-primary px-1.5 py-0.5 rounded flex items-center gap-1 text-[11px] font-bold">
              <Truck size={14} />
              Free shipping for this item
            </div>
          </div>
          <ChevronRight size={16} className="text-gray-400" />
        </div>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] md:text-xs font-medium text-primary">
          <div className="flex items-center gap-1">
            <CheckCircle size={12} strokeWidth={3} />
            <span>$5.00 Credit for delay</span>
          </div>
          <div className="flex items-center gap-1 text-gray-400">·</div>
          <div className="flex items-center gap-1">
            <CheckCircle size={12} strokeWidth={3} />
            <span>15-day no update refund</span>
          </div>
          <div className="flex items-center gap-1 text-gray-400">·</div>
        </div>

        <div className="text-[12px] md:text-sm font-semibold text-primary">
          Fastest delivery in <span className="uppercase">5 Business Days</span>
        </div>

        <div className="flex items-center gap-1 text-[11px] text-gray-400">
          <div className="w-3 h-3 border border-gray-400 rounded-full flex items-center justify-center text-[8px]">
            i
          </div>
          Min. order value: $10.00
        </div>
      </div>

      {/* 3. Privacy Section */}
      <div className="flex items-center justify-between border-b border-gray-100 cursor-pointer">
        <div className="flex items-center gap-4 text-primary font-medium text-xs md:text-sm">
          <div className="flex items-center gap-1.5">
            <ShieldCheck size={16} />
            <span>Safe payments</span>
          </div>
          <div className="text-gray-300">·</div>
          <div className="flex items-center gap-1.5">
            <span>Secure privacy</span>
          </div>
        </div>
        <ChevronRight size={16} className="text-gray-400" />
      </div>

      {/* 4. Order Guarantee Section (Bottom Circle) */}
      <div className=" space-y-3 cursor-pointer">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-primary font-bold">
            <div className="bg-white p-1 rounded">
              <CreditCard size={16} />
            </div>
            <span>Order guarantee</span>
          </div>
          <div className="flex items-center gap-0.5 text-gray-500 text-xs">
            More <ChevronRight size={14} />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] md:text-xs font-medium text-primary">
          <div className="flex items-center gap-1">
            <CheckCircle size={12} strokeWidth={3} />
            <span>Free returns</span>
          </div>
          <div className="flex items-center gap-1 text-gray-300">·</div>
          <div className="flex items-center gap-1">
            <CheckCircle size={12} strokeWidth={3} />
            <span>Best price guarantee</span>
          </div>
          <div className="flex items-center gap-1 text-gray-300">·</div>
          <div className="flex items-center gap-1">
            <CheckCircle size={12} strokeWidth={3} />
            <span>Return if items...</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductTrustSection;
