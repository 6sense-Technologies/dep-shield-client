import React from 'react';
import AvatarMenu from '@/components/AvatarMenu';
import PageTitle from '@/components/PageTitle';
import { SidebarTrigger } from '@/components/ui/sidebar';

interface PageHeaderProps {
    title: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title }) => {
    return (
        <>
            <PageTitle title={title} />
            <div className="flex justify-between items-center md:hidden px-4 pt-8 pb-4">
                <span className="md:hidden"><SidebarTrigger /></span>
                <AvatarMenu />
            </div>
        </>
    );
};

export default PageHeader;