import Link from 'next/link'
import React from 'react'
import LogoIcon from './icons/LogoIcon'

function Footer() {
  return (
    <footer className="w-full border-t py-6">
      <div className="container flex max-w-7xl flex-col items-center justify-center gap-20 sm:flex-row">
        <LogoIcon />
        <div className="flex items-center gap-4 text-sm text-black dark:text-white">
          <p>&copy; 2024 noting.kr All rights reserved.</p>
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
