// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// const EditorContent = dynamic(
//  () => import("@tiptap/react").then((mod) => mod.EditorContent),
//  { ssr: false },
// );

// import StarterKit from "@tiptap/starter-kit";
// import Placeholder from "@tiptap/extension-placeholder";
// import TextAlign from "@tiptap/extension-text-align";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { Button } from "@/components/ui/button";
// import {
//  Form,
//  FormControl,
//  FormField,
//  FormItem,
//  FormLabel,
//  FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import {
//  Select,
//  SelectContent,
//  SelectItem,
//  SelectTrigger,
//  SelectValue,
// } from "@/components/ui/select";
// import { Switch } from "@/components/ui/switch";
// import { useState } from "react";
// // import { ImageUploadInput } from "@/components/ui/image-upload-input";
// import { Loader } from "lucide-react";
// // import { useUploadFileMutation } from "@/redux/api-queries/file-upload-api";
// // import { useCreateProductMutation } from "@/redux/api-queries/product-api";
// import { toast } from "sonner";
// import { useRouter } from "next/navigation";
// import AttributesAndVariantsAddOrUpdate, {
//  TAttributesAndVariantsData,
// } from "@/components/shared/AttributesAndVariantsAddOrUpdate";
// import { EditorToolbar } from "@/components/shared/tiptap/editor-toolbar";
// import { ProductSchema } from "@/schema/product";
// import { PRODUCT_OFFER_TAG_LIST } from "@/lib/data/product-meta";
// import { TCategory } from "@/types/category";
// import { TSubCategory } from "@/types/subcategory";
// import {
//  useAwsUploadFileMutation,
//  useGetAllCategoriesQuery,
// } from "@/redux/api/aws-upload-api";
// import { useGetAllSubCategoriesByCategoryIdQuery } from "@/redux/api/subcategory-api";
// import { useCreateProductMutation } from "@/redux/api/product-api";
// import { ImageUploadInput } from "@/components/shared/image-upload-input";
// import { TagsInput } from "@/components/ui/tags-input";
// import { MultiSelect } from "@/components/ui/multi-select";
// import dynamic from "next/dynamic";
// import { useEditor } from "@tiptap/react";
// import { getVendorId } from "@/app/(auth-pages)/store/user";
// import { useGetSingleVendorQuery } from "@/redux/api/vendor";

// const CreateProductForm = () => {
//  // === state for selected category ===
//  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
//   undefined,
//  );

//  const user_id = getVendorId(); // dynamically get vendor id

//  // Call RTK Query only if user_id exists
//  const { data: vendorData } = useGetSingleVendorQuery(
//   { user_id },
//   { skip: !user_id }, // prevents running query if no id
//  );

//  const vendorId = vendorData?.data?._id;

//  const [actionType, setActionType] = useState<
//   "SAVE" | "SAVE_AND_ADD" | "SAVE_AND_OPEN_STOCK"
//  >();

//  const [newAttributesAndVariants, setNewAttributesAndVariants] =
//   useState<TAttributesAndVariantsData | null>(null);
//  const [rootLevelSKU, setRootLevelSKU] = useState<string>("");

//  // === categories and sub categories ===
//  const { data: categoriesData } = useGetAllCategoriesQuery({});

//  const categoryOptions =
//   categoriesData?.data?.data?.map((category: TCategory) => ({
//    label: category?.name,
//    value: category?._id,
//   })) || [];
//  const { data: subCategoriesData } = useGetAllSubCategoriesByCategoryIdQuery(
//   { category_id: selectedCategory },
//   {
//    skip: !selectedCategory,
//   },
//  );
//  const subCategoryOptions =
//   subCategoriesData?.data?.map((subCategory: TSubCategory) => ({
//    label: subCategory?.name,
//    value: subCategory?._id,
//   })) || [];

//  // === thumbnail and slider images state ===
//  const [thumbnail, setThumbnail] = useState<File | string | undefined>("");
//  const [sliderImages, setSliderImages] = useState<(string | File)[]>([]);

//  // === get logged in client profile ===
//  // const { profile } = useGetLoggedInProfile();

//  // === router ===
//  const router = useRouter();

