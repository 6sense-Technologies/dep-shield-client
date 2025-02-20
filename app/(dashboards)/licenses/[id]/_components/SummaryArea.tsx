import { Badge, Check, CircleAlert, X } from 'lucide-react'
import React from 'react'

const SummaryArea = () => {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-3 pt-6 px-4 md:pt-6 md:px-6 md:gap-x-8">
            <div>
                <h1 className="text-[16px] text-deepBlackColor font-medium border-b pb-2 ">Permissions</h1>
                <div className="flex flex-wrap gap-2 mt-4 ml-1">
                    <Badge className="inline-flex items-center gap-1 bg-[#DCFCE7]  hover:bg-[#DCFCE7] text-nowrap font-normal">
                        <div className="flex items-center gap-1">
                            <Check size={14} className="mb-[2px] text-[#166534]" />  <span className="text-twelve font-normal text-[#166534]">Commercial use
                            </span>
                        </div>
                    </Badge>
                    <Badge className="inline-flex items-center gap-1 bg-[#DCFCE7]  hover:bg-[#DCFCE7] text-nowrap font-normal">
                        <div className="flex items-center gap-1">
                            <Check size={14} className="mb-[2px] text-[#166534]" />  <span className="text-twelve font-normal text-[#166534]">Modification

                            </span>
                        </div>
                    </Badge>
                    <Badge className="inline-flex items-center gap-1 bg-[#DCFCE7]  hover:bg-[#DCFCE7] text-nowrap font-normal">
                        <div className="flex items-center gap-1">
                            <Check size={14} className="mb-[2px] text-[#166534]" />  <span className="text-twelve font-normal text-[#166534]">Distribution
                            </span>
                        </div>
                    </Badge>
                    <Badge className="inline-flex items-center gap-1 bg-[#DCFCE7]  hover:bg-[#DCFCE7] text-nowrap font-normal">
                        <div className="flex items-center gap-1">
                            <Check size={14} className="mb-[2px] text-[#166534]" />  <span className="text-twelve font-normal text-[#166534]">
                                Private use
                            </span>
                        </div>
                    </Badge>
                </div>
            </div>
            <div>
                <h1 className="text-[16px] text-deepBlackColor font-medium border-b pb-2 ">Limitations</h1>
                <div className="flex flex-wrap gap-2 mt-4 ml-1">
                    <Badge className="inline-flex items-center gap-1 bg-[#FEF2F2]  hover:bg-[#FEF2F2] text-nowrap font-normal">
                        <div className="flex items-center gap-1">
                            <X size={14} className="mb-[2px] text-[#DC2626]" />  <span className="text-twelve font-normal text-[#DC2626]">Liability
                            </span>
                        </div>
                    </Badge>
                    <Badge className="inline-flex items-center gap-1 bg-[#FEF2F2]  hover:bg-[#FEF2F2] text-nowrap font-normal">
                        <div className="flex items-center gap-1">
                            <X size={14} className="mb-[2px] text-[#DC2626]" />  <span className="text-twelve font-normal text-[#DC2626]">
                                Warranty
                            </span>
                        </div>
                    </Badge>

                </div>
            </div>
            <div>
                <h1 className="text-[16px] text-deepBlackColor font-medium border-b pb-2 ">Conditions</h1>
                <div className="flex flex-wrap gap-2 mt-4 ml-1">
                    <Badge className="inline-flex items-center gap-1 bg-[#F1F5F9]  hover:bg-[#F1F5F9] text-nowrap font-normal">
                        <div className="flex items-center gap-1">
                            <CircleAlert size={14} className="mb-[2px] text-[#0F172A]" />  <span className="text-twelve font-normal text-[#0F172A]">License and copyright notice
                            </span>
                        </div>
                    </Badge>
                </div>
            </div>
        </div>
    )
}

export default SummaryArea
