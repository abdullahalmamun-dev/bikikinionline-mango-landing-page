// components/Header.tsx
import Link from 'next/link'

export default function Header() {
  return (
    <header className=" shadow-md max-w-screen-xl mx-auto bg-white px-10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-green-600">
          <Link href="/">
            বিকিকিনিঅনলাইন
          </Link>
        </div>
        <nav className="hidden md:block">
          <ul className="flex space-x-6 text-gray-600">
            <li><Link href="#" className="hover:text-green-600">পরিচিতি</Link></li>
            <li><Link href="#varieties" className="hover:text-green-600">পার্থক্য</Link></li>
            <li><Link href="#features" className="hover:text-green-600">ফিচারস</Link></li>
            <li><Link href="#reviews" className="hover:text-green-600">রিভিউ</Link></li>
            <li><Link href="#faq" className="hover:text-green-600">জিজ্ঞাসা</Link></li>
            <li><Link href="#gallery" className="hover:text-green-600">গ্যালারী</Link></li>
            <li><Link href="#contact" className="hover:text-green-600">যোগাযোগ</Link></li>
            <li><Link href="#order" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">অর্ডার করুন</Link></li>
          </ul>
        </nav>
        <button className="md:hidden text-green-600">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>
    </header>
  )
}
