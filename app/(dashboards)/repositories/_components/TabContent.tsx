import React from 'react';

import { dependenciesData, licensesData, vulnerabilitiesData } from '@/constants/DummyDataFactory';
import VulnabalitiesSearchArea from '../[id]/details/_components/vulnabilitiesSearchArea';
import { VulnerabilityTable } from '../[id]/details/_components/VulnabilitiesTable';
import DependenciesSearchArea from '../../dependencies/_components/DependenciesSearchArea';
import { DependenciesTable } from '../[id]/details/_components/DependencyTable';
import LicensesSearchArea from '../[id]/details/_components/LicensesSearchArea';
import { LicensesTable } from '../[id]/details/_components/LicensesTable';

interface TabContentProps {
    activeTab: string;
}

const TabContent: React.FC<TabContentProps> = ({ activeTab }) => {
    return (
        <div className="pt-4">
            {activeTab === 'vulnerabilities' && (
                <>
                    <VulnabalitiesSearchArea />
                    <VulnerabilityTable
                        vulnerabilities={vulnerabilitiesData}
                        totalCountAndLimit={{ totalCount: vulnerabilitiesData.length, size: 10 }}
                        currentPage={1}
                        loading={false}
                    />
                </>
            )}
            {activeTab === 'dependencies' && (
                <>
                    <DependenciesSearchArea />
                    <DependenciesTable
                        dependencies={dependenciesData}
                        totalCountAndLimit={{ totalCount: dependenciesData.length, size: 10 }}
                        currentPage={1}
                        loading={false}
                    />
                </>
            )}
            {activeTab === 'licenses' && (
                <>
                    <LicensesSearchArea />
                    <LicensesTable
                        licenses={licensesData}
                        totalCountAndLimit={{ totalCount: licensesData.length, size: 10 }}
                        currentPage={1}
                        loading={false}
                    />
                </>
            )}
        </div>
    );
};

export default TabContent;