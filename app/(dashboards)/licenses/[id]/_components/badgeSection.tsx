import React from "react";
import CustomBadge from "./CustomBadge";

interface BadgeSectionProps {
    title: string;
    badges: {
        label: string;
        bgColor: string;
        textColor: string;
        icon: React.ReactNode;
    }[];
}

const BadgeSection: React.FC<BadgeSectionProps> = ({ title, badges }) => {
    return (
        <div>
            <h1 className="text-[16px] text-deepBlackColor font-medium border-b pb-2">{title}</h1>
            <div className="flex flex-wrap gap-2 mt-4 ml-1">
                {badges.map((badge, index) => (
                    <CustomBadge
                        key={index}
                        label={badge.label}
                        bgColor={badge.bgColor}
                        textColor={badge.textColor}
                        icon={badge.icon}
                    />
                ))}
            </div>
        </div>
    );
};

export default BadgeSection;