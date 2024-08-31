import { useEffect, useState } from 'react'

// Chrome 사용자인지 확인하는 함수
const isChrome = (): boolean =>
  /Chrome/.test(navigator.userAgent) && !/Edge|OPR/.test(navigator.userAgent)

// 데스크탑 사용자인지 확인하는 함수
const isDesktop = (): boolean => !/Mobi|Android/i.test(navigator.userAgent)

// Custom Hook 정의
const useDeviceType = () => {
  const [isChromeUser, setIsChromeUser] = useState<boolean>(false)
  const [isDesktopUser, setIsDesktopUser] = useState<boolean>(false)
  const [isChromeDesktopUser, setIsChromeDesktopUser] = useState<boolean>(false)

  useEffect(() => {
    const chromeUser = isChrome()
    const desktopUser = isDesktop()

    setIsChromeUser(chromeUser)
    setIsDesktopUser(desktopUser)
    setIsChromeDesktopUser(chromeUser && desktopUser) // 둘 다 true인 경우에만 true
  }, [])

  return { isChromeUser, isDesktopUser, isChromeDesktopUser }
}

export default useDeviceType
