'use client';

import { VulnerabilityDetailsType } from '@/app/(dashboards)/vulnerabilities/types/types';
import { capitalizeOnlyFirstLetter } from '@/helpers/helpers';
import { cn } from '@/lib/utils';
import { RingProgress, Tabs } from '@mantine/core';

type SeverityKey = 'cvssMetricV2' | 'cvssMetricV30' | 'cvssMetricV31' | 'cvssMetricV40';

type Props = {
  vulnerabilityDetails: VulnerabilityDetailsType | undefined
  severity: VulnerabilityDetailsType['severity'] | undefined;
};

export default function SeverityTabs({ vulnerabilityDetails, severity }: Props) {
  if (!severity) return null;

  const keys = Object.keys(severity).filter(Boolean).reverse() as SeverityKey[];
  if (!keys.length) return null;


  const result = vulnerabilityDetails?.severity ? Object.entries(vulnerabilityDetails?.severity)?.toReversed().map(([key, value]) => {
    const version = (key?.replace('cvssMetric', 'CVSS').replace("2", "2").replace("30", "3").replace("31", "3.1").replace("40", "4"))
    return {
      version,
      source: value?.source ?? null,
      type: value?.type ?? null,
      cvssData: value?.cvssData ?? null,
      exploitabilityScore: value?.exploitabilityScore ?? null,
      impactScore: value?.impactScore ?? null
    }
  }) : []

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
        defaultValue={result.find(r => r.cvssData && Object.keys(r.cvssData).length)?.version}
      >
        <Tabs.List>
          {result.map(item => (
            <Tabs.Tab
              key={item.version}
              value={item.version}
              disabled={!item.cvssData || Object.keys(item.cvssData).length === 0}
              className={cn("data-[active=true]:text-black", { 'cursor-not-allowed': !item.cvssData || Object.keys(item.cvssData).length === 0 })}
            >
              {item.version}{item?.cvssData?.baseScore ? ` - ${item?.cvssData?.baseScore}` : ''}
            </Tabs.Tab>
          ))}
        </Tabs.List>

        {result.map(item => (
          <Tabs.Panel key={item.version} value={item.version} className="mt-4 pl-4">
  <div className="flex flex-row gap-10">
    <div className="flex flex-col gap-3">
      {item.cvssData && Object.entries(item.cvssData).length ? (
        Object.entries(item.cvssData).map(([k, v]) => (
          <div key={k} className="grid grid-cols-[250px_1fr]">
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
    </div>

    <div className="flex flex-col gap-4">
      {item?.cvssData?.baseScore && (
        <section className="text-center border rounded-md bg-[#FCFCFC] w-fit p-5">
          <div className="text-black">Base Score</div>
          <div className="text-sm">Max - 10</div>
          <RingProgress
            size={120}
            thickness={12}
            label={
              <div className="text-center text-black font-semibold">
                {item.cvssData.baseScore}
              </div>
            }
            sections={[
              { value: (item.cvssData.baseScore / 10) * 100, color: 'black' },
            ]}
          />
        </section>
      )}
      {item?.cvssData?.exploitabilityScore && (
        <section className="text-center border rounded-md bg-[#FCFCFC] w-fit p-5">
          <div className="text-black">Exploitability Score</div>
          <div className="text-sm">Max - 3.9</div>
          <RingProgress
            size={120}
            thickness={12}
            label={
              <div className="text-center text-black font-semibold">
                {item.cvssData.exploitabilityScore}
              </div>
            }
            sections={[
              { value: (item.cvssData.exploitabilityScore / 3.9) * 100, color: 'black' },
            ]}
          />
        </section>
      )}
      {item?.cvssData?.impactScore && (
        <section className="text-center border rounded-md bg-[#FCFCFC] w-fit p-5">
          <div className="text-black">Impact Score</div>
          <div className="text-sm">Max - 6.0</div>
          <RingProgress
            size={120}
            thickness={12}
            label={
              <div className="text-center text-black font-semibold">
                {item.cvssData.impactScore}
              </div>
            }
            sections={[
              { value: (item.cvssData.impactScore / 6) * 100, color: 'black' },
            ]}
          />
        </section>
      )}
    </div>
  </div>
</Tabs.Panel>

        ))}
      </Tabs>
    </section>
  );
}
