import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'
const inter = Inter({ subsets: ['latin'] })
import './layout.css'
import LayoutConnexion from './LayoutConnexion'
import Image from 'next/image'
import { Providers } from "@/redux/provider";


export const metadata: Metadata = {
  title: 'Apprendre le Web',
  description: 'Apprenez le web !',
}





export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <Providers>
          <header className='header'>
            <Link className='simulate-bloc' href={'/articles'}>Articles</Link>
            <Link href={'/'}>{/*  <Image src="/ALW.png" alt="logo d'Apprendre le Web" width={50} height={40} />  */}Apprendre Le Web</Link>
            <LayoutConnexion/>
          </header>
          {children}
        </Providers>
      </body>
    </html>
  )
}
