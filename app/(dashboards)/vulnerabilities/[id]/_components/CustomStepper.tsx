"use client";

import { VulnerabilityDetailsType } from "@/app/(dashboards)/vulnerabilities/types/types";
import { cn } from "@/lib/utils";
import { ShieldAlert, ShieldCheck } from "lucide-react";
import * as React from "react";
import semver from 'semver';



// Sample version data - this can be modified as needed

export default function CustomStepper({ history }: { history: VulnerabilityDetailsType['vulnerabilityHistory'] | undefined }) {
    console.log('🚀 - CustomStepper - history:', history)
    // const versions: Version[] = [
    //     { number: "v2.3.2", status: "success" },
    //     { number: "v2.4.0", status: "error" },
    //     { number: "v2.12.3", status: "success" },
    //     { number: "v2.13.0", status: "error" },
    //     { number: "v2.132.0", status: "error" },
    // ];
    const sorted = history?.length ? [...history].sort((a, b) => semver.compare(a.version, b.version)) : []
    console.log('🚀 - CustomStepper - sorted:', sorted)

    const versions = sorted?.length ? sorted?.map(item => {
        return ({ number: item?.version, status: item?.status })
    }) : []
    console.log(' CustomStepper - versions:', versions)
    return (
        <div className="w-full">
            <div className="flex items-center overflow-x-auto pb-3">
                {/* Initial red line with triangle */}
                <div className="relative flex items-center mt-14 mx-3">
                    <div className="h-[2px] w-full min-w-16 bg-red-500" />
                    <div className="absolute right-16 -mr-2 w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-l-[8px] border-l-red-500" />
                </div>

                {
                    versions?.length ? versions?.map((version, index) => (
                        <React.Fragment key={version?.number}>
                            <div className="flex flex-col items-center">
                                <div
                                    className={cn(
                                        "h-12 w-12 rounded-full flex items-center justify-center transition-all duration-300 ease-in-out animate-in fade-in zoom-in",
                                        version.status === "fixed" ? "bg-[#DCFCE7]" : "bg-[#FEF2F2]"
                                    )}
                                >
                                    {version.status === "fixed" ? (
                                        <ShieldCheck className="h-6 w-6 text-[#15803D]" />
                                    ) : (
                                        <ShieldAlert className="h-6 w-6 text-red-600" />
                                    )}
                                </div>
                                <span className="text-sm font-medium text-gray-600 mt-2">{version.number}</span>
                            </div>
                            {/* Lines between steppers */}
                            {index < versions.length - 1 && (
                                <div
                                    className={cn(
                                        "h-[2px] w-full min-w-16 mt-14 mx-3",
                                        version.status === "fixed" ? "bg-[#15803D]" : "bg-red-500"
                                    )}
                                />
                            )}
                        </React.Fragment>
                    )) : null
                }
                <div
                    className={cn(
                        "h-[2px] w-full min-w-16 border-t-2 border-dashed mx-3 mt-14",
                        versions[versions?.length - 1].status === "fixed" ? "border-[#DCFCE7]" : "border-red-500"
                    )}
                >
                </div>
            </div>
        </div>
    );
}