//  // === form default values ===
//  const form = useForm<z.infer<typeof ProductSchema>>({
//   resolver: zodResolver(ProductSchema),
//   defaultValues: {
//    name: "",
//    description: "",
//    sale_channels: {
//     pos: false,
//     website: true,
//    },
//    category: "",
//    subcategory: "",
//    shipping_cost: 0,
//    shipping_cost_per_unit: 0,
//    min_order_qty: 1,
//    max_order_qty: 100,
//    search_tags: [],
//    offer_tags: [],
//    approximately_delivery_time: "3-5 days",
//    is_free_delivery: false,
//    warranty: "",
//    return_policy: "",
//   },
//  });

//  // === initialize tiptap editor ===
//  const editor = useEditor({
//   extensions: [
//    StarterKit,
//    Placeholder.configure({
//     placeholder: "Enter product description",
//    }),
//    TextAlign.configure({
//     types: ["heading", "paragraph"],
//     alignments: ["left", "center", "right"],
//    }),
//   ],
//   content: form.getValues("description"),
//   immediatelyRender: false,
//   onUpdate: ({ editor }) => {
//    const html = editor.getHTML();
//    form.setValue("description", html, { shouldValidate: true });
//   },
//  });

//  // === file upload api mutation hook ===
//  const [uploadFile, { isLoading: isUploadFileLoading }] =
//   useAwsUploadFileMutation();
//  // === create product api mutation hook ===
//  const [createProduct, { isLoading: isCreateProductLoading }] =
//   useCreateProductMutation();

//  // === handle form submission ===
//  const handleAddNewProduct = async (data: z.infer<typeof ProductSchema>) => {
//   try {
//    const payload: any = {
//     ...data,
//     attributes:
//      (newAttributesAndVariants && newAttributesAndVariants?.attributes) || [],
//     variants: newAttributesAndVariants && newAttributesAndVariants?.variants,
//     sku: rootLevelSKU || "",
//    };

//    // upload thumbnail
//    const thumbnailFormData = new FormData();
//    thumbnailFormData.append("file", thumbnail as Blob);

//    const response: any = await uploadFile({
//     file: thumbnailFormData,
//     // apikey: process.env.NEXT_PUBLIC_FILE_UPLOAD_API_KEY,
//    });

//    if (response?.data?.success) {
//     payload.thumbnail = response?.data?.data?.url;
//    }
//    // upload slider images
//    const sliderImagesIds: string[] = [];

//    for (const file of sliderImages) {
//     const sliderFormData = new FormData();
//     sliderFormData.append("file", file as Blob);

//     const response: any = await uploadFile({
//      file: sliderFormData,
//      //  apikey: process.env.NEXT_PUBLIC_FILE_UPLOAD_API_KEY,
//     });
//     if (response?.data?.success) {
//      sliderImagesIds.push(response?.data?.data?.url);
//     }
//    }
//    payload.slider_images = [...sliderImagesIds];

//    //   inject vendor id
//    payload.vendor = vendorId;

//    // create product api mutation
//    const res: any = await createProduct({ payload });

//    if (res?.data?.success) {
//     toast.success("New Product Added!");
//     if (actionType === "SAVE") {
//      router.replace("/dashboard/products");
//     } else if (actionType === "SAVE_AND_ADD") {
//      router.replace("/dashboard/create-product");
//      router.refresh();
//     } else if (actionType === "SAVE_AND_OPEN_STOCK") {
//      router.replace("/dashboard/purchase/create");
//     }
//    } else if (res?.error?.data?.message) {
//     toast.error(res?.error?.data?.message || "Failed to add new product!");
//    }
//   } catch (error) {
//    console.log("CREATE PRODUCT ERROR: ", error);
//    toast.error("Something went wrong! Try again.");
//   }
//  };

//  return (
//   <Form {...form}>
//    <form
//     onSubmit={form.handleSubmit(handleAddNewProduct)}
//     className='w-full space-y-6'>
//     {/* name, description */}
//     <div className='bg-background p-4 lg:p-6 rounded-lg shadow hover:shadow-xl transition-transform duration-300 grid gap-6'>
//      {/* ===== name field ===== */}
//      <FormField
//       control={form.control}
//       name='name'
//       render={({ field }) => (
//        <FormItem>
//         <FormLabel>Product Name</FormLabel>
//         <FormControl>
//          <Input placeholder='Enter product name' {...field} />
//         </FormControl>
//         <FormMessage />
//        </FormItem>
//       )}
//      />

