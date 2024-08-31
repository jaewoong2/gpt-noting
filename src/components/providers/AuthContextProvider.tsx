'use client'

import { useUserGetMe } from '@/apis/services/user/useUserService'
import { User } from '@/lib/type'
import { setCookie } from 'cookies-next'
import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

type ExtensionGoogleAuth = {
  status: string
  response: {
    access_token: string
    email: string
    family_name: string
    given_name: string
    id: string
    is_public: boolean
    name: string
    userName: string
    picture: string
    verified_email: boolean
  }
}

type AuthContextType = {
  avatar: string
  userName: string
  accessToken: string
  email: string
  isPublic: boolean
  userId: string
  likes?: User['likes']
}

const AuthContext = createContext<AuthContextType | null>(null)

export const useAuthContext = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('Needs Comment Context Provider')
  }

  return context
}

function AuthContextProvider({ children }: PropsWithChildren) {
  const [avatar, setAvatar] = useState('')
  const [userName, setUserName] = useState('')
  const [accessToken, setAccessToken] = useState('')
  const [userId, setUserId] = useState('')
  const [email, setEmail] = useState('')
  const [isPublic, setIsPublic] = useState(true)
  const user = useUserGetMe({ enabled: !!accessToken })

  const value = useMemo(
    (): AuthContextType => ({
      accessToken,
      avatar,
      email,
      isPublic,
      userName,
      userId,
      likes: user.data?.data?.likes,
    }),
    [
      accessToken,
      avatar,
      email,
      isPublic,
      userName,
      userId,
      user.data?.data?.likes,
    ],
  )

  useEffect(() => {
    if (typeof chrome === 'undefined') return

    chrome?.runtime?.sendMessage(
      process.env.NEXT_PUBLIC_GOOGLE_EXTENSION_ID,
      {
        type: 'GET_USER_INFO',
      },
      ({ status, response }: ExtensionGoogleAuth) => {
        if (status === 'success') {
          setCookie('access_token', response.access_token)
          setAvatar(response.picture)
          setUserName(response.userName)
          setEmail(response.email)
          setAccessToken(response.access_token)
          setIsPublic(response.is_public)
          setUserId(response.id)
        }
      },
    )
  }, [])

  useEffect(() => {
    if (user.isSuccess && user.data.data) {
      setAvatar(user.data.data.avatar)
      setUserName(user.data.data.userName)
      setEmail(user.data.data.email ?? '')
      setUserId(user.data.data.id)
    }
  }, [user.data?.data, user.isSuccess])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContextProvider
