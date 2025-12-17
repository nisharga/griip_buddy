import React, { useState } from "react";
import Image from "next/image";
import { Heart, Share2 } from "lucide-react";

interface ProductImage {
  url: string;
  alt?: string;
  id: string | number;
}

interface ProductImageGalleryProps {
  images: ProductImage[];
  isLoading: boolean;
}

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({
  images,
  isLoading,
}) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  if (isLoading) return <ProductImageGallerySkeleton />;

  if (!images || images.length === 0) return null;

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square size-full bg-white overflow-hidden">
        <Image
          src={images[selectedImage].url}
          alt={
            images[selectedImage].alt || `Product image ${selectedImage + 1}`
          }
          fill
          className="object-cover"
          priority={true}
        />
        <button
          onClick={() => setIsWishlisted(!isWishlisted)}
          className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
        >
          <Heart
            className={`w-6 h-6 ${
              isWishlisted ? "fill-red-500 text-red-500" : "text-gray-600"
            }`}
          />
        </button>
        <button className="absolute top-4 left-4 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
          <Share2 className="w-6 h-6 text-gray-600" />
        </button>
      </div>

      {/* Thumbnails */}
      <div className="flex gap-4">
        {images.map((image, index) => (
          <button
            key={image.id}
            onClick={() => setSelectedImage(index)}
            className={`relative w-25 aspect-square bg-white rounded-xl overflow-hidden border-2 transition-all ${
              selectedImage === index
                ? "border-primary shadow-lg"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <Image
              src={image.url}
              alt={image.alt || `Thumbnail ${index + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductImageGallery;

const ProductImageGallerySkeleton: React.FC = () => {
  return (
    <div className="space-y-4 animate-pulse space-x-4 w-[95%]!">
      {/* Main Image Skeleton */}
      <div className="w-full aspect-square bg-gray-200 rounded-lg"></div>

      {/* Thumbnails Skeleton */}
      <div className="flex gap-4">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="w-25 aspect-square bg-gray-200 rounded-lg"
          ></div>
        ))}
      </div>
    </div>
  );
};
