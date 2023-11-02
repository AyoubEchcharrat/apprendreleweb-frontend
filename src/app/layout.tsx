import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'
const inter = Inter({ subsets: ['latin'] })
import './layout.css'
import LayoutConnexion from './LayoutConnexion'
import { Providers } from "@/redux/provider";
import ALW from '@/public/ALW1.png'

export const metadata: Metadata = {
  title: 'Apprendre Le Web',
  description: "ApprendreLeWeb est un site-blog qui propose des articles sur divers sujets liés au développement web.",
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
          <footer>
            <div className="footer_container">
              <div className="footer-links">
                  <ul>
                    <li><a href="/">Accueil</a></li>
                    <li><a href="/articles">Articles</a></li>
                    <li><a href="#">À propos</a></li>
                    <li><a href="#">Contact</a></li>
                  </ul>
              </div>
              <div className="footer-others">
                <ul>
                  <li>© 2023 ApprendreLeWeb. Tous droits réservés.</li>
                  <li>Réalisé par <a href="https://ayoub-echcharrat.fr" target="_blank" >Ayoub Ech-Charrat</a></li>
                </ul>
              </div>
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  )
}
