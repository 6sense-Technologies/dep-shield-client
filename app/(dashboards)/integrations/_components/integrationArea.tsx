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
import { IntegrationAreaProps } from '@/types/integration.types';



const IntegrationArea: FC<IntegrationAreaProps> = ({ handleConnect, gitStatus, refetchGitStatus }) => {
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
        <div className="flex-grow flex flex-col items-center md:justify-center pt-10 md:pt-0 px-3 lg:px-6">
            <div className="flex flex-col items-center justify-center h-96 w-full max-w-[512px] p-6 md:p-12 border rounded-lg gap-y-6">
                <p className="text-sm font-normal text-inputFooterColor">
                    Connect an integration to effortlessly scan your repositories for vulnerabilities, license compliance, and community health.
                </p>
                <div className="border p-4 flex justify-between items-center w-full rounded-md h-14 cursor-pointer hover:bg-[#E6E6E6]" onClick={() => gitStatus ? handleDisconnectRoute() : handleConnect("github")}>
                    <Image src={Github} alt="githubLogo" width={100} height={100} />
                    <div className="w-full text-right">
                        {gitStatus ? (
                            <div className='flex items-center justify-end gap-2'>
                                <div className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md bg-lightAquaBg p-2 cursor-pointer">
                                    <span onClick={(e) => handleConnect("github", e)}><RefreshCw size={16} /></span>
                                </div>
                                <Button variant="none" size="minixs">
                                    <span className="hidden md:inline">Disconnect</span>
                                    <Link2Off size={16} />
                                </Button>
                            </div>
                        ) : (
                            <Button variant="none" size="minixs">
                                <span className="inline">Connect</span>
                                <Link2 size={16} />
                            </Button>
                        )}
                    </div>
                </div>
                <div className="border p-4 flex justify-between items-center w-full rounded-md h-14 cursor-not-allowed opacity-50">
                    <Image src={GitLab} alt="gitLabLogo" width={100} height={100} />
                    <div className="w-full text-right">
                        <Button variant="none" size="minixs" disabled>
                            <span className="inline">Connect</span>
                            <Link2 size={16} />
                        </Button>
                    </div>
                </div>
                <div className="border p-4 flex justify-between items-center w-full rounded-md h-14 cursor-not-allowed opacity-50">
                    <Image src={Bitbucket} alt="bitBucketLogo" width={100} height={100} />
                    <div className="w-full text-right">
                        <Button variant="none" size="minixs" disabled>
                            <span className="inline">Connect</span>
                            <Link2 size={16} />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IntegrationArea;