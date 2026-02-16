import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const url = request.nextUrl.clone();

    // Skip for localhost during development to avoid confusion
    if (url.hostname === 'localhost' || url.hostname === '127.0.0.1') {
        return NextResponse.next();
    }

    // Redirect www to non-www
    if (url.hostname.startsWith('www.')) {
        url.hostname = url.hostname.replace('www.', '');
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
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
