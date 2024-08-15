import Image from 'next/image'
import React from 'react'
import { useAuthContext } from '../providers/AuthContextProvider'

function UserAvatar({
  className,
  children,
  ...props
}: JSX.IntrinsicElements['figure']) {
  const { avatar, userName } = useAuthContext()

  return (
    <>
      <figure
        className={`h-10 w-10 overflow-hidden rounded-full border ${className}`}
        {...props}
      >
        <Image
          src={avatar}
          alt={userName}
          width={40}
          height={40}
          className="h-full w-full"
        />
      </figure>
    </>
  )
}

export default UserAvatar
