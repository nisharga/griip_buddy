import type React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Store, CreditCard, FileText, User } from "lucide-react";

interface StatsCardsProps {
  vendor?: {
    status?: string;
    shop?: {
      name?: string;
    };
    payment?: {
      account_name?: string;
    };
    documents?: {
      NID?: { front?: string | null; back?: string | null };
      passport?: { front?: string | null; back?: string | null };
      tin_certificate?: string | null;
      trade_license?: string | null;
    };
    owner?: {
      status?: string;
    };
  };
}

const StatsCards: React.FC<StatsCardsProps> = ({ vendor }) => {
  const getDocumentCount = () => {
    let count = 0;
    if (vendor?.documents?.NID?.front || vendor?.documents?.NID?.back) count++;
    if (vendor?.documents?.passport?.front || vendor?.documents?.passport?.back)
      count++;
    if (vendor?.documents?.tin_certificate) count++;
    if (vendor?.documents?.trade_license) count++;
    return count;
  };

  const stats = [
    {
      title: "Shop Status",
      value: vendor?.status || "Unknown",
      icon: Store,
      color: vendor?.status === "active" ? "text-green-600" : "text-yellow-600",
    },
    {
      title: "Payment Setup",
      value: vendor?.payment?.account_name ? "Configured" : "Pending",
      icon: CreditCard,
      color: vendor?.payment?.account_name ? "text-green-600" : "text-red-600",
    },
    {
      title: "Documents",
      value: `${getDocumentCount()}/4 Uploaded`,
      icon: FileText,
      color: getDocumentCount() === 4 ? "text-green-600" : "text-yellow-600",
    },
    {
      title: "Owner Status",
      value: vendor?.owner?.status || "Unknown",
      icon: User,
      color:
        vendor?.owner?.status === "active"
          ? "text-green-600"
          : "text-yellow-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <stat.icon className={`h-4 w-4 text-secondary`} />
          </CardHeader>
          <CardContent>
            <div className={`text-md lg:text-2xl font-medium text-secondary`}>
              {stat.value}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatsCards;
