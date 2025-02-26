import { Button } from '@/components/ui/button';
import { Link2, Link2Off, RefreshCw } from 'lucide-react';
import Image from 'next/image';
import React, { FC } from 'react';
import Github from "../../../../public/logo/github.svg";
import GitLab from "../../../../public/logo/gitlab.svg";
import Bitbucket from "../../../../public/logo/bit-bucket.svg";

type IntegrationAreaProps = {
    connections: {
        github: boolean;
        gitlab: boolean;
        bitbucket: boolean;
    };
    handleConnect: (integration: string) => void;
    handleDisconnect: (integration: string) => void;
};

const IntegrationArea: FC<IntegrationAreaProps> = ({ connections, handleConnect, handleDisconnect }) => {
    return (
        <div className="flex-grow flex flex-col items-center md:justify-center pt-20 md:pt-0 px-3 lg:px-6">
            <div className="flex flex-col items-center justify-center h-96 w-full max-w-[512px] p-12 border rounded-lg gap-y-6">
                <p className="text-sm font-normal text-inputFooterColor">
                    Connect an integration to effortlessly scan your repositories for vulnerabilities, license compliance, and community health.
                </p>
                <div className="border p-4 flex justify-between items-center w-full rounded-md h-14">
                    <Image src={Github} alt="githubLogo" width={100} height={100} />
                    <div className="w-full text-right">
                        {connections.github ? (
                            <Button variant="none" onClick={() => handleDisconnect("github")}>
                                <div className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md bg-lightAquaBg p-2">
                                    <RefreshCw size={16}/>
                                </div>
                                <span className="hidden md:inline md:ml-3">Disconnect</span>
                                <Link2Off size={16}/>
                            </Button>
                        ) : (
                            <Button variant="none" onClick={() => handleConnect("github")}>
                                <span className="hidden md:inline">Connect</span>
                                <Link2 size={16} />
                            </Button>
                        )}
                    </div>
                </div>
                <div className="border p-4 flex justify-between items-center w-full rounded-md h-14">
                    <Image src={GitLab} alt="gitLabLogo" width={100} height={100} />
                    <div className="w-full text-right">
                        {connections.gitlab ? (
                            <Button variant="none" onClick={() => handleDisconnect("gitlab")}>
                                <div className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md bg-lightAquaBg p-2">
                                    <RefreshCw size={16}/>
                                </div>
                                <span className="hidden md:inline">Disconnect</span>
                                <Link2Off size={16} className="ml-2" />
                            </Button>
                        ) : (
                            <Button variant="none" onClick={() => handleConnect("gitlab")}>
                                <span className="hidden md:inline">Connect</span>
                                <Link2 size={16} />
                            </Button>
                        )}
                    </div>
                </div>
                <div className="border p-4 flex justify-between items-center w-full rounded-md h-14">
                    <Image src={Bitbucket} alt="bitBucketLogo" width={100} height={100} />
                    <div className="w-full text-right">
                        {connections.bitbucket ? (
                            <Button variant="none" onClick={() => handleDisconnect("bitbucket")}>
                                <div className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md bg-lightAquaBg p-2">
                                    <RefreshCw size={16}/>
                                </div>
                                <span className="hidden md:inline">Disconnect</span>
                                <Link2Off size={16} className="ml-2" />
                            </Button>
                        ) : (
                            <Button variant="none" onClick={() => handleConnect("bitbucket")}>
                                <span className="hidden md:inline">Connect</span>
                                <Link2 size={16} />
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IntegrationArea;