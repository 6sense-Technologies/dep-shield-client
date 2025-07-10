// app/providers.tsx
'use client';

import { SessionProvider } from "next-auth/react";
import { MantineProvider } from "@mantine/core";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import Providers from "@/components/providers";

export default function AllClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <Providers>
        <NuqsAdapter>
          <MantineProvider
          >
            {children}
          </MantineProvider>
        </NuqsAdapter>
      </Providers>

    </SessionProvider>
  );
}
