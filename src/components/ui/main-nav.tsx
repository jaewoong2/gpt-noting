'use client'

import Link from 'next/link'
import React from 'react'
import HomeIcon from './icons/HomeIcon'
import UserIcon from './icons/UserIcon'
import HeartIcon from './icons/HeartIcon'
import SearchIcon from './icons/SearchIcon'
import UserAvatar from '../containers/UserAvatar'
import ThemeToggle from './theme-toggle'
import { Button, buttonVariants } from './button'
import LogoIcon from './icons/LogoIcon'
import { useAuthContext } from '../providers/AuthContextProvider'

function MainNav() {
  const { userName } = useAuthContext()

  return (
    <nav className="container sticky top-0 z-50 flex h-14 w-full items-center justify-between px-4 backdrop-blur-lg">
      <div className="font-Edu_VIC_WA_NT_Beginner font-bold text-gray-600 underline dark:text-white">
        <Link href="/#" className="">
          <LogoIcon />
        </Link>
      </div>
      <ul className="flex gap-8 max-sm:w-full max-sm:justify-end max-sm:gap-2">
        <li>
          <a
            className={buttonVariants({
              variant: 'ghost',
              className: 'hover:bg-slate-200 dark:hover:bg-accent',
            })}
            href="/"
          >
            <HomeIcon
              strokeWidth={2}
              className="size-6 stroke-zinc-600 dark:stroke-white"
            />
          </a>
        </li>
        <li>
          {userName && (
            <Link
              className={buttonVariants({
                variant: 'ghost',
                className: 'hover:bg-slate-200 dark:hover:bg-accent',
              })}
              href={`/${userName}`}
            >
              <UserIcon
                strokeWidth={2}
                className="size-6 stroke-zinc-600 dark:stroke-white"
              />
            </Link>
          )}
        </li>
        <li>
          {userName && (
            <Link
              className={buttonVariants({
                variant: 'ghost',
                className: 'hover:bg-slate-200 dark:hover:bg-accent',
              })}
              href="/likes"
            >
              <HeartIcon
                strokeWidth={2}
                className="size-6 stroke-zinc-600 dark:stroke-white"
              />
            </Link>
          )}
        </li>
        <li>
          <Link
            className={buttonVariants({
              variant: 'ghost',
              className: 'hover:bg-slate-200 dark:hover:bg-accent',
            })}
            href="/search"
          >
            <SearchIcon
              strokeWidth={2}
              className="size-6 stroke-zinc-600 dark:stroke-white"
            />
          </Link>
        </li>
      </ul>
      <div />
      <div className="absolute right-3 flex gap-2 max-sm:hidden">
        <ThemeToggle />
        {userName ? (
          <Link href={`/${userName}`}>
            <UserAvatar />
          </Link>
        ) : (
          <Button type="button" color="primary">
            Download Extension
          </Button>
        )}
      </div>
    </nav>
  )
}

export default MainNav
