'use client'
import React from 'react'
import { useAuthContext } from '../providers/AuthContextProvider'

const UserName = ({
  className,
  children,
  ...props
}: JSX.IntrinsicElements['div']) => {
  const { userName } = useAuthContext()

  return (
    <div className={`text-sm ${className}`} {...props}>
      @{userName}
    </div>
  )
}

export default UserName
