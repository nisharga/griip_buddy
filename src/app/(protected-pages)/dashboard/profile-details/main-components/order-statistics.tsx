/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Card, CardContent } from "@/src/components/ui/card";
// import { API_BASE_URL } from "@/config";
// import axiosInstance from "@/lib/axiosInstance";
import {
  ShoppingBag,
  Clock,
  CheckCircle,
  RotateCcw,
  XCircle,
} from "lucide-react";
import { useEffect, useState } from "react";

export function OrderStatistics() {
  const [loading, setLoading] = useState(true);
  // set data via API :)
  const [data, setData] = useState<any>(null);

  /* useEffect(() => {
    async function fetchOrderData() {
      setLoading(true);
      const res = await axiosInstance.get(
        `${API_BASE_URL}/order/user/statistics`
      );
      if (res?.data?.statusCode === 200) {
        setData(res?.data?.data);
      }
      setLoading(false);
    }
    fetchOrderData();
  }, []); */

  const stats = [
    {
      title: "Total Orders",
      value: data?.total_orders ?? 0,
      icon: ShoppingBag,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Pending Orders",
      value: data?.pending_orders,
      icon: Clock,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
    {
      title: "In Transit Orders",
      value: data?.in_transit_orders,
      icon: RotateCcw,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      title: "Completed Orders",
      value: data?.completed_orders,
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Cancelled Orders",
      value: data?.cancelled_orders,
      icon: XCircle,
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
    /*  {
      title: "Todays Orders",
      value: data?.orders_today,
      icon: XCircle,
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
    {
      title: "Last 30 days Order",
      value: data?.orders_last_30_days,
      icon: XCircle,
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
    {
      title: "Last 7 days Order",
      value: data?.orders_last_7_days,
      icon: XCircle,
      color: "text-red-600",
      bgColor: "bg-red-50",
    }, */
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
      {stats?.map((stat) => (
        <Card key={stat?.title}>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${stat?.bgColor}`}>
                <stat.icon className={`w-5 h-5 ${stat?.color}`} />
              </div>
              <div>
                <div className="text-xl lg:text-2xl font-medium lg:font-semibold text-gray-900">
                  {stat?.value}
                </div>
                <div className="text-sm text-gray-600">{stat?.title}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
