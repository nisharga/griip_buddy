"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetHeader } from "@/components/ui/sheet";
import { vendorRoutes } from "./sidebar-data";
import { SidebarNavSection } from "./sidebar-nav-section";

interface MobileSidebarProps {
 isOpen: boolean;
 onClose: () => void;
}

export function MobileSidebar({ isOpen, onClose }: MobileSidebarProps) {
 return (
  <Sheet open={isOpen} onOpenChange={onClose}>
   <SheetContent
    side='left'
    className='w-64 p-0 bg-white text-white  border border-r-primary'>
    <ScrollArea className='flex-1 px-3 pb-4'>
     <div className='space-y-4 mt-4'>
      {vendorRoutes?.map((section, index) => (
       <SidebarNavSection key={index} section={section} isCollapsed={false} />
      ))}
     </div>
    </ScrollArea>
   </SheetContent>
  </Sheet>
 );
}
