"use client";
import type React from "react";
import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { DesktopSidebar } from "./desktop-sidebar";
import { MobileSidebar } from "./mobile-sidebar";

interface SidebarLayoutProps {
 children: React.ReactNode;
}

export function SidebarLayout({ children }: SidebarLayoutProps) {
 const [isDesktopCollapsed, setIsDesktopCollapsed] = useState(false);
 const [isMobileOpen, setIsMobileOpen] = useState(false);

 return (
  <div className='min-h-screen bg-background flex w-full'>
   {/* Desktop Sidebar */}
   <DesktopSidebar isCollapsed={isDesktopCollapsed} />

   {/* Mobile Sidebar */}
   <MobileSidebar
    isOpen={isMobileOpen}
    onClose={() => setIsMobileOpen(false)}
   />

   {/* Main Content */}
   <div className={cn("transition-all duration-300 flex-1")}>
    {/* Header */}
    <header className='sticky top-0 z-30 bg-white'>
     <div className='flex items-center gap-4 px-4 py-3 sm:px-6'>
      {/* Mobile Menu Button */}
      <Button
       variant='ghost'
       size='sm'
       className='lg:hidden'
       onClick={() => setIsMobileOpen(true)}>
       <Menu className='h-5 w-5' />
       <span className='sr-only'>Open sidebar</span>
      </Button>

      {/* Desktop Collapse Button */}
      <Button
       variant='ghost'
       size='sm'
       className='hidden lg:flex'
       onClick={() => setIsDesktopCollapsed(!isDesktopCollapsed)}>
       <Menu className='h-5 w-5' />
       <span className='sr-only'>Toggle sidebar</span>
      </Button>
     </div>
    </header>
    {/* Page Content */}
    <main className='px-4 pb-6'>{children}</main>
   </div>
  </div>
 );
}
