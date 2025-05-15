// components/FAQ.tsx
'use client'
import { useState } from 'react'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqItems = [

    {
      question: 'ডেলিভারি চার্জ কত?',
      answer: 'ঢাকার ভেতরে ১০০ টাকা এবং ঢাকার বাইরে ১৫০ টাকা ডেলিভারি চার্জ। '
    },
    {
      question: 'রিফান্ড পলিসি কি?',
      answer: 'যেকোন ত্রুটিপূর্ণ পণ্য পাওয়ার ২৪ ঘন্টার মধ্যে ফটো প্রমাণসহ অভিযোগ করতে হবে। আমরা ৪৮ ঘন্টার মধ্যে রিপ্লেসমেন্ট বা রিফান্ডের ব্যবস্থা করব'
    },
    {
      question: 'পেমেন্ট মেথড কি কি?',
      answer: 'ক্যাশ অন ডেলিভারি (COD), বিকাশ, নগদ এবং রকেট গ্রহণযোগ্য। অনলাইন পেমেন্টে ১.৫% অতিরিক্ত চার্জ প্রযোজ্য'
    },

    {
      question: 'আম সংরক্ষণের সঠিক পদ্ধতি কি?',
      answer: '৮-১০°C তাপমাত্রায় রেফ্রিজারেটরে রাখুন। কলাপাতা বা নিউজপ্রিন্টে মুড়ে রাখলে ২-৩ দিন পর্যন্ত সতেজ থাকবে'
    },

    {
      question: 'ডেলিভারি সময় কত লাগে?',
      answer: 'ঢাকার ভেতরে ২৪-৪৮ ঘন্টা এবং ঢাকার বাইরে ৩-৫ কার্যদিবস। প্রি-অর্ডার করলে নির্ধারিত তারিখে ডেলিভারি দেওয়া হয়'
    },

    {
      question: 'কোন সমস্যায় কিভাবে যোগাযোগ করব?',
      answer: '২৪/৭ হেল্পলাইন +৮৮০১৬১১১১০২৪, হোয়াটসঅ্যাপ +৮৮০১৬১১১১১০২৪, অথবা আমাদের ফেসবুক পেজে মেসেজ দিন'
    }
  ]

  return (
    <section id="faq" className="py-5 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-green-800">
          সচরাচর জিজ্ঞাস্য প্রশ্নাবলি
        </h2>

        <div className="max-w-3xl mx-auto">
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div 
                key={index}
                className="border rounded-lg transition-all duration-300 ease-in-out"
                style={{
                  boxShadow: openIndex === index 
                    ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                    : 'none'
                }}
              >
                <button 
                  className="flex justify-between items-center w-full p-4 text-left hover:bg-green-50 rounded-lg"
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  aria-expanded={openIndex === index}
                  aria-controls={`faq-content-${index}`}
                >
                  <span className="font-medium text-green-800 text-lg">
                    {item.question}
                  </span>
                  <svg 
                    className={`w-6 h-6 text-green-600 transform transition-transform duration-300 ${
                      openIndex === index ? 'rotate-180' : 'rotate-0'
                    }`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M19 9l-7 7-7-7" 
                    />
                  </svg>
                </button>
                <div
                  id={`faq-content-${index}`}
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="p-4 pt-0 border-t border-green-100">
                    <p className="text-gray-600 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
