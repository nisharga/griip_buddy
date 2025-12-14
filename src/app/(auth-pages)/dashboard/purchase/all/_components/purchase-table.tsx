/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
 Table,
 TableBody,
 TableCell,
 TableHead,
 TableHeader,
 TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import React from "react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

type PurchaseTableProps = {
 purchases: [];
 isLoading: boolean;
 isFetching: boolean;
};

const PURCHASE_TABLE_HEADERS = [
 "ID",
 "Date",
 "Supplier",
 "Total Items",
 "Supplier Status",
 "Admin Status",
 "Total Cost",
 "Added By",
 // "Actions",
];

export function PurchaseTable({
 purchases,
 isLoading,
 isFetching,
}: PurchaseTableProps) {
 console.log("🚀 ~ PurchaseTable ~ purchases:", purchases);
 return (
  <div className='bg-background p-2 rounded-lg shadow-md'>
   {!isLoading && !isFetching && (
    <Table>
     {/* table header */}
     <TableHeader className='relative h-9 bg-sidebar'>
      <TableRow className='border-b-primary/50'>
       {PURCHASE_TABLE_HEADERS.map((header, index) => (
        <TableHead
         key={header}
         className={cn("bg-primary/10 px-4", {
          "rounded-tr-md": index === PURCHASE_TABLE_HEADERS?.length - 1,
          "rounded-tl-md": index === 0,
         })}>
         {header}
        </TableHead>
       ))}
      </TableRow>
     </TableHeader>

     {/* table body */}
     {purchases?.length > 0 && (
      <TableBody>
       {purchases?.map((purchase: any, index) => {
        return (
         <TableRow key={index}>
          <TableCell className='px-4'>#{purchase?.purchase_number}</TableCell>
          <TableCell className='px-4'>
           <span className='flex flex-col gap-1'>
            {purchase?.purchase_date ? (
             <p>
              {format(new Date(purchase?.purchase_date), "dd MMM yyyy")},{" "}
              {format(new Date(purchase?.purchase_date), "hh:mm a")}
             </p>
            ) : (
             <p>N/A</p>
            )}
           </span>
          </TableCell>

          <TableCell className='px-4'>
           {purchase?.supplier?.name || "N/A"}
          </TableCell>
          <TableCell className='px-4'>{purchase?.items?.length || 0}</TableCell>
          <TableCell className='px-4'>
           <Badge
            variant={
             purchase?.supplier_status === "draft"
              ? "yellow-outline"
              : purchase?.supplier_status === "ordered"
              ? "orange-outline"
              : purchase?.supplier_status === "received"
              ? "emerald-outline"
              : "red-outline"
            }>
            {purchase?.supplier_status.charAt(0).toUpperCase() +
             purchase?.supplier_status.slice(1)}
           </Badge>
          </TableCell>
          <TableCell className='px-4'>
           <Badge
            variant={
             purchase?.admin_status === "stock_pending"
              ? "yellow-outline"
              : purchase?.admin_status === "stock_received"
              ? "emerald-outline"
              : "red-outline"
            }>
            {purchase?.admin_status.charAt(0).toUpperCase() +
             purchase?.admin_status.slice(1)}
           </Badge>
          </TableCell>
          <TableCell className='px-4'> ৳{purchase?.total_cost}</TableCell>
          <TableCell className='px-4'>
           <Link href={`/dashboard/purchase/${purchase?._id}`}>View</Link>
          </TableCell>

          {/* <TableCell className="px-4">Action</TableCell> */}
         </TableRow>
        );
       })}
      </TableBody>
     )}
    </Table>
   )}

   {/* loading data state */}
   {(isLoading || isFetching) && (
    <div className='w-full grid gap-4'>
     {Array.from({ length: 10 }).map((_, index) => (
      <span
       key={index}
       className='bg-secondary h-14 rounded-md animate-skeleton'
      />
     ))}
    </div>
   )}

   {/* empty data state */}
   {!isLoading && purchases?.length <= 0 && (
    <div className='text-center py-4'>No data found!</div>
   )}
  </div>
 );
}
