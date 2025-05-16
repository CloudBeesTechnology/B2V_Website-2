import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  
  // Prevent caching of authenticated pages
  if (!request.nextUrl.pathname.startsWith('/signIn') && 
      !request.nextUrl.pathname.startsWith('/signUp')) {
    response.headers.set('Cache-Control', 'no-store, max-age=0');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
  }
  
  return response;
}