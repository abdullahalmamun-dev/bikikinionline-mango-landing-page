// components/MangoVarieties.tsx
import Image from 'next/image'
import fazli from '../assets/fazli.jpeg'
import himsagar from '../assets/himsagar.webp'
import gobindobhog from '../assets/gobindobhog.jpeg'
import amrapali from '../assets/amrapali.jpg'
import harivanga from '../assets/harivanga.jpeg'
import langra from '../assets/lengra.jpg'

export default function MangoVarieties() {
  return (
    <section id="varieties" className="py-16 bg-white text-gray-600">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-green-800">
          আমের বিশেষত্বসমূহ
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* গোবিন্দভোগ */}
          <div className="bg-yellow-50 rounded-lg p-4 shadow-lg flex flex-col">
            <div className="relative h-48 w-full mb-4">
              <Image 
                src={gobindobhog}
                alt="গোবিন্দভোগ আম"
                fill
                style={{ objectFit: 'cover' }}
                className="rounded-lg"
              />
            </div>
            <h3 className="text-xl font-bold mb-2 text-green-700">গোবিন্দভোগ আম</h3>
            <div className="space-y-2">
              <p className="flex items-start">
                <span className="mr-2 text-green-600 mt-1">•</span>
                সাতক্ষীরা অঞ্চলের প্রিমিয়াম জাত, হালকা সোনালি রঙ
              </p>
              <p className="flex items-start">
                <span className="mr-2 text-green-600 mt-1">•</span>
                পাতলা খোসা ও জুসি গঠন
              </p>
              <p className="flex items-start">
                <span className="mr-2 text-green-600 mt-1">•</span>
                মে মাসের শুরুতে সংগ্রহ, সংরক্ষণকাল কম
              </p>
            </div>
          </div>

          {/* হিমসাগর */}
          <div className="bg-yellow-50 rounded-lg p-4 shadow-lg flex flex-col">
            <div className="relative h-48 w-full mb-4">
              <Image 
                src={himsagar}
                alt="হিমসাগর আম"
                fill
                style={{ objectFit: 'cover' }}
                className="rounded-lg"
              />
            </div>
            <h3 className="text-xl font-bold mb-2 text-green-700">হিমসাগর আম</h3>
            <div className="space-y-2">
              <p className="flex items-start">
                <span className="mr-2 text-green-600 mt-1">•</span>
                কমলা রঙের আঁশবিহীন শাঁস
              </p>
              <p className="flex items-start">
                <span className="mr-2 text-green-600 mt-1">•</span>
                বোটার কাছে বিশেষ সুগন্ধ
              </p>
              <p className="flex items-start">
                <span className="mr-2 text-green-600 mt-1">•</span>
                জুন মাসে পাকে, গড় ওজন ১৮০ গ্রাম+
              </p>
            </div>
          </div>

          {/* আম্রপালি */}
          <div className="bg-yellow-50 rounded-lg p-4 shadow-lg flex flex-col">
            <div className="relative h-48 w-full mb-4">
              <Image 
                src={amrapali}
                alt="আম্রপালি আম"
                fill
                style={{ objectFit: 'cover' }}
                className="rounded-lg"
              />
            </div>
            <h3 className="text-xl font-bold mb-2 text-green-700">আম্রপালি আম</h3>
            <div className="space-y-2">
              <p className="flex items-start">
                <span className="mr-2 text-green-600 mt-1">•</span>
                হাইব্রিড জাত, উচ্চ বিটা-ক্যারোটিন সমৃদ্ধ
              </p>
              <p className="flex items-start">
                <span className="mr-2 text-green-600 mt-1">•</span>
                বার্ষিক ফলন ক্ষমতা
              </p>
              <p className="flex items-start">
                <span className="mr-2 text-green-600 mt-1">•</span>
                ছাদচাষ উপযোগী কম উচ্চতার গাছ
              </p>
            </div>
          </div>

          {/* হাড়িভাঙ্গা */}
          <div className="bg-yellow-50 rounded-lg p-4 shadow-lg flex flex-col">
            <div className="relative h-48 w-full mb-4">
              <Image 
                src={harivanga}
                alt="হাড়িভাঙ্গা আম"
                fill
                style={{ objectFit: 'cover' }}
                className="rounded-lg"
              />
            </div>
            <h3 className="text-xl font-bold mb-2 text-green-700">হাড়িভাঙ্গা আম</h3>
            <div className="space-y-2">
              <p className="flex items-start">
                <span className="mr-2 text-green-600 mt-1">•</span>
                রংপুরের মিঠাপুকুরের ঐতিহ্য
              </p>
              <p className="flex items-start">
                <span className="mr-2 text-green-600 mt-1">•</span>
                চামড়া কুচকালেও পচে না
              </p>
              <p className="flex items-start">
                <span className="mr-2 text-green-600 mt-1">•</span>
                ৪০০-৭০০ গ্রাম ওজন, দেরিতে পাকে
              </p>
            </div>
          </div>

          {/* ল্যাংড়া */}
          <div className="bg-yellow-50 rounded-lg p-4 shadow-lg flex flex-col">
            <div className="relative h-48 w-full mb-4">
              <Image 
                src={langra}
                alt="ল্যাংড়া আম"
                fill
                style={{ objectFit: 'cover' }}
                className="rounded-lg"
              />
            </div>
            <h3 className="text-xl font-bold mb-2 text-green-700">ল্যাংড়া আম</h3>
            <div className="space-y-2">
              <p className="flex items-start">
                <span className="mr-2 text-green-600 mt-1">•</span>
                মিষ্টি-টক সমন্বয়ে স্বাদ
              </p>
              <p className="flex items-start">
                <span className="mr-2 text-green-600 mt-1">•</span>
                পাতলা খোসা ও ক্রিমি টেক্সচার
              </p>
              <p className="flex items-start">
                <span className="mr-2 text-green-600 mt-1">•</span>
                উত্তরবঙ্গের জনপ্রিয় জাত
              </p>
            </div>
          </div>

          {/* ফজলি */}
          <div className="bg-yellow-50 rounded-lg p-4 shadow-lg flex flex-col">
            <div className="relative h-48 w-full mb-4">
              <Image 
                src={fazli}
                alt="ফজলি আম"
                fill
                style={{ objectFit: 'cover' }}
                className="rounded-lg"
              />
            </div>
            <h3 className="text-xl font-bold mb-2 text-green-700">ফজলি আম</h3>
            <div className="space-y-2">
              <p className="flex items-start">
                <span className="mr-2 text-green-600 mt-1">•</span>
                ১ কেজি পর্যন্ত ওজন, জ্যাম তৈরিতে আদর্শ
              </p>
              <p className="flex items-start">
                <span className="mr-2 text-green-600 mt-1">•</span>
                ১৭.৫% মিষ্টতা, আষাঢ়-শ্রাবণে পাকে
              </p>
              <p className="flex items-start">
                <span className="mr-2 text-green-600 mt-1">•</span>
                রাজশাহী-চাঁপাইনবাবগঞ্জের GI পণ্য
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
