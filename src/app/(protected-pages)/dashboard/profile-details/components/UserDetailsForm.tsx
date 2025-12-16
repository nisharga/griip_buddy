"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import ProfileFormElemets from "./ProfileFormElemets";
import { Form } from "@/components/ui/form";
import { z } from "zod";
import { profileDetailsSchema } from "../schema";

const UserDetailsForm = () => {
  const form = useForm<z.infer<typeof profileDetailsSchema>>({
    resolver: zodResolver(profileDetailsSchema),
    defaultValues: {
      name: "",
      userId: "",
      email: "",
      phone: "",
      gender: "",
      dateOfBirth: "",
    },
  });

  function onSubmit(data: FieldValues) {
    alert(data.name);
  }
  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col items-start"
        >
          <div
            className="grid grid-cols-12 gap-4 w-full"
            data-testid="profile-details-form"
          >
            <ProfileFormElemets form={form} />
          </div>
          <div className="py-4 flex items-center justify-center w-full">
            <button
              type="submit"
              className="bg-purple-500 hover:bg-purple-400 
                        rounded-[8px] text-center text-white mb-4 w-full py-2 px-4"
              data-testid="profile-details-form-update-button"
            >
              Update
            </button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default UserDetailsForm;
