import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const url = request.nextUrl.clone();

    if (url.hostname.startsWith('www.')) {
        url.hostname = url.hostname.replace('www.', '');
        return NextResponse.redirect(url, 301);
    }

    const normalizedPath = url.pathname !== '/' ? url.pathname.replace(/\/+$/, '') : '/';

    if (normalizedPath !== url.pathname) {
        url.pathname = normalizedPath;
        return NextResponse.redirect(url, 301);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
