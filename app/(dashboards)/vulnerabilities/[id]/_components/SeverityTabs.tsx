'use client';

import CustomRadialGraph from '@/app/(dashboards)/vulnerabilities/[id]/_components/CustomRadialGraph';
import { VulnerabilityDetailsType } from '@/app/(dashboards)/vulnerabilities/types/types';
import { capitalizeOnlyFirstLetter } from '@/helpers/helpers';
import { cn } from '@/lib/utils';
import { RingProgress, Tabs } from '@mantine/core';
import { RadialBarChart } from '@mantine/charts';

type SeverityKey = 'cvssMetricV2' | 'cvssMetricV30' | 'cvssMetricV31' | 'cvssMetricV40';

type Props = {
  vulnerabilityDetails: VulnerabilityDetailsType | undefined
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

export default function SeverityTabs({ vulnerabilityDetails, severity, activeTab, setActiveTab }: Props) {
  if (!severity) return null;

  const keys = Object.keys(severity).filter(Boolean).reverse() as SeverityKey[];
  if (!keys.length) return null;

  const defaultTab = keys[0];

  const result = vulnerabilityDetails?.severity ? Object.entries(vulnerabilityDetails?.severity)?.toReversed().map(([key, value]) => {
    const version = capitalizeOnlyFirstLetter(key.replace("2", "2").replace("30", "3").replace("31", "3.1").replace("40", "4"))
    console.log('🚀 - result - version:', version)
    return {
      version,
      source: value?.source ?? null,
      type: value?.type ?? null,
      cvssData: value?.cvssData ?? null,
      exploitabilityScore: value?.exploitabilityScore ?? null,
      impactScore: value?.impactScore ?? null
    }
  }) : []
  console.log('🚀 - result - result:', result)

  function formatKey(key: string) {
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .replace(/Impact$/, ' Impact');
  }

  const chartData = [
    { browser: "safari", visitors: 3.7, fill: "" },
  ];

  const data = [
    {
      name: 'Score',
      value: 7.3, // score
      fill: '#1D4ED8', // blue
    },
  ];

  return (
    <section>
      <Tabs
        color="black"
        className={cn("mt-8 !text-[#64748B] font-semibold")}
        // value={activeTab}
        // onChange={setActiveTab}
        defaultValue={'Cvssmetricv2'}
      >
        <Tabs.List>
          {result.map(item => (
            <Tabs.Tab
              key={item.version}
              value={item.version}
              className="data-[active=true]:text-black"
            >
              {item.version}{item?.cvssData?.baseScore ? ` - ${item?.cvssData?.baseScore}` : ''}
            </Tabs.Tab>
          ))}
        </Tabs.List>

        {result.map(item => (
          <Tabs.Panel key={item.version} value={item.version} className="flex flex-col gap-3 mt-4 pl-4">
            {item.cvssData && Object.entries(item.cvssData).length ? (
              Object.entries(item.cvssData).map(([k, v]) => (
                <div key={k} className="grid grid-cols-[250px_1fr] mb-">
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
            {
              item?.cvssData?.baseScore ?
                <section className='text-center border-[1px] rounded-md bg-[#FCFCFC] w-fit p-5'>
                  <div className='text-black'>Base Score</div>
                  <div className='text-sm'>Max - 10</div>
                  <RingProgress
                    size={120}
                    thickness={12}
                    label={
                      <div className='text-center text-black font-semibold'>
                        {item?.cvssData?.baseScore}
                      </div>
                    }
                    sections={[
                      { value: item?.cvssData?.baseScore / 10 * 100, color: 'black' },
                    ]}
                  />
                </section> : null
            }
            {
              item?.cvssData?.exploitabilityScore ?
                <section className='text-center border-[1px] rounded-md bg-[#FCFCFC] w-fit p-5'>
                  <div className='text-black'>Base Score</div>
                  <div className='text-sm'>Max - 3.9</div>
                  <RingProgress
                    size={120}
                    thickness={12}
                    label={
                      <div className='text-center text-black font-semibold'>
                        {item?.cvssData?.baseScore}
                      </div>
                    }
                    sections={[
                      { value: item?.cvssData?.baseScore / 3.9 * 100, color: 'black' },
                    ]}
                  />
                </section> : null
            }
            {
              item?.cvssData?.impactScore ?
                <section className='text-center border-[1px] rounded-md bg-[#FCFCFC] w-fit p-5'>
                  <div className='text-black'>Base Score</div>
                  <div className='text-sm'>Max - 6.0</div>
                  <RingProgress
                    size={120}
                    thickness={12}
                    label={
                      <div className='text-center text-black font-semibold'>
                        {item?.cvssData?.impactScore}
                      </div>
                    }
                    sections={[
                      { value: item?.cvssData?.impactScore / 6 * 100, color: 'black' },
                    ]}
                  />
                </section> : null
            }
          </Tabs.Panel>
        ))}
      </Tabs>
    </section>
  );
}
