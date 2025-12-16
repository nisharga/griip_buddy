"use client";
import React from "react";
import CreateProductForm from "./_components/create-product-form";

const CreateProduct = () => {
 return (
  <section className='flex flex-col gap-6'>
   <h1 className='text-2xl font-medium'>Create Product</h1>
   <CreateProductForm />
  </section>
 );
};

export default CreateProduct;
