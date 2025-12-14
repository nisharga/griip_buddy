"use client";
import React, { useState } from "react";
import * as Slider from "@radix-ui/react-slider";

const RangeSelector = () => {
  const [priceRange, setPriceRange] = useState([0, 3000]);
  return (
    <div>
      <div>
        <h4 className="font-medium text-gray-900 mb-3 ">Price</h4>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <input
              type="number"
              placeholder="Min"
              value={priceRange[0]}
              onChange={(e) =>
                setPriceRange([
                  Number.parseInt(e.target.value) || 0,
                  priceRange[1],
                ])
              }
              className="px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 w-full"
            />
            <span className="text-gray-500">-</span>
            <input
              type="number"
              placeholder="Max"
              value={priceRange[1]}
              onChange={(e) =>
                setPriceRange([
                  priceRange[0],
                  Number.parseInt(e.target.value) || 3000,
                ])
              }
              className="px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 w-full"
            />
          </div>
          <Slider.Root
            value={priceRange}
            onValueChange={setPriceRange}
            max={3000}
            step={10}
            className="relative flex items-center select-none touch-none w-full h-5"
          >
            <Slider.Track className="bg-gray-200 relative grow rounded-full h-1">
              <Slider.Range className="absolute bg-primary rounded-full h-full" />
            </Slider.Track>
            <Slider.Thumb className="block w-4 h-4 bg-white border-2 border-primary rounded-full hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary" />
            <Slider.Thumb className="block w-4 h-4 bg-white border-2 border-primary rounded-full hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary" />
          </Slider.Root>
          <button className="w-full px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary">
            Go
          </button>
        </div>
      </div>
    </div>
  );
};

export default RangeSelector;
