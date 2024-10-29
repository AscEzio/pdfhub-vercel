'use client'

import React, { FC, useState } from 'react'
import { useRouter } from 'next/navigation'
import { signInWithRedirect, getRedirectResult } from 'firebase/auth'
import { FirebaseError } from 'firebase/app'
import { next } from '@/components/DualTagCarousel'
import { firebaseAuth, googleProvider } from '@/firebase/app'
import { FibaseErrorCode } from '@/firebase/constants'
import styles from './index.module.css'

interface IProps {
}

const SignInContainer: FC<IProps> = () => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassWord] = useState('')

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value
    setEmail(value)
  }

  const handlePassWordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value
    setPassWord(value)
  }

  const toSignUp = () => {
    next()
  }

  const handleSignIn = async () => {
    try {
      const resJSON = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })

      })
      const res = await resJSON.json()
      console.log('signin res:', res)
      if (res.code === 200) {
        alert('登录成功')
        router.push('/home')
      }
      if (res.code === FibaseErrorCode.InvalidCredential) {
        alert('邮箱或密码错误')
      }
      if (res.code === FibaseErrorCode.InvalidEmail) {
        alert('请输入有效邮箱')
      }
    } catch (err) {
      if ((err instanceof FirebaseError)) {
        console.log('signup err:', err, err.code, err.message)
      } else {
        console.log('signup err:', err)
      }
    }
  }

  const handleSignInWithGoogle = async () => {
    if (process.env.NODE_ENV === 'development') {
      alert('第三方登录仅在线上环境中可用')
      return
    }
    signInWithRedirect(firebaseAuth, googleProvider)
  }

  const getTestResult = async () => {
    try {
      const res = await getRedirectResult(firebaseAuth)
      console.log('重定向用户数据:', res)
    } catch (err) {
      console.log('获取重定向用户数据失败:', err)
    }
  }

  return (
    <div className={styles.container}>
      <div>
        <div>
          <span>邮箱</span>
          <input type="email" value={email} onChange={handleEmailChange} />
        </div>
        <div>
          <span>密码</span>
          <input type="password" value={password} onChange={handlePassWordChange} />
        </div>
      </div>
      <div className={styles['button-container']}>
        <button onClick={handleSignIn}>登录</button>
        <button onClick={handleSignInWithGoogle}>使用google账号登录</button>
        <button onClick={getTestResult}>测试获取重定向用户数据</button>
      </div>
      <div>
        <span>还没有账号？<span onClick={toSignUp}>注册一个</span></span>
      </div>
    </div>
  )
}

export default SignInContainer
