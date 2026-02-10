"use client";

import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import { mainCategories, categories } from "@/data/products";
import { useState } from "react";

export function ProductCategories() {
    const t = useTranslations("categories");
    const locale = useLocale();
    const [activeTab, setActiveTab] = useState<string>("yangin-sistemleri");

    const filteredCategories = categories.filter((c) => c.mainCategory === activeTab);

    return (
        <section className="relative py-24 lg:py-32 bg-background overflow-hidden">
            <div className="absolute inset-0 bg-grid-fire opacity-30" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 glass-fire rounded-full mb-6">
                        <span className="text-xs font-medium text-primary uppercase tracking-wider">
                            {t("systemCatalog")}
                        </span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-4">
                        <span className="text-foreground">{t("engineered")} </span>
                        <span className="text-fire-gradient">{t("solutions")}</span>
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">{t("subtitle")}</p>
                </motion.div>

                {/* Tab Switcher */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex justify-center gap-3 mb-12"
                >
                    {mainCategories.map((mc) => (
                        <button
                            key={mc.slug}
                            onClick={() => setActiveTab(mc.slug)}
                            className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${activeTab === mc.slug
                                    ? "bg-fire-gradient text-white shadow-lg shadow-primary/30"
                                    : "glass text-muted-foreground hover:text-foreground"
                                }`}
                        >
                            {(mc.name as Record<string, string>)[locale] || mc.name.tr}
                        </button>
                    ))}
                </motion.div>

                {/* Category Cards */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCategories.map((cat, i) => (
                        <motion.div
                            key={cat.slug}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                        >
                            <Link href={`/urunler/${cat.slug}`}>
                                <div className="group glass rounded-xl p-6 hover-glow transition-all duration-300 h-full cursor-pointer">
                                    {/* Icon */}
                                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                                        {cat.icon === "shield" && (
                                            <svg className="w-7 h-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                                        )}
                                        {cat.icon === "flame" && (
                                            <svg className="w-7 h-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" /></svg>
                                        )}
                                        {cat.icon === "door" && (
                                            <svg className="w-7 h-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                                        )}
                                        {cat.icon === "automatic" && (
                                            <svg className="w-7 h-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                        )}
                                        {cat.icon === "conveyor" && (
                                            <svg className="w-7 h-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>
                                        )}
                                        {cat.icon === "smoke" && (
                                            <svg className="w-7 h-7 text-smoke" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /></svg>
                                        )}
                                        {cat.icon === "fixed" && (
                                            <svg className="w-7 h-7 text-smoke" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <h3 className="font-display text-lg font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                                        {(cat.name as Record<string, string>)[locale] || cat.name.tr}
                                    </h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                                        {(cat.description as Record<string, string>)[locale] || cat.description.tr}
                                    </p>

                                    {/* View Details Link */}
                                    <div className="flex items-center gap-2 text-primary text-sm font-medium group-hover:gap-3 transition-all duration-300">
                                        <span>{t("viewDetails")}</span>
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
