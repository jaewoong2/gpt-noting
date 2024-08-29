'use client'

import Link from 'next/link'
import React from 'react'
import useDeviceType from '@/hooks/useDeviceType'
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
  const { isChromeDesktopUser } = useDeviceType()

  return (
    <nav className="container sticky top-0 z-50 flex h-14 w-full items-center justify-between px-4 backdrop-blur-lg">
      <div className="font-Edu_VIC_WA_NT_Beginner font-bold text-gray-600 underline dark:text-white">
        <Link href="/#" className="">
          <LogoIcon />
        </Link>
      </div>
      {isChromeDesktopUser ? (
        <ul className="flex gap-8 max-sm:w-full max-sm:justify-end max-sm:gap-2">
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
                className="size-6 stroke-zinc-600 dark:stroke-white"
              />
            </Link>
          </li>
          <li>
            <Link
              className={buttonVariants({
                variant: 'ghost',
                className: 'hover:bg-slate-200 dark:hover:bg-accent',
              })}
              href={userName ? `/${userName}` : '/'}
            >
              <UserIcon
                strokeWidth={2}
                className="size-6 stroke-zinc-600 dark:stroke-white"
              />
            </Link>
          </li>
          <li>
            <Link
              className={buttonVariants({
                variant: 'ghost',
                className: 'hover:bg-slate-200 dark:hover:bg-accent',
              })}
              href={userName ? '/likes' : '/'}
            >
              <HeartIcon
                strokeWidth={2}
                className="size-6 stroke-zinc-600 dark:stroke-white"
              />
            </Link>
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
      ) : (
        <Link
          target="_blank"
          referrerPolicy="no-referrer"
          href="https://chromewebstore.google.com/detail/aeaejpghhjeiccpgojhgndobdpdnikfk"
          className={buttonVariants({ className: 'hidden max-sm:block' })}
        >
          Download Extension
        </Link>
      )}
      {isChromeDesktopUser && <div className="bg-red-500" />}
      <div className="absolute right-3 flex gap-2 max-sm:hidden">
        <ThemeToggle />
        {isChromeDesktopUser &&
          (userName ? (
            <Link href={`/${userName}`}>
              <UserAvatar />
            </Link>
          ) : (
            <Link
              target="_blank"
              referrerPolicy="no-referrer"
              href="https://chromewebstore.google.com/detail/aeaejpghhjeiccpgojhgndobdpdnikfk"
              className={buttonVariants({})}
            >
              Download Extension
            </Link>
          ))}
        {!isChromeDesktopUser && (
          <Link
            target="_blank"
            referrerPolicy="no-referrer"
            href="https://chromewebstore.google.com/detail/aeaejpghhjeiccpgojhgndobdpdnikfk"
            className={buttonVariants({})}
          >
            Download Extension
          </Link>
        )}
      </div>
    </nav>
  )
}

export default MainNav
