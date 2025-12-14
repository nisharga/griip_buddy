import BottomMenu from "@/src/components/shared/BottomMenu";
import Footer from "@/src/components/shared/Footer";
import Navbar from "@/src/components/shared/Navbar";

// const fallbackCategoriesData = [
//   {
//     name: "OTHERS",
//     path: "/category/others",
//     subcategories: [],
//   },
// ];
// interface SubCategory {
//   name: string;
//   path: string;
// }

// interface Category {
//   name: string;
//   path: string;
//   subcategories: SubCategory[];
// }

// async function getFormattedCategories(): Promise<Category[]> {
//   try {
//     const categoryRes = await fetch(`${API_BASE_URL}/category`, {
//       cache: "no-store",
//     });
//     // if (!categoryRes.ok) throw new Error("Failed to fetch categories");
//     const categoryJson = await categoryRes.json();

//     const categories = categoryJson?.data ?? [];

//     const formattedData: Category[] = await Promise.all(
//       categories.map(async (category: any) => {
//         try {
//           const subCategoryRes = await fetch(
//             `${API_BASE_URL}/subcategory/by-category/${category._id}`,
//             {
//               cache: "no-store",
//             }
//           );
//           if (!subCategoryRes.ok) throw new Error("Sub-category fetch failed");

//           const subCategoryJson = await subCategoryRes.json();
//           const subCategories = subCategoryJson?.data ?? [];

//           return {
//             name: category.name_en?.toUpperCase() || "UNNAMED CATEGORY",
//             path: `/category/${category.slug || category._id}`,
//             subcategories: subCategories.map((sub: any) => ({
//               name: sub.name_en,
//               path: `/category/${category.slug || category._id}/${
//                 sub.slug || sub._id
//               }`,
//             })),
//           };
//         } catch (subErr) {
//           console.log(
//             `Error fetching sub-categories for ${category.name_en}:`,
//             subErr
//           );
//           return {
//             name: category.name_en?.toUpperCase() || "UNNAMED CATEGORY",
//             path: `/category/${category.slug || category._id}`,
//             subcategories: [],
//           };
//         }
//       })
//     );

//     return formattedData;
//   } catch (err) {
//     console.error("Error fetching categories:", err);
//     return fallbackCategoriesData;
//   }
// }

export default async function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className={``}>
      <Navbar />
      {children}
      <BottomMenu />
      <Footer />
    </main>
  );
}
