import React, { FC, useState, useEffect } from 'react'
import classNames from 'classnames'
import styles from './index.module.css'

export let next = () => { }
export let last = () => { }

interface CarouselItemProps {
    // 可以添加一些所有子组件都应该有的通用属性
    className?: string,
}

interface IProps {
    className?: string,
    style?: React.CSSProperties,
    children?: React.ReactElement<CarouselItemProps> | React.ReactElement<CarouselItemProps>[];
}

const DualTagCarousel: FC<IProps> = (props) => {
  const { className, style, children } = props
  const [showId, setShowId] = useState(0)

  useEffect(() => {
    next = () => {
      setShowId((showId) => showId + 1)
    }
    last = () => {
      setShowId((showId) => showId - 1)
    }
  })

  return (
    <div className={classNames(styles.container, className)} style={style}>
      {
        children
          ? (
            React.Children.map(children, (child, index) => {
              if (React.isValidElement<CarouselItemProps>(child)) {
                const needShow = index === showId || index === showId + 1
                const className = classNames(styles.common, needShow ? styles.show : styles.hide)
                return (
                  <div className={className} key={child.key || index}>
                    {
                      React.createElement(child.type, {
                        ...child.props,
                        key: child.key || index,
                        className: child.props.className || ''
                      })
                    }
                  </div>
                )
              }
              return null
            })
          )
          : null
      }
    </div>
  )
}

export default DualTagCarousel
