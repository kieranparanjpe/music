import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from "@/app/Navbar";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Stats for Spotify',
  description: 'get your spotify stats',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>

        <Navbar/>

      {children}

      </body>
    </html>
  )
}
