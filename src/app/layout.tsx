import '@/app/globals.css'
import { Inter, IBM_Plex_Sans_Arabic } from 'next/font/google'
import { LanguageProvider } from '@/contexts/LanguageContext'

const inter = Inter({ subsets: ['latin'] })
const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({ 
  weight: ['400', '500', '600', '700'],
  subsets: ['arabic'],
  variable: '--font-ibm-plex-sans-arabic'
})

export const metadata = {
  title: 'دليل البيانات السورية - Syria Data Guide',
  description: 'دليل شامل لمصادر البيانات عن سوريا',
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
      <body className={`${inter.className} ${ibmPlexSansArabic.variable}`}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}