//      {/* ===== description field ===== */}
//      <FormField
//       control={form.control}
//       name='description'
//       render={({}) => (
//        <FormItem>
//         <FormLabel>Description</FormLabel>
//         <FormControl>
//          <div className='space-y-2'>
//           {editor && <EditorToolbar editor={editor} />}
//           <div className='border p-4 rounded-lg'>
//            <EditorContent
//             editor={editor}
//             // className="prose max-w-none"
//            />
//           </div>
//          </div>
//         </FormControl>
//         <FormMessage />
//        </FormItem>
//       )}
//      />
//     </div>

//     {/* general setup */}
//     <div className='bg-background rounded-lg shadow hover:shadow-xl transition-transform duration-300'>
//      <div className='text-lg font-medium border-b rounded-t-lg w-full px-4 lg:px-6 py-2'>
//       General Setup
//      </div>
//      <div className='grid md:grid-cols-2 xl:grid-cols-3 gap-6 p-4 lg:p-6'>
//       {/* ===== category field ===== */}
//       <FormField
//        control={form.control}
//        name='category'
//        render={({ field }) => (
//         <FormItem>
//          <FormLabel>Category</FormLabel>
//          <Select
//           onValueChange={(value) => {
//            field.onChange(value);
//            setSelectedCategory(value);
//           }}
//           defaultValue={field.value !== undefined ? field.value : undefined}>
//           <FormControl>
//            <SelectTrigger className='w-full'>
//             <SelectValue placeholder='Select a category' />
//            </SelectTrigger>
//           </FormControl>
//           <SelectContent>
//            {categoryOptions?.map(
//             (category: { label: string; value: string }, index: number) => (
//              <SelectItem key={index} value={category.value}>
//               {category.label}
//              </SelectItem>
//             ),
//            )}
//           </SelectContent>
//          </Select>
//          <FormMessage />
//         </FormItem>
//        )}
//       />
//       {/* ===== sub category field ===== */}
//       <FormField
//        control={form.control}
//        name='subcategory'
//        render={({ field }) => (
//         <FormItem>
//          <FormLabel>Sub Category</FormLabel>
//          <Select
//           onValueChange={(value) => field.onChange(value)}
//           defaultValue={field.value !== undefined ? field.value : undefined}>
//           <FormControl>
//            <SelectTrigger className='w-full'>
//             <SelectValue placeholder='Select a sub category' />
//            </SelectTrigger>
//           </FormControl>
//           <SelectContent>
//            {subCategoryOptions?.map(
//             (subCategory: { label: string; value: string }, index: number) => (
//              <SelectItem key={index} value={subCategory.value}>
//               {subCategory.label}
//              </SelectItem>
//             ),
//            )}

//            {subCategoryOptions?.length === 0 && (
//             <div className='rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden'>
//              No sub categories available
//             </div>
//            )}
//           </SelectContent>
//          </Select>
//          <FormMessage />
//         </FormItem>
//        )}
//       />
//       {/* ===== offer tags ===== */}
//       <FormField
//        control={form.control}
//        name='offer_tags'
//        render={({ field }) => (
//         <FormItem>
//          <FormLabel>Offer Tags</FormLabel>
//          <FormControl>
//           <MultiSelect
//            // key={form.watch("offerTags")?.join(",")} // re-render when changes
//            options={PRODUCT_OFFER_TAG_LIST}
//            onValueChange={field.onChange}
//            defaultValue={field.value}
//            placeholder='Select offer tags'
//            variant='inverted'
//           />
//          </FormControl>
//          <FormMessage />
//         </FormItem>
//        )}
//       />
//       {/* ===== search tags ===== */}
//       <FormField
//        control={form.control}
//        name='search_tags'
//        render={({ field }) => (
//         <FormItem>
//          <FormLabel>Search Tags</FormLabel>
//          <FormControl>
//           <TagsInput
//            placeholder='Enter your search tags'
//            value={field.value}
//            onValueChange={field.onChange}
//           />
//          </FormControl>
//          <FormMessage />
//         </FormItem>
//        )}
//       />

