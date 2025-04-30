// components/Header.tsx
'use client'
import Link from 'next/link'
import { useState } from 'react'
import logo from "../assets/logo.png"
import Image from 'next/image'



export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const navItems = [
    { name: 'পরিচিতি', href: '#' },
    { name: 'বিশেষত্ব', href: '#varieties' },
    { name: 'ফিচারস', href: '#features' },
    { name: 'রিভিউ', href: '#reviews' },
    { name: 'জিজ্ঞাসা', href: '#faq' },
    { name: 'গ্যালারী', href: '#gallery' },
    { name: 'যোগাযোগ', href: '#contact' },
    { name: 'অর্ডার করুন', href: '#order', isButton: true }
  ]

  return (
    <header className="shadow-md bg-white">
      <div className="max-w-screen-xl mx-auto px-4 py-4 md:px-10">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-green-600">
            {/* বিকিকিনিঅনলাইন */}
            <Image
            src={logo}
            alt="bikikini online"
            width={100}
            height={100}
            >

            </Image>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-6 text-gray-600">
              {navItems.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.href}
                    className={`hover:text-green-600 ${
                      item.isButton 
                        ? 'bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700' 
                        : ''
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-green-600"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden fixed inset-0 z-50 bg-white transition-transform duration-300 ease-in-out ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="p-4">
            <div className="flex justify-end mb-4">
              <button
                onClick={toggleMenu}
                className="text-green-600"
                aria-label="Close menu"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <nav>
              <ul className="space-y-4 text-lg">
                {navItems.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`block p-2 hover:bg-gray-50 rounded ${
                        item.isButton
                          ? 'bg-green-600 text-white hover:bg-green-700'
                          : 'text-gray-700 hover:text-green-600'
                      }`}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}
