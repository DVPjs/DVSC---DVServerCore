import { type NextRequest, NextResponse } from 'next/server';
import { allowedOrigins } from './config';

export function middleware(request: NextRequest) {
  // Request Logging
  const { ip, method, nextUrl } = request;
  const timestamp = new Date().toISOString();
  console.log(
    `[${timestamp}] ${method} ${nextUrl.pathname} - IP: ${ip || 'N/A'}`
  );

  // CORS Whitelisting
  const origin = request.headers.get('origin');
  
  // Allow requests with no origin (e.g., same-origin, server-to-server)
  if (!origin) {
    return NextResponse.next();
  }

  // In development, allow requests from localhost.
  if (process.env.NODE_ENV === 'development' && new URL(origin).hostname === 'localhost') {
    return addCorsHeaders(NextResponse.next(), origin);
  }

  if (allowedOrigins.includes(origin)) {
    return addCorsHeaders(NextResponse.next(), origin);
  }

  // If origin is not allowed, return a forbidden response.
  return new NextResponse('Forbidden: Origin not allowed', {
    status: 403,
  });
}

function addCorsHeaders(response: NextResponse, origin: string): NextResponse {
  response.headers.set('Access-Control-Allow-Origin', origin);
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  response.headers.set('Access-Control-Allow-Credentials', 'true');
  return response;
}

export const config = {
  matcher: '/api/:path*', // Adjust this to match your API routes if any
};
