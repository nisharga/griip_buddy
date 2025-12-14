"use client";
import GlobalLoader from "../components/loading/GlobalLoader";
import { useGetSingleVendorQuery } from "@/redux/api/vendor";
import { getVendorId } from "../store/user";
import DashboardHeader from "./components/DashboardHeader";
import StatsCards from "./components/StatsCards";
import ShopInfoCard from "./components/ShopInfoCard";
import OwnerProfileCard from "./components/OwnerProfileCard";
import PaymentInfoCard from "./components/PaymentInfoCard";
import DocumentsCard from "./components/DocumentsCard";

const DashboardPage = () => {
 const id = getVendorId() || "";
 // === get vendor data ===
 const { data, isLoading, isFetching } = useGetSingleVendorQuery({
  user_id: id,
 });

 const vendor = data?.data;
 console.log("🚀 ~ DashboardPage ~ vendor:", vendor, id, data);

 if (isLoading || isFetching) {
  return <GlobalLoader />;
 }

 return (
  <div className='min-h-screen bg-background p-0 lg:p-4'>
   <div className='max-w-7xl mx-auto space-y-6'>
    {/* Dashboard Header */}
    <DashboardHeader vendor={vendor} />

    {/* Stats Cards */}
    <StatsCards vendor={vendor} />

    {/* Main Content Grid */}
    <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6'>
     {/* Shop Information */}
     <div className='xl:col-span-2'>
      <ShopInfoCard shop={vendor?.shop} />
     </div>

     {/* Owner Profile */}
     <OwnerProfileCard owner={vendor?.owner} />

     {/* Payment Information */}
     <PaymentInfoCard payment={vendor?.payment} />

     {/* Documents Status */}
     <div className='lg:col-span-2 xl:col-span-2'>
      <DocumentsCard documents={vendor?.documents} />
     </div>
    </div>
   </div>
  </div>
 );
};

export default DashboardPage;
