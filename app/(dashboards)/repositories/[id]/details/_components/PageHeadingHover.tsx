import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Trash2 } from 'lucide-react';
import React, { FC } from 'react';
import { VulnabalitiesDropdown } from './VulnabalitiesDropdown';
import CustomAlertDialog from '../../../_components/CustomAlartDialog';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/components/ui/tooltip';
import SharedMenu from './SharedMenu';
import { IHeadingProps } from '@/types/repo.types';



const PageHeadingHover: FC<IHeadingProps> = ({ title, subTitle, titleclassName, subTitleClassName, className, hoverTitle }) => {
    return (
        <TooltipProvider>
            <div className='flex items-center gap-x-2'>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <div className={cn(className)}>
                            <h3 className={cn('text-2xl md:text-2xl font-semibold cursor-pointer', titleclassName)}>{title}</h3>
                        </div>
                    </TooltipTrigger>
                    <TooltipContent className='text-white'>
                        {hoverTitle}
                    </TooltipContent>
                </Tooltip>
                {subTitle ? <p className={cn('text-md md:text-sm text-subHeading pt-2', subTitleClassName)}>{subTitle}</p> : null}
                <div className='block md:hidden'>
                    <VulnabalitiesDropdown
                        placeholder="main"
                        name="vul"
                        active={false}
                        className="mt-4 w-[140px] !placeholder:text-black"
                    />
                </div>
                <div className='block md:hidden mt-4'>
                    <SharedMenu />
                </div>
                <CustomAlertDialog trigger={<Button variant="lightDestructive" size="tight" className='mt-4 block md:hidden'><Trash2 size={12} className='text-destructive mx-auto' /></Button>} />
            </div>
        </TooltipProvider>
    );
};

export default PageHeadingHover;