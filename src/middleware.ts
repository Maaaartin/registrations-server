import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  response.headers.set(
    'Cache-Control',
    'public, s-maxage=3600, stale-while-revalidate=3600'
  );

  return response;
}

export const config = {
  matcher: '/:path*'
};
