import { updateSession } from "@/lib/supabase/middleware";
import { type NextRequest, NextResponse } from "next/server";

// Standard edge runtime for better compatibility
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}

export async function middleware(request: NextRequest) {
  // First, handle Supabase session
  const response = await updateSession(request);
  
  // Create new response to modify headers
  const newResponse = new NextResponse(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers
  });
  
  // 🔒 SECURITY: Force override sensitive headers
  newResponse.headers.set('Server', 'ThongNhat-Web/1.0');
  newResponse.headers.set('X-Powered-By', 'Government Digital Services');
  
  // Try to remove Vercel-specific headers (may not work due to platform limitations)
  newResponse.headers.delete('x-vercel-id');
  newResponse.headers.delete('x-nextjs-prerender');
  newResponse.headers.delete('x-nextjs-stale-time');
  newResponse.headers.delete('x-matched-path');
  newResponse.headers.delete('x-vercel-cache');
  newResponse.headers.delete('x-vercel-execution-region');
  
  // Additional security headers (backup for next.config.ts)
  newResponse.headers.set('X-Frame-Options', 'SAMEORIGIN');
  newResponse.headers.set('X-Content-Type-Options', 'nosniff');
  newResponse.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  newResponse.headers.set('X-DNS-Prefetch-Control', 'on');
  
  // 🔒 FORCE REMOVE Wildcard CORS - Security Critical
  newResponse.headers.delete('access-control-allow-origin');
  
  // 🔒 CORS Security: Restrict access to trusted origins only
  const allowedOrigins = [
    'https://thongnhat.giakiemso.com',
    'https://giakiemso.com',
    'https://www.thongnhat.giakiemso.com'
  ];
  
  const origin = request.headers.get('origin');
  const isAllowedOrigin = origin && allowedOrigins.includes(origin);
  
  // Set CORS headers for all requests
  if (isAllowedOrigin) {
    newResponse.headers.set('Access-Control-Allow-Origin', origin);
  } else {
    newResponse.headers.set('Access-Control-Allow-Origin', 'https://thongnhat.giakiemso.com');
  }
  
  newResponse.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  newResponse.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  newResponse.headers.set('Access-Control-Allow-Credentials', 'true');
  
  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 200, headers: newResponse.headers });
  }
  
  // Additional API-specific CORS (backup)
  if (request.nextUrl.pathname.startsWith('/api/')) {
    // API endpoints already handled by general CORS above
    console.log('API request detected:', request.nextUrl.pathname);
  }
  
  return newResponse;
}
