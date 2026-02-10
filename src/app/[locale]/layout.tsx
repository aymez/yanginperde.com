import { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { routing } from "@/i18n/routing";
import { Header, Footer } from "@/components/layout";
import { COMPANY_INFO } from "@/lib/constants";
import "../globals.css";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://yanginperde.com";

export const metadata: Metadata = {
    metadataBase: new URL(baseUrl),
    icons: {
        icon: [
            { url: "/favicon.svg", type: "image/svg+xml" },
            { url: "/icon.svg", type: "image/svg+xml" },
        ],
        apple: "/apple-icon.svg",
    },
};

// Organization Schema for SEO
const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "YANGIN PERDE",
    legalName: COMPANY_INFO.legalName,
    url: "https://yanginperde.com",
    logo: "https://yanginperde.com/images/logo.svg",
    contactPoint: {
        "@type": "ContactPoint",
        telephone: COMPANY_INFO.phone,
        contactType: "customer service",
        areaServed: "TR",
        availableLanguage: ["Turkish", "English"],
    },
    address: {
        "@type": "PostalAddress",
        streetAddress: COMPANY_INFO.address.street,
        addressLocality: COMPANY_INFO.address.district,
        addressRegion: COMPANY_INFO.address.city,
        addressCountry: "TR",
    },
    sameAs: [
        COMPANY_INFO.socialMedia.instagram,
        COMPANY_INFO.socialMedia.facebook,
        COMPANY_INFO.socialMedia.linkedin,
        COMPANY_INFO.socialMedia.youtube,
    ].filter(Boolean),
};

const inter = Inter({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-inter",
    display: "swap",
});

const spaceGrotesk = Space_Grotesk({
    subsets: ["latin"],
    variable: "--font-space-grotesk",
    display: "swap",
});

const jetbrains = JetBrains_Mono({
    subsets: ["latin"],
    variable: "--font-mono",
    display: "swap",
});

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    // Validate locale
    if (!routing.locales.includes(locale as typeof routing.locales[number])) {
        notFound();
    }

    // Enable static rendering
    setRequestLocale(locale);

    // Get messages for the locale
    const messages = await getMessages();

    return (
        <html lang={locale} className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrains.variable}`}>
            <head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
                />
            </head>
            <body className="font-sans antialiased bg-background text-foreground">
                <NextIntlClientProvider messages={messages}>
                    <Header />
                    <main id="main-content">{children}</main>
                    <Footer />
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
