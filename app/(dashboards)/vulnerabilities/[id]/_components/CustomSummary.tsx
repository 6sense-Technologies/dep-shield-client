import { ExternalLink } from 'lucide-react';
import React, { FC } from 'react'

interface CustomSummaryProps {
 
    nvdRef: any;
    githubRef: any;
    showMoreNVD: boolean;
    showMoreGitHub: boolean;
    isNVDOverflowing: boolean;
    isGitHubOverflowing: boolean;
    setShowMoreNVD: any;
    setShowMoreGitHub: any;
}

const CustomSummary :FC<CustomSummaryProps> = ({
    nvdRef,
    githubRef,
    showMoreNVD,
    showMoreGitHub,
    isNVDOverflowing,
    isGitHubOverflowing,
    setShowMoreNVD,
    setShowMoreGitHub
}) => {
    return (
        <div className="pt-6 px-4 md:pt-6 md:px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="w-full max-w-[560px]">
                <p className="text-deepBlackColor text-[16px] font-medium flex items-center gap-x-2 border-b pb-4">NVD <span><ExternalLink size={20} /></span></p>
                <p ref={nvdRef} className={`pt-4 text-sm font-medium text-deepBlackColor ${showMoreNVD ? '' : 'h-[120px] overflow-hidden'}`}>
                    By design, the JDBCAppender in Log4j 1.2.x accepts an SQL statement as a configuration parameter where the values to be inserted are converters from PatternLayout. The message converter, %m, is likely to always be included. This allows attackers to manipulate the SQL by entering crafted strings into input fields or headers of an application that are logged allowing unintended SQL queries to be executed. Note this issue only affects Log4j 1.x when specifically configured to use the JDBCAppender, which is not the default. Beginning in version 2.0-beta8, the JDBCAppender was re-introduced with proper support for parameterized SQL queries and further customization over the columns written to in logs. Apache Log4j 1.2 reached end of life in August 2015. Users should upgrade to Log4j 2 as it addresses numerous other issues from the previous versions.
                </p>
                {isNVDOverflowing && (
                    <button className="text-miniSubheadingColor text-sm mt-2" onClick={() => setShowMoreNVD(!showMoreNVD)}>
                        {showMoreNVD ? 'Show less' : 'Read more'}
                    </button>
                )}
            </div>

            <div className="w-full max-w-[560px]">
                <p className="text-deepBlackColor text-[16px] font-medium flex items-center gap-x-2 border-b pb-4">GitHub <span><ExternalLink size={20} /></span></p>
                <p ref={githubRef} className={`pt-4 text-sm font-medium text-deepBlackColor ${showMoreGitHub ? '' : 'h-[120px] overflow-hidden'}`}>
                    Improper validation of certificate with host mismatch in Apache Log4j SMTP appender. This could allow an SMTPS connection to be intercepted by a man-in-the-middle attack which could leak any log messages sent through that appender. Fixed in Apache Log4j 2.12.3 and 2.13.1
                </p>
                {isGitHubOverflowing && (
                    <button className="text-miniSubheadingColor text-sm mt-2" onClick={() => setShowMoreGitHub(!showMoreGitHub)}>
                        {showMoreGitHub ? 'Show less' : 'Read more'}
                    </button>
                )}
            </div>
        </div>
    )
}

export default CustomSummary
