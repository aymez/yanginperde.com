"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export function TechnicalSpecs() {
    const t = useTranslations("specs");

    const specs = [
        { key: "fireIntegrity", percentage: 100 },
        { key: "radiation", percentage: 83 },
        { key: "insulation", percentage: 100 },
        { key: "smokeLeakage", percentage: 95 },
        { key: "reactionToFire", percentage: 100 },
        { key: "closingSpeed", percentage: 70 },
    ];

    return (
        <section className="relative py-24 lg:py-32 bg-surface overflow-hidden">
            <div className="absolute inset-0 bg-grid-pattern" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 glass-fire rounded-full mb-6">
                        <span className="text-xs font-medium text-primary uppercase tracking-wider">
                            {t("technicalCompliance")}
                        </span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-4">
                        <span className="text-foreground">{t("certified")} </span>
                        <span className="text-fire-gradient">{t("performance")}</span>
                    </h2>
                </motion.div>

                {/* Specs Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {specs.map((spec, i) => (
                        <motion.div
                            key={spec.key}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: i * 0.1 }}
                            className="glass rounded-xl p-6 hover-glow transition-all duration-300"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <h3 className="font-display text-sm font-bold text-foreground uppercase tracking-wider">
                                    {t(`items.${spec.key}.label`)}
                                </h3>
                                <span className="font-mono text-xs text-muted-foreground bg-surface-light px-2 py-1 rounded">
                                    {t(`items.${spec.key}.standard`)}
                                </span>
                            </div>

                            <div className="mb-3">
                                <span className="font-mono text-xl font-bold text-primary">
                                    {t(`items.${spec.key}.value`)}
                                </span>
                            </div>

                            {/* Progress Bar */}
                            <div className="w-full h-2 bg-surface-light rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-fire-gradient rounded-full"
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${spec.percentage}%` }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1.5, delay: 0.3 + i * 0.1 }}
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Download CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-12 text-center"
                >
                    <button className="inline-flex items-center gap-2 px-6 py-3 glass text-foreground text-sm font-medium rounded-xl hover:bg-surface-light transition-all duration-300">
                        <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        {t("downloadDatasheets")}
                    </button>
                </motion.div>
            </div>
        </section>
    );
}
