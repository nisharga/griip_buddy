/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge } from "@/src/components/ui/badge";
import { Card, CardContent } from "@/src/components/ui/card";
import { Mail, Calendar, Shield } from "lucide-react";

export function ProfileHeader({ profile }: any) {
  /* const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  }; */

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Card className="mb-8">
      <CardContent className="lg:p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 lg:gap-6">
          {/* User Info */}
          <div className="flex-1 space-y-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-medium lg:font-bold text-gray-900 mb-2">
                {profile?.full_name}
              </h1>
              <div className="flex flex-wrap items-center gap-3">
                <Badge className="capitalize">{profile?.status}</Badge>
                <Badge variant="outline" className="capitalize">
                  <Shield className="w-3 h-3 mr-1" />
                  {profile?.role}
                </Badge>
              </div>
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2 text-gray-600">
                <Mail className="w-4 h-4" />
                <span>{profile?.email}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>Member since {formatDate(profile?.createdAt)}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