//       {/* ===== min order qty field ===== */}
//       <FormField
//        control={form.control}
//        name='min_order_qty'
//        render={({ field }) => (
//         <FormItem>
//          <FormLabel>Minimum Order Qty</FormLabel>
//          <FormControl>
//           <Input
//            placeholder='Enter minimum order quantity'
//            type='number'
//            {...field}
//           />
//          </FormControl>
//          <FormMessage />
//         </FormItem>
//        )}
//       />

//       {/* ===== max order qty field ===== */}
//       <FormField
//        control={form.control}
//        name='max_order_qty'
//        render={({ field }) => (
//         <FormItem>
//          <FormLabel>Max Order Qty</FormLabel>
//          <FormControl>
//           <Input
//            placeholder='Enter minimum order quantity'
//            type='number'
//            {...field}
//           />
//          </FormControl>
//          <FormMessage />
//         </FormItem>
//        )}
//       />

//       {/* ===== is free delivery field ===== */}
//       <FormField
//        control={form.control}
//        name='is_free_delivery'
//        render={({ field }) => (
//         <FormItem>
//          <FormLabel className='w-full'>Is Free Delivery?</FormLabel>
//          <div className='flex items-center justify-between rounded-md border border-input px-3 h-9'>
//           <div className='space-y-0.5 w-full'>
//            <FormLabel className='w-full text-sm text-muted-foreground'>
//             Wanna offer free delivery?
//            </FormLabel>
//           </div>
//           <FormControl>
//            <Switch checked={field.value} onCheckedChange={field.onChange} />
//           </FormControl>
//          </div>
//         </FormItem>
//        )}
//       />

//       {/* ===== delivery time field ===== */}
//       <FormField
//        control={form.control}
//        name='approximately_delivery_time'
//        render={({ field }) => (
//         <FormItem>
//          <FormLabel>Delivery Time</FormLabel>
//          <FormControl>
//           <Input placeholder='3-5 days' {...field} />
//          </FormControl>
//          <FormMessage />
//         </FormItem>
//        )}
//       />
//      </div>
//     </div>

//     {/* sale channels */}
//     <div className='bg-background rounded-lg shadow hover:shadow-xl transition-transform duration-300'>
//      <div className='text-lg font-medium border-b rounded-t-lg w-full px-4 lg:px-6 py-2'>
//       Sale Channels
//      </div>
//      <div className='grid xl:grid-cols-2 gap-6 p-4 lg:p-6'>
//       {/* ===== POS ===== */}
//       <FormField
//        control={form.control}
//        name='sale_channels.pos'
//        render={({ field }) => (
//         <FormItem>
//          <FormLabel className='w-full'>POS</FormLabel>
//          <div className='flex items-center justify-between rounded-md border border-input px-3 h-9'>
//           <div className='space-y-0.5 w-full'>
//            <FormLabel className='w-full text-sm text-muted-foreground'>
//             Is available on POS?
//            </FormLabel>
//           </div>
//           <FormControl>
//            <Switch checked={field.value} onCheckedChange={field.onChange} />
//           </FormControl>
//          </div>
//         </FormItem>
//        )}
//       />
//       {/* ===== website ===== */}
//       <FormField
//        control={form.control}
//        name='sale_channels.website'
//        render={({ field }) => (
//         <FormItem>
//          <FormLabel className='w-full'>Website</FormLabel>
//          <div className='flex items-center justify-between rounded-md border border-input px-3 h-9'>
//           <div className='space-y-0.5 w-full'>
//            <FormLabel className='w-full text-sm text-muted-foreground'>
//             Is available on website?
//            </FormLabel>
//           </div>
//           <FormControl>
//            <Switch checked={field.value} onCheckedChange={field.onChange} />
//           </FormControl>
//          </div>
//         </FormItem>
//        )}
//       />
//      </div>
//     </div>

