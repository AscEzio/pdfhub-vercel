import { NextResponse } from 'next/server'

export async function DELETE () {
  const response = NextResponse.json({
    success: true,
    message: '退出成功',
    code: 200
  })
  response.cookies.set('accessToken', '', { maxAge: 0 })
  response.cookies.set('refreshToken', '', { maxAge: 0 })
  return response
}
