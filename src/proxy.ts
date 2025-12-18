import { NextResponse, type NextRequest } from 'next/server';

export function proxy(req: NextRequest) {
  const { method, nextUrl } = req;
  console.info(`[proxy] ${method} ${nextUrl.pathname}${nextUrl.search}`);

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
