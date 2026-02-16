import Link from "next/link";
import { company } from "@/data/site-content";
import { siteConfig } from "@/lib/seo";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 py-16 bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid gap-12 md:grid-cols-3">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link
              href="/"
              className="font-display text-2xl text-white tracking-tight uppercase"
            >
              {company.name}
            </Link>
            <p className="text-sm text-white/50 mt-3 max-w-sm">
              {company.description}
            </p>
            <address className="not-italic text-sm text-white/30 mt-4 font-mono leading-relaxed">
              <p>DigitalX Solutions HQ</p>
              <p>16 Boldrewood Ave</p>
              <p>Casula, NSW, Australia - 2170</p>
            </address>
          </div>

          {/* Quick Links + Contact */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <p className="text-xs uppercase text-white/30 tracking-widest mb-4 font-mono">
                Navigate
              </p>
              <ul className="space-y-3">
                <li>
                  <a href="#services" className="text-sm text-white/50 hover:text-white transition-colors">
                    Services
                  </a>
                </li>
                <li>
                  <a href="#work" className="text-sm text-white/50 hover:text-white transition-colors">
                    Work
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-sm text-cobalt hover:text-white transition-colors">
                    Start a Project
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-xs uppercase text-white/30 tracking-widest mb-4 font-mono">
                Connect
              </p>
              <ul className="space-y-3">
                <li>
                  <a
                    href={`mailto:${company.email}`}
                    className="text-sm text-white/50 hover:text-white transition-colors"
                  >
                    Email
                  </a>
                </li>
                {Object.entries(company.socials).map(([name, url]) => (
                  <li key={name}>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-white/50 hover:text-white transition-colors capitalize"
                    >
                      {name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-xs uppercase text-white/30 tracking-widest mb-4 font-mono">
                Share
              </p>
              <ul className="space-y-3">
                <li>
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(company.description)}&url=${encodeURIComponent(siteConfig.domain)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white/50 hover:text-white transition-colors"
                  >
                    X (Twitter)
                  </a>
                </li>
                <li>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(siteConfig.domain)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white/50 hover:text-white transition-colors"
                  >
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/20 font-mono">
            © {currentYear} {company.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
