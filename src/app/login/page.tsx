import { FC } from 'react'
import DualTagCarousel from '@/components/DualTagCarousel'
import SigInContainer from './components/SignInContainer'
import SignupContainer from './components/SignUpContainer'
import styles from './index.module.css'

interface IProps {
}

const Login: FC<IProps> = () => {
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
