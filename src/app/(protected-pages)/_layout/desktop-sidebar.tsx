"use client";

import { ScrollArea } from "@/src/components/ui/scroll-area";
import { cn } from "@/src/lib/utils";
import { SidebarNavSection } from "./sidebar-nav-section";
import { vendorRoutes } from "./sidebar-data";

interface DesktopSidebarProps {
  isCollapsed: boolean;
}

export function DesktopSidebar({ isCollapsed }: DesktopSidebarProps) {
  return (
    <div
      className={cn(
        "hidden lg:flex lg:flex-col lg:inset-y-0 lg:z-40 bg-background transition-all duration-300 border-r border-border shrink-0",
        isCollapsed ? "lg:w-16" : "lg:w-64"
      )}
    >
      <div className="flex flex-col flex-1 min-h-0 pt-4">
        {/* Navigation */}
        <ScrollArea className="flex-1 px-3 pb-4 h-100">
          <div className={cn("space-y-6", isCollapsed && "space-y-4")}>
            {vendorRoutes?.map((section, index) => (
              <SidebarNavSection
                key={index}
                section={section}
                isCollapsed={isCollapsed}
              />
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
