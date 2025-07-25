'use client'

import { Button } from '@/components/ui/button';
import { Input, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { ScanText, Share } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import RepositorySearchbar from './repositorySearchbar';
import { emailValidator } from '@/helpers/helpers';
import { useMutation } from '@tanstack/react-query';
import { shareRepo } from '@/app/(dashboards)/repositories/queryFn/queryFn';

const MyRepoSearchArea = ({ session }: { session: any }) => {
  

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
