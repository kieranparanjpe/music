import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from "@/app/components/Navbar";
import {getServerSession} from "next-auth";
import {AuthProvider} from "@/app/util/SessionHandler";
import {auth} from "@/app/util/auth";
import {SpotifyHandler} from "@/app/util/SpotifyHandler";

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
      <AuthProvider session={session}>
        <Navbar/>
        {children}
      </AuthProvider>
      </body>
    </html>
  )
}
