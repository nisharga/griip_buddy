import type React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mail, Phone, Calendar, UserCheck } from "lucide-react";

interface OwnerProfileCardProps {
  owner?: {
    name?: string;
    email?: string;
    phone_number?: string;
    profile_picture?: string;
    role?: string;
    status?: string;
    last_login_at?: string;
    createdAt?: string;
  };
}

const OwnerProfileCard: React.FC<OwnerProfileCardProps> = ({ owner }) => {
  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200";
      case "inactive":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-secondary">Owner Profile</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage
              src={owner?.profile_picture || "/placeholder.svg"}
              alt={owner?.name}
            />
            <AvatarFallback className="text-lg font-semibold text-secondary">
              {owner?.name
                ?.split(" ")
                .map((n) => n.charAt(0))
                .join("")
                .toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium lg:font-semibold text-base">
              {owner?.name || "Name not provided"}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <Badge className={getStatusColor(owner?.status)}>
                {owner?.status?.toUpperCase() || "UNKNOWN"}
              </Badge>
              <Badge variant="outline" className="text-[10px]">
                {owner?.role?.replace("_", " ").toUpperCase() || "USER"}
              </Badge>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">
              {owner?.email || "Email not provided"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">
              {owner?.phone_number || "Phone not provided"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">
              Joined: {formatDate(owner?.createdAt)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <UserCheck className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">
              Last login: {formatDate(owner?.last_login_at)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OwnerProfileCard;
