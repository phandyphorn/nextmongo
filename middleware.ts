// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const res = NextResponse.next();

  // Set CORS headers
  res.headers.set("Access-Control-Allow-Origin", "https://schs.vercel.app");
  res.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.headers.set("Access-Control-Allow-Headers", "Content-Type");

  return res;
}

// Apply the middleware only to API routes
export const config = {
  matcher: '/api/:path*',
};
