"use client";
import React, { Suspense } from "react";
import PageHeader from "@/components/PageHeader";
import PageHeading from "@/components/pageHeading";
import Loader from "@/components/loader";
import CustomCard from "../../vulnerabilities/[id]/_components/customCard";
import CustomCardWithBadge from "../../vulnerabilities/[id]/_components/customCardWithBadge";
import { SingleDepTable } from "./_components/SingleDepTable";
import DepSearchSection from "./_components/DepSearchSection";
import BreadcrumbWithAvatar from "@/components/BreadCrumbiwthAvatar";
import { DepData } from "@/constants/DummyDataFactory";
import LinkSection from "./_components/LinkSection";


const DependenciesDetailsContent = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <PageHeader title="@types/react (npm) Details • Dependencies • DepShield.io" />
            <BreadcrumbWithAvatar initialData="Dependencies" initialLink="/dependencies" secondaryData="Details" secondaryLink="/dependencies/12" />
            <div className="flex items-center pl-4 md:pl-8 pt-3">
                <PageHeading title="@types/react (npm)" className="mr-4" />
            </div>
            <div className="pt-4 px-4 md:pt-4 md:px-6 hidden lg:grid lg:grid-cols-4 xl:grid-cols-5 gap-4">
                <CustomCard bgColor="bg-[#F1F5F9]" Heading="January 23, 2025" subheading="Last Published" />
                <CustomCardWithBadge bgColor="bg-[#F1F5F9]" Heading="MIT" subheading="License" icon={true} />
                <CustomCard bgColor="bg-[#DCFCE7]" Heading="82" subheading="Popularity" />
                <CustomCard bgColor="bg-[#FDEBDD]" Heading="69" subheading="Contributors" />
                <CustomCard bgColor="bg-[#FDEBDD]" Heading="46" subheading="Security" />
            </div>
            <div className="pt-4 px-4 md:pt-4 md:px-6 grid grid-cols-1 lg:hidden gap-4">
                <div className="lg:hidden grid grid-cols-2 gap-4">
                    <CustomCard bgColor="bg-[#F1F5F9]" Heading="January 23, 2025" subheading="Last Published" />
                    <CustomCardWithBadge bgColor="bg-[#F1F5F9]" Heading="MIT" subheading="License" icon={true} />
                </div>
                <div className="lg:hidden grid grid-cols-3 gap-4">
                    <CustomCard bgColor="bg-[#DCFCE7]" Heading="82" subheading="Popularity" />
                    <CustomCard bgColor="bg-[#FDEBDD]" Heading="69" subheading="Contributors" />
                    <CustomCard bgColor="bg-[#FDEBDD]" Heading="46" subheading="Security" />
                </div>
            </div>

            <div className="pt-6 px-4 md:pt-6 md:px-6 hidden lg:flex">
                <LinkSection version="18.2.21" />
            </div>

            <div className="pt-6 px-4 md:pt-6 md:px-6 flex flex-col lg:hidden">
                <div className="flex flex-row gap-x-12 lg:hidden border-b pb-4 items-center justify-center">
                    <LinkSection version="18.2.21" />
                </div>
            </div>

            <div className="pt-6 px-4 md:pt-6 md:px-6">
                <div className="flex items-center gap-2 border-b pb-4">
                    <p className="font-medium text-[16px] text-deepBlackColor">Repositories</p>
                </div>
                <div>
                    <DepSearchSection />
                    <SingleDepTable
                        repos={DepData ?? []}
                        totalCountAndLimit={{ totalCount: DepData.length, size: 10 }}
                        currentPage={1}
                        loading={false}
                    />
                </div>
            </div>
        </div>
    );
};

const DependenciesDetails = () => {
    return (
        <Suspense fallback={<Loader />}>
            <DependenciesDetailsContent />
        </Suspense>
    );
};

export default DependenciesDetails;