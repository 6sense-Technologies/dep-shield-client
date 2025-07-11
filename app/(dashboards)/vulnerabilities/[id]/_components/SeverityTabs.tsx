'use client';

import { VulnerabilityDetailsType } from '@/app/(dashboards)/vulnerabilities/types/types';
import { capitalizeOnlyFirstLetter } from '@/helpers/helpers';
import { cn } from '@/lib/utils';
import { Tabs } from '@mantine/core';

type SeverityKey = 'cvssMetricV2' | 'cvssMetricV30' | 'cvssMetricV31' | 'cvssMetricV40';

type Props = {
  severity: VulnerabilityDetailsType['severity'] | undefined;
  activeTab: string | null;
  setActiveTab: (value: string | null) => void;
};

const severityLabelMap: Record<SeverityKey, string> = {
  cvssMetricV2: 'CVSS2',
  cvssMetricV30: 'CVSS3',
  cvssMetricV31: 'CVSS3.1',
  cvssMetricV40: 'CVSS4',
};

export default function SeverityTabs({ severity, activeTab, setActiveTab }: Props) {
  if (!severity) return null;

  const keys = Object.keys(severity).filter(Boolean).reverse() as SeverityKey[];
  if (!keys.length) return null;

  const defaultTab = keys[0];

  function formatKey(key: string) {
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .replace(/Impact$/, ' Impact');
  }

  return (
    <section>
      <Tabs
        color="black"
        className={cn("mt-8 !text-[#64748B] font-semibold")}
        // value={activeTab}
        // onChange={setActiveTab}
        defaultValue={defaultTab}
      >
        <Tabs.List>
          {keys.map(key => (
            <Tabs.Tab
              key={key}
              value={key}
              className="data-[active=true]:text-black"
            >
              {severityLabelMap[key] || key}
            </Tabs.Tab>
          ))}
        </Tabs.List>

        {keys.map(key => {
          const data = severity[key]?.cvssData;
          return (
            <Tabs.Panel key={key} value={key} className="flex flex-col gap-3 mt-4 pl-4">
              {data && Object.entries(data).length ? (
                Object.entries(data).map(([k, v]) => (
                  <div key={k} className="grid grid-cols-3">
                    <span className="font-normal text-sm text-black">{formatKey(k)}</span>
                    <span
                      className={cn("text-sm", {
                        'text-red-500': ['NETWORK', 'NONE', 'LOW', 'HIGH'].includes(String(v)),
                        'text-green-500': v === 'UNCHANGED',
                      })}
                    >
                      {capitalizeOnlyFirstLetter(String(v ?? ''))}
                    </span>
                  </div>
                ))
              ) : (
                <span>No Results</span>
              )}
            </Tabs.Panel>
          );
        })}
      </Tabs>
    </section>
  );
}
