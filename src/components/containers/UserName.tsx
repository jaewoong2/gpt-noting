'use client'

import React from 'react'
import { useAuthContext } from '../providers/AuthContextProvider'

function UserName({
  className,
  children,
  ...props
}: JSX.IntrinsicElements['div'] & { userName?: string }) {
  const { userName } = useAuthContext()

  return (
    <div className={`text-sm ${className}`} {...props}>
      {props.userName ?? userName}
    </div>
  )
}

export default UserName
