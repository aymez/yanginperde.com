"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import { categories } from "@/data/products";
import { useState } from "react";

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
    const t = useTranslations("nav");
    const locale = useLocale();
    const [productsOpen, setProductsOpen] = useState(false);

    const fireCategories = categories.filter((c) => c.mainCategory === "yangin-sistemleri");
    const smokeCategories = categories.filter((c) => c.mainCategory === "duman-sistemleri");

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
                        onClick={onClose}
                    />

                    {/* Menu Panel */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 28, stiffness: 300 }}
                        className="fixed top-0 right-0 bottom-0 w-[320px] bg-carbon z-50 lg:hidden overflow-y-auto"
                    >
                        {/* Fire accent line */}
                        <div className="absolute top-0 left-0 bottom-0 w-[3px] bg-fire-gradient" />

                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-border/50">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-lg bg-fire-gradient flex items-center justify-center">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-white">
                                        <path d="M13.5 0.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z" fill="currentColor" />
                                    </svg>
                                </div>
                                <span className="font-display text-sm font-bold tracking-wider">
                                    YANGIN<span className="text-primary"> PERDE</span>
                                </span>
                            </div>
                            <button onClick={onClose} className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-surface-light transition-colors">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Navigation */}
                        <nav className="p-6 space-y-1">
                            <Link href="/" onClick={onClose} className="block px-4 py-3 text-sm font-medium text-foreground hover:text-primary hover:bg-surface-light rounded-lg transition-all">
                                {t("home")}
                            </Link>

                            {/* Products Accordion */}
                            <div>
                                <button
                                    onClick={() => setProductsOpen(!productsOpen)}
                                    className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-foreground hover:text-primary hover:bg-surface-light rounded-lg transition-all"
                                >
                                    <span>{t("products")}</span>
                                    <svg className={`w-4 h-4 transition-transform ${productsOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>

                                <AnimatePresence>
                                    {productsOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="pl-4 space-y-0.5 pb-2">
                                                <div className="px-4 py-2 text-xs font-display font-bold text-primary uppercase tracking-wider">
                                                    {t("fireSystems")}
                                                </div>
                                                {fireCategories.map((cat) => (
                                                    <Link key={cat.slug} href={`/urunler/${cat.slug}`} onClick={onClose} className="block px-4 py-2 text-sm text-muted-foreground hover:text-primary rounded-lg transition-colors">
                                                        {(cat.name as Record<string, string>)[locale] || cat.name.tr}
                                                    </Link>
                                                ))}
                                                <div className="px-4 py-2 text-xs font-display font-bold text-smoke uppercase tracking-wider mt-2">
                                                    {t("smokeSystems")}
                                                </div>
                                                {smokeCategories.map((cat) => (
                                                    <Link key={cat.slug} href={`/urunler/${cat.slug}`} onClick={onClose} className="block px-4 py-2 text-sm text-muted-foreground hover:text-primary rounded-lg transition-colors">
                                                        {(cat.name as Record<string, string>)[locale] || cat.name.tr}
                                                    </Link>
                                                ))}
                                                <Link href="/urunler" onClick={onClose} className="block px-4 py-2 text-sm text-primary font-medium rounded-lg transition-colors">
                                                    {t("allProducts")} →
                                                </Link>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            <Link href="/ozel-cozumler" onClick={onClose} className="block px-4 py-3 text-sm font-medium text-foreground hover:text-primary hover:bg-surface-light rounded-lg transition-all">
                                {t("customSolutions")}
                            </Link>

                            <Link href="/projeler" onClick={onClose} className="block px-4 py-3 text-sm font-medium text-foreground hover:text-primary hover:bg-surface-light rounded-lg transition-all">
                                {t("projects")}
                            </Link>

                            <Link href="/hakkimizda" onClick={onClose} className="block px-4 py-3 text-sm font-medium text-foreground hover:text-primary hover:bg-surface-light rounded-lg transition-all">
                                {t("about")}
                            </Link>

                            <Link href="/iletisim" onClick={onClose} className="block px-4 py-3 text-sm font-medium text-foreground hover:text-primary hover:bg-surface-light rounded-lg transition-all">
                                {t("contact")}
                            </Link>
                        </nav>

                        {/* CTA */}
                        <div className="p-6 pt-0">
                            <Link
                                href="/teklif-al"
                                onClick={onClose}
                                className="flex items-center justify-center gap-2 w-full px-5 py-3 bg-fire-gradient text-white text-sm font-semibold rounded-lg hover:shadow-lg hover:shadow-primary/30 transition-all"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                {t("getQuote")}
                            </Link>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
