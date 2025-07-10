import Providers from "@/components/providers";
import { ColorSchemeScript, MantineProvider, mantineHtmlProps } from "@mantine/core";
import "@mantine/core/styles.css";
import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { Inter } from "next/font/google";
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import "./globals.css";
import { Suspense } from 'react'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "6sense Depshieldio",
    description: "Performance Automation for 6sense Team",
    icons: {
        icon: "./favicon.ico"
    }
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={inter.className} {...mantineHtmlProps}>
            <head>
                <ColorSchemeScript />

            </head>
            <body className="antialiased">
                <MantineProvider>
                    <SessionProvider>
                        <Providers>
                            <NuqsAdapter>
                                {children}
                            </NuqsAdapter>
                        </Providers>
                    </SessionProvider>
                </MantineProvider>
            </body>
        </html>
    );
}
