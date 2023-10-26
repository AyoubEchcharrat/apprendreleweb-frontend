import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'
const inter = Inter({ subsets: ['latin'] })
import './layout.css'
import LayoutConnexion from './LayoutConnexion'
import Image from 'next/image'
import { Providers } from "@/redux/provider";
import Head from 'next/head'

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
            <div className="simulate-bloc">
              <Link className='articles_link' href={'/articles'}>Articles</Link>
            </div>
            <Link className='title' href={'/'}><span>A</span>pprendre <span>L</span>e <span>W</span>eb</Link>
            <LayoutConnexion/>
          </header>
          {children}
        </Providers>
      </body>
    </html>
  )
}
