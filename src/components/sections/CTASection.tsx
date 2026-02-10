"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export function CTASection() {
    const t = useTranslations("cta");

    return (
        <section className="relative py-24 lg:py-32 overflow-hidden">
            {/* Fire gradient background */}
            <div className="absolute inset-0 bg-fire-gradient opacity-90" />
            <div className="absolute inset-0 bg-grid-pattern" />

            {/* Ember particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(8)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1.5 h-1.5 rounded-full bg-white/30"
                        initial={{
                            x: Math.random() * 100 + "%",
                            y: "100%",
                            opacity: 0,
                        }}
                        animate={{
                            y: "-10%",
                            opacity: [0, 0.8, 0],
                        }}
                        transition={{
                            duration: 3 + Math.random() * 4,
                            repeat: Infinity,
                            delay: Math.random() * 5,
                        }}
                    />
                ))}
            </div>

            <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full mb-8 backdrop-blur-sm">
                        <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                        <span className="text-xs font-medium text-white uppercase tracking-wider">
                            {t("acceptingProjects")}
                        </span>
                    </div>

                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white mb-6">
                        {t("title")}
                    </h2>
                    <p className="text-lg text-white/80 mb-10 max-w-xl mx-auto">
                        {t("subtitle")}
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/iletisim"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-fire-dark font-bold rounded-xl hover:bg-white/90 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                        >
                            {t("button")}
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </Link>
                        <Link
                            href="/urunler"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 text-white font-semibold rounded-xl backdrop-blur-sm hover:bg-white/20 transition-all duration-300 border border-white/20"
                        >
                            {t("secondaryButton")}
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
