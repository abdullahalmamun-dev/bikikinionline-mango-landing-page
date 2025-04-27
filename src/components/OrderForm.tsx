// components/OrderForm.tsx
'use client'
import { useState, useEffect } from 'react'

interface Product {
  _id: string
  name: string
  price: number
  weight: string
}

export default function OrderForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    product: '',
    quantity: 1,
    area: 'dhaka'
  })
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [productsLoading, setProductsLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/mangoes')
        if (!response.ok) throw new Error('Failed to fetch products')
        const data = await response.json()
        setProducts(data)
      } catch (err) {
        setError('পণ্য তালিকা লোড করতে সমস্যা হয়েছে')
      } finally {
        setProductsLoading(false)
      }
    }
    fetchProducts()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const selectedProduct = products.find(p => p._id === formData.product)
      if (!selectedProduct) {
        throw new Error('অনুগ্রহ করে একটি পণ্য নির্বাচন করুন')
      }

      // Calculate charges
      const totalAmount = selectedProduct.price * formData.quantity
      const deliveryCharge = formData.area === 'dhaka' ? 100 : 150
      const codCharge = totalAmount * 0.02 // 2% COD charge
      const grandTotal = totalAmount + deliveryCharge + codCharge

      const orderData = {
        customerName: formData.name,
        phoneNumber: formData.phone,
        address: formData.address,
        deliveryArea: formData.area,
        products: [{
          productId: selectedProduct._id,
          quantity: formData.quantity,
          price: selectedProduct.price
        }],
        totalAmount,
        deliveryCharge,
        codCharge,
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

      // Reset form after successful submission
      setFormData({
        name: '',
        phone: '',
        address: '',
        product: '',
        quantity: 1,
        area: 'dhaka'
      })

      alert('অর্ডার সফলভাবে জমা হয়েছে!')
    } catch (err) {
      setError(err.message || 'একটি ত্রুটি ঘটেছে. আবার চেষ্টা করুন')
    } finally {
      setLoading(false)
    }
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

            <div>
              <label className="block text-sm font-medium mb-2">ঠিকানা</label>
              <textarea
                className="w-full p-3 border rounded-lg"
                rows={3}
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                required
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">পণ্য নির্বাচন</label>
              <select
                className="w-full p-3 border rounded-lg"
                value={formData.product}
                onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                required
                disabled={productsLoading}
              >
                <option value="">পণ্য নির্বাচন করুন</option>
                {products.map((product) => (
                  <option key={product._id} value={product._id}>
                    {product.name} - {product.weight} ({product.price} টাকা)
                  </option>
                ))}
              </select>
              {productsLoading && <p className="mt-2 text-sm text-gray-500">পণ্য তালিকা লোড হচ্ছে...</p>}
            </div>

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
              <select
                className="w-full p-3 border rounded-lg"
                value={formData.area}
                onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                required
              >
                <option value="dhaka">ঢাকা</option>
                <option value="outside">ঢাকার বাইরে</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading || productsLoading}
              className={`w-full bg-green-600 text-white py-3 rounded-lg transition-colors ${
                loading || productsLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-700'
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
