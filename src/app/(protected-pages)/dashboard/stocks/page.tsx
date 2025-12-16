"use client";

import { Button } from "@/src/components/ui/button";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/src/components/ui/input";
import GlobalLoader from "../../components/loading/GlobalLoader";
import { ProductsTable } from "./_components/products-table";
import { getVendorId } from "../../store/user";
import { useGetAllStockByVendorIdQuery } from "@/src/redux/api/old/vendor";
import Pagination from "../../components/form/data-table/pagination";

const ProductsPage = () => {
  const [searchInput, setSearchInput] = useState("");
  // === get all products ===
  const [filters, setFilters] = useState({
    search_query: searchInput,
    page: 1,
    limit: 10,
  });
  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      search_query: searchInput,
      page: 1, // Optional: reset to page 1 when searching
    }));
  }, [searchInput]);

  // === get all products ===
  const vendor_id = getVendorId();
  const { data, isLoading, isFetching } = useGetAllStockByVendorIdQuery({
    vendor_id,
    filters,
  });
  const products = data?.data?.data;

  if (isLoading) return <GlobalLoader />;

  const handlePageChange = (newPage: number) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col lg:flex-row justify-between gap-2">
        <h1 className="font-medium text-2xl">
          All Stocks ({data?.data?.meta?.total || 0})
        </h1>

        <div className="flex gap-2 flex-col sm:flex-row">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search Via Product Name..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="pl-10 w-full md:w-64"
            />
          </div>
          <div className="">
            <Button asChild className="ms-auto bg-secondary">
              <Link href="/dashboard/products/create">Add new Product</Link>
            </Button>
          </div>
        </div>
      </div>
      {/* table */}
      <ProductsTable
        products={products}
        isLoading={isLoading}
        isFetching={isFetching}
        page={data?.data?.meta.page}
      />

      {/* pagination */}
      <div className="flex items-center justify-end pb-4">
        {products && (
          <Pagination
            page={data?.data.meta.page}
            limit={data?.data.meta.limit}
            total={data?.data.meta?.total}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
