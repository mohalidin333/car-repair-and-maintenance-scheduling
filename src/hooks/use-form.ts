'use client'

import { zodResolver } from "@hookform/resolvers/zod";
import { DefaultValues, FieldValues, useForm } from "react-hook-form";
import { z } from "zod";

export function useFormWithZod<T extends FieldValues>(
  schema: z.ZodSchema<T>,
  defaultValues: DefaultValues<T>
) {
  return useForm<T>({
    resolver: zodResolver(schema),
    defaultValues: {
      ...defaultValues,
    },
  });
};