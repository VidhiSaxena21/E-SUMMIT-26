import React from "react"
import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'

import '../styles/globals.css'
import { Providers } from "./providers";

import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { RegistrationProvider } from "@/components/RegistrationContext";
import { RegistrationModal } from "@/components/RegistrationModal";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '500', '600', '700'],
})

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['700', '900'],
})

export const metadata: Metadata = {
  title: 'E-Summit 2026',
  description: 'Join us for the 12th edition of E-Summit — a 5-day celebration of innovation, entrepreneurship, and future technologies.',
  generator: 'v0.dev',
  keywords: ['esummit', 'entrepreneurship', 'innovation', 'technology', 'startup', 'summit', '2026'],
  authors: [{ name: 'E-Summit Team' }],
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: 'E-Summit 2026',
    description: 'Join us for the 12th edition of E-Summit — a 5-day celebration of innovation, entrepreneurship, and future technologies.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfairDisplay.variable} font-sans antialiased bg-slate-950 text-white`} style={{ letterSpacing: '0.3px' }}>
        <Providers>
          <RegistrationProvider>
            <Navigation />
            {children}
            <Footer />
            <RegistrationModal />
          </RegistrationProvider>
        </Providers>
      </body>
    </html>
  )
}
