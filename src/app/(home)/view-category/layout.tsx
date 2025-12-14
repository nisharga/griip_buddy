"use client";

import React from "react";
import { useState } from "react";
import Image from "next/image";
import { Search, ChevronDown, Filter } from "lucide-react";
import * as Select from "@radix-ui/react-select";
import * as Checkbox from "@radix-ui/react-checkbox";
import * as Label from "@radix-ui/react-label";
import * as Slider from "@radix-ui/react-slider";
import * as Collapsible from "@radix-ui/react-collapsible";
import { CheckIcon } from "lucide-react";
import { Container } from "@/components/common/container";
import Pagination from "@/components/common/Pagination";
import RangeSelector from "@/components/common/RangeSelector";

interface ViewCategoryLayoutProps {
  children: React.ReactNode;
}

const categories = [
  { name: "Men's Fashion", count: 156 },
  { name: "Men's Watches", count: 89 },
  { name: "Men's Clothing", count: 234 },
  { name: "Men's Underwear", count: 67 },
  { name: "Men's Sportswear", count: 123 },
  { name: "Men's Bags & Wallets", count: 45 },
];

const brands = [
  { name: "Samsung", count: 156 },
  { name: "Apple", count: 134 },
  { name: "Sony", count: 98 },
  { name: "JBL", count: 87 },
  { name: "Logitech", count: 76 },
  { name: "Philips", count: 72 },
  { name: "Dell", count: 68 },
  { name: "ASUS", count: 65 },
  { name: "Razer", count: 58 },
  { name: "Microsoft", count: 54 },
  { name: "HP", count: 52 },
  { name: "Lenovo", count: 48 },
  { name: "Anker", count: 45 },
  { name: "Corsair", count: 43 },
  { name: "SteelSeries", count: 38 },
  { name: "Western Digital", count: 35 },
  { name: "TP-Link", count: 32 },
  { name: "Netgear", count: 28 },
  { name: "Google", count: 25 },
  { name: "Bose", count: 22 },
];

const publishingHouses = [
  { name: "Diesel by name", count: 12 },
  { name: "Long Haul", count: 8 },
];

const authorsCreators = [
  { name: "Diesel by name", count: 15 },
  { name: "Long Haul", count: 9 },
];

