// components/Footer.tsx
'use client'
import Link from 'next/link'
import { FaFacebook, FaWhatsapp, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="bg-green-900 text-gray-100">
      <div className="max-w-screen-xl mx-auto px-4 py-12 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-green-400">বিকিকিনিঅনলাইন</h3>
            <p className="text-sm leading-relaxed">
              বাংলাদেশের সেরা মানের আম সরাসরি কৃষকের কাছ থেকে আপনার দরজায়। ১০০% প্রাকৃতিক ও তাজা আমের গ্যারান্টি।
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/bikikinionline" className="text-green-300 hover:text-green-100 transition-colors">
                <FaFacebook size={24} />
              </a>
              <a href="http://wa.me/+8801333318076" className="text-green-300 hover:text-green-100 transition-colors">
                <FaWhatsapp size={24} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-green-400">দ্রুত লিংক</h3>
            <ul className="space-y-2">
              <li><Link href="#varieties" className="hover:text-green-200 transition-colors">আমের প্রজাতি</Link></li>
              <li><Link href="#order" className="hover:text-green-200 transition-colors">অর্ডার করুন</Link></li>
              <li><Link href="#faq" className="hover:text-green-200 transition-colors">জিজ্ঞাসা</Link></li>
              <li><Link href="#contact" className="hover:text-green-200 transition-colors">যোগাযোগ</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-green-400">যোগাযোগ</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <FaMapMarkerAlt className="text-green-300" />
                <span>বাড়ি ৯৫, রোড ১৩, নবীনগর হাউজিং, মোহাম্মদপুর, ঢাকা-১২০৭</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaPhoneAlt className="text-green-300" />
                <span>+880 1333-318076</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaEnvelope className="text-green-300" />
                <span>contact@bikikini.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-green-800 mt-8 pt-8 text-center">
          <p className="text-sm">
            © {new Date().getFullYear()} বিকিকিনিঅনলাইন। সকল স্বত্ব সংরক্ষিত।
          </p>
          <div className="mt-2 space-x-4">
            <Link href="#" className="text-sm hover:text-green-200">প্রাইভেসি পলিসি</Link>
            <Link href="#" className="text-sm hover:text-green-200">শর্তাবলী</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
