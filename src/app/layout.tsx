import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { ThemeProvider } from 'next-themes'
import ReactQueryProvider from '@/app/ReactQueryProvider'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans'
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono'
})

export const metadata: Metadata = {
  title: {
    default: 'bugbook',
    template: '%s - bugbook'
  },
  description: 'The social media app for powernerds.'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ReactQueryProvider>
          <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
            {children}
          </ThemeProvider>
        </ReactQueryProvider>
        <ToastContainer />
      </body>
    </html>
  )
}
