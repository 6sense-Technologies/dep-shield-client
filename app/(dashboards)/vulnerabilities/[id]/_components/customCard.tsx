import React, { FC } from 'react'

interface CustomCardProps {
    bgColor: string;
    Heading: string;
    subheading: string;
}
const CustomCard :FC<CustomCardProps> = ({bgColor, subheading,Heading}) => {
    return (
        <div className={`w-full max-w-200px h-[100px] ${bgColor} flex justify-between items-center rounded-md`}>
            <div className='flex flex-col items-center justify-center w-full'>
                <p className="text-lg text-deepBlackColor font-semibold">{Heading}</p>
                <p className="text-sm text-inputFooterColor text-center font-normal mt-2">{subheading}</p>
            </div>
        </div>
    )
}

export default CustomCard
