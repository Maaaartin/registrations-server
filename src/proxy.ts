import { NextResponse, type NextRequest } from 'next/server';

export function proxy(req: NextRequest) {
  const { method, nextUrl } = req;
  const timestamp = new Date().toISOString();
  console.info(
    `[proxy] ${timestamp} ${method} ${nextUrl.pathname}${nextUrl.search}`
  );

  const response = NextResponse.next();
  response.headers.set(
    'Cache-Control',
    'public, s-maxage=3600, stale-while-revalidate=3600'
  );

  return response;
}

export const config = {
  // Skip Next.js internal assets (e.g., /_next/static/*)
  matcher: ['/((?!_next/).*)']
};
