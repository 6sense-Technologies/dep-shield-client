import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Controller } from "react-hook-form";

export type DropdownOption = {
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
  options?: DropdownOption[];
  value?: string;
  onChange?: (value: string) => void;
};

export function VulnabalitiesDropdown({
  className,
  placeholder,
  control,
  name,
  active = false,
  options = [],
  value,
  onChange,
}: DropdownProps) {
  const renderSelect = (field: any) => (
    <Select
      {...field}
      value={value}
      onValueChange={onChange}
    >
      <SelectTrigger className={cn("border shadow-none h-[28px]", className)} disabled={!active}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="!z-500">
        <SelectGroup className={cn("bg-white !z-500 ", className)}>
          {/* <SelectLabel>Branches</SelectLabel> */}
          {options.length > 0 ? (
            options.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
            ))
          ) : (
            <SelectItem value='no' disabled>No branches</SelectItem>
          )}
        </SelectGroup>
      </SelectContent>
    </Select>
  );

  return (
    <div className="relative w-full">
      {control ? (
        <Controller
          control={control}
          name={name}
          render={({ field }) => renderSelect(field)}
        />
      ) : (
        renderSelect({})
      )}
      {/* {errors[name]?.message ? (
        <p className="absolute mt-1 flex items-center text-sm font-medium text-red-500">
          {errors[name].message}
        </p>
      ) : (
        <p className="absolute mt-1 flex items-center text-sm text-inputFooterColor">
          {additionalText}
        </p>
      )} */}
    </div>
  );
}