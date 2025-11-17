'use client'

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { label: "홈", href: "/" },
    { label: "블로그", href: "/blog" },
    { label: "상담 신청", href: "/consultation" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-xl md:text-2xl font-bold bg-gradient-to-r from-brand-deep-blue to-brand-cerulean bg-clip-text text-transparent">
              이엠마케팅 x 위딘비즈랩
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-base font-medium text-gray-700 hover:text-brand-cerulean transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <Link href="/consultation">
              <Button className="bg-gradient-to-r from-brand-deep-blue to-brand-cerulean hover:from-brand-cerulean hover:to-brand-turquoise text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300">
                무료 상담
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-gray-700" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-3 border-t border-gray-200">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block py-3 text-base font-medium text-gray-700 hover:text-brand-cerulean transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link href="/consultation" onClick={() => setIsMenuOpen(false)}>
              <Button className="w-full bg-gradient-to-r from-brand-deep-blue to-brand-cerulean hover:from-brand-cerulean hover:to-brand-turquoise text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300">
                무료 상담
              </Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
