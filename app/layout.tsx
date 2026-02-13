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
  title: 'Web Graphics Builder',
  description: 'Interactive web graphics builder tool',
  generator: 'v0.dev',
  keywords: ['graphics', 'builder', 'web', 'interactive', 'design'],
  authors: [{ name: 'Graphics Builder Team' }],
  openGraph: {
    title: 'Web Graphics Builder',
    description: 'Interactive web graphics builder tool for creating stunning visuals',
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
