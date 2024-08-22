import Link from 'next/link'
import React from 'react'
import LogoIcon from './icons/LogoIcon'

function Footer() {
  return (
    <footer className="w-full border-t py-6">
      <div className="flex w-full justify-center gap-10 max-sm:flex-col max-sm:items-start max-sm:justify-center max-sm:gap-2 max-sm:pl-8">
        <div className="flex gap-10 max-sm:gap-2">
          <LogoIcon />
          <p className="text-sm">&copy; 2024 noting.kr All rights reserved.</p>
        </div>
        <div className="flex items-center justify-start gap-4 text-sm text-black dark:text-white">
          <Link href="/#" className="hover:underline" prefetch={false}>
            Privacy Policy
          </Link>
          <Link href="/#" className="hover:underline" prefetch={false}>
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
