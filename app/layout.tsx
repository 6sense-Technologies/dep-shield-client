import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import Providers from "@/components/providers";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import Head from "next/head";

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
            <Head>
                <ColorSchemeScript />
            </Head>
            <body className="antialiased">
                <SessionProvider>
                    <Providers>
                        <NuqsAdapter>
                            <MantineProvider
                                defaultColorScheme='light'
                                theme={{
                                    components: {
                                        Checkbox: {
                                            defaultProps: {
                                            },
                                        },
                                    },
                                }}
                            >
                                {children}
                            </MantineProvider>
                        </NuqsAdapter>
                    </Providers>
                </SessionProvider>
            </body>
        </html>
    );
}
