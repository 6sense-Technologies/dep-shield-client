import RepoSharedUsers from '@/app/(dashboards)/repositories/_components/RepoSharedUsers';
import { cn } from '@/lib/utils';
import { IHeadingProps } from '@/types/repo.types';
import { FC } from 'react';


const PageHeadingwithButton: FC<IHeadingProps> = ({ title, subTitle, titleclassName, subTitleClassName, className, showButton = true, session }) => {


    return (
        <div className='flex items-center gap-x-2'>
            <div className={cn(className)}>
                <h3 className={cn('text-2xl md:text-2xl font-semibold', titleclassName)}>{title}</h3>
                {subTitle ? <p className={cn('text-md md:text-sm text-subHeading pt-2', subTitleClassName)}>{subTitle}</p> : null}
            </div>
            {showButton && (
                <div className='mt-3 relative'>
                    <RepoSharedUsers session={session} />
                </div>
            )}
        </div>
    );
};

export default PageHeadingwithButton;