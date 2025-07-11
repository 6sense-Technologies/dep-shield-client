import Image from 'next/image';
import React, { FC } from 'react';
import Github from "../../../../public/logo/github.svg";
import GitLab from "../../../../public/logo/gitlab.svg";
import Bitbucket from "../../../../public/logo/bit-bucket.svg";
import { IntegrationAreaProps } from '@/types/profile.types';


const IntegrationArea: FC<IntegrationAreaProps> = ({ email1, email2, email3 }) => {
    return (
        <div className="px-3 lg:px-20 xl:px-72 pt-8">
            <div>
                <p className="text-[16px] font-medium pb-4 border-b">Integrations</p>
                <div className="flex flex-col gap-4 pt-4">
                    <div className="p-4 flex justify-between items-center w-full rounded-md h-14">
                        <Image src={Github} alt="githubLogo" width={100} height={100} />
                        <div className="w-full text-right">
                            {email1 ? (
                                <span className="text-sm font-medium text-inputFooterColor">{email1}</span>
                            ) : (
                                <span className="text-sm font-medium text-inputFooterColor">None</span>
                            )}
                        </div>
                    </div>
                    <div className="p-4 flex justify-between items-center w-full rounded-md h-14">
                        <Image src={GitLab} alt="gitLabLogo" width={100} height={100} />
                        <div className="w-full text-right">
                            {email2 ? (
                                <span className="text-sm font-medium text-inputFooterColor">{email2}</span>
                            ) : (
                                <span className="text-sm font-medium text-inputFooterColor">None</span>
                            )}
                        </div>
                    </div>
                    <div className="p-4 flex justify-between items-center w-full rounded-md h-14">
                        <Image src={Bitbucket} alt="bitBucketLogo" width={100} height={100} />
                        <div className="w-full text-right">
                            {email3 ? (
                                <span className="text-sm font-medium text-inputFooterColor">{email3}</span>
                            ) : (
                                <span className="text-sm font-medium text-inputFooterColor">Not connected</span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IntegrationArea;