import type React from "react";
import { Card } from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";

interface DashboardHeaderProps {
  vendor?: {
    shop?: {
      name?: string;
      logo?: string;
    };
    owner?: {
      name?: string;
    };
    status?: string;
    createdAt?: string;
  };
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ vendor }) => {
  const getStatusColor = (status?: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "suspended":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Card className="p-2 lg:p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage
              src={vendor?.shop?.logo || "/placeholder.svg"}
              alt={vendor?.shop?.name}
            />
            <AvatarFallback className="text-lg font-semibold text-secondary">
              {vendor?.shop?.name?.charAt(0)?.toUpperCase() || "V"}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-lg lg:text-2xl font-medium lg:font-bold text-secondary">
              {vendor?.shop?.name || "Shop Name"}
            </h1>
            <p className="text-muted-foreground">
              Owner: {vendor?.owner?.name || "N/A"}
            </p>
            <p className="text-sm text-muted-foreground">
              Member since {formatDate(vendor?.createdAt)}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-start md:items-end gap-1 lg:gap-2">
          <Badge
            className={`${getStatusColor(vendor?.status)} text-xs lg:text-md`}
          >
            {vendor?.status?.toUpperCase() || "UNKNOWN"}
          </Badge>
        </div>
      </div>
    </Card>
  );
};

export default DashboardHeader;
