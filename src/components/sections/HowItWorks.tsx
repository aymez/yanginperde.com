"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useState } from "react";

export function HowItWorks() {
    const t = useTranslations("howItWorks");
    const [activeStep, setActiveStep] = useState(0);

    const steps = [0, 1, 2, 3];

    const statusColors: Record<string, string> = {
        BEKLEMEDE: "text-muted-foreground bg-surface-light",
        ALARM: "text-caution bg-caution/10",
        AKTİF: "text-primary bg-primary/10",
        MÜHÜRLÜ: "text-green-400 bg-green-400/10",
    };

    return (
        <section className="relative py-24 lg:py-32 bg-background overflow-hidden">
            <div className="absolute inset-0 bg-grid-fire opacity-20" />

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
                            {t("systemLogic")}
                        </span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold">
                        <span className="text-foreground">{t("gravityFailSafe")} </span>
                        <span className="text-fire-gradient">{t("mechanism")}</span>
                    </h2>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left - Steps */}
                    <div className="space-y-4">
                        {steps.map((step) => {
                            const status = t(`stages.${step}.status`);
                            const colorClass = statusColors[status] || "text-muted-foreground bg-surface-light";

                            return (
                                <motion.button
                                    key={step}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: step * 0.1 }}
                                    onClick={() => setActiveStep(step)}
                                    className={`w-full text-left glass rounded-xl p-6 transition-all duration-300 ${activeStep === step
                                            ? "border-primary/40 glow-fire-sm"
                                            : "hover:border-border/60"
                                        }`}
                                >
                                    <div className="flex items-start gap-4">
                                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 font-mono text-sm font-bold ${activeStep === step
                                                ? "bg-fire-gradient text-white"
                                                : "bg-surface-light text-muted-foreground"
                                            }`}>
                                            {String(step + 1).padStart(2, "0")}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between mb-2">
                                                <h3 className="font-display text-sm font-bold text-foreground uppercase tracking-wider">
                                                    {t(`stages.${step}.title`)}
                                                </h3>
                                                <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase ${colorClass}`}>
                                                    {status}
                                                </span>
                                            </div>
                                            <p className="text-sm text-muted-foreground">
                                                {t(`stages.${step}.description`)}
                                            </p>
                                        </div>
                                    </div>
                                </motion.button>
                            );
                        })}
                    </div>

                    {/* Right - Visual */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="hidden lg:block"
                    >
                        <div className="glass rounded-2xl p-8 aspect-square flex items-center justify-center relative overflow-hidden">
                            {/* Building outline */}
                            <div className="relative w-48 h-64 border-2 border-border/40 rounded-lg">
                                {/* Floor separator */}
                                <div className="absolute top-1/3 left-0 right-0 border-t border-border/30" />
                                <div className="absolute top-2/3 left-0 right-0 border-t border-border/30" />

                                {/* Headbox */}
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-6 px-4 py-1 rounded bg-surface-light border border-border/40">
                                    <span className="font-mono text-[9px] text-muted-foreground uppercase tracking-widest">{t("headbox")}</span>
                                </div>

                                {/* Fire Curtain - animated */}
                                <motion.div
                                    className="absolute left-1/2 -translate-x-1/2 top-0 w-1 bg-fire-gradient rounded-full"
                                    animate={{
                                        height: activeStep === 0 ? "0%" : activeStep === 1 ? "30%" : activeStep === 2 ? "70%" : "100%",
                                    }}
                                    transition={{ duration: 1, ease: "easeInOut" }}
                                />

                                {/* Fire glow */}
                                {activeStep >= 1 && (
                                    <motion.div
                                        className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary/20 to-transparent"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: activeStep >= 1 ? 1 : 0, height: "40%" }}
                                        transition={{ duration: 0.5 }}
                                    />
                                )}

                                {/* Sealed indicator */}
                                {activeStep === 3 && (
                                    <motion.div
                                        className="absolute inset-0 border-2 border-green-400/40 rounded-lg"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.5 }}
                                    />
                                )}
                            </div>

                            {/* Step label */}
                            <div className="absolute bottom-4 left-0 right-0 text-center">
                                <span className="font-mono text-xs text-muted-foreground">
                                    {t("step")} {activeStep + 1}/4 — {t(`stages.${activeStep}.title`)}
                                </span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
