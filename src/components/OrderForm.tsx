'use client'
import { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import FacebookPixelTracker from './FacebookPixelTracker'

const MySwal = withReactContent(Swal)


interface SizePrice {
  weight: string
  price: number
}

interface Product {
  _id: string
  name: string
  sizes: SizePrice[]
}

interface Division {
  name: string
  districts: District[]
}

interface District {
  name: string
  policeStations: string[]
}

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
    area: 'dhaka' // Removed quantity from state
  })
  const [administrativeData, setAdministrativeData] = useState<Division[]>([])
  const [dataLoading, setDataLoading] = useState(true)
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [productsLoading, setProductsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/bangladesh-administrative.json')
        if (!response.ok) throw new Error('Failed to load administrative data')
        const data = await response.json()
        setAdministrativeData(data.divisions)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError('প্রশাসনিক ডেটা লোড করতে সমস্যা হয়েছে')
      } finally {
        setDataLoading(false)
      }
    }
    fetchData()
  }, [])

  const getFilteredDistricts = () => {
    if (!formData.address.division) return []
    return administrativeData.find(div => div.name === formData.address.division)?.districts || []
  }

  const getFilteredPoliceStations = () => {
    if (!formData.address.district) return []
    const districts = getFilteredDistricts()
    return districts.find(dist => dist.name === formData.address.district)?.policeStations || []
  }

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://xw0go80kwsgggkg40ooos8gw.92.112.181.229.sslip.io/api/mangoes')
        if (!response.ok) {
          const errorData = await response.text()
          throw new Error(errorData || 'Failed to fetch products')
        }
        const data = await response.json()
        setProducts(data)
      } catch (err) {
        setError('পণ্য তালিকা লোড করতে সমস্যা হয়েছে')
        console.error('Error fetching products:', err)
      } finally {
        setProductsLoading(false)
      }
    }
    fetchProducts()
  }, [])

  useEffect(() => {
    if (formData.address.division) {
      setFormData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          district: '',
          policeStation: ''
        }
      }))
    }
  }, [formData.address.division])

  useEffect(() => {
    if (formData.address.district) {
      setFormData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          policeStation: ''
        }
      }))
    }
  }, [formData.address.district])

  const selectedProduct = products.find(p => p._id === formData.product)
  const selectedSizePrice = formData.selectedSize?.price || 0
const totalAmount = selectedSizePrice // Removed quantity multiplication
const deliveryCharge = formData.area === 'dhaka' ? 100 : 150
const grandTotal = Number((totalAmount + deliveryCharge).toFixed(2))

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  setLoading(true)
  setError('')

  try {
    if (!selectedProduct || !formData.selectedSize) {
      throw new Error('Please select a product and size')
    }

    const orderData = {
      customerName: formData.name.trim(),
      phoneNumber: formData.phone.trim(),
      address: {
        house: formData.address.house.trim(),
        road: formData.address.road?.trim(),
        area: formData.address.area.trim(),
        policeStation: formData.address.policeStation.trim(),
        district: formData.address.district.trim(),
        division: formData.address.division.trim()
      },
      deliveryArea: formData.area,
      products: [{
        name: selectedProduct.name,
        weight: formData.selectedSize.weight, // Make sure weight is included
        price: formData.selectedSize.price,
        quantity: 1
      }],
      subtotal: totalAmount,
      deliveryCharge: deliveryCharge,
      grandTotal: grandTotal
    };

    const response = await fetch('https://xw0go80kwsgggkg40ooos8gw.92.112.181.229.sslip.io/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(orderData)
    })

    const responseData = await response.json()
    
    if (!response.ok) {
      throw new Error(
        responseData.details?.join(', ') || 
        responseData.error || 
        'Failed to submit order'
      )
    }

    // Reset form
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
      area: 'dhaka'
    })

    MySwal.fire({
      title: '<strong>ধন্যবাদ!</strong>',
      html: '<div style="color: #1a5632; font-size: 1.1rem">আপনার অর্ডার সফলভাবে জমা হয়েছে। আমাদের প্রতিনিধি শীঘ্রই আপনার সাথে যোগাযোগ করবে</div>',
      icon: 'success',
      confirmButtonText: 'ঠিক আছে',
      confirmButtonColor: '#16a34a',
      customClass: {
        popup: 'bangla-font',
        title: 'bangla-title'
      },
      showClass: {
        popup: 'swal2-show',
        backdrop: 'swal2-backdrop-show'
      },
      hideClass: {
        popup: 'swal2-hide',
        backdrop: 'swal2-backdrop-hide'
      }
    })
  } catch (err) {
    const error = err instanceof Error ? err : new Error('Unknown error')
    setError(`Order failed: ${error.message}`)
    console.error('Submission error:', error)
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
          <FacebookPixelTracker />
          
          <form id="order-form" onSubmit={handleSubmit} className="space-y-6">
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
  <div className="relative">
    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
      <span className="text-gray-500">+880</span>
    </div>
    <input
      type="tel"
      className="w-full pl-16 p-3 border rounded-lg"
      value={formData.phone.replace(/^\+880/, '')}  // Remove prefix for display
      onChange={(e) => {
        // Allow only numbers and limit to 10 digits (after +880)
        const numbers = e.target.value.replace(/\D/g, '').slice(0, 10);
        const fullNumber = `+880${numbers}`;
        setFormData({ ...formData, phone: fullNumber });
      }}
      onBlur={(e) => {
        // Final validation check
        const isValid = /^\+8801[3-9]\d{8}$/.test(formData.phone);
        if (!isValid) {
          e.target.setCustomValidity('অবশ্যই একটি বৈধ বাংলাদেশী মোবাইল নম্বর হতে হবে');
        } else {
          e.target.setCustomValidity('');
        }
      }}
      pattern="^1[3-9]\d{8}$"  // Pattern for the remaining 10 digits
      required
      placeholder="1712 345678"
    />
  </div>
  <p className="text-sm text-gray-500 mt-1">
    উদাহরণ: +8801712345678
  </p>
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
                    disabled={dataLoading}
                  >
                    <option value="">বিভাগ নির্বাচন করুন</option>
                    {administrativeData.map((division, index) => (
                      <option key={index} value={division.name}>
                        {division.name}
                      </option>
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
                    disabled={!formData.address.division || dataLoading}
                  >
                    <option value="">জেলা নির্বাচন করুন</option>
                    {getFilteredDistricts().map((district, index) => (
                      <option key={index} value={district.name}>
                        {district.name}
                      </option>
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
                    disabled={!formData.address.district || dataLoading}
                  >
                    <option value="">থানা নির্বাচন করুন</option>
                    {getFilteredPoliceStations().map((policeStation : string, index : number) => (
                      <option key={index} value={policeStation}>
                        {policeStation}
                      </option>
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
                  ঢাকা (১০০ টাকা ডেলিভারি চার্জ)
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
