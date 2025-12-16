/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form";
import { cn } from "@/src/lib/utils";
import React, { FC } from "react";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";

interface IProps {
  form: any;
  name: string;
  placeholder?: string;
  label?: string;
  labelClass?: string;
  formItemClassName?: string;
  className?: string;
  defaultValue?: string;
  type?: string | "text";
  value?: string;
  disabled?: boolean;
}
const FormInput: FC<IProps> = ({
  form,
  name,
  placeholder,
  label,
  formItemClassName,
  labelClass,
  className,
  defaultValue,
  type,
  value,
  disabled,
  ...props
}) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("w-full", formItemClassName)}>
          <FormLabel className={cn(labelClass, "font-normal text-sm")}>
            {label ? label : ""}
          </FormLabel>
          {type === "textarea" ? (
            <FormControl>
              <div className="relative">
                <Textarea
                  {...field}
                  value={value ?? field.value ?? defaultValue ?? ""}
                  placeholder={placeholder}
                  className={`placeholder-third-800 bg-first-300 
                                        focus-visible:ring-transparent text-black border 
                                        border-white rounded-xl py-4 placeholder:text-sm placeholder:lg:text-base ${className}`}
                  disabled={disabled}
                />
              </div>
            </FormControl>
          ) : (
            <FormControl>
              <div className="relative">
                <Input
                  {...props}
                  {...field}
                  type={type}
                  value={value ?? field.value ?? defaultValue ?? ""}
                  placeholder={placeholder}
                  className={`placeholder-third-800 bg-first-300 
                                        focus-visible:ring-transparent text-black border 
                                        border-white rounded-xl py-5 ${className}`}
                  disabled={disabled}
                />
              </div>
            </FormControl>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
export default FormInput;
