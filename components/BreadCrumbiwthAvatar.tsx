import React from 'react';
import AvatarMenu from '@/components/AvatarMenu';
import GlobalBreadCrumb from '@/components/globalBreadCrumb';

interface BreadcrumbWithAvatarProps {
    initialData: string;
    initialLink: string;
    secondaryData?: string;
    secondaryLink?: string;
}

const BreadcrumbWithAvatar: React.FC<BreadcrumbWithAvatarProps> = ({
    initialData,
    initialLink,
    secondaryData,
    secondaryLink,
}) => {
    return (
        <div className="flex justify-between items-center px-3 lg:px-6 pt-4">
            <GlobalBreadCrumb
                initialData={initialData}
                initalLink={initialLink}
                secondayData={secondaryData}
                secondayLink={secondaryLink}
            />
            <span className="hidden md:flex pr-2">
                <AvatarMenu />
            </span>
        </div>
    );
};

export default BreadcrumbWithAvatar;