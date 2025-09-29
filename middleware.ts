import { updateSession } from "@/lib/supabase/middleware";
import { type NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  // First, handle Supabase session
  const response = await updateSession(request);
  
  // Add security headers and remove sensitive information
  const headers = new Headers(response.headers);
  
  // Additional security headers (backup for next.config.ts)
  headers.set('X-Frame-Options', 'SAMEORIGIN');
  headers.set('X-Content-Type-Options', 'nosniff');
  headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  headers.set('X-DNS-Prefetch-Control', 'on');
  
  // 🔒 SECURITY: Remove sensitive headers that leak infrastructure info
  headers.delete('Server');
  headers.delete('X-Powered-By');
  headers.delete('x-vercel-id');
  headers.delete('x-nextjs-prerender');
  headers.delete('x-nextjs-stale-time');
  headers.delete('x-matched-path');
  headers.delete('x-vercel-cache');
  headers.delete('x-vercel-execution-region');
  
  // Set custom server header to hide real infrastructure
  headers.set('Server', 'ThongNhat-Web/1.0');
  headers.set('X-Powered-By', 'Thống Nhất Digital Services');
  
  // Restrict CORS for better security (instead of allowing all origins)
  if (request.nextUrl.pathname.startsWith('/api/')) {
    headers.set('Access-Control-Allow-Origin', 'https://thongnhat.giakiemso.com');
    headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  }
  
  return new NextResponse(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers
  });
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
