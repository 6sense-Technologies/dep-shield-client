"use client";
import PageTitle from "@/components/PageTitle";
import React, { Suspense, useState, useEffect } from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import AvatarMenu from "@/components/AvatarMenu";
import GlobalBreadCrumb from "@/components/globalBreadCrumb";
import PageHeading from "@/components/pageHeading";
import Loader from "@/components/loader";
import { Badge } from "@/components/ui/badge";
import { Check, CircleAlert, ExternalLink, X } from "lucide-react";
import CustomAlert from "./_components/customAlert";
import { SingleLicenseTable } from "./_components/singleLicenseTable";

const LicensesData = [
    {
        repositoryName: "6senseEV/6sense-ev-admin",
        licenseRisk: "Critical",
        licenseFamily: "Permissive",
    },
    {
        repositoryName: "6senseEV/6sense-ev-api",
        licenseRisk: "High",
        licenseFamily: "Permissive",
    },
    {
        repositoryName: "6senseEV/6sense-ev-web",
        licenseRisk: "Medium",
        licenseFamily: "Permissive",
    },
    {
        repositoryName: "6senseEV/6sense-ev-mobile",
        licenseRisk: "Low",
        licenseFamily: "Permissive",
    },
    {
        repositoryName: "6senseEV/6sense-ev-desktop",
        licenseRisk: "Unknown",
        licenseFamily: "Permissive",
    },
];

