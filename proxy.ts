import { NextResponse, type NextRequest } from "next/server"

const AUTH_COOKIE_KEYS = ["rl_auth", "auth_token", "token", "session"] as const

const isAuthenticated = (request: NextRequest) =>
  AUTH_COOKIE_KEYS.some((cookieKey) => {
    const value = request.cookies.get(cookieKey)?.value
    return Boolean(value && value.trim().length > 0)
  })

const buildLoginRedirect = (request: NextRequest) => {
  const loginUrl = new URL("/login", request.url)
  const nextPath = `${request.nextUrl.pathname}${request.nextUrl.search}`
  loginUrl.searchParams.set("next", nextPath)
  return loginUrl
}

export function proxy(request: NextRequest) {
  if (!isAuthenticated(request)) {
    return NextResponse.redirect(buildLoginRedirect(request))
  }
  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/payment/:path*"],
}
