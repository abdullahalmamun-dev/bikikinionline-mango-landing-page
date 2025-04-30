'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

interface OrderProduct {
  name: string
  weight: string
  price: number
  quantity: number
  total: number
}

interface Order {
  _id: string
  orderNumber: string
  customerName: string
  phoneNumber: string
  address: {
    house: string
    road?: string
    area: string
    policeStation: string
    district: string
    division: string
  }
  deliveryArea: string
  products: OrderProduct[]
  subtotal: number
  deliveryCharge: number
  grandTotal: number
  currentStatus: string
  statusHistory: Array<{
    status: string
    timestamp: string
    updatedBy: string
  }>
}

export default function ControlMangoOrders() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/orders');
      if (!response.ok) throw new Error('Failed to fetch orders');
      const { data } = await response.json(); // Destructure data from response
      setOrders(Array.isArray(data) ? data : []); // Ensure it's always an array
    } catch (err) {
      setError('Failed to load orders');
      setOrders([]); // Set empty array as fallback
    } finally {
      setLoading(false);
    }
  };
  

  const handleUpdateOrder = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedOrder) return

    try {
      const response = await fetch(`/api/orders/${selectedOrder._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(selectedOrder)
      })

      if (!response.ok) throw new Error('Update failed')
      
      setEditModalOpen(false)
      fetchOrders()
      MySwal.fire({
        title: 'Success!',
        text: 'Order updated successfully',
        icon: 'success',
        confirmButtonText: 'OK'
      })
    } catch (err) {
      MySwal.fire({
        title: 'Error!',
        text: 'Failed to update order',
        icon: 'error',
        confirmButtonText: 'OK'
      })
    }
  }

  const generateInvoice = (order: Order) => {
    const doc = new jsPDF()
    
    // Header
    doc.setFontSize(18)
    doc.text('Bikiki Mango House', 15, 15)
    doc.setFontSize(12)
    doc.text(`Invoice #${order.orderNumber}`, 15, 25)
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 15, 35)

    // Company Info
    doc.setFontSize(10)
    doc.text('Mohammadpur, Dhaka-1207', 15, 45)
    doc.text('Phone: 01712345678', 15, 50)

    // Customer Info
    doc.text(`Customer: ${order.customerName}`, 15, 65)
    doc.text(`Phone: ${order.phoneNumber}`, 15, 70)
    doc.text(`Address: ${Object.values(order.address).join(', ')}`, 15, 75)

    // Products Table
    autoTable(doc, {
      startY: 85,
      head: [['Product', 'Weight', 'Price', 'Qty', 'Total']],
      body: order.products.map(p => [
        p.name,
        p.weight,
        `৳${p.price}`,
        p.quantity,
        `৳${p.total}`
      ]),
      theme: 'grid'
    })

    // Totals
    const finalY = (doc as any).lastAutoTable.finalY || 85
    doc.text(`Subtotal: ৳${order.subtotal}`, 15, finalY + 10)
    doc.text(`Delivery Charge: ৳${order.deliveryCharge}`, 15, finalY + 15)
    doc.text(`Grand Total: ৳${order.grandTotal}`, 15, finalY + 20)

    // Footer
    doc.setFontSize(10)
    doc.text('Thank you for your order!', 15, finalY + 30)
    doc.text('Contact us for any queries', 15, finalY + 35)

    doc.save(`invoice-${order.orderNumber}.pdf`)
  }

  if (loading) return <div>Loading orders...</div>
  if (error) return <div className="text-red-500">{error}</div>

  return (
    <div className="p-6 text-gray-800">
      <h1 className="text-2xl font-bold mb-6">Manage Orders</h1>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-3 px-4 text-left">Order #</th>
              <th className="py-3 px-4 text-left">Customer</th>
              <th className="py-3 px-4 text-left">Phone</th>
              <th className="py-3 px-4 text-left">Total</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id} className="border-b">
                <td className="py-3 px-4">{order.orderNumber}</td>
                <td className="py-3 px-4">{order.customerName}</td>
                <td className="py-3 px-4">{order.phoneNumber}</td>
                <td className="py-3 px-4">৳{order.grandTotal}</td>
                <td className="py-3 px-4 capitalize">{order.currentStatus}</td>
                <td className="py-3 px-4 space-x-2">
                  <button
                    onClick={() => {
                      setSelectedOrder(order)
                      setEditModalOpen(true)
                    }}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => generateInvoice(order)}
                    className="bg-green-500 text-white px-3 py-1 rounded"
                  >
                    Invoice
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editModalOpen && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-2xl">
            <h2 className="text-xl font-bold mb-4">Edit Order</h2>
            <form onSubmit={handleUpdateOrder} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label>Customer Name</label>
                  <input
                    type="text"
                    value={selectedOrder.customerName}
                    onChange={e => setSelectedOrder({
                      ...selectedOrder,
                      customerName: e.target.value
                    })}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label>Phone Number</label>
                  <input
                    type="text"
                    value={selectedOrder.phoneNumber}
                    onChange={e => setSelectedOrder({
                      ...selectedOrder,
                      phoneNumber: e.target.value
                    })}
                    className="w-full p-2 border rounded"
                  />
                </div>
              </div>

              <div>
                <label>Status</label>
                <select
                  value={selectedOrder.currentStatus}
                  onChange={e => setSelectedOrder({
                    ...selectedOrder,
                    currentStatus: e.target.value
                  })}
                  className="w-full p-2 border rounded"
                >
                  {['ordered', 'confirmed', 'delivering', 'delivered', 'cancelled'].map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setEditModalOpen(false)}
                  className="bg-gray-500 text-white p-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white p-2 rounded"
                >
                  Update Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
