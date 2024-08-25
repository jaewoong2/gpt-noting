'use client'

import Image from 'next/image'
import React from 'react'
import { useAuthContext } from '../providers/AuthContextProvider'

type Props = {
  avatar?: string
  userName?: string
} & JSX.IntrinsicElements['figure']

function UserAvatar({ className, children, ...props }: Props) {
  const auth = useAuthContext()

  const avatar = props.avatar
    ? props.avatar
    : auth.avatar
      ? auth.avatar
      : 'https://images.prlc.kr/images/jeans.png'

  const userName = props.userName
    ? props.userName
    : auth.userName
      ? auth.userName
      : 'Null'

  return (
    <figure
      className={`h-10 w-10 overflow-hidden rounded-full border bg-white ${className}`}
      {...props}
    >
      <Image
        src={avatar}
        alt={userName}
        width={40}
        height={40}
        className="h-full w-full"
        loading="lazy"
      />
    </figure>
  )
}

export default UserAvatar
