"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { STATISTICS } from "@/lib/constants";
import { useLocale } from "next-intl";

export function Hero() {
    const t = useTranslations("hero");
    const locale = useLocale();

    return (
        <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-background">
            {/* Background Image with Dark Overlay */}
            <div className="absolute inset-0">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: "url(/images/hero-bg.png)" }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/60" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/30" />
            </div>

            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 bg-grid-fire opacity-40" />

            {/* Animated Ember Particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 rounded-full bg-primary/60"
                        initial={{
                            x: Math.random() * 100 + "%",
                            y: "100%",
                            opacity: 0,
                        }}
                        animate={{
                            y: "-10%",
                            opacity: [0, 1, 0],
                        }}
                        transition={{
                            duration: 4 + Math.random() * 3,
                            repeat: Infinity,
                            delay: Math.random() * 5,
                            ease: "easeOut",
                        }}
                    />
                ))}
            </div>

            {/* Content */}
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 w-full">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left Side - Text */}
                    <div>
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex items-center gap-2 px-4 py-2 glass-fire rounded-full mb-8"
                        >
                            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                            <span className="text-xs font-medium text-primary uppercase tracking-wider">
                                {t("badge")}
                            </span>
                        </motion.div>

                        {/* Title */}
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display font-bold leading-[1.1] mb-6"
                        >
                            <span className="text-foreground">{t("title")}</span>
                            <br />
                            <span className="text-fire-gradient">{t("titleHighlight")}</span>
                        </motion.h1>

                        {/* Subtitle */}
                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-lg text-muted-foreground max-w-lg mb-10 leading-relaxed"
                        >
                            {t("subtitle")}
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="flex flex-col sm:flex-row gap-4"
                        >
                            <Link
                                href="/urunler"
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-fire-gradient text-white font-semibold rounded-xl hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 hover:scale-[1.02] animate-pulse-fire"
                            >
                                {t("ctaPrimary")}
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>
                            <Link
                                href="/iletisim"
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 glass text-foreground font-semibold rounded-xl hover:bg-surface-light transition-all duration-300"
                            >
                                {t("ctaSecondary")}
                            </Link>
                        </motion.div>
                    </div>

                    {/* Right Side - Stats Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="hidden lg:block"
                    >
                        <div className="glass rounded-2xl p-8 space-y-6">
                            {/* System Status Header */}
                            <div className="flex items-center justify-between border-b border-border/50 pb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                                    <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
                                        {t("systemStatus")}
                                    </span>
                                </div>
                                <span className="font-mono text-xs text-green-400">{t("online")}</span>
                            </div>

                            {/* Technical Specs */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">{t("fireIntegrity")}</span>
                                    <div className="flex items-center gap-2">
                                        <div className="w-24 h-2 bg-surface-light rounded-full overflow-hidden">
                                            <motion.div
                                                className="h-full bg-fire-gradient rounded-full"
                                                initial={{ width: 0 }}
                                                animate={{ width: "100%" }}
                                                transition={{ duration: 2, delay: 0.5 }}
                                            />
                                        </div>
                                        <span className="font-mono text-xs text-primary">E120</span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">{t("radiationControl")}</span>
                                    <div className="flex items-center gap-2">
                                        <div className="w-24 h-2 bg-surface-light rounded-full overflow-hidden">
                                            <motion.div
                                                className="h-full bg-fire-gradient rounded-full"
                                                initial={{ width: 0 }}
                                                animate={{ width: "83%" }}
                                                transition={{ duration: 2, delay: 0.7 }}
                                            />
                                        </div>
                                        <span className="font-mono text-xs text-primary">EW60</span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">{t("standard")}</span>
                                    <span className="font-mono text-xs text-muted-foreground">EN 13501-2</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">{t("certifiedBy")}</span>
                                    <div className="flex items-center gap-2">
                                        <span className="px-2 py-0.5 text-xs font-mono bg-primary/10 text-primary rounded">CE</span>
                                        <span className="px-2 py-0.5 text-xs font-mono bg-primary/10 text-primary rounded">ISO</span>
                                        <span className="px-2 py-0.5 text-xs font-mono bg-primary/10 text-primary rounded">TSE</span>
                                    </div>
                                </div>
                            </div>

                            {/* Fire line separator */}
                            <div className="fire-line" />

                            {/* Showcase label */}
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-muted-foreground font-mono uppercase tracking-wider">
                                    {t("advancedEngineering")}
                                </span>
                                <div className="flex items-center gap-1.5">
                                    <div className="w-2 h-2 rounded-full bg-primary" />
                                    <div className="w-2 h-2 rounded-full bg-fire-light" />
                                    <div className="w-2 h-2 rounded-full bg-caution" />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Bottom Stats Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="mt-16 lg:mt-24"
                >
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {STATISTICS.map((stat, i) => (
                            <div key={i} className="glass rounded-xl p-5 text-center hover-glow transition-all duration-300">
                                <div className="text-3xl font-display font-bold text-fire-gradient mb-1">
                                    {stat.value}{stat.suffix || ""}
                                </div>
                                <div className="text-xs text-muted-foreground uppercase tracking-wider">
                                    {(stat.label as Record<string, string>)[locale] || stat.label.tr}
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
