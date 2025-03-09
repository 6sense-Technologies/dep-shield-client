"use client";
import React, { Suspense, useState } from "react";
import PageHeader from "@/components/PageHeader";
import PageHeading from "@/components/pageHeading";
import Loader from "@/components/loader";
import CustomAlert from "./_components/customAlert";
import { SingleLicenseTable } from "./_components/singleLicenseTable";
import BreadcrumbWithAvatar from "@/components/BreadCrumbiwthAvatar";
import { LicensesData } from "@/constants/DummyDataFactory";

import { Check, CircleAlert,X } from "lucide-react";
import CustomBadge from "./_components/CustomBadge";
import Tabs from "./_components/Tabs";

const LicensesDetailsContent = () => {
    const [activeTab, setActiveTab] = useState<string>("overview");

    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
        localStorage.setItem("activeTab", tab);
    };

    const tabs = [
        { id: "overview", label: "Overview" },
        { id: "fulltext", label: "Full text" },
    ];

    return (
        <div className="flex flex-col min-h-screen">
            <PageHeader title="MIT Details • Licenses • DepShield.io" />
            <BreadcrumbWithAvatar initialData="Licenses" initialLink="/licenses" secondaryData="Details" secondaryLink="/licenses/12" />
            <div className="flex items-center pl-4 md:pl-8 pt-3">
                <PageHeading title="MIT" className="mr-4" />
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 pt-6 px-4 md:pt-6 md:px-6 md:gap-x-8">
                <div>
                    <h1 className="text-[16px] text-deepBlackColor font-medium border-b pb-2 ">Permissions</h1>
                    <div className="flex flex-wrap gap-2 mt-4 ml-1">
                        <CustomBadge label="Commercial use" bgColor="bg-[#DCFCE7]" textColor="text-[#166534]" icon={<Check size={14} className="mb-[2px] text-[#166534]" />} />
                        <CustomBadge label="Modification" bgColor="bg-[#DCFCE7]" textColor="text-[#166534]" icon={<Check size={14} className="mb-[2px] text-[#166534]" />} />
                        <CustomBadge label="Distribution" bgColor="bg-[#DCFCE7]" textColor="text-[#166534]" icon={<Check size={14} className="mb-[2px] text-[#166534]" />} />
                        <CustomBadge label="Private use" bgColor="bg-[#DCFCE7]" textColor="text-[#166534]" icon={<Check size={14} className="mb-[2px] text-[#166534]" />} />
                    </div>
                </div>
                <div>
                    <h1 className="text-[16px] text-deepBlackColor font-medium border-b pb-2 ">Limitations</h1>
                    <div className="flex flex-wrap gap-2 mt-4 ml-1">
                        <CustomBadge label="Liability" bgColor="bg-[#FEF2F2]" textColor="text-[#DC2626]" icon={<X size={14} className="mb-[2px] text-[#DC2626]" />} />
                        <CustomBadge label="Warranty" bgColor="bg-[#FEF2F2]" textColor="text-[#DC2626]" icon={<X size={14} className="mb-[2px] text-[#DC2626]" />} />
                    </div>
                </div>
                <div>
                    <h1 className="text-[16px] text-deepBlackColor font-medium border-b pb-2 mt-5 md:mt-0">Conditions</h1>
                    <div className="flex flex-wrap gap-2 mt-4 ml-1">
                        <CustomBadge label="License and copyright notice" bgColor="bg-[#F1F5F9]" textColor="text-[#0F172A]" icon={<CircleAlert size={14} className="mb-[2px] text-[#0F172A]" />} />
                    </div>
                </div>
            </div>

            <CustomAlert />

            <div className="pt-6 px-4 md:pt-6 md:px-6">
                <Tabs activeTab={activeTab} onTabChange={handleTabChange} tabs={tabs} />
            </div>
            <div className="pt-6 px-4 md:pt-6 md:px-6">
                {activeTab === 'overview' && (
                    <div>
                        <p className="text-sm font-medium text-deepBlackColor">A short and simple permissive license with conditions only requiring preservation of copyright and license notices. Licensed works, modifications, and larger works may be distributed under different terms and without source code.</p>
                    </div>
                )}
                {activeTab === 'fulltext' && (
                    <div className="pr-20 md:pr-10 lg:pr-[510px]">
                        <p className="text-sm font-medium text-deepBlackColor">
                            Copyright (C) 2011 Ask Bjørn Hansen
                        </p>
                        <p className="text-sm font-medium text-deepBlackColor">
                            Copyright (C) 2013 Stripe, Inc. (https://stripe.com)
                        </p>
                        <p className="text-sm font-medium text-deepBlackColor pt-4">
                            Permission is hereby granted, free of charge, to any person obtaining a copy
                            of this software and associated documentation files (the &quot;Software&quot;), to deal
                            in the Software without restriction, including without limitation the rights
                            to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
                            copies of the Software, and to permit persons to whom the Software is
                            furnished to do so, subject to the following conditions:
                        </p>
                        <p className="text-sm font-medium text-deepBlackColor pt-4">
                            The above copyright notice and this permission notice shall be included in
                            all copies or substantial portions of the Software.
                        </p>
                        <p className="text-sm font-medium text-deepBlackColor pt-4">
                            THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
                            IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
                            FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
                            AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
                            LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
                            OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
                            THE SOFTWARE.
                        </p>
                    </div>
                )}
            </div>

            <div className="pt-6 px-4 md:pt-6 md:px-6">
                <div className="flex items-center gap-2 border-b pb-4">
                    <p className="font-medium text-[16px] text-deepBlackColor">References</p>
                </div>
                <div className="flex flex-wrap gap-3 mt-3">
                    <CustomBadge label="GitHub" link />
                    <CustomBadge label="tl;drLegal" link />
                    <CustomBadge label="Opensource" link />
                    <CustomBadge label="SPDX" link />
                </div>
            </div>

            <div className="pt-6 px-4 md:pt-6 md:px-6">
                <div className="flex items-center gap-2 border-b pb-4">
                    <p className="font-medium text-[16px] text-deepBlackColor">Affected Repositories</p>
                </div>
                <div>
                    <SingleLicenseTable
                        licenses={LicensesData ?? []}
                        totalCountAndLimit={{ totalCount: LicensesData.length, size: 10 }}
                        currentPage={1}
                        loading={false}
                    />
                </div>
            </div>
        </div>
    );
};

const LicensesDetails = () => {
    return (
        <Suspense fallback={<Loader />}>
            <LicensesDetailsContent />
        </Suspense>
    );
};

export default LicensesDetails;