import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Page Not Found | DigitalX Solutions",
    description: "The page you are looking for does not exist.",
    robots: {
        index: false,
        follow: false,
    },
};

export default function NotFound() {
    return (
        <main className="min-h-[70vh] flex items-center justify-center px-4 py-16">
            <div className="w-full max-w-xl rounded-3xl border border-border bg-surface-50 p-10 text-center">
                <h1 className="text-7xl font-display font-bold tracking-tight text-foreground">
                    404
                </h1>
                <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-foreground/68">
                    This page doesn&apos;t exist. It might have been moved or deleted.
                </p>
                <Link
                    href="/"
                    className="mt-7 inline-flex rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-deep"
                >
                    Back to Home
                </Link>
            </div>
        </main>
    );
}
