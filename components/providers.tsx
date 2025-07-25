"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { ReactNode } from "react";

const Providers = ({ children }: { children: ReactNode }) => {
    const [queryClient] = React.useState(
        new QueryClient({
            defaultOptions: {
                queries: {
                    retry: 1,
                    retryDelay: 5000,
                    refetchOnMount: true,
                    refetchOnWindowFocus: false,
                    staleTime: 60 * 5 * 1000
                }
            }
        })
    );
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export default Providers;
