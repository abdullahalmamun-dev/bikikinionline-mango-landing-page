// components/MangoVarieties.tsx
import Image from 'next/image'
import fazli from '../../public/assets/fazli.jpeg'
import himsagar from '../../public/assets/himsagar.webp'

export default function MangoVarieties() {
  return (
    <section id="varieties" className="py-16 bg-white text-gray-600">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-green-800">
          আমের পার্থক্যসমূহ
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* ফজলি */}
          <div className="bg-yellow-50 rounded-lg p-6 shadow-lg flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/3 relative h-[200px]">
              <Image 
                src={fazli}
                alt="ফজলি আম"
                fill
                style={{ objectFit: 'cover' }}
                className="rounded-lg"
              />
            </div>
            <div className="w-full md:w-2/3">
              <h3 className="text-2xl font-bold mb-3 text-green-700">ফজলি আম</h3>
              <p className="mb-3">
                ফজলি আম রাজশাহী অঞ্চলের সবচেয়ে বিখ্যাত আম। এটি আকারে বড় এবং স্বাদে অতুলনীয় মিষ্টি।
              </p>
              <ul className="space-y-1">
                <li className="flex items-start">
                  <span className="mr-2 text-green-600 mt-1">•</span>
                  আকারে বড় ও ওজনে ভারী
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-green-600 mt-1">•</span>
                  খুব মিষ্টি স্বাদ
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-green-600 mt-1">•</span>
                  আঁশ কম
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-green-600 mt-1">•</span>
                  সিজনের শেষদিকে পাওয়া যায়
                </li>
              </ul>
            </div>
          </div>
          
          {/* হিমসাগর */}
          <div className="bg-yellow-50 rounded-lg p-6 shadow-lg flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/3 relative h-[200px]">
              <Image 
                src={himsagar}
                alt="হিমসাগর আম"
                fill
                style={{ objectFit: 'cover' }}
                className="rounded-lg"
              />
            </div>
            <div className="w-full md:w-2/3">
              <h3 className="text-2xl font-bold mb-3 text-green-700">হিমসাগর আম</h3>
              <p className="mb-3">
                হিমসাগর আম চাঁপাইনবাবগঞ্জ অঞ্চলের বিখ্যাত আম। এটি মাঝারি আকারের কিন্তু স্বাদে অতুলনীয়।
              </p>
              <ul className="space-y-1">
                <li className="flex items-start">
                  <span className="mr-2 text-green-600 mt-1">•</span>
                  মাঝারি আকারের
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-green-600 mt-1">•</span>
                  অতুলনীয় সুগন্ধ
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-green-600 mt-1">•</span>
                  একদম আঁশবিহীন
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-green-600 mt-1">•</span>
                  জ্যৈষ্ঠ মাসে পাওয়া যায়
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
