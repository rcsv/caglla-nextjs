// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {

    const isAuthenticated = request.cookies.has('sb_access_token');

    if (!isAuthenticated && request.nextUrl.pathname.startsWith('/my')) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
}