// import BottomMenu from "@/components/common/BottomMenu";
// import Footer from "@/components/shared/Footer";
// import Navbar from "@/components/shared/Navbar";
// import AuthNav from "./components/AuthNav";
import Navbar from "@/src/components/shared/Navbar";
import { SidebarLayout } from "./_layout/sidebar-layout";
import BottomMenu from "@/src/components/shared/BottomMenu";
import Footer from "@/src/components/shared/Footer";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const fallbackCategoriesData = [
    {
      name: "OTHERS",
      path: "/category/others",
      subcategories: [],
    },
  ];
  const categories = fallbackCategoriesData;
  return (
    <>
      <Navbar categoriesData={categories} />
      <div className="">
        {/* pt-4 lg:pt-16 pb-24 */}
        {/* <Container>
          <div className="grid grid-cols-12">
            <div
              className="col-span-12 lg:col-span-3 lg:pr-8 lg:flex lg:flex-col
                    lg:items-center lg:justify-start lg:mt-20"
            >
              <AuthNav />
            </div>
            <div className="col-span-12 lg:col-span-9">{children}</div>
          </div>
        </Container> */}
        <SidebarLayout>{children}</SidebarLayout>
      </div>
      <BottomMenu />
      <Footer />
    </>
  );
}
