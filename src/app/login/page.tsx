'use client'

import { FC, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getRedirectResult } from 'firebase/auth'
import { firebaseAuth } from '@/firebase/app'
import DualTagCarousel from '@/components/DualTagCarousel'
import SigInContainer from './components/SignInContainer'
import SignupContainer from './components/SignUpContainer'
import styles from './index.module.css'

interface IProps {
}

const Login: FC<IProps> = () => {
  const router = useRouter()

  useEffect(() => {
    (
      async function () {
        try {
          const loginResult = await getRedirectResult(firebaseAuth)
          if (!loginResult) {
            throw new Error('getRedirectResult failed')
          }
          const userInfo = loginResult.user
          const accessToken = (await userInfo.getIdTokenResult()).token
          const refreshToken = userInfo.refreshToken
          const res = await fetch('/api/cookie', {
            method: 'POST',
            body: JSON.stringify({
              accessToken,
              refreshToken
            })
          })
          const { code } = await res.json()
          if (code === 200) {
            alert('登录成功')
            router.push('/home')
          } else {
            throw new Error('setCookie failed')
          }
        } catch (err) {
          console.log('获取重定向用户数据失败:', err)
        }
      }
    )()
  }, [])
  return (
    <div className={styles.page}>
      <DualTagCarousel className={styles.container}>
        <SigInContainer />
        <div></div>
        <SignupContainer />
      </DualTagCarousel>
    </div>
  )
}

export default Login
