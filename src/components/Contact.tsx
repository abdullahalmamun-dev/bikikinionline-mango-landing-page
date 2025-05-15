// components/Contact.tsx
'use client'
import { FaMapMarkerAlt, FaPhoneAlt, FaClock, FaEnvelope, FaFacebook, FaWhatsapp } from 'react-icons/fa'

export default function Contact() {
  return (
    <section id="contact" className="py-5 md:py-16 bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-screen-xl mx-auto px-4 md:px-10">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-5 md:mb-12 text-green-800">
          যোগাযোগ করুন
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-start space-x-4 mb-6">
                <div className="text-green-600 mt-1">
                  <FaMapMarkerAlt size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">অফিসের ঠিকানা</h3>
                  <p className="text-gray-600">বাড়ি ৯৫, রোড ১৩, নবীনগর হাউজিং, <br/>মোহাম্মদপুর, ঢাকা-১২০৭, বাংলাদেশ</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 mb-6">
                <div className="text-green-600 mt-1">
                  <FaPhoneAlt size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">ফোন নম্বর</h3>
                  <p className="text-gray-600">+880 1333-318076<br/>+880 1333-317719 <br/> +880 1333-317720 </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 mb-6">
                <div className="text-green-600 mt-1">
                  <FaClock size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">কর্মঘণ্টা</h3>
                  <p className="text-gray-600">শনি-বৃহ: সকাল ৯টা - রাত ১০টা<br/>শুক্র: বন্ধ</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="text-green-600 mt-1">
                  <FaEnvelope size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">ইমেইল</h3>
                  <p className="text-gray-600">support@bikikinionline.com<br/>sales@bikikinionline.com</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">সামাজিক মাধ্যম</h3>
              <div className="flex space-x-4">
                <a href="https://www.facebook.com/bikikinionline" className="text-green-600 hover:text-green-800">
                  <FaFacebook size={28} />
                </a>
                <a href="http://wa.me/+8801333318076" className="text-green-600 hover:text-green-800">
                  <FaWhatsapp size={28} />
                </a>
              </div>
            </div>
          </div>


        </div>
      </div>
    </section>
  )
}
