// import HeroMain from "@/components/home/hero/HeroMain";
// import ShopByCategory from "@/components/home/sections/ShopByCategory";
// import RecentlyAddedItems from "@/components/home/sections/RecentlyAdded";
// import ReadyForOrder from "@/components/home/sections/ReadyForOrder";
// import AllProducts from "@/components/home/sections/AllProducts";
// import axios from "@/lib/axios-instance";
// import TopVendors from "@/components/home/sections/TopVendors";
// import TopCategories from "@/components/home/sections/TopCategories";

import { HeroMain, ProductCarousel } from "./_components";

const HomePageMain = async () => {
  return (
    <div className="">
      <HeroMain />
      <ProductCarousel />
      {/* <HeroMain />
      <ShopByCategory />

      <TopVendors /> */}
      {/* <TopCategories /> */}
      {/* <RecentlyAddedItems /> */}

      {/* <ReadyForOrder /> */}

      {/* <AllProducts /> */}
    </div>
  );
};

export default HomePageMain;
