"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import type { NavItem } from "./sidebar-data";
import { removeUser, removeVendorId } from "../store/user";
import { removeAccessToken } from "@/lib/cookies";
import { ConfirmActionDialog } from "@/components/form/form-confirm/confirm-action-dialog";
import { useState } from "react";

interface SidebarNavItemProps {
 item: NavItem;
 isCollapsed?: boolean;
}

export function SidebarNavItem({ item, isCollapsed }: SidebarNavItemProps) {
 const pathname = usePathname();
 const isActive = pathname === item.href;
 const Icon = item.icon;

 // ======= openState =========
 const [open, setOpen] = useState(false);
 const router = useRouter();

 const confirmLogout = async () => {
  try {
   removeUser();
   removeAccessToken();
   removeVendorId();
   router.push("/");
  } finally {
   setOpen(false);
  }
 };

 return (
  <>
   {item.href === "#logout" ? (
    <>
     {/* Logout Button */}
     <button
      onClick={() => setOpen(true)} // open confirm dialog
      className={cn(
       "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground !w-full text-left cursor-pointer",
       isActive
        ? "bg-primary text-primary-foreground"
        : "text-secondary hover:text-primary",
       isCollapsed && "justify-center px-2",
      )}>
      {/* <Icon
              className={cn(
                "h-4 w-4 flex-shrink-0",
                isCollapsed ? "h-5 w-5" : ""
              )}
            /> */}

      {!isCollapsed && (
       <>
        <span className='flex-1'>{item.title}</span>
        {item.badge && (
         <Badge
          // variant="primary"
          className='ml-auto h-5 px-1.5 text-xs'>
          {item.badge}
         </Badge>
        )}
       </>
      )}
     </button>

     {/* Confirmation Dialog */}
     <ConfirmActionDialog
      open={open}
      setOpen={setOpen}
      title='Logout Confirmation'
      actionName='Logout'
      itemName='your account'
      onConfirm={confirmLogout}
     />
    </>
   ) : (
    <Link
     href={item.href}
     className={cn(
      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
      isActive
       ? "bg-primary text-primary-foreground"
       : "text-secondary hover:text-primary",
      isCollapsed && "justify-center px-2",
     )}>
     {/* <Icon
      className={cn("h-4 w-4 flex-shrink-0", isCollapsed ? "h-5 w-5" : "")}
     /> */}
     {!isCollapsed && (
      <>
       <span className='flex-1'>{item.title}</span>
       {item.badge && (
        <Badge
         // variant="primary"
         className='ml-auto h-5 px-1.5 text-xs'>
         {item.badge}
        </Badge>
       )}
      </>
     )}
    </Link>
   )}
  </>
 );
}
