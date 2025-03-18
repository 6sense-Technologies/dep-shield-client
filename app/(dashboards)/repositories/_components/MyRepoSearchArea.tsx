import React from 'react';
import RepositorySearchbar from './repositorySearchbar';
import { Button } from '@/components/ui/button';
import { ScanText, Share } from 'lucide-react';
import Link from 'next/link';

const MyRepoSearchArea = () => {
  return (
    <div className='flex w-full flex-col justify-between lg:flex-row'>
      <RepositorySearchbar
        placeholder='Search by repository name'
        name='MyReposearch'
        btntext='MyRepoSearch'
        className='relative mb-[26px] mt-4 w-full gap-x-2 lg:max-w-[300px]'
        variant='light'
      />
      <div className='flex flex-col space-y-4 lg:flex-row lg:space-x-4'>
        <div className='flex space-x-4'>
          <Button size='xsTight' variant='light' className='lg:mt-4'>
            <Share />{' '}
            <span className='text-sm font-medium text-deepBlackColor lg:hidden'>
              Share
            </span>
          </Button>
          <Button size='xsExtended' variant='light' className='lg:mt-4'>
            <ScanText className='lg:hidden' />
            Scan all
          </Button>
        </div>
        <Link href='/repositories/add'>
          <Button size='xsExtended' className='mr-4'>
            Add
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default MyRepoSearchArea;
