'use client'

import Image, { ImageProps } from 'next/image'
import React from 'react'

function LogoIcon({
  ...props
}: Omit<ImageProps, 'src' | 'alt' | 'width' | 'height'>) {
  return (
    <>
      <Image
        key="dark"
        src="https://images.prlc.kr/images/noting_logo_word_white2.png"
        alt="Noting Logo"
        width={60}
        height={60}
        className="hidden h-auto w-auto dark:block"
        {...props}
      />
      <Image
        key="light"
        src="https://images.prlc.kr/images/noting_logo_word.png"
        alt="Noting Logo"
        width={60}
        height={60}
        className="block h-auto w-auto dark:hidden"
        {...props}
      />
    </>
  )
}

export default LogoIcon
