"use client";

import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import { categories, mainCategories, products } from "@/data/products";
import { useState } from "react";

export default function ProductsPageClient() {
    const t = useTranslations("products");
    const locale = useLocale();
    const [activeCategory, setActiveCategory] = useState<string | null>(null);

    const filteredProducts = activeCategory
        ? products.filter((p) => p.category === activeCategory)
        : products;

    return (
        <div className="min-h-screen bg-background">
            {/* Hero */}
            <section className="relative py-28 lg:py-36 overflow-hidden">
                <div className="absolute inset-0 bg-grid-fire opacity-30" />
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <div className="inline-flex items-center gap-2 px-4 py-2 glass-fire rounded-full mb-6">
                            <span className="text-xs font-medium text-primary uppercase tracking-wider">{t("catalog")}</span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6">{t("title")}</h1>
                        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">{t("subtitle")}</p>
                    </motion.div>
                </div>
            </section>

            {/* Category Filter */}
            <section className="py-8 bg-surface border-b border-border/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-wrap justify-center gap-3">
                        <button
                            onClick={() => setActiveCategory(null)}
                            className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${!activeCategory
                                    ? "bg-fire-gradient text-white shadow-lg shadow-primary/30"
                                    : "glass text-muted-foreground hover:text-foreground"
                                }`}
                        >
                            {t("all")}
                        </button>
                        {categories.map((cat) => (
                            <button
                                key={cat.slug}
                                onClick={() => setActiveCategory(cat.slug)}
                                className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${activeCategory === cat.slug
                                        ? "bg-fire-gradient text-white shadow-lg shadow-primary/30"
                                        : "glass text-muted-foreground hover:text-foreground"
                                    }`}
                            >
                                {(cat.name as Record<string, string>)[locale] || cat.name.tr}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Products Grid */}
            <section className="py-16 bg-background">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProducts.map((product, i) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                            >
                                <Link href={`/urunler/${product.slug}`}>
                                    <div className="group glass rounded-xl overflow-hidden hover-glow transition-all duration-300 cursor-pointer h-full">
                                        {/* Product Image */}
                                        <div className="relative aspect-[4/3] overflow-hidden bg-surface-light">
                                            <img
                                                src={product.images[0] || "/images/placeholder-product.jpg"}
                                                alt={(product.name as Record<string, string>)[locale] || product.name.tr}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-carbon/80 via-transparent to-transparent" />
                                            {product.featured && (
                                                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-fire-gradient text-white text-[10px] font-mono font-bold uppercase">
                                                    {t("featured")}
                                                </div>
                                            )}
                                        </div>

                                        {/* Content */}
                                        <div className="p-6">
                                            <h3 className="font-display text-lg font-bold text-foreground group-hover:text-primary transition-colors mb-2">
                                                {(product.name as Record<string, string>)[locale] || product.name.tr}
                                            </h3>
                                            <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed mb-4">
                                                {(product.shortDescription as Record<string, string>)[locale] || product.shortDescription.tr}
                                            </p>
                                            <div className="flex items-center gap-2 text-primary text-sm font-medium group-hover:gap-3 transition-all">
                                                <span>{t("viewDetails")}</span>
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
