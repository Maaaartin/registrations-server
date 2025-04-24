import { NextResponse } from 'next/server';

export function middleware() {
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
