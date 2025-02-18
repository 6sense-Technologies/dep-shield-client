'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import AvatarMenu from '@/components/AvatarMenu';
import GlobalBreadCrumb from '@/components/globalBreadCrumb';
import PageHeading from '@/components/pageHeading';
import PageTitle from '@/components/PageTitle';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { FolderOpen, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import RepositorySearchbar from './_components/repositorySearchbar';

const Repositories = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [activeTab, setActiveTab] = useState<string>(
    searchParams.get("tab") || "all"
  );

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    const newUrl = `${window.location.pathname}?tab=${tab}`;
    router.push(newUrl);
  };

  return (
    <div>
      <PageTitle
        title="Repositories • DepShield.io"
      />
      <div className="flex justify-between items-center md:hidden px-4 py-2">
        <span className="md:hidden"><SidebarTrigger /></span>
        <AvatarMenu />
      </div>
      <div className="flex justify-between items-center px-3 lg:px-6 pt-4">
        <GlobalBreadCrumb
          initialData="Repositories"
          initalLink="/repositories"
        />
        <span className="hidden md:flex pr-2">
          <AvatarMenu />
        </span>
      </div>
      <div className="px-3 lg:px-6">
        <PageHeading title="All Repositories" className="pl-2 pt-3" />
        <div className="tab">
          <div className="flex space-x-4 border-b">
            <button
              className={`py-2 px-4 ${activeTab === 'all' ? 'border-b-2 border-black font-semibold text-black' : 'text-lightAquaTextColor font-semibold'}`}
              onClick={() => handleTabChange('all')}
            >
              All
            </button>
            <button
              className={`py-2 px-4 ${activeTab === 'myrepositories' ? 'border-b-2 border-black font-semibold text-black' : 'text-lightAquaTextColor font-semibold'}`}
              onClick={() => handleTabChange('myrepositories')}
            >
              My Repositories
            </button>
            <button
              className={`py-2 px-4 ${activeTab === 'sharedwithme' ? 'border-b-2 border-black font-semibold text-black' : 'text-lightAquaTextColor font-semibold'}`}
              onClick={() => handleTabChange('sharedwithme')}
            >
              Shared with Me
            </button>
          </div>
        </div>
        <div className="">
          {activeTab === 'all' && (
            <>
              <div className='flex flex-col lg:flex-row justify-between w-full'>
                <RepositorySearchbar
                  placeholder="Search by repository name"
                  name="search"
                  btntext="Search"
                  className="mt-4 mb-[26px] gap-x-2 w-full md:max-w-[300px] relative"
                  variant="light"
                />
                <Button size="xsExtended" className='lg:mt-4'>Add <span className='text-white'></span></Button>
              </div>
              <div className='flex flex-col items-center justify-center h-96 '>
                <span><FolderOpen size={32} strokeWidth={1} /></span>
                <p className="text-xl font-medium text-deepBlackColor">No Repositories Added</p>
                <p className='text-sm font-normal text-inputFooterColor pt-1 pb-7'>Get started by adding a new repository.</p>
                <Button className='w-20'>Add <span className='text-white'><Plus size={16} /></span></Button>
              </div>
            </>
          )}
          {activeTab === 'myrepositories' && (
            <>
              <p className="text-xl">My Repositories Content</p>
            </>
          )}
          {activeTab === 'sharedwithme' && (
            <>
              <p className="text-xl">Shared with Me Content</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Repositories;