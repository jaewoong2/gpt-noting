import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export const preventScroll = () => {
  const currentScrollY = window.scrollY
  document.body.style.position = 'fixed'
  document.body.style.width = '100%'
  document.body.style.top = `-${currentScrollY}px` // 현재 스크롤 위치
  document.body.style.overflowY = 'scroll'
  return currentScrollY
}

/**
 * 스크롤을 허용하고, 스크롤 방지 함수에서 반환된 위치로 이동한다.
 * @param prevScrollY 스크롤 방지 함수에서 반환된 스크롤 위치
 */
export const allowScroll = (prevScrollY: number) => {
  document.body.style.position = ''
  document.body.style.width = ''
  document.body.style.top = ''
  document.body.style.overflowY = ''
  window.scrollTo(0, prevScrollY)
}

const useModal = ({ isModal }: { isModal: boolean }) => {
  const { back } = useRouter()
  const [isOpen, setIsOpen] = useState<boolean | null>(true)

  const dismiss = () => {
    setIsOpen(false)
    setTimeout(() => {
      back()
    }, 150)
  }

  useEffect(() => {
    if (!isModal) return

    const prevScrollY = preventScroll()

    // eslint-disable-next-line consistent-return
    return () => {
      allowScroll(prevScrollY)
    }
  }, [isModal])

  return {
    isOpen,
    dismiss,
  }
}

export default useModal
