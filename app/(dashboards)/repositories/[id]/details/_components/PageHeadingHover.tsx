import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Trash2, Users, X } from 'lucide-react';
import React, { FC, useState, useRef, useEffect } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { VulnabalitiesDropdown } from './VulnabalitiesDropdown';
import CustomAlertDialog from '../../../_components/CustomAlartDialog';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/components/ui/tooltip';

interface IHeadingProps {
    title: string;
    subTitle?: string;
    titleclassName?: string;
    subTitleClassName?: string;
    className?: string;
    hoverTitle?: string;
}

const PageHeadingHover: FC<IHeadingProps> = ({ title, subTitle, titleclassName, subTitleClassName, className, hoverTitle }) => {
    const [menuVisible, setMenuVisible] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            setMenuVisible(false);
        }
    };

    useEffect(() => {
        if (menuVisible) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuVisible]);

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
                <div className='block md:hidden mt-4 relative'>
                    <Button size="tight" variant="light" onClick={() => setMenuVisible(!menuVisible)}><Users size={16} /></Button>

                    {menuVisible && (
                        <div ref={menuRef} className="absolute -top-2 left-8 mt-2 w-64 bg-white shadow-lg rounded-lg p-2 z-50">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-twelve font-normal text-inputFooterColor">Shared with</span>
                                <Button size="tight" variant="none" onClick={() => setMenuVisible(false)}><X size={16} /></Button>
                            </div>
                            <div className="flex items-center mb-2">
                                <Avatar className="w-8 h-8 rounded-full mr-2">
                                    <AvatarImage src="https://randomuser.me/api/portraits/men/1.jpg" alt="User 1" />
                                    <AvatarFallback>U1</AvatarFallback>
                                </Avatar>
                                <span className='text-sm font-semibold text-miniSubheadingColor'>User 1</span>
                            </div>
                            <div className="flex items-center mb-2">
                                <Avatar className="w-8 h-8 rounded-full mr-2">
                                    <AvatarImage src="https://randomuser.me/api/portraits/women/4.jpg" alt="User 2" />
                                    <AvatarFallback>U2</AvatarFallback>
                                </Avatar>
                                <span className='text-sm font-semibold text-miniSubheadingColor'>User 2</span>
                            </div>
                            <div className="flex items-center mb-2">
                                <Avatar className="w-8 h-8 rounded-full mr-2">
                                    <AvatarImage src="https://randomuser.me/api/portraits/men/5.jpg" alt="User 3" />
                                    <AvatarFallback>U3</AvatarFallback>
                                </Avatar>
                                <span className='text-sm font-semibold text-miniSubheadingColor'>User 3</span>
                            </div>
                            <hr className="my-[6px]" />
                            <div className="text-center text-twelve text-lightAquaTextColor cursor-not-allowed font-normal">+3 more</div>
                        </div>
                    )}
                </div>
                <CustomAlertDialog trigger={<Button variant="lightDestructive" size="tight" className='mt-4 block md:hidden'><Trash2 size={12} className='text-destructive mx-auto' /></Button>} />
            </div>
        </TooltipProvider>
    );
};

export default PageHeadingHover;