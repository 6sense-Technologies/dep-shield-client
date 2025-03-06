import { Input } from "@/components/ui/input";
import React, { FC } from "react";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { RepoSearchbarProps } from "@/types/repo.types";



const RepositorySearchbar: FC<RepoSearchbarProps> = ({ placeholder, name, className }) => {
  return (
    <div className={cn("flex cursor-not-allowed", className)}>
      <Search size={14} className="absolute text-subHeading mt-3 ml-[14px]"/>
      <Input placeholder={placeholder} name={name} className="pl-8" disabled/>
    </div>
  );
};

export default RepositorySearchbar;