//     {/* others - warranty and return policy */}
//     <div className='bg-background rounded-lg shadow hover:shadow-xl transition-transform duration-300'>
//      <div className='text-lg font-medium border-b rounded-t-lg w-full px-4 lg:px-6 py-2'>
//       Warranty & Return Policy (Optional)
//      </div>
//      <div className='grid xl:grid-cols-2 gap-6 p-4 lg:p-6'>
//       {/* ===== warranty ===== */}
//       <FormField
//        control={form.control}
//        name='warranty'
//        render={({ field }) => (
//         <FormItem>
//          <FormLabel>Warranty</FormLabel>
//          <FormControl>
//           <Input placeholder='Enter warranty details' {...field} />
//          </FormControl>
//          <FormMessage />
//         </FormItem>
//        )}
//       />
//       {/* ===== return policy ===== */}
//       <FormField
//        control={form.control}
//        name='return_policy'
//        render={({ field }) => (
//         <FormItem>
//          <FormLabel>Return Policy</FormLabel>
//          <FormControl>
//           <Input placeholder='Enter return policy' {...field} />
//          </FormControl>
//          <FormMessage />
//         </FormItem>
//        )}
//       />
//      </div>
//     </div>

//     {/* thumbnail and slider images */}
//     <div className='bg-background rounded-lg shadow hover:shadow-xl transition-transform duration-300'>
//      <div className='text-lg font-medium border-b rounded-t-lg w-full px-4 lg:px-6 py-2'>
//       Thumbnail & Slider Images
//      </div>
//      <div className='grid xl:grid-cols-2 gap-6 p-4 lg:p-6'>
//       {/* ===== thumbnail ===== */}
//       <div className='grid gap-2'>
//        <h3 className='text-sm font-medium'>Thumbnail</h3>
//        <ImageUploadInput
//         mode='single'
//         inputId='thumbnail-image-upload'
//         onChange={(images) => {
//          setThumbnail(images[0]);
//         }}
//        />
//       </div>
//       {/* ===== slider images ===== */}
//       <div className='grid gap-2'>
//        <h3 className='text-sm font-medium'>Slider Images</h3>
//        <ImageUploadInput
//         mode='multiple'
//         inputId='slider-image-upload'
//         onChange={setSliderImages}
//        />
//       </div>
//      </div>
//     </div>
//     {/* Add variant form */}
//     <AttributesAndVariantsAddOrUpdate
//      onChange={setNewAttributesAndVariants}
//      defaultRegularPrice={0}
//      defaultSalePrice={0}
//      rootLevelSKU={rootLevelSKU}
//      setRootLevelSKU={setRootLevelSKU}
//     />

//     {/* submit button */}
//     <div className='w-fit ms-auto flex items-center gap-2'>
//      {/* <Button
//       type='submit'
//       className=''
//       size={"xl"}
//       variant={"outline"}
//       onClick={() => setActionType("SAVE_AND_OPEN_STOCK")}
//       disabled={isUploadFileLoading || isCreateProductLoading}>
//       Save & Open Stock
//       {(isUploadFileLoading || isCreateProductLoading) && (
//        <Loader size={16} className='animate-spin ml-2' />
//       )}
//      </Button> */}
//      <Button
//       type='submit'
//       variant={"action"}
//       size={"xl"}
//       onClick={() => setActionType("SAVE_AND_ADD")}
//       disabled={isUploadFileLoading || isCreateProductLoading}>
//       Save & Add Another
//       {(isUploadFileLoading || isCreateProductLoading) && (
//        <Loader size={16} className='animate-spin ml-2' />
//       )}
//      </Button>
//      <Button
//       onClick={() => setActionType("SAVE")}
//       type='submit'
//       size={"xl"}
//       disabled={isUploadFileLoading || isCreateProductLoading}>
//       Save
//       {(isUploadFileLoading || isCreateProductLoading) && (
//        <Loader size={16} className='animate-spin ml-2' />
//       )}
//      </Button>
//     </div>
//    </form>
//   </Form>
//  );
// };

// export default CreateProductForm;

import React from "react";

const CreateProductForm = () => {
  return <div>create-product-form</div>;
};

export default CreateProductForm;
