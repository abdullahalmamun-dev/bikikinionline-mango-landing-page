// components/Features.tsx
// import Image from 'next/image'

export default function Features() {
  return (
    <section id="features" className=" md:py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center md:mb-12 text-green-800">
          আমাদের বিশেষ সুবিধাসমূহ
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl text-green-800 font-semibold mb-2">সরাসরি বাগান থেকে</h3>
            <p className="text-gray-600">আমরা সরাসরি বাগান থেকে আম সংগ্রহ করি, কোন মধ্যস্বত্বভোগী নেই</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl text-green-800 font-semibold mb-2">১০০% অর্গানিক</h3>
            <p className="text-gray-600">কোন রাসায়নিক সার বা কীটনাশক ব্যবহার ছাড়াই চাষ করা</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-xl text-green-800 font-semibold mb-2">নিরাপদ পেমেন্ট</h3>
            <p className="text-gray-600">ক্যাশ অন ডেলিভারি সহ সম্পূর্ণ সুরক্ষিত পেমেন্ট সিস্টেম</p>
          </div>
        </div>
      </div>
    </section>
  )
}
