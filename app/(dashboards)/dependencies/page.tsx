"use client";
import React, { Suspense } from "react";
import PageHeader from "@/components/PageHeader";
import PageHeading from "@/components/pageHeading";
import Loader from "@/components/loader";
import DependenciesSearchArea from "./_components/DependenciesSearchArea";
import { AllDependenciesTable } from "./_components/AllDependenciesTable";
import { dependenciesData } from "@/constants/DummyDataFactory";
import BreadcrumbWithAvatar from "@/components/BreadCrumbiwthAvatar";



const DependenciesContent = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <PageHeader title="Dependencies • DepShield.io" />
            <BreadcrumbWithAvatar initialData="Dependencies" initialLink="/dependencies" />
            <div className="flex items-center pl-4 md:pl-8 pt-3">
                <PageHeading title="All Dependencies" className="mr-4" />
            </div>
            <div className="pt-4 px-4 md:pt-4 md:px-6">
                <DependenciesSearchArea />
                <AllDependenciesTable
                    dependencies={dependenciesData}
                    totalCountAndLimit={{ totalCount: dependenciesData.length, size: 10 }}
                    currentPage={1}
                    loading={false}
                />
            </div>
        </div>
    );
};

const Dependencies = () => {
    return (
        <Suspense fallback={<Loader />}>
            <DependenciesContent />
        </Suspense>
    );
};

export default Dependencies;