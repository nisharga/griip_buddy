"use client";

import type { NavSection } from "./sidebar-data";
import { SidebarNavItem } from "./sidebar-nav-item";

interface SidebarNavSectionProps {
  section: NavSection;
  isCollapsed?: boolean;
}

export function SidebarNavSection({
  section,
  isCollapsed,
}: SidebarNavSectionProps) {
  return (
    <div className="space-y-1">
      {section.title && !isCollapsed && (
        <h4 className="px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
          {section.title}
        </h4>
      )}
      <nav className="space-y-1">
        {section?.items.map((item) => (
          <SidebarNavItem
            key={item.href}
            item={item}
            isCollapsed={isCollapsed}
          />
        ))}
      </nav>
    </div>
  );
}
