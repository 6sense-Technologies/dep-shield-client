"use client";
import React, { useState, useEffect, Suspense } from "react";
import PageHeader from "@/components/PageHeader";
import EmptyAddRepoView from "./_components/EmptyAddRepoView";
import { AddRepoTable } from "./_components/AddRepoTable";
import Image from "next/image";
import Github from "../../../../public/logo/grayGithub.svg";
import AddRepoSearchArea from "./_components/AddRepoSearchArea";
import Loader from "@/components/loader";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getGitRepositories } from "@/helpers/githubApp/githubApi";
import BreadcrumbWithAvatar from "@/components/BreadCrumbiwthAvatar";
import PageHeading from "@/components/pageHeading";

const AddRepositoryContent = () => {
    const [showTable, setShowTable] = useState(false);
    const searchParams = useSearchParams();
    const provider = searchParams.get("provider");
    const page = searchParams.get("page");

    const [pages, setPages] = useState<number>(1);
    const [limit] = useState<number>(10);
    const session = useSession();
    const router = useRouter();

    useEffect(() => {
        if (page) {
            setShowTable(true);
        }
    }, [provider, page]);

    useEffect(() => {
        const newPage = searchParams.get("page")
            ? Number(searchParams.get("page"))
            : 1;

        setPages(newPage);
    }, [searchParams]);

    const {
        data: addRepoData,
        isFetching: addRepoLoading,
    } = useQuery<any>({
        queryKey: ["addRepoData", session, pages, limit],
        queryFn: () => getGitRepositories(session, pages, limit),
    });
    
    const handlePlatformClick = (platform: string) => {
        if (platform === "GitHub") {
            router.push("/repositories/add?provider=github&page=1");
            setShowTable(true);
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <PageHeader title="Add • Repositories • DepShield.io" />
            <BreadcrumbWithAvatar initialData="Repositories" initialLink="/repositories" secondaryData="Add Repositories" secondaryLink="/repositories/add" />
            <div className="flex items-center pl-4 md:pl-7 pt-3">
                <PageHeading title="Add Repositories" className="mr-4" />
                {showTable && <Image src={Github} alt="GitHub Logo" width={20} height={20} />}
            </div>
            {showTable ? (
                <div className="pt-4 px-4 md:pt-4 md:px-6">
                    <AddRepoSearchArea 
                        session={session}
                    />
                    <AddRepoTable
                        repositories={addRepoData?.repositories}
                        totalCountAndLimit={{ totalCount: addRepoData?.totalCount, size: 10 }}
                        currentPage={pages}
                        loading={addRepoLoading}
                        session={session}
                    />
                </div>
            ) : (
                <EmptyAddRepoView onPlatformClick={handlePlatformClick} />
            )}
        </div>
    );
};

const AddRepository = () => {
    return (
        <Suspense fallback={<Loader />}>
            <AddRepositoryContent />
        </Suspense>
    );
};

export default AddRepository;