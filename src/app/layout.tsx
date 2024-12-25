
import '@/app/globals.css'
import { Inter } from 'next/font/google'
import { LanguageProvider } from '@/contexts/LanguageContext'

const inter = Inter({ subsets: ['latin'] })


export const metadata = {
  title: 'Syria Data Guide',
  description: 'A comprehensive directory of data sources about Syria',
  icon: '/favicon.ico',
  icons: {
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}