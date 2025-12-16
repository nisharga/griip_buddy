/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import { cn } from "@/src/lib/utils";
import { Loader } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import ProductActions from "./product-actions";
// import { IProduct } from "@/types/product";
import { Switch } from "@/src/components/ui/switch";
// import { useUpdateVendorProductProductIdMutation } from "@/redux/api/vendor";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/src/components/ui/tooltip";
import { IProduct } from "@/src/types/product";
import { useUpdateVendorProductProductIdMutation } from "@/src/redux/api/old/vendor";

type ProductsTableProps = {
  products: IProduct[];
  isLoading: boolean;
  isFetching: boolean;
  page: number;
};

const PRODUCTS_TABLE_HEADERS = [
  "SL No.",
  "Thumbnail",
  "Name",
  "Category",
  "Subcategory",
  "Admin Status",
  "Total Sold",
  "Is Published",
  "Actions",
];

export function ProductsTable({
  products,
  isLoading,
  isFetching,
  page,
}: ProductsTableProps) {
  const statusColors: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-800",
    rejected: "bg-red-100 text-red-800",
    approved: "bg-green-100 text-green-800",
    resubmit_requested: "bg-orange-100 text-orange-800",
    edited: "bg-blue-100 text-blue-800",
  };
  return (
    <div className="bg-background p-2 rounded-lg shadow-md overflow-auto">
      <Table className="table-auto">
        {/* table header */}
        <TableHeader className="relative h-9 bg-sidebar">
          <TableRow className="border-b-primary/50 hover:bg-transparent">
            {PRODUCTS_TABLE_HEADERS.map((header, index) => (
              <TableHead
                key={header}
                className={cn("bg-primary/10 px-4 md:px-6", {
                  "text-center rounded-tr-md":
                    index === PRODUCTS_TABLE_HEADERS.length - 1,
                  "rounded-tl-md": index === 0,
                })}
              >
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        {/* table body */}
        {products?.length > 0 && (
          <TableBody>
            {products.map((product, index) => (
              <TableRow key={index} className="hover:bg-transparent">
                <TableCell className="px-4 md:px-6">
                  {getActualIndex(index, page, 10)}
                </TableCell>
                <TableCell className="px-4 md:px-6">
                  <Image
                    src={product?.thumbnail || "/no_image.png"}
                    alt={product?.name}
                    height={32}
                    width={32}
                    className="rounded-md size-16"
                    unoptimized
                  />
                </TableCell>
                <TableCell className="px-4 md:px-6 wrap-break-word whitespace-normal">
                  {product?.name}
                </TableCell>
                <TableCell className="px-4 md:px-6">
                  {product?.category?.name}
                </TableCell>
                <TableCell className="px-4 md:px-6">
                  {product?.subcategory?.name || "N/A"}
                </TableCell>
                <TableCell className="px-4 md:px-6">
                  {" "}
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      statusColors[product?.status as string] ||
                      "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {product?.status?.replace("_", " ")}
                  </span>
                </TableCell>
                <TableCell className="px-4 md:px-6">
                  {product?.total_sold}
                </TableCell>
                <TableCell className="px-4 md:px-6">
                  <FormSwitch
                    product_id={product?._id}
                    is_published={product?.is_published}
                    status={product?.status ?? ""}
                  />
                </TableCell>
                <TableCell className="px-4 md:px-6 text-center">
                  <ProductActions product={product} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>

      {/* loading data state */}
      {(isLoading || isFetching) && (
        <div className="w-fit mx-auto py-4">
          <Loader className="size-5 animate-spin" />
        </div>
      )}

      {/* empty data state */}
      {!isLoading && products?.length <= 0 && (
        <div className="text-center py-4">No data found!</div>
      )}
    </div>
  );
}

const getActualIndex = (
  indexWithinPage: number,
  currentPage: number,
  pageSize: number
): number => {
  return (currentPage - 1) * pageSize + indexWithinPage + 1;
};

const FormSwitch = ({
  product_id,
  is_published,
  status,
}: {
  product_id: string;
  is_published: boolean;
  status: string;
}) => {
  const [checked, setChecked] = useState(is_published);

  const [updateStatus, { isLoading: isUpdateStatus }] =
    useUpdateVendorProductProductIdMutation();

  const handleChange = async (value: boolean) => {
    try {
      // create sub category api mutations
      const res: any = await updateStatus({
        product_id: product_id,
      });
      if (res?.data?.success) {
        toast.success("Status update successfully!");
      } else if (res?.error?.data?.message) {
        toast.error(
          res?.error?.data?.message || "Failed to update sub. Try again!"
        );
      }
    } catch (error) {
      console.log("FILE UPLOAD ERROR", error);
      toast.error("Failed to update status");
    }

    setChecked(value);
  };

  return (
    <div className="flex items-center space-x-3">
      <Tooltip>
        <TooltipTrigger asChild>
          <Switch
            disabled={status === "pending"}
            checked={checked}
            onCheckedChange={handleChange}
            className="cursor-pointer bg-secondary"
          />
        </TooltipTrigger>
        {status === "pending" && (
          <TooltipContent side="top">
            Your product is pending for admin approval
          </TooltipContent>
        )}
      </Tooltip>
    </div>
  );
};
