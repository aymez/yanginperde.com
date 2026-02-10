"use client";

import { useTranslations } from "next-intl";

export function SEOContent() {
    const t = useTranslations("seo");

    return (
        <section className="py-16 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="glass rounded-xl p-8 max-w-3xl mx-auto text-center">
                    <h2 className="font-display text-xl font-bold text-foreground mb-4">
                        {t("title")}
                    </h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        {t("content")}
                    </p>
                </div>
            </div>
        </section>
    );
}
