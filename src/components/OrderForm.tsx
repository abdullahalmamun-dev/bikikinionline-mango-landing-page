/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { useState, useEffect } from 'react'

interface SizePrice {
  weight: string
  price: number
}

interface Product {
  _id: string
  name: string
  sizes: SizePrice[]
}

// Bangladesh Administrative Data Structure
const bangladeshData = {
  divisions: [
    {
      name: "ঢাকা", // Dhaka
      districts: [
        {
          name: "ঢাকা", // Dhaka
          policeStations: [
            "আদাবর", "বাড্ডা", "বনানী", "বংশাল", "বিমানবন্দর", "ক্যান্টনমেন্ট", "দক্ষিণখান", "দারুস সালাম", 
            "ধানমন্ডি", "গেন্ডারিয়া", "গুলশান", "হাজারীবাগ", "জাতরাবাড়ি", "কদমতলী", "কাফরুল", "কলাবাগান", 
            "খিলগাঁও", "খিলক্ষেত", "কোতোয়ালী", "লালবাগ", "মিরপুর", "মোহাম্মদপুর", "মতিঝিল", "নিউ মার্কেট", 
            "পল্লবী", "পলটন", "রমনা", "রামপুরা", "সাভার", "শাহবাগ", "শাহ আলী", "শেরে বাংলা নগর", "শ্যামপুর", 
            "সুত্রাপুর", "তেজগাঁও", "উত্তরা", "ওয়ারী"
          ]
        },
        {
          name: "ফরিদপুর",
          policeStations: ["ফরিদপুর সদর", "বোয়ালমারী", "আলফাডাঙ্গা", "মধুখালী", "ভাঙ্গা", "নগরকান্দা", "সদরপুর", "চরভদ্রাসন", "সালথা"]
        },
        {
          name: "গাজীপুর",
          policeStations: ["কালীগঞ্জ", "কালিয়াকৈর", "কাপাসিয়া", "গাজীপুর সদর", "শ্রীপুর"]
        },
        {
          name: "গোপালগঞ্জ",
          policeStations: ["গোপালগঞ্জ সদর", "কাশিয়ানী", "কোটালীপাড়া", "মুকসুদপুর", "টুঙ্গীপাড়া"]
        },
        {
          name: "কিশোরগঞ্জ",
          policeStations: ["কিশোরগঞ্জ সদর", "বাজিতপুর", "ভৈরব", "হোসেনপুর", "কটিয়াদী", "করিমগঞ্জ", "কুলিয়ারচর", "মিঠামইন", "নিকলী", "পাকুন্দিয়া", "তাড়াইল", "ইটনা", "অষ্টগ্রাম"]
        },
        {
          name: "মাদারীপুর",
          policeStations: ["মাদারীপুর সদর", "কালকিনি", "রাজৈর", "শিবচর", "ডাসার"]
        },
        {
          name: "মানিকগঞ্জ",
          policeStations: ["মানিকগঞ্জ সদর", "সিংগাইর", "শিবালয়", "সাটুরিয়া", "হরিরামপুর", "ঘিওর", "দৌলতপুর"]
        },
        {
          name: "মুন্সিগঞ্জ",
          policeStations: ["মুন্সিগঞ্জ সদর", "টংগীবাড়ি", "সিরাজদিখান", "লৌহজং", "গজারিয়া", "শ্রীনগর"]
        },
        {
          name: "নারায়ণগঞ্জ",
          policeStations: ["আড়াইহাজার", "বন্দর", "নারায়নগঞ্জ সদর", "রূপগঞ্জ", "সোনারগাঁ"]
        },
        {
          name: "নরসিংদী",
          policeStations: ["নরসিংদী সদর", "বেলাবো", "মনোহরদী", "পলাশ", "রায়পুরা", "শিবপুর"]
        },
        {
          name: "রাজবাড়ী",
          policeStations: ["বালিয়াকান্দি", "গোয়ালন্দ", "কালুখালী", "পাংশা", "রাজবাড়ী সদর"]
        },
        {
          name: "শরীয়তপুর",
          policeStations: ["ভেদরগঞ্জ", "ডামুড্যা", "গোসাইরহাট", "জাজিরা", "নড়িয়া", "শরিয়তপুর সদর"]
        },
        {
          name: "টাঙ্গাইল",
          policeStations: ["বাসাইল", "ভুয়াপুর", "দেলদুয়ার", "ঘাটাইল", "গোপালপুর", "মধুপুর", "মির্জাপুর", "নাগরপুর", "সখিপুর", "টাঙ্গাইল সদর", "কালিহাতী", "ধনবাড়ী"]
        }
      ]
    },
    {
      name: "চট্টগ্রাম", // Chittagong
      districts: [
        {
          name: "কুমিল্লা", // Comilla
          policeStations: ["ব্রাহ্মণপাড়া", "বুড়িচং", "চান্দিনা", "চৌদ্দগ্রাম", "দাউদকান্দি", "দেবিদ্বার", "হোমনা", "কুমিল্লা সদর", "লাকসাম", "লালমাই", "মুরাদনগর", "নাঙ্গলকোট", "মেঘনা", "তিতাস", "মনোহরগঞ্জ", "সদর দক্ষিণ", "আদর্শ সদর", "বরুড়া"]
        },
        {
          name: "ফেনী",
          policeStations: ["ছাগলনাইয়া", "ফেনী সদর", "পরশুরাম", "ফুলগাজী", "দাগনভূঞা", "সোনাগাজী"]
        },
        {
          name: "ব্রাহ্মণবাড়িয়া",
          policeStations: ["ব্রাহ্মণবাড়িয়া সদর", "কসবা", "নাসিরনগর", "সরাইল", "আশুগঞ্জ", "আখাউড়া", "নবীনগর", "বাঞ্ছারামপুর", "বিজয়নগর"]
        },
        {
          name: "রাঙ্গামাটি",
          policeStations: ["রাঙ্গামাটি সদর", "কাপ্তাই", "কাউখালী", "বাঘাইছড়ি", "বরকল", "লংগদু", "রাজস্থলী", "বিলাইছড়ি", "জুরাছড়ি", "নানিয়ারচর"]
        },
        {
          name: "নোয়াখালী",
          policeStations: ["নোয়াখালী সদর", "কোম্পানীগঞ্জ", "বেগমগঞ্জ", "হাতিয়া", "সুবর্ণচর", "কবিরহাট", "সেনবাগ", "চাটখিল", "সোনাইমুড়ী"]
        },
        {
          name: "চাঁদপুর",
          policeStations: ["চাঁদপুর সদর", "ফরিদগঞ্জ", "হাইমচর", "হাজীগঞ্জ", "কচুয়া", "মতলব উত্তর", "মতলব দক্ষিণ", "শাহরাস্তি"]
        },
        {
          name: "লক্ষ্মীপুর",
          policeStations: ["লক্ষ্মীপুর সদর", "কমলনগর", "রায়পুর", "রামগঞ্জ", "রামগতি"]
        },
        {
          name: "চট্টগ্রাম",
          policeStations: ["আনোয়ারা", "কর্ণফুলি", "চন্দনাইশ", "পটিয়া", "ফটিকছড়ি", "বাঁশখালী", "বোয়ালখালী", "মীরসরাই", "রাউজান", "রাঙ্গুনিয়া", "লোহাগাড়া", "সন্দ্বীপ", "সাতকানিয়া", "সীতাকুণ্ড", "হাটহাজারী"]
        },
        {
          name: "কক্সবাজার",
          policeStations: ["উখিয়া", "কক্সবাজার সদর", "কুতুবদিয়া", "চকরিয়া", "টেকনাফ", "পেকুয়া", "মহেশখালী", "রামু", "ঈদগাঁও"]
        },
        {
          name: "খাগড়াছড়ি",
          policeStations: ["খাগড়াছড়ি সদর", "দীঘিনালা", "পানছড়ি", "মহালছড়ি", "মাটিরাঙ্গা", "মানিকছড়ি", "রামগড়", "লক্ষীছড়ি"]
        },
        {
          name: "বান্দরবান",
          policeStations: ["আলিকদম", "থানচি", "নাইক্ষ্যংছড়ি", "বান্দরবান সদর", "রুমা", "রোয়াংছড়ি", "লামা"]
        }
      ]
    },
    {
      name: "রাজশাহী", // Rajshahi
      districts: [
        {
          name: "সিরাজগঞ্জ",
          policeStations: ["বেলকুচি", "চৌহালি", "কামারখন্দ", "কাজীপুর", "রায়গঞ্জ", "শাহজাদপুর", "সিরাজগঞ্জ সদর", "তাড়াশ", "উল্লাপাড়া"]
        },
        {
          name: "পাবনা",
          policeStations: ["সুজানগর", "ঈশ্বরদী", "ভাঙ্গুড়া", "পাবনা সদর", "বেড়া", "আটঘরিয়া", "চাটমোহর", "সাঁথিয়া", "ফরিদপুর"]
        },
        {
          name: "বগুড়া",
          policeStations: ["কাহালু", "বগুড়া সদর", "সারিয়াকান্দি", "শাজাহানপুর", "দুপচাচিঁয়া", "আদমদিঘি", "নন্দিগ্রাম", "সোনাতলা", "ধুনট", "গাবতলী", "শেরপুর", "শিবগঞ্জ"]
        },
        {
          name: "রাজশাহী",
          policeStations: ["পবা", "দুর্গাপুর", "মোহনপুর", "চারঘাট", "পুঠিয়া", "বাঘা", "গোদাগাড়ী", "তানোর", "বাগমারা"]
        },
        {
          name: "নাটোর",
          policeStations: ["নাটোর সদর", "সিংড়া", "বড়াইগ্রাম", "বাগাতিপাড়া", "লালপুর", "গুরুদাসপুর", "নলডাঙ্গা"]
        },
        {
          name: "জয়পুরহাট",
          policeStations: ["আক্কেলপুর", "কালাই", "ক্ষেতলাল", "পাঁচবিবি", "জয়পুরহাট সদর"]
        },
        {
          name: "চাঁপাইনবাবগঞ্জ",
          policeStations: ["চাঁপাইনবাবগঞ্জ সদর", "গোমস্তাপুর", "নাচোল", "ভোলাহাট", "শিবগঞ্জ"]
        },
        {
          name: "নওগাঁ",
          policeStations: ["আত্রাই", "বদলগাছি", "ধামইরহাট", "মান্দা", "মহাদেবপুর", "নওগাঁ সদর", "নিয়ামতপুর", "পত্নীতলা", "পোরশা", "রাণীনগর", "সাপাহার"]
        }
      ]
    },
    {
      name: "খুলনা", // Khulna
      districts: [
        {
          name: "যশোর",
          policeStations: ["অভয়নগর", "কেশবপুর", "চৌগাছা", "ঝিকরগাছা", "বাঘারপাড়া", "মনিরামপুর", "যশোর সদর", "শার্শা"]
        },
        {
          name: "সাতক্ষীরা",
          policeStations: ["আশাশুনি", "কলারোয়া", "কালীগঞ্জ", "তালা", "দেবহাটা", "শ্যামনগর", "সাতক্ষীরা সদর"]
        },
        {
          name: "মেহেরপুর",
          policeStations: ["মেহেরপুর সদর", "গাংনী", "মুজিবনগর"]
        },
        {
          name: "নড়াইল",
          policeStations: ["নড়াইল সদর", "লোহাগড়া", "কালিয়া", "নড়াগাতি"]
        },
        {
          name: "চুয়াডাঙ্গা",
          policeStations: ["আলমডাঙ্গা", "চুয়াডাঙ্গা সদর", "দামুড়হুদা", "জীবননগর"]
        },
        {
          name: "কুষ্টিয়া",
          policeStations: ["কুষ্টিয়া সদর", "কুমারখালী", "খোকসা", "মিরপুর", "দৌলতপুর", "ভেড়ামারা"]
        },
        {
          name: "মাগুরা",
          policeStations: ["মাগুরা সদর", "মহম্মদপুর", "শালিখা", "শ্রীপুর"]
        },
        {
          name: "খুলনা",
          policeStations: ["কয়রা", "ডুমুরিয়া", "তেরখাদা", "দাকোপ", "দিঘলিয়া", "পাইকগাছা", "ফুলতলা", "বটিয়াঘাটা", "রূপসা"]
        },
        {
          name: "বাগেরহাট",
          policeStations: ["কচুয়া", "চিতলমারী", "ফকিরহাট", "বাগেরহাট সদর", "মোংলা", "মোড়েলগঞ্জ", "মোল্লাহাট", "রামপাল", "শরণখোলা"]
        },
        {
          name: "ঝিনাইদহ",
          policeStations: ["কালীগঞ্জ", "কোটচাঁদপুর", "ঝিনাইদহ সদর", "মহেশপুর", "শৈলকুপা", "হরিণাকুন্ডু"]
        }
      ]
    },
    {
      name: "বরিশাল", // Barisal
      districts: [
        {
          name: "ঝালকাঠি",
          policeStations: ["ঝালকাঠি সদর", "কাঠালিয়া", "নলছিটি", "রাজাপুর"]
        },
        {
          name: "পটুয়াখালী",
          policeStations: ["বাউফল", "পটুয়াখালী সদর", "দুমকি", "দশমিনা", "কলাপাড়া", "মির্জাগঞ্জ", "গলাচিপা", "রাঙ্গাবালী"]
        },
        {
          name: "পিরোজপুর",
          policeStations: ["পিরোজপুর সদর", "নাজিরপুর", "কাউখালী", "ভান্ডারিয়া", "মঠবাড়িয়া", "নেছারাবাদ", "ইন্দুরকানী"]
        },
        {
          name: "বরিশাল",
          policeStations: ["আগৈলঝাড়া", "বাবুগঞ্জ", "বাকেরগঞ্জ", "বানারীপাড়া", "বরিশাল সদর", "গৌরনদী", "হিজলা", "মেহেন্দীগঞ্জ", "মুলাদী", "উজিরপুর"]
        },
        {
          name: "ভোলা",
          policeStations: ["ভোলা সদর", "বোরহানউদ্দিন", "চরফ্যাশন", "দৌলতখান", "লালমোহন", "মনপুরা", "তজুমুদ্দিন"]
        },
        {
          name: "বরগুনা",
          policeStations: ["আমতলী", "বামনা", "বরগুনা সদর", "বেতাগী", "পাথরঘাটা", "তালতলী"]
        }
      ]
    },
    {
      name: "সিলেট", // Sylhet
      districts: [
        {
          name: "সিলেট",
          policeStations: ["সিলেট সদর", "বালাগঞ্জ", "বিশ্বনাথ", "কোম্পানীগঞ্জ", "ফেঞ্চুগঞ্জ", "গোলাপগঞ্জ", "গোয়াইনঘাট", "জৈন্তাপুর", "কানাইঘাট", "দক্ষিণ সুরমা", "জকিগঞ্জ", "ওসমানীনগর"]
        },
        {
          name: "মৌলভীবাজার",
          policeStations: ["মৌলভীবাজার সদর", "বড়লেখা", "জুড়ী", "কমলগঞ্জ", "কুলাউড়া", "রাজনগর", "শ্রীমঙ্গল"]
        },
        {
          name: "হবিগঞ্জ",
          policeStations: ["হবিগঞ্জ সদর", "আজমিরীগঞ্জ", "বানিয়াচং", "বাহুবল", "চুনারুঘাট", "লাখাই", "মাধবপুর", "নবীগঞ্জ", "শায়েস্তাগঞ্জ"]
        },
        {
          name: "সুনামগঞ্জ",
          policeStations: ["সুনামগঞ্জ সদর", "দক্ষিণ সুনামগঞ্জ", "বিশ্বম্ভরপুর", "ছাতক", "দিরাই", "ধর্মপাশা", "দোয়ারাবাজার", "জগন্নাথপুর", "জামালগঞ্জ", "তাহিরপুর", "শাল্লা", "মধ্যনগর"]
        }
      ]
    },
    {
      name: "রংপুর", // Rangpur
      districts: [
        {
          name: "পঞ্চগড়",
          policeStations: ["পঞ্চগড় সদর", "আটোয়ারী", "বোদা", "দেবীগঞ্জ", "তেতুলিয়া"]
        },
        {
          name: "দিনাজপুর",
          policeStations: ["দিনাজপুর সদর", "বিরামপুর", "বিরল", "বোচাগঞ্জ", "চিরিরবন্দর", "ফুলবাড়ী", "ঘোড়াঘাট", "হাকিমপুর", "কাহারোল", "খানসামা", "নবাবগঞ্জ", "পার্বতীপুর", "বীরগঞ্জ"]
        },
        {
          name: "লালমনিরহাট",
          policeStations: ["লালমনিরহাট সদর", "কালীগঞ্জ", "হাতীবান্ধা", "পাটগ্রাম", "আদিতমারী"]
        },
        {
          name: "নীলফামারী",
          policeStations: ["নীলফামারী সদর", "কিশোরগঞ্জ", "ডিমলা", "ডোমার", "জলঢাকা", "সৈয়দপুর"]
        },
        {
          name: "গাইবান্ধা",
          policeStations: ["গাইবান্ধা সদর", "গোবিন্দগঞ্জ", "পলাশবাড়ী", "সাদুল্লাপুর", "সাঘাটা", "সুন্দরগঞ্জ", "ফুলছড়ি"]
        },
        {
          name: "ঠাকুরগাঁও",
          policeStations: ["ঠাকুরগাঁও সদর", "বালিয়াডাঙ্গী", "পীরগঞ্জ", "রাণীশংকৈল", "হরিপুর"]
        },
        {
          name: "রংপুর",
          policeStations: ["রংপুর সদর", "গংগাচড়া", "তারাগঞ্জ", "বদরগঞ্জ", "মিঠাপুকুর", "পীরগঞ্জ", "কাউনিয়া", "পীরগাছা"]
        },
        {
          name: "কুড়িগ্রাম",
          policeStations: ["কুড়িগ্রাম সদর", "নাগেশ্বরী", "ভুরুঙ্গামারী", "ফুলবাড়ী", "রাজারহাট", "উলিপুর", "চিলমারী", "রৌমারী", "চর রাজিবপুর"]
        }
      ]
    },
    {
      name: "ময়মনসিংহ", // Mymensingh
      districts: [
        {
          name: "শেরপুর",
          policeStations: ["শেরপুর সদর", "নালিতাবাড়ী", "শ্রীবরদী", "নকলা", "ঝিনাইগাতী"]
        },
        {
          name: "ময়মনসিংহ",
          policeStations: ["ময়মনসিংহ সদর", "ফুলবাড়ীয়া", "ত্রিশাল", "ভালুকা", "মুক্তাগাছা", "ধোবাউড়া", "ফুলপুর", "হালুয়াঘাট", "গৌরীপুর", "গফরগাঁও", "ঈশ্বরগঞ্জ", "নান্দাইল", "তারাকান্দা"]
        },
        {
          name: "জামালপুর",
          policeStations: ["জামালপুর সদর", "বকশীগঞ্জ", "দেওয়ানগঞ্জ", "ইসলামপুর", "মাদারগঞ্জ", "মেলান্দহ", "সরিষাবাড়ী"]
        },
        {
          name: "নেত্রকোণা",
          policeStations: ["নেত্রকোণা সদর", "আটপাড়া", "বারহাট্টা", "দুর্গাপুর", "কলমাকান্দা", "কেন্দুয়া", "মদন", "মোহনগঞ্জ", "পূর্বধলা", "খালিয়াজুরী"]
        }
      ]
    }
  ]
};

