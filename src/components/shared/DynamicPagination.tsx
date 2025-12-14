"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, ArrowRight } from "lucide-react";

type TPagination = {
  totalItems: number;
  limit: number | string;
  setLimit: React.Dispatch<React.SetStateAction<number | string>>;
  currentPage: number;
  onPageChange: (newPage: number) => void;
};

const limitValues = [20, 40, 60, 80, 100];

const DynamicPagination = ({
  totalItems,
  limit,
  setLimit,
  currentPage,
  onPageChange,
}: TPagination) => {
  // === calculate total pages ===
  const totalPages = Math.ceil(Number(totalItems) / Number(limit));

  // === handling prev page ===
  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  // === handling next page ===
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <>
      {/* larger device */}
      <div className="hidden w-full items-center justify-between gap-4 lg:flex">
        {/* per page dropdown and displaing number */}
        <Select defaultValue={`${limitValues[0]}`} onValueChange={setLimit}>
          <SelectTrigger>
            <SelectValue defaultValue={`${limitValues[0]}`} />
          </SelectTrigger>
          <SelectContent className="w-fit">
            {limitValues?.map((value: number, index) => {
              return (
                <SelectItem key={index} value={String(value)}>
                  {value}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>

        <div className="text-muted-foreground text-sm">
          {totalItems > 0
            ? Math.min(1 + (currentPage - 1) * Number(limit), totalItems)
            : 0}{" "}
          -{" "}
          {totalItems > 0
            ? Math.min(currentPage * Number(limit), totalItems)
            : 0}{" "}
          of {totalItems}
        </div>

        <div className="flex items-center gap-2">
          {/* prev button */}
          <Button onClick={handlePrevPage} disabled={currentPage === 1}>
            Previous
          </Button>

          {/* next button */}
          <Button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </div>

      {/* smaller device */}
      <div className="flex w-full items-center justify-between gap-4 lg:hidden">
        {/* per page dropdown and displaing number */}
        <Select defaultValue={`${limitValues[0]}`} onValueChange={setLimit}>
          <SelectTrigger>
            <SelectValue defaultValue={`${limitValues[0]}`} />
          </SelectTrigger>
          <SelectContent>
            {limitValues?.map((value: number, index) => {
              return (
                <SelectItem key={index} value={String(value)}>
                  {value}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
        <div className="text-muted-foreground text-sm">
          {totalItems > 0
            ? Math.min(1 + (currentPage - 1) * Number(limit), totalItems)
            : 0}{" "}
          -{" "}
          {totalItems > 0
            ? Math.min(currentPage * Number(limit), totalItems)
            : 0}{" "}
          of {totalItems}
        </div>
        {/* prev and next button */}
        <div className="flex items-center gap-2">
          {/* prev button */}
          <Button
            size="icon"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            <ArrowLeft className="size-5" />
          </Button>

          {/* next button */}
          <Button
            size="icon"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            <ArrowRight className="size-5" />
          </Button>
        </div>
      </div>
    </>
  );
};

export default DynamicPagination;
