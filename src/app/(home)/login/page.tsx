/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import type React from "react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLoginMutation } from "@/redux/api/auth-api";
import { Eye, EyeOff, Loader } from "lucide-react";
import OtpVerify from "../register/OtpVerify";
import { toast } from "sonner";
import { setUser, setVendorId } from "@/app/(auth-pages)/store/user";
import { setAccessToken } from "@/lib/cookies";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    phoneNumber: "",
    password: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const router = useRouter();
  const [login, { isLoading }] = useLoginMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!/^\+?[\d\s-()]+$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Please enter a valid phone number";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;
    const payload = {
      phone_number: formData?.phoneNumber,
      password: formData?.password,
    };
    try {

      const response: any = await login({
        payload: payload,
      });
      console.log("response", response);

      if (response?.data?.statusCode === 200) {
        // === set data ===
        setUser(response?.data?.data?.user);
        setAccessToken(response?.data?.data?.access_token);
        setUser(response?.data?.data?.user);

        if (response?.data?.data?.role === "customer") {
          router.push("/");
        } else {
          setVendorId(response?.data?.data?.user?._id);
          router.push("/dashboard");
        }
        toast.success(response?.data?.message || "Login Successful!");
      } else if (response?.error?.data?.statusCode === 400) {
        setStep(2);
        toast.success(response?.data?.message || "Verification SMS Send!");
      } else {
        toast.error(response?.error?.data?.message || "Login Failed!");
      }
    } catch (error) {
      console.log("Login error:", error);
    }
  };

  return (
    <>
      {step === 1 ? (
        <div className='min-h-screen  bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8'>
          <div className='max-w-md w-full space-y-8'>
            <div className='text-center'>
              <h2 className='text-3xl font-bold text-secondary mb-2'>Welcome Back</h2>
              <p className='text-secondary'>Sign in to your account</p>
            </div>

            <div className='bg-white rounded-lg  p-4 lg:p-8'>
              <form onSubmit={handleSubmit} className='space-y-3 lg:space-y-6'>
                <div>
                  <label
                    htmlFor='phoneNumber'
                    className='block text-sm  font-medium text-secondary mb-2'>
                    Phone Number
                  </label>
                  <input
                    id='phoneNumber'
                    name='phoneNumber'
                    type='tel'
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className={`w-full px-4 text-sm py-3 border  rounded-lg placeholder:text-gray-400 focus:outline-none focus:ring-2 transition-colors ${errors.phoneNumber
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300/80 focus:ring-primary focus:border-primary"
                      }`}
                    placeholder='Enter your phone number'
                  />
                  {errors.phoneNumber && (
                    <p className='mt-1 text-sm text-red-600'>{errors.phoneNumber}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor='password'
                    className='block text-sm font-medium text-secondary mb-2'>
                    Password
                  </label>

                  <div className='relative'>
                    <input
                      id='password'
                      name='password'
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 text-sm border placeholder:text-gray-400 rounded-lg focus:outline-none focus:ring-2 transition-colors pr-10 ${errors.password
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:ring-primary focus:border-primary"
                        }`}
                      placeholder='Enter your password'
                    />

                    {/* Eye Toggle Button */}
                    <button
                      type='button'
                      onClick={() => setShowPassword(!showPassword)}
                      className='absolute inset-y-0 right-3 flex items-center text-secondary hover:text-gray-700 focus:outline-none'>
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className='mt-1 text-sm text-red-600'>{errors.password}</p>
                  )}
                </div>

                <div className='flex items-center justify-between'>
                  <div className='flex items-center'>
                    <input
                      id='remember-me'
                      name='remember-me'
                      type='checkbox'
                      className='h-4 w-4 text-secondary focus:ring-primary border-gray-300 rounded'
                    />
                    <label
                      htmlFor='remember-me'
                      className='ml-2 block text-sm text-gray-700'>
                      Remember me
                    </label>
                  </div>
                  <div className='text-sm'>
                    <a
                      href='#'
                      className='text-secondary hover:text-primary transition-colors'>
                      Forgot password?
                    </a>
                  </div>
                </div>

                <button
                  type='submit'
                  disabled={isLoading}
                  className='w-full bg-primary cursor-pointer text-white py-2 lg:py-3 lg:px-2 px-4 rounded-lg hover:bg-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed'>
                  {isLoading ? "Signing in..." : "Sign In"}
                </button>
              </form>

              <div className='mt-6 text-center'>
                <p className='text-secondary'>
                  {"Don't have an account? "}
                  <Link
                    href='/register'
                    className='text-secondary hover:text-primary font-medium transition-colors'>
                    Sign up
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : step === 2 ? (
        <OtpVerify phone_number={formData?.phoneNumber} />
      ) : null}
    </>
  );
}
