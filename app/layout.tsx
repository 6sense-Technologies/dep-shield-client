import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import Providers from "@/components/providers";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { NuqsAdapter } from 'nuqs/adapters/next/app'

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
        <html lang="en" className={inter.className}>
            <body className="antialiased">
                <SessionProvider>
                    <Providers>
                        <NuqsAdapter>
                            <MantineProvider>{children}</MantineProvider>
                        </NuqsAdapter>
                    </Providers>
                </SessionProvider>
            </body>
        </html>
    );
}
