import '@/app/globals.css'
import { Archivo, IBM_Plex_Sans_Arabic } from 'next/font/google'
import { LanguageProvider } from '@/contexts/LanguageContext'

const archivo = Archivo({ subsets: ['latin'], variable: '--font-archivo' });
const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({ 
  weight: ['400', '500', '600', '700'],
  subsets: ['arabic'],
  variable: '--font-ibm-plex-sans-arabic'
})

export const metadata = {
  title: 'دليل بيانات سوريا - Syria Data Guide',
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
    <html lang="ar">
      <body className={`${archivo.className} ${ibmPlexSansArabic.variable}`}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}