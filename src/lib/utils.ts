import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getDiscountPercentage(regular: number, sale: number, ): string {
  if (regular === 0 || sale >= regular) return "0% OFF";
  const percent = ((regular - sale) / regular) * 100;
  return `${Math.round(percent)}% OFF`;
}

export function createImageArray(thumbnail: string, slider_images: string[]) {
  const allImages = [thumbnail, ...slider_images];
  return allImages.map((img, index) => ({
    id: index + 1,
    img,
  }));
}



  export const getStatusColor = (status: string) => {
    switch (status) {
      case "placed":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100"
      case "processing":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
      case "shipped":
        return "bg-purple-100 text-purple-800 hover:bg-purple-100"
      case "delivered":
        return "bg-green-100 text-green-800 hover:bg-green-100"
      case "cancelled":
        return "bg-red-100 text-red-800 hover:bg-red-100"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100"
    }
  }


export const getActualIndex = (
  indexWithinPage: number,
  currentPage: number,
  pageSize: number
): number => {
  return (currentPage - 1) * pageSize + indexWithinPage + 1;
};


 export const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

 