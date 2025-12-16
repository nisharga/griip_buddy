"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { Controller, FieldValues, UseFormReturn } from "react-hook-form";

interface IProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: string;
}

const genderOptions = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  { label: "Other", value: "other" },
];

const GenderDropdown = ({ form, name, ...props }: IProps<FieldValues>) => {
  const { control, setValue, watch } = form;
  const selectedGender = watch(name);
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value } }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="input border rounded-xl flex justify-between 
                        items-center w-full py-2 px-2 text-sm font-medium!"
            >
              {selectedGender ? selectedGender : "Select Gender"}
              <ChevronDown className="fill-white" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white! w-full!" {...props}>
            {genderOptions.map((gender) => (
              <DropdownMenuItem
                key={gender.value}
                onClick={() => setValue(name, gender.value)}
                className={value === gender.value ? "bg-gray-200" : ""}
              >
                {gender.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    />
  );
};

export default GenderDropdown;
