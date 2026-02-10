"use client";

import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import { projects } from "@/data/projects";

export function References() {
    const t = useTranslations("references");
    const locale = useLocale();

    const featuredProjects = projects.filter((p) => p.featured).slice(0, 4);

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
                            {t("globalApplications")}
                        </span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-4">
                        <span className="text-foreground">{t("selected")} </span>
                        <span className="text-fire-gradient">{t("projects")}</span>
                    </h2>
                    <p className="text-muted-foreground max-w-xl mx-auto">{t("subtitle")}</p>
                </motion.div>

                {/* Project Cards */}
                <div className="grid sm:grid-cols-2 gap-6 mb-12">
                    {featuredProjects.map((project, i) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                        >
                            <Link href={`/projeler/${project.slug}`}>
                                <div className="group glass rounded-xl overflow-hidden hover-glow transition-all duration-300 cursor-pointer">
                                    {/* Image */}
                                    <div className="relative h-56 overflow-hidden">
                                        <img
                                            src={project.images[0]}
                                            alt={(project.title as Record<string, string>)[locale] || project.title.tr}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-carbon via-transparent to-transparent" />
                                        <div className="absolute bottom-4 left-4 right-4">
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-primary/20 text-primary uppercase">
                                                    {project.year}
                                                </span>
                                                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-surface-light/80 text-muted-foreground uppercase">
                                                    {project.location}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6">
                                        <h3 className="font-display text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                                            {(project.title as Record<string, string>)[locale] || project.title.tr}
                                        </h3>
                                        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                                            {(project.description as Record<string, string>)[locale] || project.description.tr}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* View All Button */}
                <div className="text-center">
                    <Link
                        href="/projeler"
                        className="inline-flex items-center gap-2 px-6 py-3 glass text-foreground text-sm font-medium rounded-xl hover:bg-surface-light hover:text-primary transition-all duration-300"
                    >
                        {t("viewAllProjects")}
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
}
