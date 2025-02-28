import { Button } from '@/components/ui/button';
import { Link2, Link2Off, RefreshCw } from 'lucide-react';
import Image from 'next/image';
import React, { FC } from 'react';
import Github from "../../../../public/logo/github.svg";
import GitLab from "../../../../public/logo/gitlab.svg";
import Bitbucket from "../../../../public/logo/bit-bucket.svg";
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { TEMP_BACKEND_URL } from '@/config';

type IntegrationAreaProps = {
    connections: {
        github: boolean;
        gitlab: boolean;
        bitbucket: boolean;
    };
    handleConnect: (integration: string) => void;
    handleDisconnect: (integration: string) => void;
    gitStatus: boolean;
    refetchGitStatus: () => void;
};

const IntegrationArea: FC<IntegrationAreaProps> = ({ connections, handleConnect, handleDisconnect, gitStatus,refetchGitStatus }) => {
    const session = useSession();

    let accessToken = null;

    if (session?.status === 'authenticated') {
        accessToken = session?.data?.accessToken;
    }

    const handleDisconnectRoute = async () => {

        const res = await axios.get(`${TEMP_BACKEND_URL}/github-app/disconnect`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }
        )

        console.log("Response is", res.data)
        refetchGitStatus()
        return res.data
    }

    console.log("Git Status in Integration Component page", gitStatus);

    return (
        <div className="flex-grow flex flex-col items-center md:justify-center pt-20 md:pt-0 px-3 lg:px-6">
            <div className="flex flex-col items-center justify-center h-96 w-full max-w-[512px] p-12 border rounded-lg gap-y-6">
                <p className="text-sm font-normal text-inputFooterColor">
                    Connect an integration to effortlessly scan your repositories for vulnerabilities, license compliance, and community health.
                </p>
                <div className="border p-4 flex justify-between items-center w-full rounded-md h-14">
                    <Image src={Github} alt="githubLogo" width={100} height={100} />
                    <div className="w-full text-right">
                        {gitStatus ? (
                            <Button variant="none" size="minixs" onClick={() => handleDisconnectRoute()}>
                                <div className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md bg-lightAquaBg p-2">
                                    <span onClick={() => handleConnect("github")}><RefreshCw size={16} /></span>
                                </div>
                                <span className="hidden md:inline md:ml-3">Disconnect</span>
                                <Link2Off size={16} />
                            </Button>
                        ) : (
                            <Button variant="none" size="minixs" onClick={() => handleConnect("github")}>
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
                            <Button variant="none" size="minixs" onClick={() => handleDisconnect("gitlab")}>
                                <div className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md bg-lightAquaBg p-2">
                                    <RefreshCw size={16} />
                                </div>
                                <span className="hidden md:inline">Disconnect</span>
                                <Link2Off size={16} className="ml-2" />
                            </Button>
                        ) : (
                            <Button variant="none" size="minixs" onClick={() => handleConnect("gitlab")}>
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
                            <Button variant="none" size="minixs" onClick={() => handleDisconnect("bitbucket")}>
                                <div className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md bg-lightAquaBg p-2">
                                    <RefreshCw size={16} />
                                </div>
                                <span className="hidden md:inline">Disconnect</span>
                                <Link2Off size={16} className="ml-2" />
                            </Button>
                        ) : (
                            <Button variant="none" size="minixs" onClick={() => handleConnect("bitbucket")}>
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