import { Coming_Soon, Noto_Sans_KR } from 'next/font/google'
import ReactQueryProvider from '@/components/providers/ReactQueryProvider'
import { GoogleAnalytics } from '@next/third-parties/google'
import { cn } from '@/lib/utils'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import AuthContextProvider from '@/components/providers/AuthContextProvider'
import MainNav from '@/components/ui/main-nav'
import Footer from '@/components/ui/footer'
import { Toaster } from '@/components/ui/toaster'
import { Metadata } from 'next'

import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Noting',
    template: '',
  },
  description: `Save The ChatGPT\`s Response `,
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
}

const LogoFont = Coming_Soon({
  weight: '400',
  subsets: ['latin'],
  variable: '--Coming_Soon',
})

const NotoSansKr = Noto_Sans_KR({ subsets: ['latin'] })

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode
  modal: React.ReactNode
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <link rel="canonical" href="https://noting.prlc.kr" />
      <body
        className={cn(
          NotoSansKr.className,
          LogoFont.variable,
          // 'bg-[#F8F9FA] text-[#333] dark:bg-[#101010] dark:text-white',
          'bg-patterns dark:bg-patterns-dark text-[#333] dark:text-white',
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ReactQueryProvider>
            <AuthContextProvider>
              <main className="mx-auto flex h-full min-h-screen w-full flex-col items-center">
                <MainNav />
                {children}
                {modal}
              </main>
              <Toaster />
              <Footer />
            </AuthContextProvider>
          </ReactQueryProvider>
        </ThemeProvider>
      </body>
      {process.env.NODE_ENV !== 'development' &&
        process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
    </html>
  )
}
