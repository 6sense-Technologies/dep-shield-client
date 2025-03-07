import React from 'react';
import { Check, CircleAlert, X } from 'lucide-react';
import BadgeSection from './badgeSection';


const SummaryArea = () => {
    const permissionsBadges = [
        { label: "Commercial use", bgColor: "bg-[#DCFCE7]", textColor: "text-[#166534]", icon: <Check size={14} className="mb-[2px] text-[#166534]" /> },
        { label: "Modification", bgColor: "bg-[#DCFCE7]", textColor: "text-[#166534]", icon: <Check size={14} className="mb-[2px] text-[#166534]" /> },
        { label: "Distribution", bgColor: "bg-[#DCFCE7]", textColor: "text-[#166534]", icon: <Check size={14} className="mb-[2px] text-[#166534]" /> },
        { label: "Private use", bgColor: "bg-[#DCFCE7]", textColor: "text-[#166534]", icon: <Check size={14} className="mb-[2px] text-[#166534]" /> },
    ];

    const limitationsBadges = [
        { label: "Liability", bgColor: "bg-[#FEF2F2]", textColor: "text-[#DC2626]", icon: <X size={14} className="mb-[2px] text-[#DC2626]" /> },
        { label: "Warranty", bgColor: "bg-[#FEF2F2]", textColor: "text-[#DC2626]", icon: <X size={14} className="mb-[2px] text-[#DC2626]" /> },
    ];

    const conditionsBadges = [
        { label: "License and copyright notice", bgColor: "bg-[#F1F5F9]", textColor: "text-[#0F172A]", icon: <CircleAlert size={14} className="mb-[2px] text-[#0F172A]" /> },
    ];

    return (
        <div className="grid grid-cols-2 lg:grid-cols-3 pt-6 px-4 md:pt-6 md:px-6 md:gap-x-8">
            <BadgeSection title="Permissions" badges={permissionsBadges} />
            <BadgeSection title="Limitations" badges={limitationsBadges} />
            <BadgeSection title="Conditions" badges={conditionsBadges} />
        </div>
    );
};

export default SummaryArea;