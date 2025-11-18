'use client'

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Menu, X, Type } from "lucide-react";
import { useFont } from "@/contexts/FontContext";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { font, setFont } = useFont();

  const menuItems = [
    { label: "홈", href: "/" },
    { label: "블로그", href: "/blog" },
    { label: "상담 신청", href: "/consultation" },
  ];

  const fontOptions = [
    { value: "pretendard", label: "시안 1" },
    { value: "gmarket", label: "시안 2" },
    { value: "paperlogy", label: "시안 3" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-xl md:text-2xl font-bold text-primary-700">
              이엠마케팅 x 위딘비즈랩
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-base font-medium text-gray-700 hover:text-primary-600 transition-colors cursor-pointer"
              >
                {item.label}
              </Link>
            ))}

            {/* Font Selector */}
            <div className="flex items-center gap-2">
              <Type className="h-4 w-4 text-gray-700" />
              <Select value={font} onValueChange={(value) => setFont(value as any)}>
                <SelectTrigger className="w-[110px] h-9 text-sm font-medium border-gray-300 text-gray-900 hover:bg-gray-50">
                  <SelectValue placeholder="시안 선택" />
                </SelectTrigger>
                <SelectContent>
                  {fontOptions.map((option) => (
                    <SelectItem
                      key={option.value}
                      value={option.value}
                      className="font-medium"
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Link href="/consultation">
              <Button className="bg-primary-600 hover:bg-primary-700 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-200">
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
                className="block py-3 text-base font-medium text-gray-700 hover:text-primary-600 transition-colors cursor-pointer"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}

            {/* Font Selector Mobile */}
            <div className="py-3">
              <div className="flex items-center gap-2 mb-2">
                <Type className="h-4 w-4 text-gray-700" />
                <span className="text-sm font-medium text-gray-900">시안 선택</span>
              </div>
              <Select value={font} onValueChange={(value) => setFont(value as any)}>
                <SelectTrigger className="w-full font-medium border-gray-300 text-gray-900">
                  <SelectValue placeholder="시안 선택" />
                </SelectTrigger>
                <SelectContent>
                  {fontOptions.map((option) => (
                    <SelectItem
                      key={option.value}
                      value={option.value}
                      className="font-medium"
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Link href="/consultation" onClick={() => setIsMenuOpen(false)}>
              <Button className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-200">
                무료 상담
              </Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
