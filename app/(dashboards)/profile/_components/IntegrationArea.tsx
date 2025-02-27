import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React, { FC } from 'react';
import Github from "../../../../public/logo/github.svg";
import GitLab from "../../../../public/logo/gitlab.svg";
import Bitbucket from "../../../../public/logo/bit-bucket.svg";
import { Link2 } from 'lucide-react';

type IntegrationAreaProps = {
    connections: {
        github: boolean;
        gitlab: boolean;
        bitbucket: boolean;
    };
    handleConnect: (integration: string) => void;
    githubEmail: string;
    gitlabEmail: string;
    bitbucketEmail: string;
};

const IntegrationArea: FC<IntegrationAreaProps> = ({ connections, handleConnect, githubEmail, gitlabEmail, bitbucketEmail }) => {
    return (
        <div className="px-3 lg:px-20 xl:px-72 pt-8">
            <div>
                <p className="text-[16px] font-medium pb-4 border-b">Integrations</p>
                <div className="flex flex-col gap-4 pt-4">
                    <div className="p-4 flex justify-between items-center w-full rounded-md h-14">
                        <Image src={Github} alt="githubLogo" width={100} height={100} />
                        <div className="w-full text-right">
                            {connections.github ? (
                                <span className="text-sm font-medium text-inputFooterColor">{githubEmail}</span>
                            ) : (
                                <Button variant="none" onClick={() => handleConnect("github")}>
                                    <span className="inline">Connect</span>
                                    <Link2 size={16} />
                                </Button>
                            )}
                        </div>
                    </div>
                    <div className="p-4 flex justify-between items-center w-full rounded-md h-14">
                        <Image src={GitLab} alt="gitLabLogo" width={100} height={100} />
                        <div className="w-full text-right">
                            {connections.gitlab ? (
                                <span className="text-sm font-medium text-inputFooterColor">{gitlabEmail}</span>
                            ) : (
                                <Button variant="none" onClick={() => handleConnect("gitlab")}>
                                    <span className="inline">Connect</span>
                                    <Link2 size={16} />
                                </Button>
                            )}
                        </div>
                    </div>
                    <div className="p-4 flex justify-between items-center w-full rounded-md h-14">
                        <Image src={Bitbucket} alt="bitBucketLogo" width={100} height={100} />
                        <div className="w-full text-right">
                            {connections.bitbucket ? (
                                <span className="text-sm font-medium text-inputFooterColor">{bitbucketEmail}</span>
                            ) : (
                                <Button variant="none" onClick={() => handleConnect("bitbucket")}>
                                    <span className="inline">Connect</span>
                                    <Link2 size={16} />
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IntegrationArea;