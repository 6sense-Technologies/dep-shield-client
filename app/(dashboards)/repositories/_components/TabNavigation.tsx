import React from 'react';

interface TabNavigationProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, onTabChange }) => {
    return (
        <div className="tab pt-4">
            <div className="flex space-x-0 md:space-x-4 border-b">
                <button
                    className={`py-2 px-2 md:px-4 ${activeTab === 'vulnerabilities' ? 'border-b-2 border-black font-semibold text-black' : 'text-lightAquaTextColor font-semibold'}`}
                    onClick={() => onTabChange('vulnerabilities')}
                >
                    Vulnerabilities
                </button>
                <button
                    className={`py-2 px-4 ${activeTab === 'dependencies' ? 'border-b-2 border-black font-semibold text-black' : 'text-lightAquaTextColor font-semibold'}`}
                    onClick={() => onTabChange('dependencies')}
                >
                    Dependencies
                </button>
                <button
                    className={`py-2 px-4 ${activeTab === 'licenses' ? 'border-b-2 border-black font-semibold text-black' : 'text-lightAquaTextColor font-semibold'}`}
                    onClick={() => onTabChange('licenses')}
                >
                    Licenses
                </button>
            </div>
        </div>
    );
};

export default TabNavigation;