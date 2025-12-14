"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Package,
  CheckCircle2,
  Truck,
  MapPin,
  Copy,
  AlertCircle,
  CreditCard,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function TrackOrderPage() {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const orderSteps = [
    {
      id: "placed",
      title: "Order Placed",
      description: "Your order has been received",
      date: "Jul 29, 2025, 12:39 AM",
      completed: true,
      icon: Package,
    },
    {
      id: "confirmed",
      title: "Order Confirmed",
      description: "Payment verified & order confirmed",
      date: "Jul 29, 2025, 1:15 AM",
      completed: true,
      icon: CheckCircle2,
    },
    {
      id: "transit",
      title: "In Transit",
      description: "Package is on its way",
      date: "Expected: Jul 31, 2025",
      completed: false,
      active: true,
      icon: Truck,
    },
    {
      id: "delivered",
      title: "Delivered",
      description: "Package delivered successfully",
      date: "Expected: Aug 2, 2025",
      completed: false,
      icon: MapPin,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-slate-900">
            Track Your Order
          </h1>
          <p className="text-slate-600">
            Stay updated on your package delivery status
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Order Timeline - Left Column */}
          <div className="lg:col-span-1">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-primary">
                  <Package className="w-5 h-5" />
                  Order Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {orderSteps.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <div key={step.id} className="relative">
                      {/* Connecting Line */}
                      {index < orderSteps.length - 1 && (
                        <div
                          className={`absolute left-6 top-12 w-0.5 h-16 ${
                            step.completed ? "bg-primary" : "bg-slate-200"
                          }`}
                        />
                      )}

                      <div className="flex items-start gap-4">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                            step.completed
                              ? "bg-primary border-primary text-white shadow-lg"
                              : step.active
                              ? "bg-white border-primary text-primary shadow-md animate-pulse"
                              : "bg-slate-100 border-slate-300 text-slate-400"
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>

                        <div className="flex-1 min-w-0">
                          <h3
                            className={`font-semibold ${
                              step.completed || step.active
                                ? "text-slate-900"
                                : "text-slate-500"
                            }`}
                          >
                            {step.title}
                          </h3>
                          <p className="text-sm text-slate-600 mt-1">
                            {step.description}
                          </p>
                          <p className="text-xs text-slate-500 mt-2">
                            {step.date}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}

                <Separator className="my-6" />

                <div className="text-center">
                  <Link href={"/login"}>
                    <Button
                      variant="outline"
                      className="text-red-600 border-red-200 hover:bg-red-50 bg-transparent"
                    >
                      <AlertCircle className="w-4 h-4 mr-2" />
                      Cancel Order
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Details & Items - Right Columns */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Details Card */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <Package className="w-5 h-5" />
                  Order Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">Order ID:</span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-semibold">#13</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard("#13", "orderId")}
                          className="h-6 w-6 p-0"
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                        {copiedField === "orderId" && (
                          <span className="text-xs text-green-600">
                            Copied!
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-between items-start">
                      <span className="text-slate-600">Tracking ID:</span>
                      <div className="flex items-center gap-2 max-w-48">
                        <span className="font-mono text-sm break-all">
                          a531697204...
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            copyToClipboard(
                              "a5316972045b4ffba1b9f88eec65c6d0",
                              "trackingId"
                            )
                          }
                          className="h-6 w-6 p-0 flex-shrink-0"
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                        {copiedField === "trackingId" && (
                          <span className="text-xs text-green-600">
                            Copied!
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">Invoice:</span>
                      <span className="font-mono font-semibold">inv0500f</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">Order Date:</span>
                      <span className="font-semibold">
                        Jul 29, 2025, 12:39 AM
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">Status:</span>
                      <Badge className="bg-primary hover:bg-[#4a8291]">
                        CONFIRMED
                      </Badge>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">Payment:</span>
                      <Badge
                        variant="outline"
                        className="text-green-600 border-emerald-300"
                      >
                        <CreditCard className="w-3 h-3 mr-1" />
                        PAID
                      </Badge>
                    </div>
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="bg-slate-50 rounded-lg p-4">
                  <h4 className="font-semibold text-slate-900 mb-2">
                    Order Note:
                  </h4>
                  <p className="text-slate-600 italic">
                    Wrap with bubblewrapper
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Order Items Card */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <Package className="w-5 h-5" />
                  Order Items (1)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg">
                  <div className="w-20 h-20 bg-white rounded-lg shadow-sm flex items-center justify-center overflow-hidden">
                    <Image
                      height={32}
                      width={32}
                      src="/placeholder.svg?height=80&width=80"
                      alt="Sylvia Howe book"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-900">
                      Enamul Haque
                    </h3>
                    <p className="text-sm text-slate-600 mt-1">
                      SKU: Labore eu quis simil
                    </p>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-sm text-slate-600">
                        Qty: <span className="font-semibold">1</span>
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xl font-bold text-slate-900">
                      ৳200
                    </span>
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="space-y-3">
                  <div className="flex justify-between text-slate-600">
                    <span>Subtotal:</span>
                    <span className="font-semibold"> ৳200</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Shipping:</span>
                    <span className="font-semibold text-green-600">120</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-bold text-slate-900">
                    <span>Total:</span>
                    <span className="text-primary"> ৳320</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
