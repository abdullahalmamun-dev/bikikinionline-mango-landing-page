// app/layout.tsx
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'বিকিকিনি অনলাইন - সেরা মানের আম',
  description: 'বাংলাদেশের সেরা মানের আম সরাসরি আপনার দরজায়',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="bn">
      <head>
        {/* Meta tags are automatically handled by the metadata object */}
      </head>
      <body className={inter.className}>
        {/* Facebook Pixel Code */}
        <Script 
          id="facebook-pixel"
          strategy="afterInteractive" // Add loading strategy
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.bq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '1216660336852015');
              fbq('track', 'PageView');
            `
          }}
        />
          <noscript>
          <img 
            height="1" 
            width="1" 
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1216660336852015&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        <div className=''>
          <Header />
        </div>
        <main className='max-w-screen-xl mx-auto bg-white md:px-10'>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
