/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { Button } from "@/components/ui/button";
import {
 Form,
 FormControl,
 FormField,
 FormItem,
 FormLabel,
 FormMessage,
} from "@/components/ui/form";
import {
 Select,
 SelectContent,
 SelectItem,
 SelectTrigger,
 SelectValue,
} from "@/components/ui/select";
import { useState, useEffect } from "react";
import { CalendarIcon, Loader, Trash2, Plus, Check } from "lucide-react";
import { toast } from "sonner";

import {
 Popover,
 PopoverContent,
 PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
 Table,
 TableBody,
 TableCell,
 TableHead,
 TableHeader,
 TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";

import { PurchaseSchema } from "./schema";
import { useGetAllSuppliersQuery } from "@/redux/api/supplier";
import { useCreatePurchaseMutation } from "@/redux/api/purchase";
import { TSupplier } from "@/types/supplier";
import useDebounce from "@/hooks/use-debounce";
import {
 useGetAllSearchVariantsQuery,
 useGetSingleVendorQuery,
} from "@/redux/api/vendor";
import { useRouter } from "next/navigation";
import { getVendorId } from "@/app/(auth-pages)/store/user";

interface PurchaseItem {
 variant: string;
 product: string;
 qty: number;
 unit_cost: number;
 discount: number;
 // Optional display fields for UI
 product_name?: string;
 variant_name?: string;
 sku?: string;
}

interface ExpenseItem {
 type: string;
 amount: number;
 note?: string;
}

const CreatePurchaseForm = () => {
 // === router ===
 const router = useRouter();

 const id = getVendorId() || "";

 // === get vendor data ===
 const { data, isLoading, isFetching } = useGetSingleVendorQuery({
  user_id: id,
 });

 const vendor = data?.data;
 const vendorId = vendor?._id;

 // === search variant state ===
 const [searchProduct, setSearchProduct] = useState<string>("");
 const debouncedSearchVariant = useDebounce(searchProduct);

 const [selectedItems, setSelectedItems] = useState<PurchaseItem[]>([]);
 const [selectedExpenses, setSelectedExpenses] = useState<ExpenseItem[]>([]);

 // === get all suppliers ===

 const { data: suppliersData } = useGetAllSuppliersQuery({});
 const supplierOptions =
  suppliersData?.data?.map((supplier: TSupplier) => ({
   label: supplier?.name,
   value: supplier?._id,
  })) || [];

 // === get all vendors ===
 const [searchValue, setSearchValue] = useState("");

 // === get all search variants ===
 const { data: searchVariantsData, isLoading: isSearchProductLoading } =
  useGetAllSearchVariantsQuery({
   page: 1,
   limit: 20,
   vendorId: vendorId as string,
   barcode: "",
   searchQuery: debouncedSearchVariant,
   product_id: "",
  });
 const searchVariants = searchVariantsData?.data?.data;

 // Group by product.sku (root SKU)
 const groupedVariants =
  searchVariants?.reduce((acc: any, item: any) => {
   const rootSKU = item?.product?.sku;
   if (!acc[rootSKU]) {
    acc[rootSKU] = {
     productName: item?.product?.name,
     rootSKU,
     variants: [],
    };
   }
   acc[rootSKU].variants.push(item);
   return acc;
  }, {}) || {};
 const groupedSearchResults = Object.values(groupedVariants);

 // === add new purchase api mutation ===
 const [createPurchase, { isLoading: isCreatePurchaseLoading }] =
  useCreatePurchaseMutation();

 // === form default values ===
 const form = useForm<z.infer<typeof PurchaseSchema>>({
  resolver: zodResolver(PurchaseSchema),
  defaultValues: {
   supplier: "",
   status: "received",
   purchase_date: new Date(),
   items: [],
   expenses_applied: [],
  },
 });

 // === handle add new purchase ===
 const handleAddNewPurchase = async (data: z.infer<typeof PurchaseSchema>) => {
  try {
   const payload: any = data;

   payload.vendor = vendorId as string;

   console.log("payload", payload);

   const res: any = await createPurchase({ payload });
   if (res?.data?.success) {
    toast.success("Purchase added!");
    router.replace("/dashboard/purchase/all");
   } else if (res?.error?.data?.message) {
    toast.error(res?.error?.data?.message || "Failed to add purchase!");
   }
  } catch (error: any) {
   console.log("CREATE PURCHASE ERROR: ", error);

   // show meaningfull message
   const err = error?.data?.errorMessages?.map(
    (errMessage: { path: string; message: string }) => errMessage?.message,
   );

   if (err && err?.length > 0) {
    const errorMessage = err?.join("\n");
    toast.error(errorMessage);
   } else {
    toast.error("Something went wrong! Try again.");
   }
  }
 };

 // === handle select product ===
 const handleSelectProduct = (items: any | any[]) => {
  const variantsArray = Array.isArray(items) ? items : [items];

  const newItems: PurchaseItem[] = variantsArray.map((item) => {
   const variant = Object.entries(item?.attribute_values)
    ?.map(([, value]) => value)
    .join(" - ");

   return {
    variant: item?._id,
    product: item?.product?._id,
    qty: 1,
    unit_cost: 0,
    discount: 0,
    product_name: item?.product?.name,
    variant_name: variant,
    sku: item?.sku,
   };
  });

  setSelectedItems((prev) => [...prev, ...newItems]);
  setSearchProduct("");
 };

 // === handle item remove ===
 const handleRemoveItem = (index: number) => {
  setSelectedItems((prev) => prev.filter((_, i) => i !== index));
 };

 // === handle item update ===
 const handleUpdateItem = (
  index: number,
  field: keyof PurchaseItem,
  value: any,
 ) => {
  setSelectedItems((prev) =>
   prev.map((item, i) => (i === index ? { ...item, [field]: value } : item)),
  );
 };

 // === handle add expense ===
 const handleAddExpense = () => {
  const newExpense: ExpenseItem = {
   type: "",
   amount: 0,
   note: "",
  };
  setSelectedExpenses((prev) => [...prev, newExpense]);
 };

 // === handle remove expense ===
 const handleRemoveExpense = (index: number) => {
  setSelectedExpenses((prev) => prev.filter((_, i) => i !== index));
 };

 // === handle update expense ===
 const handleUpdateExpense = (
  index: number,
  field: keyof ExpenseItem,
  value: any,
 ) => {
  setSelectedExpenses((prev) =>
   prev.map((expense, i) =>
    i === index ? { ...expense, [field]: value } : expense,
   ),
  );
 };

 // === use effects to update form values ===
 useEffect(() => {
  const formattedItems = selectedItems.map(({ ...item }) => item);
  form.setValue("items", formattedItems);
 }, [selectedItems, form]);

 useEffect(() => {
  form.setValue("expenses_applied", selectedExpenses);
 }, [selectedExpenses, form]);

 const handleCostToApplyAll = (unit_cost: any) => {
  setSelectedItems((prev) =>
   prev.map((item) => ({ ...item, unit_cost: unit_cost })),
  );
 };
 const handleDiscountToApplyAll = (discount: any) => {
  setSelectedItems((prev) =>
   prev.map((item) => ({ ...item, discount: discount })),
  );
 };

 return (
  <Form {...form}>
   <form
    onSubmit={form.handleSubmit(handleAddNewPurchase)}
    className='w-full space-y-6'>
    <div className='bg-background p-4 lg:p-6 rounded-lg shadow hover:shadow-xl transition-transform duration-300 grid md:grid-cols-2 xl:grid-cols-4 gap-6'>
     {/* ===== supplier field ===== */}
     <FormField
      control={form.control}
      name='supplier'
      render={({ field }) => (
       <FormItem>
        <FormLabel>Supplier</FormLabel>
        <Select
         onValueChange={(value) => {
          field.onChange(value);
         }}
         defaultValue={field.value !== undefined ? field.value : undefined}>
         <FormControl>
          <SelectTrigger className='w-full'>
           <SelectValue placeholder='Select a supplier' />
          </SelectTrigger>
         </FormControl>
         <SelectContent>
          {supplierOptions?.map(
           (supplier: { label: string; value: string }, index: number) => (
            <SelectItem key={index} value={supplier?.value}>
             {supplier?.label}
            </SelectItem>
           ),
          )}
         </SelectContent>
        </Select>
        <FormMessage />
       </FormItem>
      )}
     />

     {/* ===== purchase date field ===== */}
     <FormField
      control={form.control}
      name='purchase_date'
      render={({ field }) => (
       <FormItem className='flex flex-col'>
        <FormLabel>Purchase Date</FormLabel>
        <Popover>
         <PopoverTrigger asChild>
          <FormControl>
           <Button
            variant={"outline"}
            className={cn(
             "w-full pl-3 h-9 md:text-sm text-left font-normal",
             !field.value && "text-muted-foreground",
            )}>
            {field.value ? (
             format(field.value, "PPP")
            ) : (
             <span>Pick a date</span>
            )}
            <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
           </Button>
          </FormControl>
         </PopoverTrigger>
         <PopoverContent className='w-auto p-0' align='start'>
          <Calendar
           mode='single'
           selected={field.value}
           onSelect={field.onChange}
           disabled={(date: Date) =>
            date > new Date() || date < new Date("1900-01-01")
           }
           captionLayout='dropdown'
          />
         </PopoverContent>
        </Popover>
        <FormMessage />
       </FormItem>
      )}
     />
    </div>

    <div className='bg-background p-4 lg:p-6 rounded-lg shadow hover:shadow-xl transition-transform duration-300'>
     <div className='space-y-4'>
      <div className='space-y-2 max-w-2xl mx-auto'>
       <p className='text-sm font-medium'>Search for Products</p>
       <Input
        type='text'
        className='w-full'
        value={searchProduct}
        onChange={(e) => setSearchProduct(e.target.value)}
        placeholder='Search by a product name or sku'
       />
       {searchProduct && (
        <div className='w-full bg-background rounded-lg max-h-80 overflow-y-auto border'>
         {/* Results */}
         {!isSearchProductLoading && searchVariants?.length > 0 && (
          <div>
           {/* Grouped results */}
           {groupedSearchResults?.map((group: any) => (
            <div key={group.rootSKU} className='border-b last:border-b-0'>
             {/* Header */}
             <div
              onClick={() => handleSelectProduct([...group.variants])}
              className='px-2 py-2 bg-muted/40  text-sm text-foreground cursor-pointer hover:bg-primary/10'>
              {group.productName} ({group.rootSKU})
             </div>

             {/* Variants */}
             {group.variants.map((item: any) => {
              const variant = Object.entries(item?.attribute_values)
               ?.map(([, value]) => value)
               .join(" - ");

              return (
               <div
                key={item?._id}
                className='px-4 py-2 hover:bg-muted cursor-pointer border-t last:border-b-0'
                onClick={() => handleSelectProduct([item])}>
                <div className='flex items-center justify-between'>
                 <p className='text-sm '>
                  {group.productName} ({variant}) - {item?.sku}
                 </p>
                 <Plus className='h-4 w-4 text-muted-foreground' />
                </div>
               </div>
              );
             })}
            </div>
           ))}
          </div>
         )}
         {!isSearchProductLoading && searchVariants?.length === 0 && (
          <div className='text-center text-sm py-6'>
           No product found! Try different keywords.
          </div>
         )}
         {isSearchProductLoading && (
          <div className='text-center text-sm py-6'>
           <Loader className='animate-spin mx-auto' size={16} />
          </div>
         )}
        </div>
       )}
      </div>
      {selectedItems.length > 0 && (
       <div className='space-y-4'>
        <h3 className='text-lg font-semibold'>Selected Items</h3>
        <div className='border rounded-lg overflow-hidden'>
         <Table>
          <TableHeader>
           <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>Qty</TableHead>
            <TableHead>Unit Cost</TableHead>
            <TableHead>Discount</TableHead>

            <TableHead></TableHead>
           </TableRow>
          </TableHeader>
          <TableBody>
           {selectedItems.map((item: any, index) => {
            return (
             <TableRow key={index}>
              <TableCell>
               <p className='text-sm font-medium'>
                {item?.product_name} ({item?.variant_name}){" - "}
                {item?.sku}
               </p>
              </TableCell>
              <TableCell>
               <Input
                type='number'
                value={item.qty}
                onWheel={(e) => e.currentTarget.blur()}
                onChange={(e) => {
                 const value = e.target.value;
                 const newValue =
                  value === "" ? "" : Number.parseInt(value) || 0;
                 handleUpdateItem(index, "qty", newValue);
                }}
                min={"1"}
                className='w-full text-sm'
               />
              </TableCell>
              <TableCell className='relative'>
               <div className='relative'>
                <Input
                 type='number'
                 min='0'
                 value={item.unit_cost}
                 onWheel={(e) => e.currentTarget.blur()}
                 onChange={(e) => {
                  const value = e.target.value;
                  const newValue =
                   value === "" ? "" : Number.parseInt(value) || 0;
                  handleUpdateItem(index, "unit_cost", newValue);
                 }}
                 className='w-full text-sm pr-8' // add padding-right for button space
                />
                {/* Apply All Button */}
                {selectedItems?.length > 1 && index === 0 && (
                 <button
                  type='button'
                  onClick={() => handleCostToApplyAll(item.unit_cost)}
                  className='absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600 hover:bg-blue-100'>
                  <Check size={16} />
                 </button>
                )}
               </div>
              </TableCell>
              <TableCell>
               <div className='relative'>
                <Input
                 type='number'
                 value={item.discount}
                 onWheel={(e) => e.currentTarget.blur()}
                 min={"0"}
                 onChange={(e) => {
                  const value = e.target.value;
                  const newValue =
                   value === "" ? "" : Number.parseInt(value) || 0;
                  handleUpdateItem(index, "discount", newValue);
                 }}
                 className='w-full text-sm pr-8'
                />
                {/* Apply All Button */}
                {selectedItems?.length > 1 && index === 0 && (
                 <button
                  type='button'
                  onClick={() => handleDiscountToApplyAll(item.discount)}
                  className='absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600 hover:bg-blue-100'>
                  <Check size={16} />
                 </button>
                )}
               </div>
              </TableCell>
              <TableCell>
               <Button
                type='button'
                variant='ghost'
                size='sm'
                onClick={() => handleRemoveItem(index)}
                className='h-8 w-8 p-0 text-destructive hover:text-destructive'>
                <Trash2 className='h-4 w-4' />
               </Button>
              </TableCell>
             </TableRow>
            );
           })}
          </TableBody>
         </Table>
        </div>
       </div>
      )}
     </div>
    </div>

    <div className='bg-background p-4 lg:p-6 rounded-lg shadow hover:shadow-xl transition-transform duration-300'>
     <div className='space-y-4'>
      <div className='flex items-center justify-between'>
       <h3 className='text-lg font-semibold'>Additional Expenses</h3>
       <Button
        type='button'
        variant='outline'
        size='sm'
        onClick={handleAddExpense}>
        <Plus className='h-4 w-4 mr-2' />
        Add Expense
       </Button>
      </div>
      {selectedExpenses.length > 0 && (
       <div className='border rounded-lg overflow-hidden'>
        <div className='grid grid-cols-[1fr_300px_1fr_48px] gap-0 bg-muted/50'>
         {/* Grid Header */}
         <div className='px-4 py-3 font-medium text-sm border-b'>
          Expense Type
         </div>
         <div className='px-4 py-3 font-medium text-sm border-b border-l'>
          Amount
         </div>
         <div className='px-4 py-3 font-medium text-sm border-b border-l'>
          Note
         </div>
         <div className='px-4 py-3 font-medium text-sm border-b border-l'></div>
        </div>
        <div className='divide-y'>
         {selectedExpenses.map((expense, index) => (
          <div
           key={index}
           className='grid grid-cols-[1fr_300px_1fr_48px] gap-0'>
           <div className='px-4 py-3'>
            <Input
             type='text'
             value={expense.type}
             onChange={(e) =>
              handleUpdateExpense(index, "type", e.target.value)
             }
             placeholder='e.g., Shipping, Tax, Handling'
             className='w-full text-sm'
            />
           </div>
           <div className='px-4 py-3 border-l'>
            <Input
             type='number'
             min='0'
             step='0.01'
             onWheel={(e) => e.currentTarget.blur()}
             value={expense.amount}
             onChange={(e) => {
              const value = e.target.value;
              const newValue = value === "" ? "" : Number.parseInt(value) || 0;
              handleUpdateExpense(index, "amount", newValue);
             }}
             className='w-full text-sm'
            />
           </div>
           <div className='px-4 py-3 border-l'>
            <Textarea
             value={expense.note || ""}
             onChange={(e) =>
              handleUpdateExpense(index, "note", e.target.value)
             }
             placeholder='Optional note'
             className='w-full text-sm min-h-[60px] resize-none'
            />
           </div>
           <div className='px-4 py-3 border-l flex items-center justify-center'>
            <Button
             type='button'
             variant='ghost'
             size='sm'
             onClick={() => handleRemoveExpense(index)}
             className='h-8 w-8 p-0 text-destructive hover:text-destructive'>
             <Trash2 className='h-4 w-4' />
            </Button>
           </div>
          </div>
         ))}
        </div>
       </div>
      )}
      {selectedExpenses?.length === 0 && (
       <div className='text-center text-sm text-muted-foreground py-8 border border-dashed rounded-lg'>
        No additional expenses added. Click &quot;Add Expense&quot; to include
        shipping, taxes, or other costs.
       </div>
      )}
     </div>
    </div>

    <div className='w-fit ms-auto flex items-center gap-2'>
     <Button
      type='submit'
      className=''
      disabled={selectedItems?.length === 0 || isCreatePurchaseLoading}>
      {isCreatePurchaseLoading ? (
       <>
        <Loader className='animate-spin' /> Adding Purchase
       </>
      ) : (
       "Add Purchase"
      )}
     </Button>
    </div>
   </form>
  </Form>
 );
};

export default CreatePurchaseForm;
