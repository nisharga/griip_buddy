/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import { useState } from "react";

interface SmartImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}

const SmartImage = ({ src, alt, width, height, className, ...props }: any) => {
  // Use local state to track if the image fails to load
  const [imgSrc, setImgSrc] = useState(src || "/No_Image_Available.jpg");

  return (
    <Image
      {...props}
      src={imgSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      // This function triggers if the URL returns 404 or fails
      onError={() => {
        setImgSrc("/No_Image_Available.jpg");
      }}
    />
  );
};

export default SmartImage;
