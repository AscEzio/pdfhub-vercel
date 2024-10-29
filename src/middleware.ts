import { NextResponse, NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware (request: NextRequest) {
  // 首页重定向
  if (request.nextUrl.pathname === '/') {
    return NextResponse.redirect(
      new URL('/home', request.url)
    )
  }
  // 登录鉴权
  const accessToken = request.cookies.get('accessToken')
  const refreshToken = request.cookies.get('refreshToken')
  if (request.nextUrl.pathname !== '/login') {
    if (!!accessToken || !!refreshToken) {
      return NextResponse.redirect(
        new URL('/login', request.url)
      )
    }
  }

  console.log(request.nextUrl.pathname, '123')
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)']
}
