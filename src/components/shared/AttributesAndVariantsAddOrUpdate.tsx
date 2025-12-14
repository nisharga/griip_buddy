/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, {
 Dispatch,
 useCallback,
 useEffect,
 useMemo,
 useState,
} from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash, X } from "lucide-react";
import {
 Table,
 TableBody,
 TableCell,
 TableHead,
 TableHeader,
 TableRow,
} from "@/components/ui/table";
import debounce from "lodash/debounce";
import {
 defaultAttributesData,
 defaultVariationData,
} from "@/lib/data/defaultAttributesData";

interface Attribute {
 name: string;
 values: string[];
}

type VariantCombination = Record<string, string>;

interface VariantData {
 combination: VariantCombination;
 sale_price: string;
 regular_price: string;
 //  available_quantity: string;
 sku: string;
 barcode?: string;
}

export type TAttributesAndVariantsData = {
 attributes: string[];
 variants: {
  attribute_values: VariantCombination;
  sale_price: number;
  regular_price: number;
  //   available_quantity: number;
  sku: string;
  barcode?: string;
 }[];
};

type TAddVariantsProps = {
 onChange: Dispatch<TAttributesAndVariantsData | null>;
 defaultRegularPrice: string | number;
 defaultSalePrice: string | number;
 defaultValue?: TAttributesAndVariantsData | null;
 rootLevelSKU?: string;
 setRootLevelSKU?: Dispatch<React.SetStateAction<string>>;
};

