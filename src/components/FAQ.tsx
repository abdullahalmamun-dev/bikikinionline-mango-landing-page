// components/FAQ.tsx
export default function FAQ() {
    return (
      <section id="faq" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-green-800">
            সচরাচর জিজ্ঞাস্য প্রশ্নাবলি
          </h2>
  
          <div className="max-w-3xl mx-auto">
            <div className="space-y-4">
              {[
                {
                  question: 'আমের প্রকারভেদ কিভাবে বোঝব?',
                  answer: 'আমাদের ওয়েবসাইটে প্রতিটি আমের বিস্তারিত বিবরণ ও ছবি দেওয়া আছে'
                },
                {
                  question: 'ডেলিভারি চার্জ কত?',
                  answer: 'ঢাকার ভেতরে ১০০ টাকা এবং ঢাকার বাইরে ১৫০ টাকা ডেলিভারি চার্জ'
                },
                {
                  question: 'রিফান্ড পলিসি কি?',
                  answer: 'যেকোন ত্রুটিপূর্ণ পণ্য পাওয়ার ২৪ ঘন্টার মধ্যে রিফান্ডের ব্যবস্থা'
                }
              ].map((item, index) => (
                <div key={index} className="border rounded-lg">
                  <button className="flex justify-between items-center w-full p-4 text-left">
                    <span className="font-medium text-green-800">{item.question}</span>
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div className="p-4 pt-0 border-t">
                    <p className="text-gray-600">{item.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }
  