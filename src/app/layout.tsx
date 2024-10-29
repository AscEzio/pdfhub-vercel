import { FC } from 'react'

interface IProps {
  children: React.ReactNode
}

const RootLayout: FC<IProps> = ({ children }) => {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}

export default RootLayout
