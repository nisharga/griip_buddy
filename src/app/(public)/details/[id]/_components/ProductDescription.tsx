// components/ProductDescription.tsx
import React from "react";

interface ProductDescriptionProps {
  description?: string;
  isLoading?: boolean;
}

const ProductDescription: React.FC<ProductDescriptionProps> = ({
  description,
  isLoading = false,
}) => {
  if (isLoading) return <ProductDescriptionSkeleton />;

  if (!description) return null;

  return (
    <div
      className="prose max-w-full text-gray-700"
      dangerouslySetInnerHTML={{ __html: description }}
    />
  );
};

export default ProductDescription;

const ProductDescriptionSkeleton: React.FC = () => {
  return (
    <div className="space-y-2 animate-pulse">
      <div className="h-4 w-32 bg-gray-200 rounded"></div>
      <div className="h-4 w-full bg-gray-200 rounded"></div>
      <div className="h-4 w-full bg-gray-200 rounded"></div>
      <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
      <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
      <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
      <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
      <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
      <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
    </div>
  );
};
