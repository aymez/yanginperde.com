import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 relative overflow-hidden bg-background">
            {/* Arkaplan Efektleri */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/5 via-background to-background opacity-40 pointer-events-none" />

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-fire-gradient opacity-5 blur-[100px] rounded-full pointer-events-none" />

            <div className="relative z-10 max-w-2xl">
                <h1 className="text-[120px] md:text-[200px] font-bold leading-none bg-gradient-to-b from-[#D00000] via-[#E85D04] to-transparent bg-clip-text text-transparent select-none drop-shadow-2xl font-display">
                    404
                </h1>

                <div className="-mt-4 md:-mt-12 mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                        Sayfa Bulunamadı
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-md mx-auto">
                        Aradığınız sayfa mevcut değil, silinmiş veya taşınmış olabilir.
                    </p>
                </div>

                <Link
                    href="/"
                    className="group relative inline-flex items-center gap-3 px-8 py-4 bg-surface border border-border rounded-xl overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20"
                >
                    <div className="absolute inset-0 bg-fire-gradient opacity-0 group-hover:opacity-10 transition-opacity duration-300" />

                    <svg className="w-5 h-5 text-primary transition-transform duration-300 group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>

                    <span className="font-semibold text-white group-hover:text-primary transition-colors">
                        Ana Sayfaya Dön
                    </span>
                </Link>
            </div>
        </div>
    );
}
