"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Locale } from "@/i18n/config";
import { companyInfo, timeline, certifications } from "@/data/company";
import { STATISTICS } from "@/lib/constants";

export default function AboutPageClient({ locale }: { locale: Locale }) {
    const t = useTranslations("about");

    return (
        <div className="min-h-screen bg-background">
            {/* Hero */}
            <section className="relative py-28 lg:py-36 overflow-hidden">
                <div className="absolute inset-0 bg-grid-fire opacity-30" />
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <div className="inline-flex items-center gap-2 px-4 py-2 glass-fire rounded-full mb-6">
                            <span className="text-xs font-medium text-primary uppercase tracking-wider">{t("badge")}</span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold mb-6">
                            <span className="text-foreground">{t("title")}</span>
                        </h1>
                        <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
                            {t("subtitle")}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Story */}
            <section className="py-20 bg-surface">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-1.5 h-6 bg-fire-gradient rounded-full" />
                                <span className="text-xs font-display font-bold text-primary uppercase tracking-wider">{t("story.label")}</span>
                            </div>
                            <h2 className="text-3xl font-display font-bold text-foreground mb-6">{t("story.title")}</h2>
                            <p className="text-muted-foreground leading-relaxed mb-6">{t("story.content")}</p>
                            <p className="text-muted-foreground leading-relaxed">{t("story.content2")}</p>
                        </motion.div>
                        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                            <div className="glass rounded-2xl p-8">
                                <div className="grid grid-cols-2 gap-6">
                                    {STATISTICS.map((stat, i) => (
                                        <div key={i} className="text-center">
                                            <div className="text-3xl font-display font-bold text-fire-gradient">{stat.value}{stat.suffix}</div>
                                            <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">
                                                {(stat.label as Record<string, string>)[locale] || stat.label.tr}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Timeline */}
            <section className="py-20 bg-background">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
                        <h2 className="text-3xl font-display font-bold text-foreground mb-4">{t("timeline.title")}</h2>
                    </motion.div>
                    <div className="relative">
                        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-fire-gradient hidden md:block" />
                        <div className="space-y-12">
                            {timeline.map((item, i) => (
                                <motion.div
                                    key={item.year}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className={`flex flex-col md:flex-row items-center gap-8 ${i % 2 === 0 ? "" : "md:flex-row-reverse"}`}
                                >
                                    <div className="flex-1 text-right md:text-left">
                                        <div className={`glass rounded-xl p-6 inline-block ${i % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                                            <span className="font-mono text-2xl font-bold text-primary">{item.year}</span>
                                            <h3 className="font-display text-sm font-bold text-foreground uppercase tracking-wider mt-2">
                                                {(item.title as Record<string, string>)[locale] || item.title.tr}
                                            </h3>
                                            <p className="text-sm text-muted-foreground mt-2">
                                                {(item.description as Record<string, string>)[locale] || item.description.tr}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="hidden md:flex w-4 h-4 rounded-full bg-fire-gradient shrink-0 z-10" />
                                    <div className="flex-1" />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Certifications */}
            <section className="py-20 bg-surface">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
                        <h2 className="text-3xl font-display font-bold text-foreground">{t("certifications.title")}</h2>
                    </motion.div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {certifications.map((cert, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="glass rounded-xl p-6 text-center hover-glow transition-all duration-300"
                            >
                                <div className="font-mono text-xl font-bold text-primary mb-2">{cert.name}</div>
                                <div className="text-xs text-muted-foreground">{(cert.description as Record<string, string>)[locale] || cert.description.tr}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
