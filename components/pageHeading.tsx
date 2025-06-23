import React, { FC } from 'react';
import { cn } from '@/lib/utils';

interface IHeadingProps {
  title: string;
  subTitle?: string;
  titleclassName?: string;
  subTitleClassName?: string;
  className?: string;
}

const PageHeading: FC<IHeadingProps> = ({ title, subTitle, titleclassName, subTitleClassName, className }) => {
  return (
    <div className={cn(className)}>
      <h3 className={cn('text-2xl md:text-2xl font-semibold', titleclassName)}>{title}</h3>
    {subTitle ? <p className={cn('text-md md:text-sm text-subHeading pt-2', subTitleClassName)}>{subTitle}</p> : null}  
    </div>
  );
};

export default PageHeading;