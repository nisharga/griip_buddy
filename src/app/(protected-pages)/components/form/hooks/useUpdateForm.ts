/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";

interface UseUpdateFormProps<T> {
  form: UseFormReturn<any>;
  defaultData?: Partial<T>;
}

/**
 * Handles:
 * 1. Resetting form values when default data is loaded
 * 2. Returning only changed values on submit
 */
export function useUpdateForm<T extends Record<string, any>>({
  form,
  defaultData,
}: UseUpdateFormProps<T>) {
  const { reset, getValues } = form;

  // reset when defaultData changes
  useEffect(() => {
    if (defaultData) reset(defaultData as T);
  }, [defaultData, reset]);

  /**
   * Get only the changed values compared to defaultData
   */
  const getChangedValues = (): Partial<T> => {
    const currentValues = getValues();
    const changed: Partial<T> = {};

    Object.keys(currentValues).forEach((key) => {
      if (defaultData?.[key] !== currentValues[key]) {
        changed[key as keyof T] = currentValues[key];
      }
    });

    return changed;
  };

  return { getChangedValues };
}
