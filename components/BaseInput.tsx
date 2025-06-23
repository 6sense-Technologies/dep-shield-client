import * as React from "react";
import { cn } from "@/lib/utils";
import { Controller } from "react-hook-form";

interface InputProps extends React.ComponentProps<"input"> {
  control?: any;
  name: string;
  errors?: any;
  additionalText?: string;
  externalError?: string | null | undefined;
  index?: number;
  message?: any;
  errorclassName?: string;
}

const BaseInput = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      control,
      name,
      additionalText,
      errors = {},
      type = "text",
      externalError,
      message,
      errorclassName,
      
      ...props
    },
    ref
  ) => {

    // console.log("BaseInput", name);

    return (
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <div className="relative w-full">
            <input
              {...field}
              value={field?.value || ""}
              type={type}
              className={cn(
                "border-input focus-visible:ring-ring flex h-9 w-full rounded-md border bg-transparent py-1 pl-3 pr-10 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-subHeading focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50",
                {
                  "border-destructive focus-visible:ring-destructive/50":
                    errors[name]?.message || externalError,
                },
                className
              )}
              ref={ref}
              {...props}
            />
            {errors[name]?.message || externalError ? (
              <p className={`absolute ${errorclassName ? errorclassName : "mt-1"} flex items-center text-twelve md:text-sm font-medium text-destructive`}>
                {errors[name]?.message || externalError}
              </p>
            ) : message ? null : additionalText ? (
              <p className="absolute mt-1 flex items-center text-twelve md:text-sm text-inputFooterColor">
                {additionalText}
              </p>
            ) : null}
          </div>
        )}
      />
    );
  }
);

BaseInput.displayName = "Input";

export { BaseInput };