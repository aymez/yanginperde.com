"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export function WhyYanginPerde() {
    const t = useTranslations("whyUs");

    const features = [
        { key: "tech1", icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5.002 5.002 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" },
        { key: "tech2", icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" },
        { key: "tech3", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
        { key: "tech4", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
    ];

    return (
        <section className="relative py-24 lg:py-32 bg-surface overflow-hidden">
            {/* Grid pattern */}
            <div className="absolute inset-0 bg-grid-pattern" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 glass-fire rounded-full mb-6">
                            <div className="w-2 h-2 rounded-full bg-primary" />
                            <span className="text-xs font-medium text-primary uppercase tracking-wider">
                                {t("manufacturingExcellence")}
                            </span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-6">
                            <span className="text-foreground">{t("precision")} </span>
                            <span className="text-fire-gradient">{t("engineering")}</span>
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                            {t("description")}
                        </p>
                    </motion.div>
                </div>

                {/* Feature Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, i) => (
                        <motion.div
                            key={feature.key}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="group glass rounded-xl p-6 hover-glow transition-all duration-300"
                        >
                            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors duration-300">
                                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={feature.icon} />
                                </svg>
                            </div>
                            <h3 className="font-display text-sm font-bold text-foreground uppercase tracking-wider mb-3">
                                {t(`features.${feature.key}.title`)}
                            </h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                {t(`features.${feature.key}.desc`)}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="mt-16 flex flex-wrap items-center justify-center gap-8 text-center"
                >
                    <div className="glass rounded-xl px-8 py-4">
                        <div className="font-mono text-2xl font-bold text-primary">10.000+</div>
                        <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">{t("cyclesTested")}</div>
                    </div>
                    <div className="glass rounded-xl px-8 py-4">
                        <div className="font-mono text-2xl font-bold text-primary">ISO 9001</div>
                        <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">{t("factoryCompliance")}</div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
