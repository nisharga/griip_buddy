/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { API_BASE_URL } from "@/config";
import axios from "axios";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const OtpVerify = ({ phone_number }: { phone_number?: string }) => {
  // otp verify step
  const [otp, setOtp] = useState("");
  const [countdown, setCountdown] = useState(120);
  const [isResending, setIsResending] = useState(false);
  const [loading, setLoading] = useState(false);

  // Submit OTP
  const handleOTPSubmit = async () => {
    try {
      setLoading(true);
      const res = await axios.post(`${API_BASE_URL}/user/verify`, {
        phone_number,
        otp: parseInt(otp),
      });
      console.log("res", res);
      if (res.data.statusCode === 200) {
        toast.success("OTP Verified Successfully");
        setLoading(false);
        window.location.href = "/";
      }
    } catch (err: any) {
      setLoading(false);
      toast.error(err?.response?.data?.message || "OTP verification failed");
    }
  };

  // Resend OTP handler
  const handleResend = async () => {
    try {
      setIsResending(true);
      const res = await fetch(`${API_BASE_URL}/user/resend-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone_number }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("OTP resent successfully!");
        setCountdown(120); // Restart countdown
      } else {
        toast.error(data?.message || "Failed to resend OTP.");
      }
    } catch (err) {
      toast.error("Something went wrong.");
    } finally {
      setIsResending(false);
    }
  };

  // Countdown logic
  useEffect(() => {
    if (countdown === 0) return;
    const timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  return (
    <div className="min-h-[80vh] bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-6">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Verify Account
          </h2>
          <p className="text-gray-600">Complete verification to continue</p>
        </div>
        <div className="bg-white rounded-lg shadow p-8">
          <CardContent className="flex flex-col items-center justify-center">
            <InputOTP
              maxLength={6}
              value={otp}
              onChange={setOtp}
              pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
              className="scale-110" // ⬅️ Increase size overall
            >
              <InputOTPGroup className="">
                {[...Array(6)].map((_, index) => (
                  <InputOTPSlot
                    key={index}
                    index={index}
                    className="w-12 h-12 text-xl"
                  />
                ))}
              </InputOTPGroup>
            </InputOTP>

            <div className="text-center mt-4">
              {countdown > 0 ? (
                <p className="text-black">
                  Resend in {countdown} second{countdown !== 1 && "s"}
                </p>
              ) : (
                <Button onClick={handleResend} disabled={isResending}>
                  {isResending ? "Resending..." : "Resend OTP"}
                </Button>
              )}
            </div>

            <Button onClick={handleOTPSubmit} className={`mt-2`}>
              {loading ? "Loading..." : "Submit OTP"}
            </Button>
          </CardContent>
        </div>
      </div>
    </div>
  );
};

export default OtpVerify;
