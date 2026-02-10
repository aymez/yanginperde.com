"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

// reCAPTCHA v2 site key (production)
const RECAPTCHA_SITE_KEY = "6LfXFmQsAAAAACfYiYNA4zSDPU2IhdpZmczqSY8_";

const inputClasses = "w-full px-4 py-3.5 bg-surface-light border border-border/50 rounded-xl text-foreground placeholder:text-muted-foreground/50 focus:ring-2 focus:ring-primary/30 focus:border-primary/50 focus:bg-surface transition-all duration-200";

export function QuoteForm() {
    const t = useTranslations("quote.form");
    const tCat = useTranslations("quote.categories");

    const PRODUCT_CATEGORIES = [
        { value: "", label: t("productPlaceholder"), disabled: true },
        { value: "dis-mekan", label: tCat("outdoor"), disabled: true },
        { value: "dikey-zip-perde", label: tCat("verticalZip") },
        { value: "yatay-zip-perde", label: tCat("horizontalZip") },
        { value: "bioklimatik-pergola", label: tCat("pergola") },
        { value: "tente-sistemleri", label: tCat("awning") },
        { value: "cam-balkon", label: tCat("glassBalcony") },
        { value: "sineklik", label: tCat("insectScreen") },
        { value: "ic-mekan", label: tCat("indoor"), disabled: true },
        { value: "stor-perde", label: tCat("roller") },
        { value: "screen-stor", label: tCat("screenRoller") },
        { value: "blackout-perde", label: tCat("blackout") },
        { value: "zebra-perde", label: tCat("zebra") },
        { value: "jaluzi-perde", label: tCat("venetian") },
        { value: "dikey-perde", label: tCat("vertical") },
        { value: "mefrusat-perde", label: tCat("drapery") },
        { value: "diger", label: tCat("other") },
    ];

    const [formData, setFormData] = useState({
        name: "", email: "", phone: "", product: "", area: "", address: "", message: "",
    });

    const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);
    const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");
    const recaptchaRef = useRef<number | null>(null);

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
        return () => {
            if (recaptchaRef.current !== null && window.grecaptcha) {
                try { window.grecaptcha.reset(recaptchaRef.current); } catch (e) { console.error("reCAPTCHA reset error:", e); }
            }
        };
    }, []);

    useEffect(() => {
        if (recaptchaLoaded && window.grecaptcha && recaptchaRef.current === null) {
            try {
                const container = document.getElementById('recaptcha-container');
                if (container) {
                    recaptchaRef.current = window.grecaptcha.render(container, {
                        sitekey: RECAPTCHA_SITE_KEY,
                        callback: (token: string) => setRecaptchaToken(token),
                        'expired-callback': () => setRecaptchaToken(null),
                        theme: 'dark',
                    });
                }
            } catch (error) { console.error("reCAPTCHA render error:", error); }
        }
    }, [recaptchaLoaded]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!recaptchaToken) { setErrorMessage(t("recaptchaRequired")); return; }
        setIsSubmitting(true);
        setErrorMessage("");
        try {
            const response = await fetch("/api/quote", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...formData, recaptchaToken }),
            });
            const data = await response.json();
            if (data.success) {
                setSubmitStatus("success");
                setFormData({ name: "", email: "", phone: "", product: "", area: "", address: "", message: "" });
                if (recaptchaRef.current !== null && window.grecaptcha) window.grecaptcha.reset(recaptchaRef.current);
                setRecaptchaToken(null);
            } else {
                setSubmitStatus("error");
                setErrorMessage(data.error || "Bir hata oluştu");
            }
        } catch {
            setSubmitStatus("error");
            setErrorMessage("Bağlantı hatası. Lütfen tekrar deneyin.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (submitStatus === "success") {
        return (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
                <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h3 className="text-2xl font-display font-bold text-foreground mb-4">{t("success")}</h3>
                <p className="text-muted-foreground mb-8">{t("successDesc")}</p>
                <button onClick={() => setSubmitStatus("idle")} className="px-8 py-3 bg-fire-gradient text-white rounded-xl hover:shadow-lg hover:shadow-primary/30 font-medium transition-all">
                    {t("sendAnother")}
                </button>
            </motion.div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">{t("name")} <span className="text-primary">*</span></label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className={inputClasses} placeholder={t("name")} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">{t("email")} <span className="text-primary">*</span></label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className={inputClasses} placeholder="example@email.com" />
                </div>
                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">{t("phone")} <span className="text-primary">*</span></label>
                    <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required className={inputClasses} placeholder="05XX XXX XX XX" />
                </div>
            </div>

            <div>
                <label htmlFor="product" className="block text-sm font-medium text-foreground mb-2">{t("product")} <span className="text-primary">*</span></label>
                <select id="product" name="product" value={formData.product} onChange={handleChange} required className={`${inputClasses} appearance-none cursor-pointer`}
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23888' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right 16px center',
                    }}
                >
                    {PRODUCT_CATEGORIES.map(cat => <option key={cat.value} value={cat.value} disabled={cat.disabled}>{cat.label}</option>)}
                </select>
            </div>

            <div>
                <label htmlFor="area" className="block text-sm font-medium text-foreground mb-2">{t("area")}</label>
                <input type="text" id="area" name="area" value={formData.area} onChange={handleChange} className={inputClasses} placeholder={t("areaPlaceholder")} />
            </div>

            <div>
                <label htmlFor="address" className="block text-sm font-medium text-foreground mb-2">{t("address")}</label>
                <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} className={inputClasses} placeholder={t("addressPlaceholder")} />
            </div>

            <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">{t("message")}</label>
                <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows={4} className={`${inputClasses} resize-none`} placeholder={t("messagePlaceholder")} />
            </div>

            <div className="flex justify-center">
                <div id="recaptcha-container" />
            </div>

            {errorMessage && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl text-sm">{errorMessage}</div>
            )}

            <motion.button
                type="submit"
                disabled={isSubmitting || !recaptchaToken}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full py-4 bg-fire-gradient text-white rounded-xl font-semibold text-lg hover:shadow-lg hover:shadow-primary/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
                {isSubmitting ? t("sending") : t("submit")}
            </motion.button>
        </form>
    );
}
