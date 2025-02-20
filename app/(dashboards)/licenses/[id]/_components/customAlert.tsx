import { TriangleAlert } from 'lucide-react'
import React from 'react'

const CustomAlert = () => {
    return (
        <div className="pt-6 px-4 md:pt-6 md:px-6">
            <div className="w-full flex items-center gap-[6px] bg-[#FDEBDD]">
                <span className="ml-4 mb-[2px]"><TriangleAlert size={14} className="text-[#B45309]" /></span> <p className="text-[#B45309] font-normal text-twelve my-3">Disclaimer: The information provided on DepShield.io is for reference only and does not constitute legal advice. For full details, review the official license text.</p>
            </div>
        </div>
    )
}

export default CustomAlert
