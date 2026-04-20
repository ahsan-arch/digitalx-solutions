import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const LEGACY_PATH_REDIRECTS: Record<string, string> = {
    '/services': '/solutions',
    '/services/web-dev': '/solutions/web-development',
    '/services/nextjs-development': '/solutions/web-development',
    '/services/revenue-operations': '/solutions/ai-automation',
    '/services/conversational-ai': '/solutions/ai-automation',
    '/services/ai-voice-receptionists': '/solutions/ai-automation',
    '/services/meta-ads': '/solutions/performance-marketing',
    '/services/meta-ads-engineering': '/solutions/performance-marketing',
};

export function middleware(request: NextRequest) {
    const url = request.nextUrl.clone();

    // Redirect www to non-www
    if (url.hostname.startsWith('www.')) {
        url.hostname = url.hostname.replace('www.', '');
        return NextResponse.redirect(url, 301);
    }

    const normalizedPath = url.pathname !== '/' ? url.pathname.replace(/\/+$/, '') : '/';

    // Legacy IA redirects for SEO-safe migration to Solutions x Industries.
    const redirectTarget = LEGACY_PATH_REDIRECTS[normalizedPath];
    if (redirectTarget) {
        url.pathname = redirectTarget;
        return NextResponse.redirect(url, 301);
    }

    // Trailing slash normalization - remove trailing slashes (except root).
    if (normalizedPath !== url.pathname) {
        url.pathname = normalizedPath;
        return NextResponse.redirect(url, 301);
    }

    const response = NextResponse.next();

    // Security headers
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-XSS-Protection', '1; mode=block');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    response.headers.set(
        'Strict-Transport-Security',
        'max-age=63072000; includeSubDomains; preload'
    );
    response.headers.set(
        'Permissions-Policy',
        'camera=(), microphone=(self), geolocation=()'
    );

    return response;
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
