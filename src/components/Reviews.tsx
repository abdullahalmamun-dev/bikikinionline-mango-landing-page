// components/Reviews.tsx
import Image from 'next/image'
import r1 from '../assets/review1.jpg'

export default function Reviews() {
  return (
    <section id="reviews" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-green-800">
          গ্রাহকদের মন্তব্য
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              name: 'শাহেনুর ইসলাম',
              location: 'ঢাকা',
              text: 'সেরা মানের আম পেয়েছি, ডেলিভারি সময়মতো হয়েছে',
              img: '/assets/review3.jpg'
            },
            {
              name: 'জসিম রায়হান',
              location: 'নারায়নগঞ্জ',
              text: 'আমের স্বাদ অতুলনীয়, নিয়মিত ক্রয় করব',
              img: '/assets/review2.jpg'
            },
            {
              name: 'সুমন আহমেদ',
              location: 'নরসিংদী',
              text: 'সরাসরি কৃষকের কাছ থেকে পাওয়ার সুবিধা অসাধারণ',
              img: '/assets/review1.jpg'
            }
          ].map((review, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src={review.img}
                    alt={review.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-green-800">{review.name}</h4>
                  <p className="text-sm text-gray-600">{review.location}</p>
                </div>
              </div>
              <p className="text-gray-700">{review.text}</p>
              <div className="mt-4 flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
