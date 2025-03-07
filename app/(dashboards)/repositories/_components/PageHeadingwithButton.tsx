import { cn } from '@/lib/utils';
import React, { FC } from 'react';
import { IHeadingProps } from '@/types/repo.types';
import SharedMenu from '../[id]/details/_components/SharedMenu';


const PageHeadingwithButton: FC<IHeadingProps> = ({ title, subTitle, titleclassName, subTitleClassName, className, showButton = true }) => {
    return (
        <div className='flex items-center gap-x-2'>
            <div className={cn(className)}>
                <h3 className={cn('text-2xl md:text-2xl font-semibold', titleclassName)}>{title}</h3>
                {subTitle ? <p className={cn('text-md md:text-sm text-subHeading pt-2', subTitleClassName)}>{subTitle}</p> : null}
            </div>
            {showButton && (
                <div className='mt-3 relative'>
                    <SharedMenu />
                </div>
            )}
        </div>
    );
};

export default PageHeadingwithButton;