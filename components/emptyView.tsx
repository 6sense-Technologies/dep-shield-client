import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FolderPlus } from 'lucide-react';
import FolderOpen from "../../public/logo/folderopen.png";
import { Button } from './ui/button';

const EmptyView = () => {
  return (
    <div className="flex flex-col items-center justify-center pt-[60px] lg:pt-[200px]">
      <div className='flex flex-col items-center justify-center text-center pt-1'>
        <span>
          <Image src={FolderOpen} alt="folderopen-Icon" />
        </span>
        <p className="text-deepBlackColor mt-1 text-[16px] font-medium">No Projects Added</p>
        <p className="text-sm text-inputFooterColor pt-1">Get started by creating a new project.</p>
      </div>
      <div className="w-auto pt-6">
        <Link href={`/projects/create`}>
          <Button variant="defaultEx">
            <span className="text-nowrap flex items-center gap-x-[6px]">
              <FolderPlus size={16} className="mr-1" />
              Create Project
            </span>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default EmptyView;