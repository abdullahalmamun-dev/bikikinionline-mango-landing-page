// app/layout.tsx
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from '../components/Header'
// import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'বিকিকিনিঅনলাইন - সেরা মানের আম',
  description: 'বাংলাদেশের সেরা মানের আম সরাসরি আপনার দরজায়',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="bn">
      <body className={inter.className}>
        <div className=''>
        <Header />
        </div>
        <main className='max-w-screen-xl mx-auto bg-white md:px-10'>
          {children}
        </main>
        {/* <Footer /> */}
      </body>
    </html>
  )
}
