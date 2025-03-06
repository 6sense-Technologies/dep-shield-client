import React, { FC } from 'react';
import { ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { CustomCardPropsWithBadge } from '@/types/Vulnerability.types';


const CustomCardWithBadge: FC<CustomCardPropsWithBadge> = ({ bgColor, subheading, Heading, icon }) => {
    return (
        <div className={`w-full max-w-200px h-[100px] ${bgColor} flex justify-between items-center rounded-md`}>
            <div className='mx-auto'>
                <div className="flex items-center justify-center">
                    <Badge className={`inline-flex items-center gap-1 bg-transparent text-black px-2 py-1 rounded-xl hover:bg-transparent cursor-pointer ${icon ? "border-inputFooterColor" : null}`}>
                        {Heading}
                        {icon ? null : <ExternalLink size={16} className='ml-[6px]' />}
                    </Badge>
                </div>
                <p className="text-sm text-inputFooterColor text-center mt-2 font-normal">{subheading}</p>
            </div>
        </div>
    );
}

export default CustomCardWithBadge;