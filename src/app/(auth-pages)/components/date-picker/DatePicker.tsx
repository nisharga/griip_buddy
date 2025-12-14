"use client";
import { Select, SelectContent, SelectItem } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { DatePickerProps, months } from ".";
import DatePickerLabel from "./DatePickerLabel";

const DatePicker: React.FC<DatePickerProps> = ({
  startYear,
  endYear,
  selected,
  onSelect,
}) => {
  const [error, setError] = useState<string | null>(null);

  const handleDayChange = (day: string) => {
    const year = selected.getFullYear();
    const month = selected.getMonth();
    const newDate = new Date(year, month, parseInt(day));

    if (newDate.getDate() !== parseInt(day)) {
      setError("Invalid date selected");
    } else {
      setError(null);
      onSelect(newDate);
    }
  };

  const handleMonthChange = (month: string) => {
    const year = selected.getFullYear();
    const day = selected.getDate();
    const newDate = new Date(year, months.indexOf(month), day);

    if (newDate.getMonth() !== months.indexOf(month)) {
      setError("Invalid date selected");
    } else {
      setError(null);
      onSelect(newDate);
    }
  };

  const handleYearChange = (year: string) => {
    const month = selected.getMonth();
    const day = selected.getDate();
    const newDate = new Date(parseInt(year), month, day);

    if (newDate.getFullYear() !== parseInt(year)) {
      setError("Invalid date selected");
    } else {
      setError(null);
      onSelect(newDate);
    }
  };
  return (
    <div className="grid grid-cols-3 gap-4 max-w-[360px] dark:text-white">
      <Select onValueChange={handleDayChange}>
        <DatePickerLabel type="date" />
        <SelectContent>
          <ScrollArea className="h-48">
            {Array.from({ length: 31 }, (_, i) => (
              <SelectItem key={i + 1} value={(i + 1).toString()}>
                {i + 1}
              </SelectItem>
            ))}
          </ScrollArea>
        </SelectContent>
      </Select>
      <Select onValueChange={handleMonthChange}>
        <DatePickerLabel months={months} />
        <SelectContent>
          <ScrollArea className="h-48">
            {months.map((month, index) => (
              <SelectItem key={index} value={month}>
                {month}
              </SelectItem>
            ))}
          </ScrollArea>
        </SelectContent>
      </Select>
      <Select onValueChange={handleYearChange}>
        <DatePickerLabel months={months} />
        <SelectContent>
          <ScrollArea className="h-48">
            {Array.from({ length: endYear - startYear + 1 }, (_, i) => (
              <SelectItem
                key={i + startYear}
                value={(i + startYear).toString()}
              >
                {i + startYear}
              </SelectItem>
            ))}
          </ScrollArea>
        </SelectContent>
      </Select>
      {error && <div className="text-red-500">{error}</div>}
    </div>
  );
};

export default DatePicker;
