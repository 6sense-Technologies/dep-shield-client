import { OrDividerProps } from "@/types/Auth.types";
import React, { FC } from "react";
import { cn } from "@/lib/utils";

const OrDivider: FC<OrDividerProps> = ({ text, className }) => {
  return (
    <div className={cn("mt-4 flex items-center ", className)}>
      <div className="flex-grow border-t border-gray-300"></div>
      <span className="mx-4 text-gray-500">{text}</span>
      <div className="flex-grow border-t border-gray-300"></div>
    </div>
  );
};

export default OrDivider;