const ViewCategoryLayout: React.FC<ViewCategoryLayoutProps> = ({
  children,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [filterBy, setFilterBy] = useState("default");
  const [priceRange, setPriceRange] = useState([0, 3000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  const [productType, setProductType] = useState("all");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, category]);
    } else {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    }
  };

  const handleBrandChange = (brand: string, checked: boolean) => {
    if (checked) {
      setSelectedBrands([...selectedBrands, brand]);
    } else {
      setSelectedBrands(selectedBrands.filter((b) => b !== brand));
    }
  };
  return (
    <div className="min-h-screen border bg-grey-50 relative z-0">
      {/* Header */}
      <div className="bg-white border-b relative z-0">
        <Container className="my-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 space-y-2 sm:space-y-0">
            <div className="flex items-center justify-between w-full">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                  Latest Products
                </h1>
                <p className="text-sm text-gray-600">936 items found</p>
              </div>
              <button
                onClick={() => setIsMobileFilterOpen(true)}
                className="lg:hidden flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <Filter className="h-4 w-4" />
                <span>Filters</span>
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <div className="w-full relative">
              <input
                type="text"
                placeholder="Search for items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <button className="absolute right-1 top-1 h-8 w-8 p-0 bg-primary text-white rounded hover:bg-primary flex items-center justify-center">
                <Search className="h-4 w-4" />
              </button>
            </div>

            <div className="flex flex-row xs:flex-row sm:items-center gap-2 w-full sm:w-auto">
              <Label.Root
                htmlFor="sort"
                className="text-sm font-medium whitespace-nowrap"
              >
                Sort by:
              </Label.Root>
              <Select.Root value={sortBy} onValueChange={setSortBy}>
                <Select.Trigger className="inline-flex items-center justify-center rounded px-4 py-2 text-sm bg-white border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary min-w-[128px] w-full sm:w-auto">
                  <Select.Value />
                  <Select.Icon className="ml-2">
                    <ChevronDown className="h-4 w-4" />
                  </Select.Icon>
                </Select.Trigger>
                <Select.Portal>
                  <Select.Content className="overflow-hidden bg-white rounded-md shadow-lg border border-gray-200 z-50">
                    <Select.Viewport className="p-1">
                      <Select.Item
                        value="default"
                        className="relative flex items-center px-8 py-2 text-sm rounded hover:bg-gray-100 focus:bg-gray-100 cursor-pointer"
                      >
                        <Select.ItemText>Default</Select.ItemText>
                        <Select.ItemIndicator className="absolute left-2">
                          <CheckIcon className="h-4 w-4" />
                        </Select.ItemIndicator>
                      </Select.Item>
                      <Select.Item
                        value="price-low"
                        className="relative flex items-center px-8 py-2 text-sm rounded hover:bg-gray-100 focus:bg-gray-100 cursor-pointer"
                      >
                        <Select.ItemText>Price: Low to High</Select.ItemText>
                        <Select.ItemIndicator className="absolute left-2">
                          <CheckIcon className="h-4 w-4" />
                        </Select.ItemIndicator>
                      </Select.Item>
                      <Select.Item
                        value="price-high"
                        className="relative flex items-center px-8 py-2 text-sm rounded hover:bg-gray-100 focus:bg-gray-100 cursor-pointer"
                      >
                        <Select.ItemText>Price: High to Low</Select.ItemText>
                        <Select.ItemIndicator className="absolute left-2">
                          <CheckIcon className="h-4 w-4" />
                        </Select.ItemIndicator>
                      </Select.Item>
                      <Select.Item
                        value="name"
                        className="relative flex items-center px-8 py-2 text-sm rounded hover:bg-gray-100 focus:bg-gray-100 cursor-pointer"
                      >
                        <Select.ItemText>Name</Select.ItemText>
                        <Select.ItemIndicator className="absolute left-2">
                          <CheckIcon className="h-4 w-4" />
                        </Select.ItemIndicator>
                      </Select.Item>
                    </Select.Viewport>
                  </Select.Content>
                </Select.Portal>
              </Select.Root>
            </div>

            <div className="flex items-center gap-2">
              <Label.Root htmlFor="filter" className="text-sm font-medium">
                Filter by:
              </Label.Root>
              <Select.Root value={filterBy} onValueChange={setFilterBy}>
                <Select.Trigger className="inline-flex items-center justify-center rounded px-4 py-2 text-sm bg-white border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary min-w-[128px]">
                  <Select.Value />
                  <Select.Icon className="ml-2">
                    <ChevronDown className="h-4 w-4" />
                  </Select.Icon>
                </Select.Trigger>
                <Select.Portal>
                  <Select.Content className="overflow-hidden bg-white rounded-md shadow-lg border border-gray-200 z-50">
                    <Select.Viewport className="p-1">
                      <Select.Item
                        value="default"
                        className="relative flex items-center px-8 py-2 text-sm rounded hover:bg-gray-100 focus:bg-gray-100 cursor-pointer"
                      >
                        <Select.ItemText>Default</Select.ItemText>
                        <Select.ItemIndicator className="absolute left-2">
                          <CheckIcon className="h-4 w-4" />
                        </Select.ItemIndicator>
                      </Select.Item>
                      <Select.Item
                        value="in-stock"
                        className="relative flex items-center px-8 py-2 text-sm rounded hover:bg-gray-100 focus:bg-gray-100 cursor-pointer"
                      >
                        <Select.ItemText>In Stock</Select.ItemText>
                        <Select.ItemIndicator className="absolute left-2">
                          <CheckIcon className="h-4 w-4" />
                        </Select.ItemIndicator>
                      </Select.Item>
                      <Select.Item
                        value="on-sale"
                        className="relative flex items-center px-8 py-2 text-sm rounded hover:bg-gray-100 focus:bg-gray-100 cursor-pointer"
                      >
                        <Select.ItemText>On Sale</Select.ItemText>
                        <Select.ItemIndicator className="absolute left-2">
                          <CheckIcon className="h-4 w-4" />
                        </Select.ItemIndicator>
                      </Select.Item>
                    </Select.Viewport>
                  </Select.Content>
                </Select.Portal>
              </Select.Root>
            </div>
          </div>
        </Container>
      </div>

      {/* Mobile Filter Sidebar */}
      {/* todo: break into components */}
      <div className="relative lg:hidden">
        {/* Backdrop - with fade animation */}
        <div
          className={`fixed inset-0 bg-black/25 backdrop-blur-sm z-[999] transition-all duration-300 ease-out ${
            isMobileFilterOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setIsMobileFilterOpen(false)}
          aria-hidden="true"
        />

        {/* Sidebar - with slide and fade animation */}
        <div
          className={`fixed inset-y-0 right-0 z-[1000] w-full max-w-xs bg-white shadow-xl transform transition-all duration-300 ease-out ${
            isMobileFilterOpen
              ? "translate-x-0 opacity-100"
              : "translate-x-full opacity-60"
          }`}
        >
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="font-semibold text-gray-900">Filters</h3>
            <button
              onClick={() => setIsMobileFilterOpen(false)}
              className="p-2 -mr-2 text-gray-500 hover:text-gray-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-4 px-4 space-y-6">
            <div className="space-y-6">
              {/* Product Type */}
              <Collapsible.Root defaultOpen>
                <Collapsible.Trigger className="flex items-center justify-between w-full text-left font-medium hover:text-gray-700">
                  Product Type
                  <ChevronDown className="h-4 w-4" />
                </Collapsible.Trigger>
                <Collapsible.Content className="mt-2">
                  <Select.Root
                    value={productType}
                    onValueChange={setProductType}
                  >
                    <Select.Trigger className="inline-flex items-center justify-between w-full rounded px-3 py-2 text-sm bg-white border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary">
                      <Select.Value />
                      <Select.Icon>
                        <ChevronDown className="h-4 w-4" />
                      </Select.Icon>
                    </Select.Trigger>
                    <Select.Portal>
                      <Select.Content className="overflow-hidden bg-white rounded-md shadow-lg border border-gray-200 z-50">
                        <Select.Viewport className="p-1">
                          {[
                            "all",
                            "automotive",
                            "electronics",
                            "accessories",
                          ].map((type) => (
                            <Select.Item
                              key={type}
                              value={type}
                              className="relative flex items-center px-8 py-2 text-sm rounded hover:bg-gray-100 focus:bg-gray-100 cursor-pointer capitalize"
                            >
                              <Select.ItemText className="capitalize">
                                {type}
                              </Select.ItemText>
                              <Select.ItemIndicator className="absolute left-2">
                                <CheckIcon className="h-4 w-4" />
                              </Select.ItemIndicator>
                            </Select.Item>
                          ))}
                        </Select.Viewport>
                      </Select.Content>
                    </Select.Portal>
                  </Select.Root>
                </Collapsible.Content>
              </Collapsible.Root>

              {/* Price Range */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Price</h4>
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
                      className="px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary w-full"
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
                      className="px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary w-full"
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
                      <Slider.Range className="absolute bg-blue-600 rounded-full h-full" />
                    </Slider.Track>
                    <Slider.Thumb className="block w-4 h-4 bg-white border-2 border-blue-600 rounded-full hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary" />
                    <Slider.Thumb className="block w-4 h-4 bg-white border-2 border-blue-600 rounded-full hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary" />
                  </Slider.Root>
                </div>
              </div>

              {/* Categories */}
              <Collapsible.Root defaultOpen>
                <Collapsible.Trigger className="flex items-center justify-between w-full text-left font-medium hover:text-gray-700">
                  Categories
                  <ChevronDown className="h-4 w-4" />
                </Collapsible.Trigger>
                <Collapsible.Content className="mt-2 space-y-2">
                  {categories.map((category) => (
                    <div
                      key={category.name}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox.Root
                        id={`mobile-${category.name}`}
                        checked={selectedCategories.includes(category.name)}
                        onCheckedChange={(checked) =>
                          handleCategoryChange(
                            category.name,
                            checked as boolean
                          )
                        }
                        className="flex h-4 w-4 items-center justify-center rounded border border-gray-300 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                      >
                        <Checkbox.Indicator className="text-white">
                          <CheckIcon className="h-3 w-3" />
                        </Checkbox.Indicator>
                      </Checkbox.Root>
                      <Label.Root
                        htmlFor={`mobile-${category.name}`}
                        className="text-sm flex-1 cursor-pointer"
                      >
                        {category.name}
                      </Label.Root>
                      <span className="text-xs text-gray-500">
                        {category.count}
                      </span>
                    </div>
                  ))}
                </Collapsible.Content>
              </Collapsible.Root>

              {/* Brands */}
              <Collapsible.Root defaultOpen>
                <Collapsible.Trigger className="flex items-center justify-between w-full text-left font-medium hover:text-gray-700">
                  Brands
                  <ChevronDown className="h-4 w-4" />
                </Collapsible.Trigger>
                <Collapsible.Content className="mt-2 space-y-2">
                  {brands.map((brand) => (
                    <div
                      key={brand.name}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox.Root
                        id={`mobile-${brand.name}`}
                        checked={selectedBrands.includes(brand.name)}
                        onCheckedChange={(checked) =>
                          handleBrandChange(brand.name, checked as boolean)
                        }
                        className="flex h-4 w-4 items-center justify-center rounded border border-gray-300 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                      >
                        <Checkbox.Indicator className="text-white">
                          <CheckIcon className="h-3 w-3" />
                        </Checkbox.Indicator>
                      </Checkbox.Root>
                      <Label.Root
                        htmlFor={`mobile-${brand.name}`}
                        className="text-sm flex-1 cursor-pointer"
                      >
                        {brand.name}
                      </Label.Root>
                      <span className="text-xs text-gray-500">
                        {brand.count}
                      </span>
                    </div>
                  ))}
                </Collapsible.Content>
              </Collapsible.Root>
            </div>
          </div>

          <div className="border-t p-4">
            <button
              onClick={() => setIsMobileFilterOpen(false)}
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-primary focus:outline-none focus:ring-2 focus:ring-primary"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
      <Container>
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Filters - Desktop */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm border p-4 space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Filter By</h3>
              </div>

              {/* Product Type */}
              <Collapsible.Root defaultOpen>
                <Collapsible.Trigger className="flex items-center justify-between w-full text-left font-medium hover:text-gray-700">
                  Product Type
                  <ChevronDown className="h-4 w-4" />
                </Collapsible.Trigger>
                <Collapsible.Content className="mt-2">
                  <Select.Root
                    value={productType}
                    onValueChange={setProductType}
                  >
                    <Select.Trigger className="inline-flex items-center justify-between w-full rounded px-3 py-2 text-sm bg-white border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary">
                      <Select.Value />
                      <Select.Icon>
                        <ChevronDown className="h-4 w-4" />
                      </Select.Icon>
                    </Select.Trigger>
                    <Select.Portal>
                      <Select.Content className="overflow-hidden bg-white rounded-md shadow-lg border border-gray-200 z-50">
                        <Select.Viewport className="p-1">
                          <Select.Item
                            value="all"
                            className="relative flex items-center px-8 py-2 text-sm rounded hover:bg-gray-100 focus:bg-gray-100 cursor-pointer"
                          >
                            <Select.ItemText>All Products</Select.ItemText>
                            <Select.ItemIndicator className="absolute left-2">
                              <CheckIcon className="h-4 w-4" />
                            </Select.ItemIndicator>
                          </Select.Item>
                          <Select.Item
                            value="automotive"
                            className="relative flex items-center px-8 py-2 text-sm rounded hover:bg-gray-100 focus:bg-gray-100 cursor-pointer"
                          >
                            <Select.ItemText>Automotive</Select.ItemText>
                            <Select.ItemIndicator className="absolute left-2">
                              <CheckIcon className="h-4 w-4" />
                            </Select.ItemIndicator>
                          </Select.Item>
                          <Select.Item
                            value="electronics"
                            className="relative flex items-center px-8 py-2 text-sm rounded hover:bg-gray-100 focus:bg-gray-100 cursor-pointer"
                          >
                            <Select.ItemText>Electronics</Select.ItemText>
                            <Select.ItemIndicator className="absolute left-2">
                              <CheckIcon className="h-4 w-4" />
                            </Select.ItemIndicator>
                          </Select.Item>
                          <Select.Item
                            value="accessories"
                            className="relative flex items-center px-8 py-2 text-sm rounded hover:bg-gray-100 focus:bg-gray-100 cursor-pointer"
                          >
                            <Select.ItemText>Accessories</Select.ItemText>
                            <Select.ItemIndicator className="absolute left-2">
                              <CheckIcon className="h-4 w-4" />
                            </Select.ItemIndicator>
                          </Select.Item>
                        </Select.Viewport>
                      </Select.Content>
                    </Select.Portal>
                  </Select.Root>
                </Collapsible.Content>
              </Collapsible.Root>

              <RangeSelector />

              {/* Categories */}
              <Collapsible.Root defaultOpen>
                <Collapsible.Trigger className="flex items-center justify-between w-full text-left font-medium hover:text-gray-700">
                  Categories
                  <ChevronDown className="h-4 w-4" />
                </Collapsible.Trigger>
                <Collapsible.Content className="mt-2 space-y-2">
                  {categories.map((category) => (
                    <div
                      key={category.name}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox.Root
                        id={category.name}
                        checked={selectedCategories.includes(category.name)}
                        onCheckedChange={(checked) =>
                          handleCategoryChange(
                            category.name,
                            checked as boolean
                          )
                        }
                        className="flex h-4 w-4 items-center justify-center rounded border border-gray-300 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                      >
                        <Checkbox.Indicator className="text-white">
                          <CheckIcon className="h-3 w-3" />
                        </Checkbox.Indicator>
                      </Checkbox.Root>
                      <Label.Root
                        htmlFor={category.name}
                        className="text-sm flex-1 cursor-pointer"
                      >
                        {category.name}
                      </Label.Root>
                      <span className="text-xs text-gray-500">
                        {category.count}
                      </span>
                    </div>
                  ))}
                </Collapsible.Content>
              </Collapsible.Root>

              {/* Brands */}
              <Collapsible.Root defaultOpen>
                <Collapsible.Trigger className="flex items-center justify-between w-full text-left font-medium hover:text-gray-700">
                  Brands
                  <ChevronDown className="h-4 w-4" />
                </Collapsible.Trigger>
                <Collapsible.Content className="mt-2 space-y-2">
                  {brands.map((brand) => (
                    <div
                      key={brand.name}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox.Root
                        id={brand.name}
                        checked={selectedBrands.includes(brand.name)}
                        onCheckedChange={(checked) =>
                          handleBrandChange(brand.name, checked as boolean)
                        }
                        className="flex h-4 w-4 items-center justify-center rounded border border-gray-300 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                      >
                        <Checkbox.Indicator className="text-white">
                          <CheckIcon className="h-3 w-3" />
                        </Checkbox.Indicator>
                      </Checkbox.Root>
                      <Label.Root
                        htmlFor={brand.name}
                        className="text-sm flex-1 cursor-pointer"
                      >
                        {brand.name}
                      </Label.Root>
                      <span className="text-xs text-gray-500">
                        {brand.count}
                      </span>
                    </div>
                  ))}
                </Collapsible.Content>
              </Collapsible.Root>

              {/* Publishing House */}
              <Collapsible.Root>
                <Collapsible.Trigger className="flex items-center justify-between w-full text-left font-medium hover:text-gray-700">
                  Publishing House
                  <ChevronDown className="h-4 w-4" />
                </Collapsible.Trigger>
                <Collapsible.Content className="mt-2 space-y-2">
                  {publishingHouses.map((house) => (
                    <div
                      key={house.name}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox.Root
                        id={house.name}
                        className="flex h-4 w-4 items-center justify-center rounded border border-gray-300 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                      >
                        <Checkbox.Indicator className="text-white">
                          <CheckIcon className="h-3 w-3" />
                        </Checkbox.Indicator>
                      </Checkbox.Root>
                      <Label.Root
                        htmlFor={house.name}
                        className="text-sm flex-1 cursor-pointer"
                      >
                        {house.name}
                      </Label.Root>
                      <span className="text-xs text-gray-500">
                        {house.count}
                      </span>
                    </div>
                  ))}
                </Collapsible.Content>
              </Collapsible.Root>

              {/* Authors/Creators/Artists */}
              <Collapsible.Root>
                <Collapsible.Trigger className="flex items-center justify-between w-full text-left font-medium hover:text-gray-700">
                  Authors/Creators/Artists
                  <ChevronDown className="h-4 w-4" />
                </Collapsible.Trigger>
                <Collapsible.Content className="mt-2 space-y-2">
                  {authorsCreators.map((creator) => (
                    <div
                      key={creator.name}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox.Root
                        id={creator.name}
                        className="flex h-4 w-4 items-center justify-center rounded border border-gray-300 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                      >
                        <Checkbox.Indicator className="text-white">
                          <CheckIcon className="h-3 w-3" />
                        </Checkbox.Indicator>
                      </Checkbox.Root>
                      <Label.Root
                        htmlFor={creator.name}
                        className="text-sm flex-1 cursor-pointer"
                      >
                        {creator.name}
                      </Label.Root>
                      <span className="text-xs text-gray-500">
                        {creator.count}
                      </span>
                    </div>
                  ))}
                </Collapsible.Content>
              </Collapsible.Root>
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-2 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {children}
            </div>

            <Pagination />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ViewCategoryLayout;
