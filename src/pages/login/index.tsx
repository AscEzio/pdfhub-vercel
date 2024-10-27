import { FC } from 'react'
import DualTagCarousel from '@/components/DualTagCarousel'
import LoginContainer from './components/LoginContainer'
import styles from './index.module.css'

interface IProps {
}

const Login: FC<IProps> = () => {
  return (
    <div className={styles.page}>
      <DualTagCarousel className={styles.container}>
        <LoginContainer />
        <div></div>
        <div></div>
      </DualTagCarousel>
    </div>
  )
}

export default Login
