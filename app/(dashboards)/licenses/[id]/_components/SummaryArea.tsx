import React from 'react';
import { Check, CircleAlert, X } from 'lucide-react';
import CustomBadge from './CustomBadge';


const SummaryArea = () => {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-3 pt-6 px-4 md:pt-6 md:px-6 md:gap-x-8">
            <div>
                <h1 className="text-[16px] text-deepBlackColor font-medium border-b pb-2 ">Permissions</h1>
                <div className="flex flex-wrap gap-2 mt-4 ml-1">
                    <CustomBadge label="Commercial use" bgColor="bg-[#DCFCE7]" textColor="text-[#166534]" icon={<Check size={14} className="mb-[2px] text-[#166534]" />} />
                    <CustomBadge label="Modification" bgColor="bg-[#DCFCE7]" textColor="text-[#166534]" icon={<Check size={14} className="mb-[2px] text-[#166534]" />} />
                    <CustomBadge label="Distribution" bgColor="bg-[#DCFCE7]" textColor="text-[#166534]" icon={<Check size={14} className="mb-[2px] text-[#166534]" />} />
                    <CustomBadge label="Private use" bgColor="bg-[#DCFCE7]" textColor="text-[#166534]" icon={<Check size={14} className="mb-[2px] text-[#166534]" />} />
                </div>
            </div>
            <div>
                <h1 className="text-[16px] text-deepBlackColor font-medium border-b pb-2 ">Limitations</h1>
                <div className="flex flex-wrap gap-2 mt-4 ml-1">
                    <CustomBadge label="Liability" bgColor="bg-[#FEF2F2]" textColor="text-[#DC2626]" icon={<X size={14} className="mb-[2px] text-[#DC2626]" />} />
                    <CustomBadge label="Warranty" bgColor="bg-[#FEF2F2]" textColor="text-[#DC2626]" icon={<X size={14} className="mb-[2px] text-[#DC2626]" />} />
                </div>
            </div>
            <div>
                <h1 className="text-[16px] text-deepBlackColor font-medium border-b pb-2 ">Conditions</h1>
                <div className="flex flex-wrap gap-2 mt-4 ml-1">
                    <CustomBadge label="License and copyright notice" bgColor="bg-[#F1F5F9]" textColor="text-[#0F172A]" icon={<CircleAlert size={14} className="mb-[2px] text-[#0F172A]" />} />
                </div>
            </div>
        </div>
    );
};

export default SummaryArea;