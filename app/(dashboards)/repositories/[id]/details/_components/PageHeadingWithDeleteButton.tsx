import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Trash2 } from 'lucide-react';
import React, { FC } from 'react';
import { VulnabalitiesDropdown } from './VulnabalitiesDropdown';
import CustomAlertDialog from '../../../_components/CustomAlartDialog';
import { IHeadingProps } from '@/types/repo.types';
import SharedMenu from './SharedMenu';



const PageHeadingWithDeleteButton: FC<IHeadingProps> = ({ title, subTitle, titleclassName, subTitleClassName, className }) => {
    return (
        <div className='flex items-center gap-x-2'>
            <div className={cn(className)}>
                <h3 className={cn('text-2xl md:text-2xl font-semibold', titleclassName)}>{title}</h3>
                {subTitle ? <p className={cn('text-md md:text-sm text-subHeading pt-2', subTitleClassName)}>{subTitle}</p> : null}
            </div>
            <div className='hidden md:block'>
                <VulnabalitiesDropdown
                    placeholder="main"
                    name="vul"
                    active={false}
                    className="mt-4 w-[140px] !placeholder:text-black"
                />
            </div>
            <div className='hidden md:block mt-4'>
                <SharedMenu />
            </div>
            <CustomAlertDialog trigger={<Button variant="lightDestructive" size="tight" className='mt-4 hidden md:block'><Trash2 size={12} className='text-destructive mx-auto' /></Button>} />
        </div>
    );
};

export default PageHeadingWithDeleteButton;