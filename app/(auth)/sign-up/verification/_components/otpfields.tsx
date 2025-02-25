import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import React, { FC, useState, ChangeEvent } from "react";
import { Controller } from "react-hook-form";

interface OtpfieldsProps {
  control: any;
}

const Otpfields: FC<OtpfieldsProps> = ({ control }) => {
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number, valueArray: string[], field: any) => {
    const newValue = [...valueArray];
    newValue[index] = e.target.value;
    field.onChange(newValue.join(''));
  };

  const handleFocus = (index: number) => {
    setFocusedIndex(index);
  };

  const handleBlur = () => {
    setFocusedIndex(null);
  };

  return (
    <Controller
      name="token"
      control={control}
      render={({ field }) => {
        const valueArray = field.value ? field.value.split('') : Array(6).fill('');
        return (
          <InputOTP maxLength={6} {...field}>
            <InputOTPGroup>
              {Array.from({ length: 6 }).map((_, index) => (
                <InputOTPSlot
                  key={index}
                  index={index}
                  id={`digit-${index}`}
                  value={valueArray[index] || ''}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e, index, valueArray, field)}
                  onFocus={() => handleFocus(index)}
                  onBlur={handleBlur}
                  className={`w-[52px] h-[52px] lg:w-10 lg:h-10 text-center text-lg border focus:outline-none focus:ring-2 ${
                    focusedIndex === index ? "border-black" : "border-gray-300"
                  }`}
                />
              ))}
            </InputOTPGroup>
          </InputOTP>
        );
      }}
    />
  );
};

export default Otpfields;