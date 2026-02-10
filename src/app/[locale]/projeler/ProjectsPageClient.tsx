"use client";

import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import { projects } from "@/data/projects";
import { Locale } from "@/i18n/config";
import { useState } from "react";

export default function ProjectsPageClient({ locale }: { locale: Locale }) {
    const t = useTranslations("projects");
    const [filter, setFilter] = useState<string | null>(null);

    const categories = [...new Set(projects.map((p) => p.category))];
    const filteredProjects = filter ? projects.filter((p) => p.category === filter) : projects;

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

            {/* Filter */}
            <section className="py-8 bg-surface border-b border-border/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap justify-center gap-3">
                    <button
                        onClick={() => setFilter(null)}
                        className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${!filter ? "bg-fire-gradient text-white shadow-lg shadow-primary/30" : "glass text-muted-foreground hover:text-foreground"}`}
                    >
                        {t("all")}
                    </button>
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${filter === cat ? "bg-fire-gradient text-white shadow-lg shadow-primary/30" : "glass text-muted-foreground hover:text-foreground"}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </section>

            {/* Grid */}
            <section className="py-16 bg-background">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProjects.map((project, i) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                            >
                                <Link href={`/projeler/${project.slug}`}>
                                    <div className="group glass rounded-xl overflow-hidden hover-glow transition-all duration-300 cursor-pointer h-full">
                                        <div className="relative h-56 overflow-hidden">
                                            <img
                                                src={project.images[0]}
                                                alt={(project.title as Record<string, string>)[locale] || project.title.tr}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-carbon/80 via-transparent to-transparent" />
                                            <div className="absolute bottom-4 left-4 flex items-center gap-2">
                                                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-primary/20 text-primary uppercase">{project.year}</span>
                                                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-surface-light/80 text-muted-foreground uppercase">{project.location}</span>
                                            </div>
                                        </div>
                                        <div className="p-6">
                                            <h3 className="font-display text-lg font-bold text-foreground group-hover:text-primary transition-colors mb-2">
                                                {(project.title as Record<string, string>)[locale] || project.title.tr}
                                            </h3>
                                            <p className="text-sm text-muted-foreground line-clamp-2">
                                                {(project.description as Record<string, string>)[locale] || project.description.tr}
                                            </p>
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