const LicensesDetailsContent = () => {
    const [activeTab, setActiveTab] = useState<string>("overview");

    useEffect(() => {
        const savedTab = localStorage.getItem("activeTab");
        if (savedTab) {
            setActiveTab(savedTab);
        }
    }, []);

    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
        localStorage.setItem("activeTab", tab);
    };

    return (
        <div className="flex flex-col min-h-screen">
            <PageTitle title="MIT Details • Licenses • DepShield.io" />
            <div className="flex justify-between items-center md:hidden px-4 pt-8 pb-4">
                <span className="md:hidden"><SidebarTrigger /></span>
                <AvatarMenu />
            </div>
            <div className="flex justify-between items-center px-3 lg:px-6 pt-4">
                <GlobalBreadCrumb initialData="Licenses" initalLink="/licenses" secondayData="Details" secondayLink="/licenses/12" />
                <span className="hidden md:flex pr-2">
                    <AvatarMenu />
                </span>
            </div>
            <div className="flex items-center pl-4 md:pl-8 pt-3">
                <PageHeading title="MIT" className="mr-4" />
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 pt-6 px-4 md:pt-6 md:px-6 md:gap-x-8">
                <div>
                    <h1 className="text-[16px] text-deepBlackColor font-medium border-b pb-2 ">Permissions</h1>
                    <div className="flex flex-wrap gap-2 mt-4 ml-1">
                        <Badge className="inline-flex items-center gap-1 bg-[#DCFCE7]  hover:bg-[#DCFCE7] text-nowrap font-normal">
                            <div className="flex items-center gap-1">
                                <Check size={14} className="mb-[2px] text-[#166534]" />  <span className="text-twelve font-normal text-[#166534]">Commercial use
                                </span>
                            </div>
                        </Badge>
                        <Badge className="inline-flex items-center gap-1 bg-[#DCFCE7]  hover:bg-[#DCFCE7] text-nowrap font-normal">
                            <div className="flex items-center gap-1">
                                <Check size={14} className="mb-[2px] text-[#166534]" />  <span className="text-twelve font-normal text-[#166534]">Modification
                                </span>
                            </div>
                        </Badge>
                        <Badge className="inline-flex items-center gap-1 bg-[#DCFCE7]  hover:bg-[#DCFCE7] text-nowrap font-normal">
                            <div className="flex items-center gap-1">
                                <Check size={14} className="mb-[2px] text-[#166534]" />  <span className="text-twelve font-normal text-[#166534]">Distribution
                                </span>
                            </div>
                        </Badge>
                        <Badge className="inline-flex items-center gap-1 bg-[#DCFCE7]  hover:bg-[#DCFCE7] text-nowrap font-normal">
                            <div className="flex items-center gap-1">
                                <Check size={14} className="mb-[2px] text-[#166534]" />  <span className="text-twelve font-normal text-[#166534]">
                                    Private use
                                </span>
                            </div>
                        </Badge>
                    </div>
                </div>
                <div>
                    <h1 className="text-[16px] text-deepBlackColor font-medium border-b pb-2 ">Limitations</h1>
                    <div className="flex flex-wrap gap-2 mt-4 ml-1">
                        <Badge className="inline-flex items-center gap-1 bg-[#FEF2F2]  hover:bg-[#FEF2F2] text-nowrap font-normal">
                            <div className="flex items-center gap-1">
                                <X size={14} className="mb-[2px] text-[#DC2626]" />  <span className="text-twelve font-normal text-[#DC2626]">Liability
                                </span>
                            </div>
                        </Badge>
                        <Badge className="inline-flex items-center gap-1 bg-[#FEF2F2]  hover:bg-[#FEF2F2] text-nowrap font-normal">
                            <div className="flex items-center gap-1">
                                <X size={14} className="mb-[2px] text-[#DC2626]" />  <span className="text-twelve font-normal text-[#DC2626]">
                                    Warranty
                                </span>
                            </div>
                        </Badge>
                    </div>
                </div>
                <div>
                    <h1 className="text-[16px] text-deepBlackColor font-medium border-b pb-2 ">Conditions</h1>
                    <div className="flex flex-wrap gap-2 mt-4 ml-1">
                        <Badge className="inline-flex items-center gap-1 bg-[#F1F5F9]  hover:bg-[#F1F5F9] text-nowrap font-normal">
                            <div className="flex items-center gap-1">
                                <CircleAlert size={14} className="mb-[2px] text-[#0F172A]" />  <span className="text-twelve font-normal text-[#0F172A]">License and copyright notice
                                </span>
                            </div>
                        </Badge>
                    </div>
                </div>
            </div>

            <CustomAlert />

            <div className="pt-6 px-4 md:pt-6 md:px-6">
                <div className="flex space-x-2 md:space-x-4 border-b">
                    <button
                        className={`py-2 px-4 ${activeTab === 'overview' ? 'border-b-2 border-black font-semibold text-black' : 'text-lightAquaTextColor font-semibold'}`}
                        onClick={() => handleTabChange('overview')}
                    >
                        Overview
                    </button>
                    <button
                        className={`py-2 px-4 text-nowrap ${activeTab === 'fulltext' ? 'border-b-2 border-black font-semibold text-black' : 'text-lightAquaTextColor font-semibold'}`}
                        onClick={() => handleTabChange('fulltext')}
                    >
                        Full text
                    </button>
                </div>
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
                            of this software and associated documentation files (the "Software"), to deal
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
                            THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
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
                    <div>
                        <Badge className="inline-flex items-center gap-1 bg-white text-black hover:bg-white text-nowrap font-normal">
                            <div className="flex items-center gap-[6px]">
                                <span className="text-twelve font-normal text-deepBlackColor cursor-pointer">GitHub</span> <ExternalLink size={14} className="mb-[2px]" />
                            </div>
                        </Badge>
                    </div>
                    <div>
                        <Badge className="inline-flex items-center gap-1 bg-white text-black hover:bg-white text-nowrap font-normal">
                            <div className="flex items-center gap-[6px]">
                                <span className="text-twelve font-normal text-deepBlackColor cursor-pointer">tl;drLegal</span> <ExternalLink size={14} className="mb-[2px]" />
                            </div>
                        </Badge>
                    </div>
                    <div>
                        <Badge className="inline-flex items-center gap-1 bg-white text-black hover:bg-white text-nowrap font-normal">
                            <div className="flex items-center gap-[6px]">
                                <span className="text-twelve font-normal text-deepBlackColor cursor-pointer">Opensource</span> <ExternalLink size={14} className="mb-[2px]" />
                            </div>
                        </Badge>
                    </div>
                    <div>
                        <Badge className="inline-flex items-center gap-1 bg-white text-black hover:bg-white text-nowrap font-normal">
                            <div className="flex items-center gap-[6px]">
                                <span className="text-twelve font-normal text-deepBlackColor cursor-pointer">SPDX</span> <ExternalLink size={14} className="mb-[2px]" />
                            </div>
                        </Badge>
                    </div>
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