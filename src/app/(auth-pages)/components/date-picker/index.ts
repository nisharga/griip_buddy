export const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

export type IMonth = (typeof months)[number];

export interface DatePickerProps {
    startYear: number;
    endYear: number;
    selected: Date;
    onSelect: (date: Date) => void;
  }