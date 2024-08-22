import { Coming_Soon, Noto_Sans_KR } from 'next/font/google'
import './globals.css'
import ReactQueryProvider from '@/components/providers/ReactQueryProvider'
import { cn } from '@/lib/utils'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import AuthContextProvider from '@/components/providers/AuthContextProvider'
import MainNav from '@/components/ui/main-nav'
import Footer from '@/components/ui/footer'
import { Toaster } from '@/components/ui/toaster'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'Noting',
    template: '',
  },
  description: `Save The ChatGPT\`s Response `,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
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
      <body
        className={cn(
          NotoSansKr.className,
          LogoFont.variable,
          'bg-[#F8F9FA] text-[#333] dark:bg-[#101010] dark:text-white',
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
    </html>
  )
}
