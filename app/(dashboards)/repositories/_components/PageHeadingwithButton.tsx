import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Users, X } from 'lucide-react';
import React, { FC, useState, useRef, useEffect } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { IHeadingProps } from '@/types/repo.types';



const PageHeadingwithButton: FC<IHeadingProps> = ({ title, subTitle, titleclassName, subTitleClassName, className, showButton = true }) => {
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
        <div className='flex items-center gap-x-2'>
            <div className={cn(className)}>
                <h3 className={cn('text-2xl md:text-2xl font-semibold', titleclassName)}>{title}</h3>
                {subTitle ? <p className={cn('text-md md:text-sm text-subHeading pt-2', subTitleClassName)}>{subTitle}</p> : null}
            </div>
            {showButton && (
                <div className='mt-3 relative'>
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
            )}
        </div>
    );
};

export default PageHeadingwithButton;