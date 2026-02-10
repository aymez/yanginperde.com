"use client";

import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import { Product } from "@/types";
import { Locale } from "@/i18n/config";

interface Props {
    product: Product;
    relatedProducts: Product[];
    locale: Locale;
}

export default function ProductDetailClient({ product, relatedProducts, locale }: Props) {
    const t = useTranslations("productDetail");

    const name = (product.name as Record<string, string>)[locale] || product.name.tr;
    const description = (product.description as Record<string, string>)[locale] || product.description.tr;
    const features = ((product.features as Record<string, string[]>)[locale] || product.features.tr) as string[];
    const usageAreas = ((product.usageAreas as Record<string, string[]>)[locale] || product.usageAreas.tr) as string[];
    const advantages = ((product.advantages as Record<string, string[]>)[locale] || product.advantages.tr) as string[];

    return (
        <div className="min-h-screen bg-background">
            {/* Hero */}
            <section className="relative py-28 lg:py-36 overflow-hidden">
                <div className="absolute inset-0 bg-grid-fire opacity-30" />
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
                            <Link href="/urunler" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                                {t("backToProducts")}
                            </Link>
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">{name}</h1>
                            <p className="text-muted-foreground leading-relaxed mb-8">{description}</p>
                            <Link href="/teklif-al" className="inline-flex items-center gap-2 px-8 py-4 bg-fire-gradient text-white font-semibold rounded-xl hover:shadow-xl hover:shadow-primary/30 transition-all duration-300">
                                {t("getQuote")}
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>
                        </motion.div>
                        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}>
                            <div className="glass rounded-2xl overflow-hidden">
                                <img src={product.images[0] || "/images/placeholder-product.jpg"} alt={name} className="w-full aspect-[4/3] object-cover" />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Specifications */}
            <section className="py-16 bg-surface">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Technical Specs */}
                        <div className="glass rounded-xl p-6">
                            <h2 className="font-display text-sm font-bold text-primary uppercase tracking-wider mb-6">{t("specifications")}</h2>
                            <div className="space-y-4">
                                {product.specifications.map((spec, i) => (
                                    <div key={i} className="flex justify-between items-center border-b border-border/30 pb-3 last:border-0">
                                        <span className="text-sm text-muted-foreground">{spec.label}</span>
                                        <span className="font-mono text-sm text-foreground">{spec.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Features */}
                        <div className="glass rounded-xl p-6">
                            <h2 className="font-display text-sm font-bold text-primary uppercase tracking-wider mb-6">{t("features")}</h2>
                            <ul className="space-y-3">
                                {features.map((feature, i) => (
                                    <li key={i} className="flex gap-3 text-sm text-muted-foreground">
                                        <svg className="w-4 h-4 text-primary shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Advantages */}
                        <div className="glass rounded-xl p-6">
                            <h2 className="font-display text-sm font-bold text-primary uppercase tracking-wider mb-6">{t("advantages")}</h2>
                            <ul className="space-y-3">
                                {advantages.map((adv, i) => (
                                    <li key={i} className="flex gap-3 text-sm text-muted-foreground">
                                        <svg className="w-4 h-4 text-primary shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                        {adv}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Usage Areas */}
            <section className="py-16 bg-background">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl font-display font-bold text-foreground mb-8 text-center">{t("usageAreas")}</h2>
                    <div className="flex flex-wrap justify-center gap-3">
                        {usageAreas.map((area, i) => (
                            <span key={i} className="px-4 py-2 glass rounded-lg text-sm text-muted-foreground">{area}</span>
                        ))}
                    </div>
                </div>
            </section>

            {/* Related Products */}
            {relatedProducts.length > 0 && (
                <section className="py-16 bg-surface">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-2xl font-display font-bold text-foreground mb-8 text-center">{t("relatedProducts")}</h2>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {relatedProducts.map((rp) => (
                                <Link key={rp.id} href={`/urunler/${rp.slug}`}>
                                    <div className="group glass rounded-xl overflow-hidden hover-glow transition-all duration-300 cursor-pointer">
                                        <div className="relative aspect-[4/3] overflow-hidden bg-surface-light">
                                            <img src={rp.images[0] || "/images/placeholder-product.jpg"} alt={(rp.name as Record<string, string>)[locale] || rp.name.tr} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                        </div>
                                        <div className="p-5">
                                            <h3 className="font-display font-bold text-foreground group-hover:text-primary transition-colors">{(rp.name as Record<string, string>)[locale] || rp.name.tr}</h3>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
}