const AttributesAndVariantsAddOrUpdate: React.FC<TAddVariantsProps> = ({
 onChange,
 defaultRegularPrice,
 defaultSalePrice,
 defaultValue,
 rootLevelSKU,
 setRootLevelSKU,
}) => {
 const [attributes, setAttributes] = useState<Attribute[]>([
  ...defaultAttributesData,
 ]);
 const [variantData, setVariantData] = useState<VariantData[]>([
  ...defaultVariationData,
 ]);
 const [defaultSale, setDefaultSale] = useState(String(defaultSalePrice));
 const [defaultRegular, setDefaultRegular] = useState(
  String(defaultRegularPrice),
 );

 // Memoize attributeMap to prevent recomputing unnecessarily
 const attributeMap = useMemo(() => {
  const map: Record<string, string[]> = {};
  attributes?.forEach((attr) => {
   if (attr?.name && attr.values?.length) {
    map[attr?.name] = attr.values?.filter(Boolean);
   }
  });
  return map;
 }, [attributes]);

 // Memoize variant combinations generation
 const variantCombinations = useMemo(() => {
  const keys = Object.keys(attributeMap);

  const combine = (
   index = 0,
   current: VariantCombination = {},
  ): VariantCombination[] => {
   if (index === keys?.length) return [current];
   const key = keys[index];
   const values = attributeMap[key];
   const combinations: VariantCombination[] = [];

   for (const value of values) {
    combinations.push(...combine(index + 1, { ...current, [key]: value }));
   }

   return combinations;
  };

  return combine();
 }, [attributeMap]);

 const handleApplyDefaultPricesAndSKUToAll = () => {
  setVariantData((prev) =>
   prev.map((variant) => {
    let generatedSKU = rootLevelSKU || "";

    // ✅ Support both `combination` (frontend) and `attribute_values` (API)
    const attributes =
     (variant as any).combination || (variant as any).attribute_values || {};

    const parts = Object.values(attributes).map((value: any) =>
     value.toString().toUpperCase(),
    );

    if (parts.length > 0) {
     generatedSKU += `-${parts.join("-")}`;
    }

    return {
     ...variant,
     sale_price: defaultSale,
     regular_price: defaultRegular,
     sku:
      variant.sku && variant.sku !== rootLevelSKU ? variant.sku : generatedSKU,
    };
   }),
  );
 };

 useEffect(() => {
  setDefaultSale(String(defaultSalePrice));
  setDefaultRegular(String(defaultRegularPrice));
 }, [defaultRegularPrice, defaultSalePrice]);

 // test purpose it will be removed later
 // // update price when variantCombinations, defaultSale, or defaultRegular changes
 // useEffect(() => {
 //     const updatedData: VariantData[] = variantCombinations.map((combo) => {
 //         const existing = variantData?.find(
 //             (v) => JSON.stringify(v.combination) === JSON.stringify(combo)
 //         );
 //         return (
 //             existing || {
 //                 combination: combo,
 //                 sale_price: defaultSale,
 //                 regular_price: defaultRegular,
 //                 available_quantity: "0",
 //                 sku: "",
 //                 barcode: "",
 //             }
 //         );
 //     });
 //     setVariantData(updatedData);
 // }, [variantCombinations, defaultSale, defaultRegular]);

 // Update variantData when combinations, defaultPrice, or defaultDiscountAmount changes
 useEffect(() => {
  const updatedData: VariantData[] = variantCombinations.map((combo) => {
   const existing = variantData?.find(
    (v) => JSON.stringify(v.combination) === JSON.stringify(combo),
   );
   return (
    existing || {
     combination: combo,
     sale_price: String(defaultSale),
     regular_price: String(defaultRegular),
     available_quantity: "0",
     sku: "",
     barcode: "",
    }
   );
  });

  setVariantData(updatedData);
  // eslint-disable-next-line react-hooks/exhaustive-deps
 }, [variantCombinations, defaultSale, defaultRegular]);

 useEffect(() => {
  if (!defaultValue) {
   setAttributes([...defaultAttributesData]);
   setVariantData([...defaultVariationData]);
   return;
  }

  const uniqueAttributes: Attribute[] = defaultValue.attributes.map(
   (attrName) => {
    const values = Array.from(
     new Set(defaultValue.variants.map((v) => v.attribute_values[attrName])),
    );
    return { name: attrName, values };
   },
  );

  const mappedVariants: VariantData[] = defaultValue.variants.map((v) => ({
   combination: v.attribute_values,
   sale_price: String(v.sale_price ?? defaultSalePrice),
   regular_price: String(v.regular_price ?? defaultRegularPrice),
   sku: v.sku ?? "",
   barcode: v.barcode ?? "",
  }));

  setAttributes(uniqueAttributes);
  setVariantData(mappedVariants);
  // run ONCE only
  // eslint-disable-next-line react-hooks/exhaustive-deps
 }, []);

 // Debounced onChange to limit calls
 const debouncedOnChange = useMemo(
  () =>
   debounce((attrs: Attribute[], variants: VariantData[]) => {
    if (attrs?.length !== 0 && attrs[0].name !== "") {
     const formatted = {
      attributes: attrs?.map((a) => a.name),
      variants: variants?.map(
       ({
        combination,
        sale_price,
        regular_price,
        // available_quantity,
        sku,
       }) => ({
        attribute_values: combination,
        sale_price: Number(sale_price),
        regular_price: Number(regular_price),
        // available_quantity: Number(available_quantity),
        sku,
        barcode: "",
       }),
      ),
     };
     onChange(formatted);
    } else {
     onChange(null);
    }
   }, 300),
  [onChange],
 );

 // Call debounced onChange when attributes or variantData changes
 useEffect(() => {
  debouncedOnChange(attributes, variantData);
 }, [attributes, variantData, debouncedOnChange]);

 // Handlers - memoized for performance
 const handleAttributeChange = useCallback((index: number, value: string) => {
  setAttributes((prev) => {
   const newAttributes = [...prev];
   newAttributes[index] = { ...newAttributes[index], name: value };
   return newAttributes;
  });
 }, []);

 const handleValueChange = useCallback(
  (attrIndex: number, valIndex: number, value: string) => {
   setAttributes((prev) => {
    const newAttributes = [...prev];
    const newValues = [...newAttributes[attrIndex].values];
    newValues[valIndex] = value;
    newAttributes[attrIndex] = {
     ...newAttributes[attrIndex],
     values: newValues,
    };
    return newAttributes;
   });
  },
  [],
 );

 const addAttribute = useCallback(() => {
  setAttributes((prev) => {
   if (prev?.length >= 3) return prev;
   return [...prev, { name: "", values: [""] }];
  });
 }, []);

 const removeAttribute = useCallback((index: number) => {
  setAttributes((prev) => prev.filter((_, i) => i !== index));
 }, []);

 const addValue = useCallback((index: number) => {
  setAttributes((prev) => {
   const newAttributes = [...prev];
   newAttributes[index] = {
    ...newAttributes[index],
    values: [...newAttributes[index].values, ""],
   };
   return newAttributes;
  });
 }, []);

 const removeValue = useCallback((attrIndex: number, valIndex: number) => {
  setAttributes((prev) => {
   const newAttributes = [...prev];
   const newValues = [...newAttributes[attrIndex].values];
   newValues.splice(valIndex, 1);
   newAttributes[attrIndex] = {
    ...newAttributes[attrIndex],
    values: newValues,
   };
   return newAttributes;
  });
 }, []);

 const handleVariantInputChange = useCallback(
  (
   index: number,
   field: keyof Omit<VariantData, "combination">,
   value: string,
  ) => {
   setVariantData((prev) => {
    const updated = [...prev];
    updated[index] = {
     ...updated[index],
     [field]: field === "sku" ? value.toUpperCase() : value,
    };
    return updated;
   });
  },
  [],
 );

 return (
  <div className='space-y-4 bg-background rounded-lg shadow hover:shadow-xl transition-transform duration-300 border border-b rounded-t-lg w-full px-4 lg:px-6 py-2'>
   <div className='flex flex-col md:flex-row gap-y-1 justify-between items-center'>
    <h2 className='text-base md:text-xl font-semibold'>
     {defaultValue
      ? "Update Product Attribute & Variant"
      : "Add Product Attribute & Variant"}
    </h2>
    <Button
     type='button'
     variant='outline'
     onClick={addAttribute}
     disabled={attributes?.length >= 3}>
     <Plus className='w-4 h-4 mr-2' /> Add Attribute
    </Button>
   </div>

   <div className='grid xl:grid-cols-2 gap-6 '>
    {attributes?.map((attr, attrIndex) => (
     <div
      key={attrIndex}
      className='border p-4 rounded-lg space-y-4 bg-gray-50'>
      <div className='space-y-2'>
       <label className='block text-sm font-medium'>Attribute Name</label>
       <div className='flex items-center gap-2'>
        <Input
         value={attr.name}
         onChange={(e) => handleAttributeChange(attrIndex, e.target.value)}
         placeholder='e.g. Color'
        />
        <Button
         type='button'
         variant='destructive'
         size='icon'
         onClick={() => removeAttribute(attrIndex)}>
         <Trash className='w-4 h-4' />
        </Button>
       </div>
      </div>
      <div>
       <label className='block text-sm font-medium mb-1'>Values</label>
       <div className='flex flex-wrap gap-2'>
        {attr?.values?.map((val, valIndex) => (
         <div
          key={valIndex}
          className='flex items-center gap-1 bg-white rounded px-2 py-1 border'>
          <Input
           className='w-20 border-none shadow-none p-0 text-sm focus-visible:ring-0'
           value={val}
           onChange={(e) =>
            handleValueChange(attrIndex, valIndex, e.target.value)
           }
           placeholder='e.g. Red'
          />
          <button
           type='button'
           onClick={() => removeValue(attrIndex, valIndex)}>
           <X className='h-4 w-4 text-muted-foreground' />
          </button>
         </div>
        ))}
        <Button
         type='button'
         size='sm'
         variant='default'
         onClick={() => addValue(attrIndex)}>
         <Plus className='w-4 h-4 mr-1' /> Add
        </Button>
       </div>
      </div>
     </div>
    ))}
   </div>

   {variantData?.length > 0 && (
    <div className='space-y-4'>
     <h2 className='text-base md:text-xl font-semibold'>Variant Matrix</h2>
     <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 max-w-4xl'>
      <div>
       <label className='block text-sm font-medium mb-1'>
        Default Regular Price (BDT)
       </label>
       <Input
        type='number'
        value={defaultRegular}
        onChange={(e) => setDefaultRegular(e.target.value)}
        placeholder='Enter default regular price'
       />
      </div>
      <div>
       <label className='block text-sm font-medium mb-1'>
        Default Sale Price (BDT)
       </label>
       <Input
        type='number'
        value={defaultSale}
        onChange={(e) => setDefaultSale(e.target.value)}
        placeholder='Enter default sale price'
       />
      </div>
      <div>
       <label className='block text-sm font-medium mb-1'>Root Level SKU</label>
       <Input
        type='text'
        value={rootLevelSKU}
        className='uppercase'
        onChange={(e) =>
         setRootLevelSKU && setRootLevelSKU(e.target.value?.toUpperCase())
        }
        placeholder='Enter root level SKU'
       />
      </div>

      <div className='flex items-end'>
       <Button
        type='button'
        onClick={handleApplyDefaultPricesAndSKUToAll}
        className='w-full max-w-[150px]'>
        Apply to All
       </Button>
      </div>
     </div>

     <Table>
      <TableHeader>
       <TableRow>
        <TableHead>SL</TableHead>
        <TableHead>Attribute Variation</TableHead>
        <TableHead>Regular Price</TableHead>
        <TableHead>Sale Price</TableHead>
        <TableHead>SKU</TableHead>
        {/* <TableHead>Stock</TableHead> */}
       </TableRow>
      </TableHeader>
      <TableBody>
       {variantData?.map((variant, index) => (
        <TableRow key={index}>
         <TableCell>{index + 1}</TableCell>
         <TableCell>{Object.values(variant.combination).join(" - ")}</TableCell>
         <TableCell>
          <Input
           type='number'
           value={variant.regular_price}
           onChange={(e) =>
            handleVariantInputChange(index, "regular_price", e.target.value)
           }
          />
         </TableCell>
         <TableCell>
          <Input
           type='number'
           value={variant.sale_price}
           onChange={(e) =>
            handleVariantInputChange(index, "sale_price", e.target.value)
           }
          />
         </TableCell>
         <TableCell className='min-w-[250px]'>
          <Input
           value={variant.sku}
           onChange={(e) =>
            handleVariantInputChange(index, "sku", e.target.value)
           }
          />
         </TableCell>
         {/* <TableCell>
          <Input
           type='number'
           value={variant.available_quantity}
           onChange={(e) =>
            handleVariantInputChange(
             index,
             "available_quantity",
             e.target.value,
            )
           }
          />
         </TableCell> */}
        </TableRow>
       ))}
      </TableBody>
     </Table>
    </div>
   )}
  </div>
 );
};

export default AttributesAndVariantsAddOrUpdate;
