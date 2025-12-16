/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FieldValues } from "react-hook-form";
import { ChangePasswordSchema } from "../schema";
import { Form } from "@/src/components/ui/form";
import { useState } from "react";
import { z } from "zod";
import { Eye, EyeOff } from "lucide-react";
import { FormInput } from "../../../components";
// import axiosInstance from "@/lib/axiosInstance";
import { toast } from "sonner";
import { API_BASE_URL } from "@/src/config";

const PasswordChangeForm = () => {
  const [oldPassword, setOldPassword] = useState(false);
  const [newPassword, setNewPassword] = useState(false);
  const [newConfirmPassword, setNewConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof ChangePasswordSchema>>({
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues: {
      oldPassword: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data: FieldValues) {
    if (data) {
      const payload = {
        old_password: data.oldPassword,
        new_password: data.password,
      };

      console.log("payload", payload);

      /* setLoading(true);

      try {
        const res = await axiosInstance.patch(
          `${API_BASE_URL}/user/password`,
          payload
        );
        setLoading(false);
        if (res?.data?.statusCode === 200) {
          form.reset();
          setLoading(false);
          toast("Password change successfully!!");
        }
      } catch (error: any) {
        toast(error?.response.data?.message);
        setLoading(false);
      } */
    }
  }

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col items-start"
        >
          <div
            className="w-full mb-4 relative!"
            data-testid="change-password-form"
          >
            <FormInput
              type={oldPassword ? "text" : "password"}
              form={form}
              labelClass="input-label !text-left"
              className="input"
              name="oldPassword"
              label="Current Password"
              placeholder="Enter your current password"
            />
            <button
              className="absolute right-2 top-10"
              type="button"
              onClick={() => setOldPassword(!oldPassword)}
            >
              {!oldPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
          <div className="w-full mb-4 relative!">
            <FormInput
              type={newPassword ? "text" : "password"}
              form={form}
              labelClass="input-label !text-left"
              className="input"
              name="password"
              label="New Password"
              placeholder="Enter your new password"
            />
            <button
              className="absolute right-2 top-10"
              type="button"
              onClick={() => setNewPassword(!newPassword)}
            >
              {!newPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
          <div className="w-full mb-4 relative!">
            <FormInput
              type={newConfirmPassword ? "text" : "password"}
              form={form}
              labelClass="input-label !text-left"
              className="input"
              name="confirmPassword"
              label="Confirm Password"
              placeholder="Confirm Password"
            />
            <button
              className="absolute right-2 top-10"
              type="button"
              onClick={() => setNewConfirmPassword(!newConfirmPassword)}
            >
              {!newConfirmPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
          <div className="w-full relative!">
            <button
              type="submit"
              className="bg-primary rounded-xl text-center
                    text-white w-full! py-2 block cursor-pointer"
            >
              {loading ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default PasswordChangeForm;
