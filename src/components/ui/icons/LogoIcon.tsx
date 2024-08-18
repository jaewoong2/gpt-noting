'use client'

import useMount from '@/hooks/useMount'
import { useTheme } from 'next-themes'
import Image, { ImageProps } from 'next/image'
import React from 'react'

function LogoIcon({
  ...props
}: Omit<ImageProps, 'src' | 'alt' | 'width' | 'height'>) {
  const mounted = useMount()
  const { theme } = useTheme()

  if (!mounted) {
    return null
  }

  return (
    <>
      {theme === 'dark' && (
        <Image
          src="https://images.prlc.kr/images/noting_logo_word_white2.png"
          alt="Noting Logo"
          width={60}
          height={60}
          {...props}
        />
      )}
      {theme === 'light' && (
        <Image
          src="https://images.prlc.kr/images/noting_logo_word.png"
          alt="Noting Logo"
          width={60}
          height={60}
          {...props}
        />
      )}
    </>
  )
}

export default LogoIcon
