"use client";

import { useEffect, useState } from "react";
import { Mail } from "lucide-react";

interface ObfuscatedEmailProps {
  user?: string;
  domain?: string;
  className?: string;
}

export function ObfuscatedEmail({
  user = "info",
  domain = "digitalx-solutions.com",
  className = "",
}: ObfuscatedEmailProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const fullEmail = `${user}@${domain}`;

  if (!mounted) {
    return (
      <span className={`inline-flex min-h-[44px] items-center gap-1.5 text-sm font-medium text-brand ${className}`}>
        <Mail className="h-4 w-4 shrink-0" />
        <span>{user} [at] {domain}</span>
      </span>
    );
  }

  return (
    <a
      href={`mailto:${fullEmail}`}
      aria-label={`Email us at ${fullEmail}`}
      className={`inline-flex min-h-[44px] items-center gap-1.5 text-sm font-medium text-brand transition-colors hover:text-brand-deep ${className}`}
    >
      <Mail className="h-4 w-4 shrink-0" />
      <span>{fullEmail}</span>
    </a>
  );
}
