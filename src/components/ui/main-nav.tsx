'use client'

import Link from 'next/link'
import React from 'react'
import HomeIcon from './icons/HomeIcon'
import UserIcon from './icons/UserIcon'
import HeartIcon from './icons/HeartIcon'
import SearchIcon from './icons/SearchIcon'
import UserAvatar from '../containers/UserAvatar'
import ThemeToggle from './theme-toggle'
import { buttonVariants } from './button'
import LogoIcon from './icons/LogoIcon'
import { useAuthContext } from '../providers/AuthContextProvider'

function MainNav() {
  const { userName } = useAuthContext()

  return (
    <nav className="sticky top-0 z-50 flex h-14 w-full items-center justify-between px-4 backdrop-blur-lg">
      <div className="font-Edu_VIC_WA_NT_Beginner font-bold text-gray-600 underline dark:text-white">
        {/* <Link href="/#">{process.env.NEXT_PUBLIC_LOGO_TEXT}</Link> */}
        <Link href="/#">
          <LogoIcon />
        </Link>
      </div>
      <ul className="flex gap-4">
        <li>
          <Link
            className={buttonVariants({
              variant: 'ghost',
              className: 'hover:bg-slate-200 dark:hover:bg-accent',
            })}
            href="/"
          >
            <HomeIcon
              strokeWidth={2}
              className="size-6 stroke-slate-600 dark:stroke-white"
            />
          </Link>
        </li>
        <li>
          <Link
            className={buttonVariants({
              variant: 'ghost',
              className: 'hover:bg-slate-200 dark:hover:bg-accent',
            })}
            href={`/${userName}`}
          >
            <UserIcon
              strokeWidth={2}
              className="size-6 stroke-slate-600 dark:stroke-white"
            />
          </Link>
        </li>
        <li>
          <Link
            className={buttonVariants({
              variant: 'ghost',
              className: 'hover:bg-slate-200 dark:hover:bg-accent',
            })}
            href="/#"
          >
            <HeartIcon
              strokeWidth={2}
              className="size-6 stroke-slate-600 dark:stroke-white"
            />
          </Link>
        </li>
        <li>
          <Link
            className={buttonVariants({
              variant: 'ghost',
              className: 'hover:bg-slate-200 dark:hover:bg-accent',
            })}
            href="/#"
          >
            <SearchIcon
              strokeWidth={2}
              className="size-6 stroke-slate-600 dark:stroke-white"
            />
          </Link>
        </li>
      </ul>
      <div className="flex gap-2">
        <ThemeToggle />
        <Link href={`/${userName}`}>
          <UserAvatar />
        </Link>
      </div>
    </nav>
  )
}

export default MainNav
