"use client";

import React from "react";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type FormFields<T extends FieldValues> = {
  label: string;
  name: Path<T>;
  type: string;
  options?: string[];
};

type FormFieldsType<T extends FieldValues> = FormFields<T> | FormFields<T>[];

export default function FormComponent<T extends FieldValues>({
  form,
  fields,
  onSubmit,
  children,
}: {
  form: UseFormReturn<T>;
  fields: FormFieldsType<T>[];
  onSubmit: (values: T) => void;
  children: React.ReactNode;
}) {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-full"
      >
        {fields.map((item, index) =>
          Array.isArray(item) ? (
            <div key={index} className="flex items-center gap-4">
              {item.map((subItem, subIndex) => (
                <FormField
                  key={subIndex}
                  control={form.control}
                  name={subItem.name}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>{subItem.label}</FormLabel>
                      <FormControl>
                        {subItem.type === "select" ? (
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select an option" />
                            </SelectTrigger>

                            <SelectContent>
                              {subItem.options?.map((option, optionIndex) => (
                                <SelectItem key={optionIndex} value={option}>
                                  {" "}
                                  {option}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        ) : (
                          <Input type={subItem.type} {...field} />
                        )}
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </div>
          ) : (
            <FormField
              key={index}
              control={form.control}
              name={item.name}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{item.label}</FormLabel>
                  <FormControl>
                    {item.type === "select" ? (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select an option" />
                        </SelectTrigger>

                        <SelectContent>
                          {item.options?.map((option, optionIndex) => (
                            <SelectItem key={optionIndex} value={option}>
                              {" "}
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <Input type={item.type} {...field} />
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )
        )}

        {children}
      </form>
    </Form>
  );
}
