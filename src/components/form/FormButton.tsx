import { Loader } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";

interface FormButtonProps {
  type?: "submit" | "button" | "reset";
  isLoading?: boolean | boolean[]; // can be a single flag or multiple flags
  children?: React.ReactNode;
  className?: string;
}

const FormButton: React.FC<FormButtonProps> = ({
  type = "submit",
  isLoading = false,
  children,
  className,
}) => {
  const loading = Array.isArray(isLoading)
    ? isLoading.some(Boolean)
    : isLoading;

  return (
    <Button
      type={type}
      disabled={loading}
      className={`${className} cursor-pointer`}
    >
      {loading ? (
        <>
          <Loader className="animate-spin mr-1" size={16} /> {children}
        </>
      ) : (
        children
      )}
    </Button>
  );
};

export default FormButton;
