import { VulnerabilityDetailsType } from '@/app/(dashboards)/vulnerabilities/types/types';
import { ExternalLink } from 'lucide-react';
import React, { FC } from 'react';

interface CustomSummaryProps {
    nvdRef: any;
    githubRef: any;
    showMoreNVD: boolean;
    showMoreGitHub: boolean;
    isNVDOverflowing: boolean;
    isGitHubOverflowing: boolean;
    setShowMoreNVD: any;
    setShowMoreGitHub: any;
    vulnerabilityDetails: VulnerabilityDetailsType | undefined;
}

const CustomSummary: FC<CustomSummaryProps> = ({
    nvdRef,
    githubRef,
    showMoreNVD,
    showMoreGitHub,
    isNVDOverflowing,
    isGitHubOverflowing,
    setShowMoreNVD,
    setShowMoreGitHub,
    vulnerabilityDetails
}) => {
    return (
        <div className="pt-6 px-4 md:pt-6 md:px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="w-full max-w-[560px]">
                <p className="text-deepBlackColor text-[16px] font-medium flex items-center gap-x-2 border-b pb-4">
                    NVD <span><ExternalLink size={20} className='cursor-pointer' strokeWidth={1} /></span>
                </p>
                <p
                    ref={nvdRef}
                    className={`pt-4 text-sm font-medium text-deepBlackColor ${showMoreNVD ? '' : 'line-clamp-5'}`}
                >
                    {vulnerabilityDetails?.nvdDescription}
                </p>
                {isNVDOverflowing && (
                    <button className="text-miniSubheadingColor text-sm mt-2" onClick={() => setShowMoreNVD(!showMoreNVD)}>
                        {showMoreNVD ? 'Show less' : 'Read more'}
                    </button>
                )}
            </div>

            <div className="w-full max-w-[560px]">
                <p className="text-deepBlackColor text-[16px] font-medium flex items-center gap-x-2 border-b pb-4">
                    GitHub <span><ExternalLink size={20} className='cursor-pointer' strokeWidth={1} /></span>
                </p>
                <p
                    ref={githubRef}
                    className={`pt-4 text-sm font-medium text-deepBlackColor ${showMoreGitHub ? '' : 'line-clamp-5'}`}
                >
                    -
                </p>
                {isGitHubOverflowing && (
                    <button className="text-miniSubheadingColor text-sm mt-2" onClick={() => setShowMoreGitHub(!showMoreGitHub)}>
                        {showMoreGitHub ? 'Show less' : 'Read more'}
                    </button>
                )}
            </div>
        </div>
    );
}

export default CustomSummary;