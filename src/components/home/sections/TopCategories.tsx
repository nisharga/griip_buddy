import React from "react";
import { categories } from "@/lib/data/top-cat-demo";
import RecentlyAdded from "./RecentlyAdded";
import ProductCarousel from "@/components/common/ProductCarousel";

const TopCategories = () => {
  return (
    <div className="flex flex-col">
      {categories.map((category, i) => (
        <div key={i}>
          <ProductCarousel categoryLabel={category.name} />
        </div>
      ))}
    </div>
  );
};

export default TopCategories;
