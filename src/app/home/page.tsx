'use client'

import { FC } from 'react'
import { useRouter } from 'next/navigation'

interface IProps {
}

const Home: FC<IProps> = () => {
  const router = useRouter()

  const handleLogout = async () => {
    const r = await fetch('/api/logout', { method: 'DELETE' })
    const res = await r.json()
    if (res.success) {
      router.push('/login')
    }
  }

  return (
    <div>
      home
      <button onClick={handleLogout}>登出</button>
    </div>
  )
}

export default Home
