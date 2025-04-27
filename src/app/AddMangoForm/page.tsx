// components/AddMangoForm.tsx
'use client'
import { useState } from 'react'

interface SizePrice {
  weight: string
  price: number
}

interface MangoFormData {
  name: string
  sizes: SizePrice[]
}

export default function AddMangoForm() {
  const [formData, setFormData] = useState<MangoFormData>({
    name: '',
    sizes: [{ weight: '১ কেজি', price: 0 }]
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const weightOptions = ['১০ কেজি', '২০ কেজি', '৩০ কেজি', '৪০ কেজি']

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // Basic validation
      if (!formData.name.trim()) {
        throw new Error('আমের নাম প্রয়োজন')
      }
      if (formData.sizes.some(size => size.price <= 0)) {
        throw new Error('সব সাইজের জন্য বৈধ দাম লিখুন')
      }

      const response = await fetch('http://localhost:5000/api/mangoes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.message || 'আম যোগ করতে সমস্যা হয়েছে')
      }

      // Reset form
      setFormData({
        name: '',
        sizes: [{ weight: '১ কেজি', price: 0 }]
      })
      alert('আম সফলভাবে যোগ করা হয়েছে!')
    } catch (err) {
      setError(err.message || 'একটি ত্রুটি ঘটেছে. আবার চেষ্টা করুন')
    } finally {
      setLoading(false)
    }
  }

  const addSize = () => {
    setFormData(prev => ({
      ...prev,
      sizes: [...prev.sizes, { weight: '১ কেজি', price: 0 }]
    }))
  }

  const removeSize = (index: number) => {
    setFormData(prev => ({
      ...prev,
      sizes: prev.sizes.filter((_, i) => i !== index)
    }))
  }

  const handleSizeChange = (index: number, field: keyof SizePrice, value: string | number) => {
    const newSizes = [...formData.sizes]
    newSizes[index][field] = value as never
    setFormData(prev => ({ ...prev, sizes: newSizes }))
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-green-800">নতুন আম যোগ করুন</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">আমের নাম</label>
          <input
            type="text"
            className="w-full p-2 border rounded-md text-gray-800"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">সাইজ এবং দাম</label>
          {formData.sizes.map((size, index) => (
            <div key={index} className="flex gap-4 items-start">
              <div className="flex-1 grid grid-cols-2 gap-4">
                <select
                  className="p-2 border rounded-md text-gray-800"
                  value={size.weight}
                  onChange={(e) => handleSizeChange(index, 'weight', e.target.value)}
                  required
                >
                  {weightOptions.map(weight => (
                    <option key={weight} value={weight}>{weight}</option>
                  ))}
                </select>
                <input
                  type="number"
                  className="p-2 border rounded-md text-gray-800"
                  placeholder="দাম"
                  min="0"
                  value={size.price || ''}
                  onChange={(e) => handleSizeChange(index, 'price', Number(e.target.value))}
                  required
                />
              </div>
              {formData.sizes.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeSize(index)}
                  className="px-3 py-2 bg-red-100 text-red-600 rounded-md hover:bg-red-200"
                >
                  ×
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addSize}
            className="px-4 py-2 bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200"
          >
            + নতুন সাইজ যোগ করুন
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 bg-green-600 text-white rounded-md ${
            loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-700'
          }`}
        >
          {loading ? 'সংরক্ষণ করা হচ্ছে...' : 'আম সংরক্ষণ করুন'}
        </button>
      </form>
    </div>
  )
}
