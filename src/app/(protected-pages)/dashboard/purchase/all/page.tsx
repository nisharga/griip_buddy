"use client";
import React, { useEffect, useState } from "react";
import { PurchaseTable } from "./_components/purchase-table";
import {
 SelectItem,
 Select,
 SelectContent,
 SelectTrigger,
 SelectValue,
} from "@/components/ui/select";

import {
 Accordion,
 AccordionContent,
 AccordionItem,
 AccordionTrigger,
} from "@/components/ui/accordion";
import { Filter } from "lucide-react";
import { PURCHASE_STATUSES } from "@/types/purchase";
// import DynamicPagination from "@/components/shared/DynamicPagination";
// import { useGetAllSuppliersQuery } from "@/redux/api-queries/supplier";
// import { useGetAllPurchasesQuery } from "@/redux/api-queries/purchase";
// import { useGetAllOutletAndWarehouseQuery } from "@/redux/api-queries/outlet-api";
import { TBusinessLocation } from "@/types/product";
import { TSupplier } from "@/types/supplier";
import {
 useGetAllPurchasesQuery,
 useGetPurchaseByVendorIdQuery,
} from "@/redux/api/purchase";
import { useGetAllOutletAndWarehouseQuery } from "@/redux/api/outlet-api";
import { useGetAllSuppliersQuery } from "@/redux/api/supplier";
import DynamicPagination from "@/components/shared/DynamicPagination";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useVendorId } from "@/hooks/useVendor";

const AllPurchasePage = () => {
 // === api query states ===
 const [page, setPage] = useState(1);
 const [limit, setLimit] = useState<string | number>(20);
 const [supplier, setSupplier] = useState("");
 const [status, setStatus] = useState("");

 // === get vendorId ===
 const vendorId = useVendorId();

 // === get all purchases ===
 const { data, isLoading, isFetching } = useGetPurchaseByVendorIdQuery({
  id: vendorId,
  page,
  limit,
  supplier,
  status,
  purchase_number: "",
 });
 const purchases = data?.data?.data;
 const purchasesMeta = data?.data?.meta;

 // === get all business locations ===
 const { data: businessLocationData } = useGetAllOutletAndWarehouseQuery({});
 const businessLocationOptions =
  businessLocationData?.data?.businessLocations?.map(
   (businessLocation: TBusinessLocation) => ({
    label: businessLocation?.name,
    value: businessLocation?._id,
   }),
  ) || [];

 // === get all suppliers ===
 const { data: suppliersData } = useGetAllSuppliersQuery({});
 const supplierOptions =
  suppliersData?.data?.map((supplier: TSupplier) => ({
   label: supplier?.name,
   value: supplier?._id,
  })) || [];

 // === paginations ===
 // === handling page change ===
 const handlePageChange = (newPage: number) => {
  setPage(newPage);
 };
 // === reset to first page whenover limit or other parameters were changed ===
 useEffect(() => {
  setPage(1);
 }, [limit, supplier]);

 // === handle clear filter ===
 // const handleClearFilter = () => {
 //   setBusinessLocation("");
 //   setSupplier("");
 //   setStatus("");
 // };

 return (
  <section className='flex flex-col gap-6'>
   <div className='flex items-center justify-between gap-2 flex-col md:flex-row'>
    <h1 className='font-medium text-2xl'>
     All Purchases ({purchasesMeta?.total})
    </h1>
    <div className=''>
     <Button asChild className='ms-auto bg-secondary'>
      <Link href='/dashboard/purchase/create'>Add new Purchases</Link>
     </Button>
    </div>
   </div>
   {/* search filter */}
   <div className='bg-background rounded-lg shadow-md'>
    <Accordion type='single' collapsible>
     <AccordionItem value='item-1'>
      <AccordionTrigger
       //  isHideChevron={true}
       className='p-4 text-lg font-medium border-b hover:
        cursor-pointer rounded-b-none hover:no-underline'>
       <span className='flex items-center gap-2 text-emerald-600'>
        <Filter className='size-5' /> Filter
       </span>
      </AccordionTrigger>
     </AccordionItem>
    </Accordion>
   </div>

   {/* table */}
   <PurchaseTable
    purchases={purchases}
    isLoading={isLoading}
    isFetching={isFetching}
   />
   {/* pagination */}
   {purchasesMeta?.total > 0 && (
    <div className='bg-background p-2 rounded-lg shadow-md'>
     <DynamicPagination
      limit={limit}
      setLimit={setLimit}
      currentPage={page}
      onPageChange={handlePageChange}
      totalItems={purchasesMeta?.total}
     />
    </div>
   )}
  </section>
 );
};

export default AllPurchasePage;
