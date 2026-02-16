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
        <main className="min-h-screen flex items-center justify-center bg-background text-foreground">
            <div className="text-center space-y-6 px-6">
                <h1 className="text-7xl font-bold font-heading tracking-tighter text-white/90">
                    404
                </h1>
                <p className="text-lg text-white/50 max-w-md mx-auto">
                    This page doesn&apos;t exist. It might have been moved or deleted.
                </p>
                <Link
                    href="/"
                    className="inline-block px-6 py-3 rounded-full bg-white/10 text-white/80 hover:bg-white/20 transition-colors duration-300 text-sm tracking-wide"
                >
                    ← Back to Home
                </Link>
            </div>
        </main>
    );
}
