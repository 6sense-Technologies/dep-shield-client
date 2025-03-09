"use client";
import React, { Suspense } from "react";
import PageHeader from "@/components/PageHeader";
import PageHeading from "@/components/pageHeading";
import Loader from "@/components/loader";
import AllLicensesSearchArea from "./_components/AllLicensesSearchArea";
import { AllLicensesTable } from "./_components/AllLicensesTable";
import BreadcrumbWithAvatar from "@/components/BreadCrumbiwthAvatar";
import { EffectedlicensesData } from "@/constants/DummyDataFactory";



const LicensesContent = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <PageHeader title="Licenses • DepShield.io" />
            <BreadcrumbWithAvatar initialData="Licenses" initialLink="/licenses" />
            <div className="flex items-center pl-4 md:pl-8 pt-3">
                <PageHeading title="All Licenses" className="mr-4" />
            </div>
            <div className="pt-4 px-4 md:pt-4 md:px-6">
                <AllLicensesSearchArea />
                <AllLicensesTable
                    licenses={EffectedlicensesData}
                    totalCountAndLimit={{ totalCount: EffectedlicensesData.length, size: 10 }}
                    currentPage={1}
                    loading={false}
                />
            </div>
        </div>
    );
};

const Licenses = () => {
    return (
        <Suspense fallback={<Loader />}>
            <LicensesContent />
        </Suspense>
    );
};

export default Licenses;