// components/Hero.tsx
import Image from 'next/image'
import Link from 'next/link'
import mango from "../assets/hero.jpg"

export default function Hero() {
  return (
    <section className="py-16 bg-gradient-to-r from-yellow-50 to-yellow-100">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-3xl text-center md:text-left md:text-5xl font-bold mb-6 text-green-800">
            বাংলাদেশের সেরা মিষ্টি আম!
          </h1>
          <p className="text-xl text-justify mb-8 text-gray-700">
            আমের সিজন এসে গেছে! বাংলাদেশের বিভিন্ন জাতের সেরা মানের আম এখন আপনার দরজায়। গোবিন্দভোগ, হিমসাগর, আম্রপালি, হাড়িভাঙ্গা, ল্যাংড়া, ফজলি সহ আরও অনেক জাতের আম সরাসরি আপনার বাসায় ডেলিভারি।
          </p>
          <div className="mb-8">
            <p className="text-lg font-semibold mb-2 text-green-600">যে সব আম পাবেন আমাদের কাছে:</p>
            <ul className="grid grid-cols-2 gap-2">
              <li className="flex items-center text-green-600">
                <span className="mr-2 ">✓</span>
                গোবিন্দভোগ 
              </li>
              <li className="flex items-center text-green-600">
                <span className="mr-2 text-green-600">✓</span>
                হিমসাগর 
              </li>
              <li className="flex items-center text-green-600">
                <span className="mr-2 text-green-600">✓</span>
                আম্রপালি
              </li>
              <li className="flex items-center text-green-600">
                <span className="mr-2 text-green-600">✓</span>
                হাড়িভাঙ্গা 
              </li>
              <li className="flex items-center text-green-600">
                <span className="mr-2 text-green-600">✓</span>
                ল্যাংড়া 
              </li>
              <li className="flex items-center text-green-600">
                <span className="mr-2 text-green-600">✓</span>
                ফজলি
              </li>
            </ul>
          </div>
          <p className="text-lg mb-8 text-gray-600">
            <span className="font-bold text-green-600">২০,০০০+</span> গ্রাহকের কাছে আমরা আমাদের আম পৌঁছে দিয়েছি!
          </p>
          <Link href="#order" className="bg-green-600 text-white font-bold px-8 py-4 rounded-lg text-xl hover:bg-green-700 transition-colors">
           প্রিঅর্ডার করুন
          </Link>
        </div>
        <div className="relative h-[400px] md:h-[500px]">
          <Image 
            src={mango}
            alt="সেরা মানের আম"
            fill
            style={{ objectFit: 'cover' }}
            className="rounded-lg shadow-xl"
            priority
          />
        </div>
      </div>
    </section>
  )
}
