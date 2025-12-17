/* eslint-disable @typescript-eslint/no-unused-vars */
// components/ProductDescription.tsx
import React, { useState } from "react";

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

interface ProductExcerptDescriptionProps {
  description?: string;
}

export const ProductExcerptDescription: React.FC<
  ProductExcerptDescriptionProps
> = ({ description }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!description) return null;

  // Extract first 5 words safely
  const words = description
    .replace(/<[^>]+>/g, " ")
    .trim()
    .split(/\s+/);
  const isLong = words.length > 5;
  const excerpt = words.slice(0, 5).join(" ");

  const handleReadMore = () => {
    setIsExpanded(true);
    // Optional: Scroll to the top of the description
    document.getElementById("desc-top")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div id="desc-top" className="scroll-mt-20">
      <div dangerouslySetInnerHTML={{ __html: description }} />

      <p>
        {isLong ? `${excerpt}... ` : description}
        {isLong && (
          <button
            onClick={handleReadMore}
            className="inline-block text-blue-600 font-bold text-sm hover:underline ml-1"
          >
            Read More...
          </button>
        )}
      </p>
    </div>
  );
};
