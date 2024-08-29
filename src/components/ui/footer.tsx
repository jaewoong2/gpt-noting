import Link from 'next/link'
import React from 'react'
import LogoIcon from './icons/LogoIcon'

function Footer() {
  return (
    <footer className="w-full border-t bg-white py-6 dark:bg-[#101010]">
      <div className="flex w-full justify-center gap-10 max-sm:flex-col max-sm:items-start max-sm:justify-center max-sm:gap-2 max-sm:pl-8">
        <div className="flex gap-10 max-sm:gap-2">
          <LogoIcon />
          <p className="text-sm">&copy; 2024 noting.kr All rights reserved.</p>
        </div>
        <div className="flex items-center justify-start gap-4 text-sm text-black dark:text-white">
          <Link
            href="https://woongsworld.notion.site/Noting-c542fa69e554458bb3283f639b2a2f00"
            className="hover:underline"
            prefetch={false}
            target="_blank"
            referrerPolicy="no-referrer"
          >
            Privacy Policy
          </Link>
          <Link
            href="https://woongsworld.notion.site/Noting-c542fa69e554458bb3283f639b2a2f00"
            className="hover:underline"
            prefetch={false}
            target="_blank"
            referrerPolicy="no-referrer"
          >
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
