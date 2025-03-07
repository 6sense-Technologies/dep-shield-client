import React from "react";
import { ExternalLink, House } from "lucide-react";
import Image from "next/image";
import miniGit from "../../../../../public/logo/miniGithub.svg";
import miniNPM from "../../../../../public/logo/mininpm.svg";
import { Badge } from "@/components/ui/badge";

interface LinkSectionProps {
    version: string;
}

const LinkSection: React.FC<LinkSectionProps> = ({ version }) => {
    return (
        <>
            <p className="text-sm font-normal text-deepBlackColor mt-2 mr-5">Current Version</p>
            <div className="flex items-center gap-3 mt-1">
                <div className="mr-4">
                    <Badge className="inline-flex items-center gap-1 bg-white text-black hover:bg-white text-nowrap font-normal">
                        <div className="flex items-center gap-[6px]">
                            <span className="text-twelve font-normal text-deepBlackColor">{version}</span> <ExternalLink size={14} className="mb-[2px]" />
                        </div>
                    </Badge>
                </div>

                <div className="mt-1 flex items-center gap-3">
                    <span className="flex text-twelve font-normal text-deepBlackColor gap-x-[6px]"><House size={14} />
                        Homepage
                    </span>

                    <span className="flex text-twelve font-normal text-deepBlackColor gap-x-[6px]"><Image src={miniGit} alt="miniGitLogo" width={14} />
                        GitHub
                    </span>

                    <span className="flex text-twelve font-normal text-deepBlackColor gap-x-[6px]"><Image src={miniNPM} alt="mini-NPM-Logo" width={14} />
                        NPM
                    </span>
                </div>
            </div>
        </>
    );
};

export default LinkSection;