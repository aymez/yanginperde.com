import { Link } from "@/i18n/routing";

const translations: Record<string, Record<string, string>> = {
    tr: {
        title: "Sayfa Bulunamadı",
        description: "Aradığınız sayfa bulunamadı veya taşınmış olabilir.",
        back: "Ana Sayfaya Dön",
        copyright: "© 2024 YANGIN PERDE. Tüm hakları saklıdır.",
    },
    en: {
        title: "Page Not Found",
        description: "The page you are looking for could not be found or may have been moved.",
        back: "Back to Home",
        copyright: "© 2024 YANGIN PERDE. All rights reserved.",
    },
};

export default function NotFound() {
    const t = translations.tr;

    return (
        <html lang="tr">
            <body className="font-sans antialiased bg-[#0a0a0a] text-[#e5e5e5]">
                <div className="min-h-screen flex items-center justify-center px-4">
                    <div className="text-center">
                        <div className="text-8xl font-bold bg-gradient-to-r from-[#E8501E] to-[#FF6B35] bg-clip-text text-transparent mb-4">404</div>
                        <h1 className="text-2xl font-bold text-white mb-4">{t.title}</h1>
                        <p className="text-[#999] mb-8 max-w-md mx-auto">{t.description}</p>
                        <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#E8501E] to-[#FF6B35] text-white rounded-xl font-semibold hover:shadow-lg transition-all">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            {t.back}
                        </Link>
                    </div>
                </div>
            </body>
        </html>
    );
}
