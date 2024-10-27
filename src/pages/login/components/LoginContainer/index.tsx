import React, { FC, useState } from 'react'
import { next } from '@/components/DualTagCarousel'
import styles from './index.module.css'

interface IProps {
}

const LoginContainer: FC<IProps> = () => {
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

  const handleLogin = () => {
    
  }

  const toSignUp = () => {
    next()
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
      <div className={styles.boxContainer}>
        <button>登录</button>
        <button>使用google账号登录</button>
      </div>
      <div>
        <span>还没有账号？<span onClick={toSignUp}>注册一个</span></span>
      </div>
    </div>
  )
}

export default LoginContainer
