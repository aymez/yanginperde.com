"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

interface ContactFormProps {
    variant?: "default" | "minimal";
}

// Declare global window type for reCAPTCHA
declare global {
    interface Window {
        grecaptcha: {
            ready: (callback: () => void) => void;
            render: (container: HTMLElement, options: {
                sitekey: string;
                callback: (token: string) => void;
                'expired-callback': () => void;
                theme?: 'light' | 'dark';
                size?: 'compact' | 'normal';
            }) => number;
            reset: (widgetId?: number) => void;
        };
        onRecaptchaLoad?: () => void;
    }
}

// reCAPTCHA v2 site key (public - production key)
const RECAPTCHA_SITE_KEY = "6LfXFmQsAAAAACfYiYNA4zSDPU2IhdpZmczqSY8_";

const inputClasses = "w-full px-4 py-3.5 bg-surface-light border border-border/50 rounded-xl text-foreground placeholder:text-muted-foreground/50 focus:ring-2 focus:ring-primary/30 focus:border-primary/50 focus:bg-surface transition-all duration-200";

export function ContactForm({ variant = "default" }: ContactFormProps) {
    const t = useTranslations("contact.form");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
    const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);
    const recaptchaRef = useRef<HTMLDivElement>(null);
    const widgetIdRef = useRef<number | null>(null);

    const subjectOptions = [
        { value: "", label: t("subject") },
        { value: "quote", label: "Teklif Talebi / Quote Request" },
        { value: "info", label: "Bilgi Talebi / Information Request" },
        { value: "support", label: "Teknik Destek / Technical Support" },
        { value: "other", label: "Diğer / Other" },
    ];

    useEffect(() => {
        if (document.querySelector('script[src*="recaptcha"]')) {
            if (window.grecaptcha) setRecaptchaLoaded(true);
            return;
        }
        window.onRecaptchaLoad = () => setRecaptchaLoaded(true);
        const script = document.createElement('script');
        script.src = `https://www.google.com/recaptcha/api.js?onload=onRecaptchaLoad&render=explicit`;
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
        return () => { delete window.onRecaptchaLoad; };
    }, []);

    useEffect(() => {
        if (recaptchaLoaded && recaptchaRef.current && widgetIdRef.current === null) {
            try {
                widgetIdRef.current = window.grecaptcha.render(recaptchaRef.current, {
                    sitekey: RECAPTCHA_SITE_KEY,
                    callback: (token: string) => { setRecaptchaToken(token); setError(null); },
                    'expired-callback': () => setRecaptchaToken(null),
                    theme: 'dark',
                    size: 'normal',
                });
            } catch { console.log('reCAPTCHA widget already rendered'); }
        }
    }, [recaptchaLoaded]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!recaptchaToken) {
            setError(t("recaptchaRequired") || "Lütfen robot olmadığınızı doğrulayın");
            return;
        }
        const form = e.currentTarget;
        const formData = new FormData(form);
        setIsSubmitting(true);
        setError(null);
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: formData.get("name"),
                    email: formData.get("email"),
                    phone: formData.get("phone") || "",
                    subject: formData.get("subject") || "",
                    message: formData.get("message"),
                    recaptchaToken,
                }),
            });
            const data = await res.json().catch(() => ({}));
            if (!res.ok) { setError(data.error || t("error")); return; }
            setIsSubmitted(true);
        } catch { setError(t("error")); }
        finally { setIsSubmitting(false); }
    };

    if (isSubmitted) {
        return (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-16">
                <div className="w-20 h-20 mx-auto mb-6 bg-emerald-500/10 rounded-full flex items-center justify-center">
                    <svg className="w-10 h-10 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h3 className="text-2xl font-display font-bold text-foreground mb-3">{t("success")}</h3>
                <p className="text-muted-foreground max-w-md mx-auto">{t("successDesc")}</p>
                <button
                    onClick={() => { setIsSubmitted(false); setRecaptchaToken(null); if (window.grecaptcha && widgetIdRef.current !== null) window.grecaptcha.reset(widgetIdRef.current); }}
                    className="mt-8 px-6 py-3 bg-fire-gradient text-white font-medium rounded-xl hover:shadow-lg hover:shadow-primary/30 transition-all"
                >
                    {t("sendAnother") || "Yeni Mesaj Gönder"}
                </button>
            </motion.div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">{t("name")} <span className="text-primary">*</span></label>
                    <input name="name" type="text" required className={inputClasses} />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">{t("email")} <span className="text-primary">*</span></label>
                    <input name="email" type="email" required className={inputClasses} />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">{t("phone")}</label>
                    <input name="phone" type="tel" placeholder="0532 xxx xx xx" className={inputClasses} />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">{t("subject")} <span className="text-primary">*</span></label>
                    <select name="subject" required className={`${inputClasses} appearance-none cursor-pointer`}
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23888' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'right 16px center',
                        }}
                    >
                        {subjectOptions.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                    </select>
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">{t("message")} <span className="text-primary">*</span></label>
                <textarea name="message" placeholder={t("messagePlaceholder")} rows={5} required className={`${inputClasses} resize-none`} />
            </div>

            <div className="flex flex-col items-start gap-2">
                <div ref={recaptchaRef} />
                {!recaptchaLoaded && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        <span>reCAPTCHA yükleniyor...</span>
                    </div>
                )}
            </div>

            {error && (
                <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 px-4 py-3 rounded-xl">
                    {error}
                </motion.p>
            )}

            <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full py-4 rounded-xl font-semibold text-lg bg-fire-gradient text-white hover:shadow-lg hover:shadow-primary/30 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300"
            >
                {isSubmitting ? (
                    <>
                        <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        <span>{t("sending") || "Gönderiliyor..."}</span>
                    </>
                ) : (
                    <>
                        <span>{t("submit")}</span>
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                    </>
                )}
            </motion.button>
        </form>
    );
}
