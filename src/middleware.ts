import { type NextRequest, NextResponse } from 'next/server';
import { allowedOrigins } from './config';

export function middleware(request: NextRequest) {
  const { ip, method, nextUrl } = request;
  const timestamp = new Date().toISOString();
  console.log(
    `[${timestamp}] ${method} ${nextUrl.pathname} - IP: ${ip || 'N/A'}`
  );

  if (nextUrl.pathname.startsWith('/api/webhook')) {
    const authHeader = request.headers.get('Authorization');
    const expectedToken = `Bearer ${process.env.DVS_WEBHOOK_SECRET}`;

    if (authHeader !== expectedToken) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
    return NextResponse.next();
  }
  
  const origin = request.headers.get('origin');
  
  if (!origin) {
    return NextResponse.next();
  }

  if (process.env.NODE_ENV === 'development' && new URL(origin).hostname === 'localhost') {
    return addCorsHeaders(NextResponse.next(), origin);
  }

  if (allowedOrigins.includes(origin)) {
    return addCorsHeaders(NextResponse.next(), origin);
  }

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
  matcher: ['/api/:path*'],
};
