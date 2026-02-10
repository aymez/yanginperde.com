import { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { QuoteForm } from "@/components/shared";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "quote.meta" });

    return {
        title: t("title"),
        description: t("description"),
    };
}

export default async function QuotePage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    setRequestLocale(locale);

    const t = await getTranslations("quote");

    return (
        <div className="min-h-screen bg-background">
            {/* Hero */}
            <section className="relative py-28 lg:py-36 overflow-hidden">
                <div className="absolute inset-0 bg-grid-fire opacity-30" />
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 glass-fire rounded-full mb-6">
                        <span className="text-xs font-medium text-primary uppercase tracking-wider">{t("badge")}</span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6">
                        {t("title")}
                    </h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                        {t("subtitle")}
                    </p>
                </div>
            </section>

            {/* Form Section */}
            <section className="py-16 lg:py-24 bg-surface">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="glass rounded-2xl p-8 lg:p-12">
                        <QuoteForm />
                    </div>
                </div>
            </section>
        </div>
    );
}
