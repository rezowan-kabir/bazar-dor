import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getAuth } from './lib/auth'

export async function proxy(request: NextRequest) {
  const session = await getAuth().api.getSession({
    headers: request.headers,
  })

  if (!session?.user) {
    const signInUrl = new URL("/signin", request.url);
    signInUrl.searchParams.set("redirect", request.nextUrl.pathname);
    signInUrl.searchParams.set("auth", "required");
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/profile/:path*", "/product/:path*"],
}