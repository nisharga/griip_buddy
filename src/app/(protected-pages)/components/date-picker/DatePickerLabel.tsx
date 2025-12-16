import React from "react";
import { SelectTrigger, SelectValue } from "@/src/components/ui/select";

export type IMonth = readonly string[]; // Define IMonth as readonly string[]

interface IProps {
  selected?: Date; // Fix type to accept Date or null
  months?: IMonth; // Keep months as optional
  type?: "date" | "year"; // Restrict type to valid values
}

const DatePickerLabel = ({ selected, months, type }: IProps) => {
  return (
    <SelectTrigger
      className="shadow-sm focus:outline-0 focus:ring-0 
                focus:ring-offset-0 min-h-5.5 input mt-0.5"
    >
      <SelectValue
        placeholder={
          <div className="flex flex-col items-start ">
            <span className="font-normal dark:text-white">
              {selected && type === "date"
                ? selected.getDate() || "-"
                : (selected && selected.getFullYear()) || "-"}
              {(months && selected && months[selected.getMonth()]) || "-"}
            </span>
          </div>
        }
      />
    </SelectTrigger>
  );
};

export default DatePickerLabel;
