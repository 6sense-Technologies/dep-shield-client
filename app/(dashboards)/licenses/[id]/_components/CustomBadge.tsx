import React from "react";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";

interface CustomBadgeProps {
    label: string;
    link?: boolean;
    bgColor?: string;
    textColor?: string;
    icon?: React.ReactNode;
}

const CustomBadge: React.FC<CustomBadgeProps> = ({ label, link = false, bgColor = "bg-white", textColor = "text-black", icon }) => {
    return (
        <Badge className={`inline-flex items-center gap-1 ${bgColor} ${textColor} hover:${bgColor} text-nowrap font-normal`}>
            <div className="flex items-center gap-[6px]">
                {icon}
                <span className={`text-twelve font-normal ${textColor} ${link ? "cursor-pointer" : ""}`}>{label}</span>
                {link && <ExternalLink size={14} className="mb-[2px]" />}
            </div>
        </Badge>
    );
};

export default CustomBadge;