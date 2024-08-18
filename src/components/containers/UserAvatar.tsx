'use client'

import Image from 'next/image'
import React from 'react'
import { useAuthContext } from '../providers/AuthContextProvider'

type Props = {
  avatar?: string
  userName?: string
} & JSX.IntrinsicElements['figure']

function UserAvatar({ className, children, ...props }: Props) {
  const { avatar, userName } = useAuthContext()

  if (!(avatar || props.avatar)) return null

  return (
    <figure
      className={`h-10 w-10 overflow-hidden rounded-full border bg-white ${className}`}
      {...props}
    >
      <Image
        src={props.avatar ?? avatar}
        alt={props.userName ?? userName}
        width={40}
        height={40}
        className="h-full w-full"
      />
    </figure>
  )
}

export default UserAvatar
