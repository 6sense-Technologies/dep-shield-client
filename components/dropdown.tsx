import * as React from "react";
import { cn } from "@/lib/utils";

import { Controller } from "react-hook-form";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@radix-ui/react-select";

type Options = {
  value: string;
  label: string;
};

type DropdownProps = {
  className?: string;
  placeholder: string;
  control?: any;
  name: string;
  errors?: any;
  additionalText?: string;
  active?: boolean;
  message?: any;
  options?: Options[];
};

export function Dropdown({
  className,
  placeholder,
  control,
  name,
  errors = {},
  additionalText,
  active = false,
  message,
  options = [],
}: DropdownProps) {
  const renderSelect = (field: any) => (
    <Select
      value={field.value}
      onValueChange={(value) => field.onChange(value)}
    >
      <SelectTrigger
        className={cn(
          "w-[200px]",
          !field.value ? "text-subHeading" : "text-black",
          className
        )}
        disabled={!active}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="!z-50 bg-white">
        <SelectGroup className={cn("bg-white !z-50 ", className)}>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );

  return (
    <div className="relative">
      {control ? (
        <Controller
          control={control}
          name={name}
          render={({ field }) => renderSelect(field)}
        />
      ) : (
        renderSelect({})
      )}
      {errors[name]?.message ? (
        <p className="absolute mt-1 flex items-center text-twelve md:text-sm font-medium text-destructive">
          {errors[name].message}
        </p>
      ) : message ? null : additionalText ? (
        <p className="absolute mt-1 flex items-center text-twelve md:text-sm text-inputFooterColor min-w-[330px]">
          {additionalText}
        </p>
      ) : null}
    </div>
  );
}