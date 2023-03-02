import React, { FC, memo, useEffect, useState } from 'react'
import classNames from 'classnames'
import { navigateBack } from '../../common/hooks'
import { getSystemInfo, getMenuButtonBoundingClientRect, usePageScroll } from '@tarojs/taro'
import { Text, View } from '@tarojs/components'
import './index.scss'
import '../../assets/iconfont/iconfont.css'

interface NavBarProps {
  title?: string | null
  style?: any
  iconStyle?: any
  scrollShow?: boolean
  layout?: 'left' | 'center'
  onBack?: () => any
}

interface SystemSizePrpos {
  windowHeight: number
  statusBarHeight: number
  screenHeight: number
  windowWidth: number
  screenWidth: number
  customNavHeight: number
}

let tryGetDeviceInfoCount = 3
export const NavBar: FC<NavBarProps> = memo(
  ({ title = '', layout = 'center', scrollShow, onBack, iconStyle = {} }) => {
    const [systemSize, setSystemSize] = useState<SystemSizePrpos>({
      windowHeight: 0,
      statusBarHeight: 0,
      screenHeight: 0,
      windowWidth: 0,
      screenWidth: 0,
      customNavHeight: 0,
    })

    const [top, setTop] = useState(0)
    const isScroll = top >= 110

    useEffect(() => {
      getSystemInfo({
        success(systemInfo: any) {
          setSystemSize(systemInfo)
          let { statusBarHeight, windowHeight, screenHeight, windowWidth, screenWidth } = systemInfo
          try {
            const { top, bottom } = getMenuButtonBoundingClientRect()
            if (top === bottom || top === 0 || bottom === 0 || statusBarHeight === 0) {
              tryGetDeviceInfoCount = tryGetDeviceInfoCount - 1
              if (tryGetDeviceInfoCount < 0) throw new Error()
              return getSystemInfo()
            }
            const paddingTop = top - statusBarHeight
            windowHeight = screenHeight - bottom - paddingTop
          } catch (e) {
            windowHeight = screenHeight - 68
          }

          setSystemSize({
            windowHeight,
            statusBarHeight,
            screenHeight,
            windowWidth,
            screenWidth,
            customNavHeight: screenHeight - windowHeight,
          })
        },
      })
    }, [])

    const { customNavHeight, statusBarHeight } = systemSize
    usePageScroll(({ scrollTop }) => setTop(scrollTop))

    return (
      <View
        className={classNames('sd_navbar', { bg: isScroll })}
        style={{
          height: customNavHeight + 'PX',
          paddingTop: statusBarHeight + 'PX',
        }}
      >
        <View
          className='sd_navbar-content'
          style={{ height: customNavHeight - statusBarHeight + 'PX' }}
        >
          <View
            className='sd_navbar-content-back'
            onClick={() => {
              if (onBack) return onBack()
              navigateBack()
            }}
          >
            <View className='sd_iconfont icon-a-zuo2x' style={iconStyle} />
            {layout === 'left' && (isScroll || !scrollShow) && (
              <Text className='left-title'>{title}</Text>
            )}
          </View>

          {layout === 'center' && (isScroll || !scrollShow) && (
            <Text className='sd_navbar-content-title'>{title}</Text>
          )}
        </View>
      </View>
    )
  }
)
