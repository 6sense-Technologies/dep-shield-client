import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React from 'react'
import Github from "../../../../../public/logo/github.svg";
import GitLab from "../../../../../public/logo/gitlab.svg";
import Bitbucket from "../../../../../public/logo/bit-bucket.svg";

const EmptyAddRepoView = () => {
    return (
        <div className="flex-grow flex flex-col items-center md:justify-center pt-20 md:pt-0 px-3 lg:px-6">
            <div className="flex flex-col items-center justify-center h-96 w-full max-w-[512px] p-12 border rounded-lg gap-y-6">
                <div className='flex justify-center items-center flex-col'>
                    <p className='text-[16px] font-medium text-deepBlackColor'>Select Platform</p>
                    <p className="text-sm font-normal text-inputFooterColor pt-1 text-center">
                        Choose the platform from which you want to add repositories.
                    </p>
                </div>
                <div className="border p-4 flex justify-center items-center w-full rounded-md h-14">
                    <Image src={Github} alt="githubLogo" width={100} height={100} />
                </div>
                <div className="border p-4 flex justify-center items-center w-full rounded-md h-14">
                    <Image src={GitLab} alt="gitLabLogo" width={100} height={100} />
                </div>
                <div className="border p-4 flex justify-center items-center w-full rounded-md h-14">
                    <Image src={Bitbucket} alt="bitBucketLogo" width={100} height={100} />

                </div>
            </div>
        </div>
    );
}

export default EmptyAddRepoView
