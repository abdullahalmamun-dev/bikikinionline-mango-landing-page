// components/WhyChooseUs.tsx
export default function WhyChooseUs() {
    return (
      <section id="why-choose" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-green-800">
            কেন আমাদের বেছে নিবেন?
          </h2>
  
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-green-50 p-8 rounded-lg">
              <div className="flex items-start mb-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-xl text-green-800 font-semibold mb-2">সততা ও বিশ্বস্ততা</h3>
                  <p className="text-gray-600">১০০% অরিজিনাল প্রোডাক্টের গ্যারান্টি</p>
                </div>
              </div>
  
              <div className="flex items-start mb-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-xl text-green-800 font-semibold mb-2">দ্রুত ডেলিভারি</h3>
                  <p className="text-gray-600">অর্ডার করার ২৪-৪৮ ঘন্টার মধ্যে ডেলিভারি</p>
                </div>
              </div>
            </div>
  
            <div className="bg-green-50 p-8 rounded-lg">
              <div className="flex items-start mb-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-xl text-green-800 font-semibold mb-2">মান নিয়ন্ত্রণ</h3>
                  <p className="text-gray-600">৩ স্তরবিশিষ্ট কোয়ালিটি চেক সিস্টেম</p>
                </div>
              </div>
  
              <div className="flex items-start mb-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-xl text-green-800 font-semibold mb-2">২৪/৭ সাপোর্ট</h3>
                  <p className="text-gray-600">যেকোন সমস্যায় আমাদের সাথে যোগাযোগ করুন</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
  