import { NextRequest, NextResponse } from 'next/server'
import { signInWithEmailAndPassword, signInWithRedirect } from 'firebase/auth'
import { FirebaseError } from 'firebase/app'
import { firebaseAuth } from '@/firebase/app'

export async function POST (request: NextRequest) {
  const { email, password } = await request.json()
  try {
    const res = await signInWithEmailAndPassword(firebaseAuth, email, password)
    const userInfo = res.user
    const accessToken = (await userInfo.getIdTokenResult()).token
    const refreshToken = userInfo.refreshToken
    const response = NextResponse.json({
      success: true,
      message: '登录成功',
      code: 200
    })
    response.cookies.set('accessToken', accessToken, { path: '/' })
    response.cookies.set('refreshToken', refreshToken, { path: '/' })
    return response
  } catch (err) {
    console.log('err__________________________', err)
    if (err instanceof FirebaseError) {
      const response = NextResponse.json({
        success: false,
        message: err.message,
        code: err.code
      })
      return response
    }
    const response = NextResponse.json({
      success: false,
      message: '登录失败',
      code: 401
    })
    return response
  }
}


