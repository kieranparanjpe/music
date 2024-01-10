import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from "@/app/Navbar";
import {SessionProvider} from "next-auth/react";
import {getServerSession} from "next-auth";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Stats for Spotify',
  description: 'get your spotify stats',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

    const session = await getServerSession();
  return (
    <html lang="en">
      <body className={inter.className}>
      <SessionProvider session={session}>
        <Navbar/>
        {children}
      </SessionProvider>
      </body>
    </html>
  )
}
