import Image from "next/image";
import React, { FC } from "react";

interface IProps {
  className?: string;
  alt?: string;
  src: string;
}

const Avatar: FC<IProps> = ({ className, src, alt, ...props }) => {
  return (
    <Image
      {...props}
      src={src || "/logo.svg"}
      width={132}
      height={100}
      alt={alt ? alt : "Avatar"}
      className={`${className} h-full w-auto object-fill`}
      unoptimized
    />
  );
};
export default Avatar;