export default function OrderForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: {
      house: '',
      road: '',
      area: '',
      policeStation: '',
      district: '',
      division: ''
    },
    product: '',
    selectedSize: null as SizePrice | null,
    quantity: 1,
    area: 'dhaka'
  })
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [productsLoading, setProductsLoading] = useState(true)
  
  // Filter functions for cascading dropdowns
  const getFilteredDistricts = () => {
    if (!formData.address.division) return [];
    
    const selectedDivision = bangladeshData.divisions.find(div => div.name === formData.address.division);
    return selectedDivision ? selectedDivision.districts : [];
  };
  
  const getFilteredPoliceStations = () => {
    if (!formData.address.division || !formData.address.district) return [];
    
    const selectedDivision = bangladeshData.divisions.find(div => div.name === formData.address.division);
    if (!selectedDivision) return [];
    
    const selectedDistrict = selectedDivision.districts.find(dist => dist.name === formData.address.district);
    return selectedDistrict ? selectedDistrict.policeStations : [];
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/mangoes')
        if (!response.ok) throw new Error('Failed to fetch products')
        const data = await response.json()
        setProducts(data)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError('পণ্য তালিকা লোড করতে সমস্যা হয়েছে')
      } finally {
        setProductsLoading(false)
      }
    }
    fetchProducts()
  }, [])

  // Reset dependent fields when parent selection changes
  useEffect(() => {
    if (formData.address.division) {
      setFormData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          district: '',
          policeStation: ''
        }
      }));
    }
  }, [formData.address.division]);

  useEffect(() => {
    if (formData.address.district) {
      setFormData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          policeStation: ''
        }
      }));
    }
  }, [formData.address.district]);

  const selectedProduct = products.find(p => p._id === formData.product)
  const selectedSizePrice = formData.selectedSize?.price || 0
  const totalAmount = selectedSizePrice * formData.quantity
  const deliveryCharge = formData.area === 'dhaka' ? 80 : 150
  const grandTotal = totalAmount + deliveryCharge 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      if (!selectedProduct || !formData.selectedSize) {
        throw new Error('অনুগ্রহ করে একটি পণ্য এবং সাইজ নির্বাচন করুন')
      }

      const orderData = {
        customerName: formData.name,
        phoneNumber: formData.phone,
        address: formData.address,
        deliveryArea: formData.area,
        products: [{
          productId: selectedProduct._id,
          quantity: formData.quantity,
          price: formData.selectedSize.price
        }],
        totalAmount,
        deliveryCharge,
        grandTotal
      }

      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
      })

      const responseData = await response.json()
      
      if (!response.ok) {
        throw new Error(responseData.message || 'অর্ডার জমা দেওয়া যায়নি. আবার চেষ্টা করুন')
      }

      setFormData({
        name: '',
        phone: '',
        address: {
          house: '',
          road: '',
          area: '',
          policeStation: '',
          district: '',
          division: ''
        },
        product: '',
        selectedSize: null,
        quantity: 1,
        area: 'dhaka'
      })
      alert('অর্ডার সফলভাবে জমা হয়েছে!')

    }
    
    catch (err) {
            
      // setError(err.message || 'একটি ত্রুটি ঘটেছে. আবার চেষ্টা করুন')
    } finally {
      setLoading(false)
    }
  }

  const handleAddressChange = (field: keyof typeof formData.address, value: string) => {
    setFormData(prev => ({
      ...prev,
      address: {
        ...prev.address,
        [field]: value
      }
    }))
  }

  return (
    <section id="order" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-green-800">
          অর্ডার ফর্ম
        </h2>

        <div className="max-w-2xl mx-auto text-green-400 bg-green-50 p-8 rounded-lg">
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">আপনার নাম</label>
              <input
                type="text"
                className="w-full p-3 border rounded-lg"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">মোবাইল নম্বর</label>
              <input
                type="tel"
                className="w-full p-3 border rounded-lg"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-green-800">ঠিকানা বিবরণ</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">বাড়ি নম্বর</label>
                  <input
                    type="text"
                    className="w-full p-3 border rounded-lg"
                    value={formData.address.house}
                    onChange={(e) => handleAddressChange('house', e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">রোড/মহল্লা</label>
                  <input
                    type="text"
                    className="w-full p-3 border rounded-lg"
                    value={formData.address.road}
                    onChange={(e) => handleAddressChange('road', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">এলাকা</label>
                  <input
                    type="text"
                    className="w-full p-3 border rounded-lg"
                    value={formData.address.area}
                    onChange={(e) => handleAddressChange('area', e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">বিভাগ</label>
                  <select
                    className="w-full p-3 border rounded-lg"
                    value={formData.address.division}
                    onChange={(e) => handleAddressChange('division', e.target.value)}
                    required
                  >
                    <option value="">বিভাগ নির্বাচন করুন</option>
                    {bangladeshData.divisions.map((division, index) => (
                      <option key={index} value={division.name}>{division.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">জেলা</label>
                  <select
                    className="w-full p-3 border rounded-lg"
                    value={formData.address.district}
                    onChange={(e) => handleAddressChange('district', e.target.value)}
                    required
                    disabled={!formData.address.division}
                  >
                    <option value="">জেলা নির্বাচন করুন</option>
                    {getFilteredDistricts().map((district, index) => (
                      <option key={index} value={district.name}>{district.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">থানা</label>
                  <select
                    className="w-full p-3 border rounded-lg"
                    value={formData.address.policeStation}
                    onChange={(e) => handleAddressChange('policeStation', e.target.value)}
                    required
                    disabled={!formData.address.district}
                  >
                    <option value="">থানা নির্বাচন করুন</option>
                    {getFilteredPoliceStations().map((policeStation, index) => (
                      <option key={index} value={policeStation}>{policeStation}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">পণ্য নির্বাচন</label>
              <select
                className="w-full p-3 border rounded-lg"
                value={formData.product}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  product: e.target.value,
                  selectedSize: null
                })}
                required
                disabled={productsLoading}
              >
                <option value="">পণ্য নির্বাচন করুন</option>
                {products.map((product) => (
                  <option key={product._id} value={product._id}>
                    {product.name}
                  </option>
                ))}
              </select>
              {productsLoading && <p className="mt-2 text-sm text-gray-500">পণ্য তালিকা লোড হচ্ছে...</p>}
            </div>

            {selectedProduct && (
              <div>
                <label className="block text-sm font-medium mb-2">সাইজ নির্বাচন</label>
                <select
                  className="w-full p-3 border rounded-lg"
                  value={formData.selectedSize ? JSON.stringify(formData.selectedSize) : ''}
                  onChange={(e) => {
                    const selectedSize = JSON.parse(e.target.value) as SizePrice
                    setFormData({ ...formData, selectedSize })
                  }}
                  required
                >
                  <option value="">সাইজ নির্বাচন করুন</option>
                  {selectedProduct.sizes.map((size, index) => (
                    <option key={index} value={JSON.stringify(size)}>
                      {size.weight} - {size.price} টাকা
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-2">পরিমাণ</label>
              <input
                type="number"
                min="1"
                className="w-full p-3 border rounded-lg"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) || 1 })}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">ডেলিভারি এরিয়া</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="area"
                    value="dhaka"
                    checked={formData.area === 'dhaka'}
                    onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                    className="h-4 w-4 text-green-600"
                  />
                  ঢাকা (৮০ টাকা ডেলিভারি চার্জ)
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="area"
                    value="outside"
                    checked={formData.area === 'outside'}
                    onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                    className="h-4 w-4 text-green-600"
                  />
                  ঢাকার বাইরে (১৫০ টাকা ডেলিভারি চার্জ)
                </label>
              </div>
            </div>

            <div className="bg-green-100 p-4 rounded-lg">
              <div className="flex justify-between mb-2">
                <span className="font-medium">পণ্যের মূল্য:</span>
                <span>{totalAmount} টাকা</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="font-medium">ডেলিভারি চার্জ:</span>
                <span>{deliveryCharge} টাকা</span>
              </div>
              <div className="flex justify-between font-bold">
                <span>সর্বমোট:</span>
                <span>{grandTotal.toFixed(2)} টাকা</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || productsLoading || !formData.selectedSize}
              className={`w-full bg-green-600 text-white py-3 rounded-lg transition-colors ${
                loading || productsLoading || !formData.selectedSize 
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'hover:bg-green-700'
              }`}
            >
              {loading ? 'জমা হচ্ছে...' : 'অর্ডার নিশ্চিত করুন'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
