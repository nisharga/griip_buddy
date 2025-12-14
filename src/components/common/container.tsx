import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

type ContainerProps = {
    children: ReactNode;
    className?: string;
};

export const Container = ({ children, className }: ContainerProps) => {
    return (
        <div className={cn("w-full max-w-[85rem] mx-auto px-2 lg:px-4", className)}>
            {children}
        </div>
    );
};