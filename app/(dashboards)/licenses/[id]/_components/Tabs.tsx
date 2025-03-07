import React from "react";

interface TabsProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
    tabs: { id: string; label: string }[];
}

const Tabs: React.FC<TabsProps> = ({ activeTab, onTabChange, tabs }) => {
    return (
        <div className="flex space-x-2 md:space-x-4 border-b">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    className={`py-2 px-4 ${activeTab === tab.id ? 'border-b-2 border-black font-semibold text-black' : 'text-lightAquaTextColor font-semibold'}`}
                    onClick={() => onTabChange(tab.id)}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
};

export default Tabs;