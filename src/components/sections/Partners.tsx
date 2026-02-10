"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export function Partners() {
    const t = useTranslations("partners");

    return (
        <section className="relative py-20 bg-surface overflow-hidden">
            <div className="absolute inset-0 bg-grid-pattern" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 glass-fire rounded-full mb-6">
                        <span className="text-xs font-medium text-primary uppercase tracking-wider">
                            {t("badge")}
                        </span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4 text-foreground">
                        {t("title")}
                    </h2>
                    <p className="text-muted-foreground max-w-xl mx-auto">
                        {t("subtitle")}
                    </p>
                </motion.div>

                {/* Partner Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-6"
                >
                    <div className="glass rounded-xl p-6 text-center hover-glow transition-all duration-300">
                        <div className="font-mono text-3xl font-bold text-primary mb-2">15+</div>
                        <div className="text-xs text-muted-foreground uppercase tracking-wider">{t("stats.globalBrands")}</div>
                    </div>
                    <div className="glass rounded-xl p-6 text-center hover-glow transition-all duration-300">
                        <div className="font-mono text-3xl font-bold text-primary mb-2">20+</div>
                        <div className="text-xs text-muted-foreground uppercase tracking-wider">{t("stats.yearsPartnership")}</div>
                    </div>
                    <div className="glass rounded-xl p-6 text-center hover-glow transition-all duration-300">
                        <div className="font-mono text-3xl font-bold text-primary mb-2">100%</div>
                        <div className="text-xs text-muted-foreground uppercase tracking-wider">{t("stats.originalParts")}</div>
                    </div>
                    <div className="glass rounded-xl p-6 text-center hover-glow transition-all duration-300">
                        <div className="font-mono text-3xl font-bold text-primary mb-2">5+</div>
                        <div className="text-xs text-muted-foreground uppercase tracking-wider">{t("stats.exportCountries")}</div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
