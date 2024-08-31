'use client'

import React from 'react'
import { useAuthContext } from '../providers/AuthContextProvider'

function UserName({
  className,
  children,
  userName: propsUserName,
  ...props
}: JSX.IntrinsicElements['div'] & { userName?: string }) {
  const { userName } = useAuthContext()

  return (
    <div className={`text-sm ${className}`} {...props}>
      {propsUserName ?? userName}
    </div>
  )
}

export default UserName
