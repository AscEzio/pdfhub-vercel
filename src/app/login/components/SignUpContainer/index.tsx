'use client'

import React, { FC, useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { FirebaseError } from 'firebase/app'
import { last } from '@/components/DualTagCarousel'
import { firebaseAuth } from '@/firebase/app'
import { FibaseErrorCode } from '@/firebase/constants'
import styles from './index.module.css'

interface IProps {
}

const SignupContainer: FC<IProps> = () => {
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

  const handleSignUp = async () => {
    try {
      const res = await createUserWithEmailAndPassword(firebaseAuth, email, password)
      console.log('signup res:', res)
      const userInfo = res.user
      const accessToken = (await userInfo.getIdTokenResult()).token
      const refreshToken = userInfo.refreshToken
      localStorage.setItem('accessToken', accessToken)
      localStorage.setItem('refreshToken', refreshToken)
      alert('注册成功')
    } catch (err) {
      if ((err instanceof FirebaseError)) {
        console.log('signup err:', err, err.code, err.message)
        if (err.code === FibaseErrorCode.ReSignup) {
          alert('该邮箱已注册')
        }
      } else {
        console.log('signup err:', err)
      }
    }
  }

  const toSignUp = () => {
    last()
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
        <button onClick={handleSignUp}>注册</button>
        <button>使用google账号注册</button>
      </div>
      <div>
        <span>已有账号，<span onClick={toSignUp}>立即登录</span></span>
      </div>
    </div>
  )
}

export default SignupContainer
