import type React from "react"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/contexts/language-context"
import Navbar from "@/components/navbar"
import "../styles/globals.css"
import "./print-styles.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "WJEHNI.MA - Your Pathway to Success in Morocco",
  description: "Discover the perfect educational and career path in Morocco with our AI-powered guidance system.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <LanguageProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            <Navbar />
            {children}
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}

