import { NextRequest, NextResponse } from 'next/server'

interface ITokens {
    accessToken: string,
    refreshToken: string
}

export async function POST (request: NextRequest) {
  const tokens: ITokens = await request.json()
  const response = NextResponse.json({
    code: 200,
    message: 'cookie设置成功'
  })
  Object.entries(tokens).forEach(([key, value]) => {
    response.cookies.set(key, value, { path: '/' })
  })
  return response
}
