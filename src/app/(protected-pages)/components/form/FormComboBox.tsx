/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { Controller, Control, FieldValues, Path } from "react-hook-form";
import { Button } from "@/src/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/src/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/src/lib/utils";
import {
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/src/components/ui/form";

type Option = {
  label: string;
  value: string; // your id
};

interface FormComboBoxProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;
  /**
   * Array of options to render
   */
  data: Option[];
  /**
   * Optional: if you want to force a default id from outside (e.g. update screen),
   * otherwise just pass it via RHF `defaultValues`.
   */
  defaultValueId?: string;
  /**
   * Optional classNames
   */
  className?: string;
  buttonClassName?: string;
  popoverClassName?: string;
  /**
   * Disable interaction
   */
  disabled?: boolean;
  /**
   * Callback when value changes
   */
  setSearchValue?: (value: string) => void; // add this
}

export function FormComboBox<T extends FieldValues>({
  control,
  name,
  label,
  placeholder = "Select an option",
  data,
  defaultValueId,
  className,
  buttonClassName,
  popoverClassName,
  disabled,
  setSearchValue,
}: FormComboBoxProps<T>) {
  const [open, setOpen] = React.useState(false);

  // map value -> label
  const labelByValue = React.useMemo(() => {
    const map = new Map<string, string>();
    data.forEach((d) => map.set(d.value, d.label));
    return map;
  }, [data]);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => {
        // apply defaultValueId only if field has no value yet
        React.useEffect(() => {
          if (defaultValueId && !field.value) {
            field.onChange(defaultValueId);
          }
          // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [defaultValueId]);

        const selectedLabel = field.value
          ? labelByValue.get(String(field.value))
          : "";

        return (
          <FormItem className={cn("flex flex-col gap-2", className)}>
            {label ? <FormLabel>{label}</FormLabel> : null}

            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    type="button"
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    disabled={disabled}
                    className={cn(
                      "w-full justify-between",
                      !selectedLabel && "text-muted-foreground",
                      buttonClassName
                    )}
                  >
                    {selectedLabel || placeholder}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>

              {/* Always open BELOW the trigger */}
              <PopoverContent
                side="bottom"
                align="start"
                avoidCollisions={false}
                className={cn(
                  "w-(--radix-popover-trigger-width) p-0",
                  popoverClassName
                )}
              >
                <Command>
                  <CommandInput
                    placeholder="Search…"
                    onValueChange={(value) => setSearchValue?.(value)}
                  />
                  <CommandList>
                    <CommandEmpty>No result found.</CommandEmpty>
                    <CommandGroup>
                      {data?.map((opt) => {
                        const isSelected =
                          String(field?.value ?? "") === opt?.value;
                        return (
                          <CommandItem
                            key={opt?.value}
                            value={opt?.label}
                            keywords={[opt?.label, opt?.value]}
                            onSelect={() => {
                              const nextValue = isSelected ? "" : opt?.value;
                              field.onChange(nextValue);
                              setOpen(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                isSelected ? "opacity-100" : "opacity-0"
                              )}
                            />
                            {opt.label}
                          </CommandItem>
                        );
                      })}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            <FormMessage>{error?.message}</FormMessage>
          </FormItem>
        );
      }}
    />
  );
}
