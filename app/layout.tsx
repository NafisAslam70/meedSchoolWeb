import React from "react"
import type { Metadata, Viewport } from "next"
import "./globals.css"
import { LanguageProvider } from "@/lib/language-context"

export const metadata: Metadata = {
  title: "Meed International School",
  description:
    "Holistic education for dual success -- cultivating experts with integrity through the MEED framework (Mastery, Enlightenment, Empowerment, Dedication). Pre-Primary through Class 8.",
  generator: "v0.dev",
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#059669",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  )
}
