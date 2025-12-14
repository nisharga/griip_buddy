/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axiosInstance";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { ProfileHeader } from "./main-components/profile-header";
import { ProfileResponse } from "./types";
import { OrderStatistics } from "./main-components/order-statistics";
import Loading from "../../components/loading/Loading";

export default function ProfilePage() {
  const [profile, setProfile] = useState<ProfileResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosInstance.get("/user");
      setProfile(response.data);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
      console.error("❌ Error fetching profile:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) {
    return <Loading text="Loading your profile..." />;
  }

  return (
    <div className=" bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Profile Header */}
          <ProfileHeader profile={profile?.data} />
          <OrderStatistics />
        </div>
      </div>
    </div>
  );
}
