"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export default function CustomSolutionsPageClient() {
    const t = useTranslations("customSolutions");

    const steps = [
        { icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" },
        { icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
        { icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" },
        { icon: "M5 13l4 4L19 7" },
    ];

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
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6">{t("title")}</h1>
                        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">{t("subtitle")}</p>
                    </motion.div>
                </div>
            </section>

            {/* Steps */}
            <section className="py-20 bg-surface">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
                        <h2 className="text-3xl font-display font-bold text-foreground">{t("process.title")}</h2>
                    </motion.div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {steps.map((step, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="glass rounded-xl p-6 text-center hover-glow transition-all duration-300 relative"
                            >
                                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-fire-gradient flex items-center justify-center text-white text-xs font-mono font-bold">
                                    {String(i + 1).padStart(2, "0")}
                                </div>
                                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
                                    <svg className="w-7 h-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={step.icon} />
                                    </svg>
                                </div>
                                <h3 className="font-display text-sm font-bold text-foreground uppercase tracking-wider mb-2">
                                    {t(`process.steps.${i}.title`)}
                                </h3>
                                <p className="text-sm text-muted-foreground">{t(`process.steps.${i}.description`)}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-background">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                        <h2 className="text-3xl font-display font-bold text-foreground mb-6">{t("cta.title")}</h2>
                        <p className="text-muted-foreground mb-8 max-w-xl mx-auto">{t("cta.description")}</p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link href="/teklif-al" className="inline-flex items-center gap-2 px-8 py-4 bg-fire-gradient text-white font-semibold rounded-xl hover:shadow-xl hover:shadow-primary/30 transition-all">
                                {t("cta.button")}
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>
                            <Link href="/iletisim" className="inline-flex items-center gap-2 px-8 py-4 glass text-foreground font-semibold rounded-xl hover:bg-surface-light transition-all">
                                {t("cta.contact")}
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
