"use client";

import { Link } from "@/i18n/routing";

interface LogoProps {
    className?: string;
}

export function Logo({ className = "" }: LogoProps) {
    return (
        <Link href="/" className={`inline-block flex-shrink-0 ${className} no-underline`}>
            <div className="font-display font-bold text-2xl tracking-tight text-foreground">
                YANGIN<span className="text-primary">PERDE</span>
            </div>
        </Link>
    );
}
