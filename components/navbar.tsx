"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import LanguageSwitcher from "@/components/language-switcher"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { t } = useLanguage()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <div className="bg-white p-1 rounded">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Blue_Modern_Water_Drop_Mineral_Water_Logo_5-removebg-preview-mtrNyNMI9W2L02qgtceX4C82OT9PzX.png"
                  alt="WJEHNI.MA Logo"
                  className="h-10 w-auto"
                />
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-blue-900 hover:text-orange-500 font-medium">
              {t("nav.home")}
            </Link>
            <Link href="/about" className="text-blue-900 hover:text-orange-500 font-medium">
              {t("nav.about")}
            </Link>
            <Link href="/community" className="text-blue-900 hover:text-orange-500 font-medium">
              {t("nav.community")}
            </Link>
            <Link href="/resources" className="text-blue-900 hover:text-orange-500 font-medium">
              {t("nav.resources")}
            </Link>
            <Link href="/contact" className="text-blue-900 hover:text-orange-500 font-medium">
              {t("nav.contact")}
            </Link>
          </nav>

          {/* CTA Button and Language Switcher */}
          <div className="hidden md:flex items-center gap-2">
            <LanguageSwitcher />
            <Button asChild className="bg-blue-900 hover:bg-blue-800 text-white">
              <Link href="/ai-roadmap">{t("nav.getRoadmap")}</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <LanguageSwitcher />
            <button
              type="button"
              className="text-blue-900 hover:text-orange-500"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <Link
              href="/"
              className="block text-blue-900 hover:text-orange-500 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("nav.home")}
            </Link>
            <Link
              href="/about"
              className="block text-blue-900 hover:text-orange-500 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("nav.about")}
            </Link>
            <Link
              href="/community"
              className="block text-blue-900 hover:text-orange-500 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("nav.community")}
            </Link>
            <Link
              href="/resources"
              className="block text-blue-900 hover:text-orange-500 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("nav.resources")}
            </Link>
            <Link
              href="/contact"
              className="block text-blue-900 hover:text-orange-500 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("nav.contact")}
            </Link>
            <Button asChild className="w-full bg-blue-900 hover:bg-blue-800 text-white">
              <Link href="/ai-roadmap" onClick={() => setIsMenuOpen(false)}>
                {t("nav.getRoadmap")}
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}

