export interface Category {
  _id: string;
  name_en: string;
  name_bn: string;
  slug: string;
  description_en: string;
  description_bn: string;
  image_url: string;
  position: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
  id: string;
}

export interface SubCategory {
  _id: string;
  name_en: string;
  name_bn: string;
  description_en: string;
  description_bn: string;
  image_url: string;
  position: number;
  slug: string;
  category: Category;
  createdAt: string;
  updatedAt: string;
  __v: number;
  id: string;
}

export interface SubCategoryApiResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: SubCategory[];
}
