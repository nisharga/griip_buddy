// constants/categories.ts
  export const categoriesData = [
    {
      name: "Electronics",
      path: "/categories/electronics",
      subcategories: [
        {
          name: "Mobile Phones",
          path: "/categories/electronics/mobile-phones",
        },
        { name: "Laptops", path: "/categories/electronics/laptops" },
        { name: "Cameras", path: "/categories/electronics/cameras" },
      ],
    },
    {
      name: "Fashion",
      path: "/categories/fashion",
      subcategories: [
        { name: "Men", path: "/categories/fashion/men" },
        { name: "Women", path: "/categories/fashion/women" },
        { name: "Kids", path: "/categories/fashion/kids" },
      ],
    },
    {
      name: "Home & Kitchen",
      path: "/categories/home-kitchen",
      subcategories: [
        { name: "Furniture", path: "/categories/home-kitchen/furniture" },
        { name: "Decor", path: "/categories/home-kitchen/decor" },
        { name: "Appliances", path: "/categories/home-kitchen/appliances" },
      ],
    },
    {
      name: "Sports & Outdoors",
      path: "/categories/sports-outdoors",
      subcategories: [
        { name: "Fitness", path: "/categories/sports-outdoors/fitness" },
        { name: "Cycling", path: "/categories/sports-outdoors/cycling" },
        { name: "Camping", path: "/categories/sports-outdoors/camping" },
      ],
    },
    {
      name: "Books",
      path: "/categories/books",
      subcategories: [
        { name: "Fiction", path: "/categories/books/fiction" },
        { name: "Non-fiction", path: "/categories/books/non-fiction" },
        { name: "Children", path: "/categories/books/children" },
      ],
    },
  ];