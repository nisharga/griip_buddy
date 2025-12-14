/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Plus, XCircle } from "lucide-react";
import { toast } from "sonner";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Control, FieldValues, Path } from "react-hook-form";

type UploadMode = "single" | "multiple";

type LocalImg = {
  url: string;
  file?: File;
};

interface FormFileProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  mode?: UploadMode;
  defaultValue?: string[];
  className?: string;
  imgClass?: string;
}

export const FormFile = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder = "Click to upload",
  mode = "single",
  defaultValue = [],
  className,
  imgClass,
}: FormFileProps<T>) => {
  const [localImgs, setLocalImgs] = useState<LocalImg[]>(
    (Array.isArray(defaultValue) ? defaultValue : [defaultValue]).map((val) =>
      typeof val === "string"
        ? { url: val }
        : { file: val, url: URL.createObjectURL(val) }
    )
  );

  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

  const handleImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    onChange: (value: any) => void
  ) => {
    const files = Array.from(event.target.files || []);
    if (!files.length) return;

    const validFiles = files.filter((file) => {
      if (file.size > MAX_FILE_SIZE) {
        toast.error(`${file.name} exceeds the 3MB limit.`);
        return false;
      }
      return true;
    });

    const newLocalImgs = validFiles.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));

    const updatedImgs =
      mode === "multiple" ? [...localImgs, ...newLocalImgs] : newLocalImgs;
    setLocalImgs(updatedImgs);

    // Set to RHF
    const finalValue =
      mode === "multiple"
        ? updatedImgs.map((img) => img.file ?? img.url)
        : updatedImgs[0]?.file ?? updatedImgs[0]?.url ?? null;

    onChange(finalValue);
  };

  const handleRemoveLocalFile = (
    index: number,
    onChange: (value: any) => void
  ) => {
    const updated = [...localImgs];
    updated.splice(index, 1);
    setLocalImgs(updated);

    const finalValue =
      mode === "multiple"
        ? updated.map((img) => img.file ?? img.url)
        : updated[0]?.file ?? updated[0]?.url ?? null;

    onChange(finalValue);
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field: { onChange } }) => (
        <FormItem className={cn("flex flex-col gap-4", className)}>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className="relative flex flex-col gap-4 rounded-lg border border-input p-4">
              {/* Upload trigger */}
              <div
                onClick={() => document.getElementById(name)?.click()}
                className="flex items-center justify-center gap-4 w-full cursor-pointer"
              >
                <div className="size-10 rounded-md grid place-items-center bg-secondary">
                  <Plus size={16} />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{placeholder}</span>
                  <span className="text-xs text-muted-foreground">
                    Supported: .png, .jpg, .svg, .webp, .jpeg (max: 3MB)
                  </span>
                </div>
              </div>

              {/* Preview */}
              {localImgs?.length > 0 && (
                <div className="w-full flex gap-4 flex-wrap">
                  {localImgs?.map((img, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between gap-4 bg-secondary p-2 rounded-md"
                    >
                      <Image
                        src={img?.url}
                        alt="Uploaded"
                        width={500}
                        height={500}
                        className={cn(
                          "size-12 w-auto h-[100px] rounded-md",
                          imgClass
                        )}
                      />
                      <Button
                        type="button"
                        size="icon"
                        variant="outline"
                        className="hover:text-destructive"
                        onClick={() => handleRemoveLocalFile(index, onChange)}
                      >
                        <XCircle />
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              {/* File input */}
              <Input
                id={name}
                type="file"
                className="hidden"
                accept="image/webp,image/jpeg,image/png,image/jpg"
                multiple={mode === "multiple"}
                onChange={(e) => handleImageUpload(e, onChange)}
              />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
