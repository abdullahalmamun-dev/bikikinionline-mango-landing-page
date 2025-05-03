"use client";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Image from "next/image";
import logo from '../logo.png'

const MySwal = withReactContent(Swal);

interface OrderProduct {
  name: string;
  weight: string;
  price: number;
  quantity: number;
  total: number;
}

interface Order {
  _id: string;
  orderNumber: string;
  customerName: string;
  phoneNumber: string;
  address: {
    house: string;
    road?: string;
    area: string;
    policeStation: string;
    district: string;
    division: string;
  };
  deliveryArea: string;
  products: OrderProduct[];
  subtotal: number;
  deliveryCharge: number;
  grandTotal: number;
  currentStatus: string;
  statusHistory: Array<{
    status: string;
    timestamp: string;
    updatedBy: string;
  }>;
}

export default function ControlMangoOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(30);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    const results = orders.filter(order =>
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredOrders(results);
    setCurrentPage(1); // Reset to first page when search changes
  }, [searchTerm, orders]);

  const fetchOrders = async () => {
    try {
      const response = await fetch("https://xw0go80kwsgggkg40ooos8gw.92.112.181.229.sslip.io/api/orders");
      if (!response.ok) throw new Error("Failed to fetch orders");
      const { data } = await response.json();
      
      // Sort orders by date (oldest first)
      const sortedData = Array.isArray(data) 
        ? data.sort((a, b) => 
            new Date(a.statusHistory[0].timestamp).getTime() - 
            new Date(b.statusHistory[0].timestamp).getTime()
          )
        : [];
      
      setOrders(sortedData);
      setFilteredOrders(sortedData);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("Failed to load orders");
      setOrders([]);
      setFilteredOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const indexOfLastOrder = currentPage * rowsPerPage;
  const indexOfFirstOrder = indexOfLastOrder - rowsPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(filteredOrders.length / rowsPerPage);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleUpdateOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrder) return;

    try {
      const response = await fetch(`http://localhost:5000/api/orders/${selectedOrder._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...selectedOrder,
          address: selectedOrder.address, // Ensure full address object
          products: selectedOrder.products.map(p => ({
            ...p,
            price: Number(p.price),
            quantity: Number(p.quantity)
          }))
        }),
      });

      if (!response.ok) throw new Error("Update failed");

      setEditModalOpen(false);
      fetchOrders();
      MySwal.fire({
        title: "Success!",
        text: "Order updated successfully",
        icon: "success",
        confirmButtonText: "OK",
      });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      MySwal.fire({
        title: "Error!",
        text: "Failed to update order",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'BDT',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const updateProduct = (index: number, field: string, value: string | number) => {
    if (!selectedOrder) return;
    
    const updatedProducts = selectedOrder.products.map((product, i) => 
      i === index ? { ...product, [field]: value } : product
    );
    
    setSelectedOrder({
      ...selectedOrder,
      products: updatedProducts
    });
  };
  
  const formatAddress = (address: Order['address']): string => {
    return [
      address.house,
      address.road,
      `Area: ${address.area}`,
      address.policeStation,
      address.district,
      address.division,
    ].filter(Boolean).join(", ");
  };

  if (loading) return <div className="p-6">Loading orders...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="p-6 text-gray-800">
      <h1 className="text-2xl font-bold mb-6">Order Management System</h1>

       {/* Search Bar */}
       <div className="mb-6">
        <input
          type="text"
          placeholder="Search by order number..."
          className="w-full p-3 border rounded-lg"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      <div className="overflow-x-auto rounded-lg border">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
            <th className="py-3 px-4 text-left text-sm font-semibold">Serial No.</th>
              <th className="py-3 px-4 text-left text-sm font-semibold">Order #</th>
              <th className="py-3 px-4 text-left text-sm font-semibold">Customer</th>
              <th className="py-3 px-4 text-left text-sm font-semibold">Phone</th>
              <th className="py-3 px-4 text-left text-sm font-semibold">Total</th>
              <th className="py-3 px-4 text-left text-sm font-semibold">Status</th>
              <th className="py-3 px-4 text-left text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {currentOrders.map((order, index) => (
              <tr key={order._id}>
                <td className="py-3 px-4 text-sm">
                  {(currentPage - 1) * rowsPerPage + index + 1}
                </td>
                <td className="py-3 px-4 text-sm">{order.orderNumber}</td>
                <td className="py-3 px-4 text-sm">{order.customerName}</td>
                <td className="py-3 px-4 text-sm">{order.phoneNumber}</td>
                <td className="py-3 px-4 text-sm">{formatCurrency(order.grandTotal)}</td>
                <td className="py-3 px-4 text-sm capitalize">{order.currentStatus}</td>
                <td className="py-3 px-4 text-sm space-x-2">
                  <button
                    onClick={() => {
                      setSelectedOrder(order);
                      setDetailModalOpen(true);
                    }}
                    className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
                  >
                    View
                  </button>
                  <button
                    onClick={() => {
                      setSelectedOrder(order);
                      setEditModalOpen(true);
                    }}
                    className="bg-yellow-500 text-white px-3 py-1 rounded text-sm"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between mt-4">
        <div>
          Showing {indexOfFirstOrder + 1} to {Math.min(indexOfLastOrder, filteredOrders.length)} of {filteredOrders.length} entries
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      {/* Enhanced Detail Modal */}
      {detailModalOpen && selectedOrder && (
        <div className="fixed inset-0 bg-white bg-opacity-60 flex items-center justify-center p-4 backdrop-blur-sm z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl overflow-hidden">
            {/* Company Header Section */}
            <div className="px-2 py-2 bg-gradient-to-r from-purple-600 to-green-700 p-2 text-white">
              <div className="flex items-center">
                <Image 
                  src={logo} 
                  alt="BIKIKINI ONLINE" 
                  className="h-16 w-auto mr-4 bg-white p-2 rounded-lg" 
                />
                <div>
                  <h1 className="text-2xl font-bold">BIKIKINI ONLINE</h1>
                  <p className="text-sm opacity-90">House 95, Road 13, Nabinagar Housing, Mohammadpur, Dhaka 1207</p>
                  <p className="text-sm opacity-90">Phone: +880 1333-318076 | +880 1333-317720 | +880 1333-317719</p>
                </div>
              </div>
            </div>
            
            <div className=" p-2 bg-gray-50">
              <div className="mb-2 p-2">
                <div className="inline-block rounded-t-lg bg-green-600 text-white px-4 py-2 text-lg font-semibold">
                  Order #{selectedOrder.orderNumber}
                </div>
                <div className="border border-indigo-200 rounded-b-lg rounded-tr-lg bg-white p-5 shadow-sm">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Order Information */}
                    <div>
                      <h3 className="text-md font-semibold text-green-800 mb-3 pb-2 border-b border-indigo-100">Order Information</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Date:</span>
                          <span className="font-medium">{new Date().toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Status:</span>
                          <span className="font-medium capitalize">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              selectedOrder.currentStatus === 'delivered' ? 'bg-green-100 text-green-800' : 
                              selectedOrder.currentStatus === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                              selectedOrder.currentStatus === 'ordered' ? 'bg-yellow-100 text-yellow-800' : 
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {selectedOrder.currentStatus}
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Customer Information */}
                    <div className="px-2 py-2">
                      <h3 className="text-md  font-semibold text-green-800  border-b border-indigo-100">Customer Details</h3>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Name:</span>
                          <span className="font-medium">{selectedOrder.customerName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Phone:</span>
                          <span className="font-medium">{selectedOrder.phoneNumber}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Delivery Area:</span>
                          <span className="font-medium">{selectedOrder.deliveryArea}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Address Information */}
                  <div className="px-2 py-2">
                    <h3 className="text-md font-semibold text-green-800  border-b border-indigo-100">Delivery Address</h3>
                    <div className="bg-indigo-50 px-3 rounded-lg border border-indigo-100">
                      <p className="text-gray-700">{formatAddress(selectedOrder.address)}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Products Section */}
              <div className="px-2 py-2">
                <div className="inline-block rounded-t-lg bg-green-600 text-white px-4  text-lg font-semibold">
                  Order Items
                </div>
                <div className="border border-indigo-200 rounded-b-lg rounded-tr-lg bg-white p-5 shadow-sm">
                  <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                      <thead className="bg-indigo-50">
                        <tr>
                          <th className="py-1 px-4 text-left text-xs font-semibold text-green-700 uppercase tracking-wider border-b border-indigo-100">S/N</th>
                          <th className="py-1 px-4 text-left text-xs font-semibold text-green-700 uppercase tracking-wider border-b border-indigo-100">Product</th>
                          <th className="py-1 px-4 text-left text-xs font-semibold text-green-700 uppercase tracking-wider border-b border-indigo-100">Weight</th>
                          <th className="py-1 px-4 text-left text-xs font-semibold text-green-700 uppercase tracking-wider border-b border-indigo-100">Price</th>
                          <th className="py-1 px-4 text-left text-xs font-semibold text-green-700 uppercase tracking-wider border-b border-indigo-100">Qty</th>
                          <th className="py-1 px-4 text-right text-xs font-semibold text-green-700 uppercase tracking-wider border-b border-indigo-100">Total</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-green-100">
                        {selectedOrder.products.map((product, index) => (
                          <tr key={index} className="hover:bg-green-50">
                            <td className="py-1 px-4 text-sm text-gray-700">{index + 1}</td>
                            <td className="py-1 px-4 text-sm font-medium text-green-800">{product.name}</td>
                            <td className="py-1 px-4 text-sm text-gray-700">{product.weight}</td>
                            <td className="py-1 px-4 text-sm text-gray-700">{formatCurrency(product.price)}</td>
                            <td className="py-1 px-4 text-sm text-gray-700">{product.quantity}</td>
                            <td className="py-1 px-4 text-sm font-medium text-indigo-900 text-right">{formatCurrency(product.total)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              
              {/* Totals Section */}
              <div className="px-2 py-2">
                <div className="inline-block rounded-t-lg bg-green-600 text-white px-4 text-lg font-semibold">
                  Amount Summary
                </div>
                <div className="border px-4 py-2 border-indigo-200 rounded-b-lg rounded-tr-lg bg-white pxs-2 shadow-sm">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div></div>
                    <div className="space-y-2">
                      <div className="flex justify-between py-1 border-b border-indigo-100">
                        <span className="text-gray-600">Subtotal:</span>
                        <span className="font-medium">{formatCurrency(selectedOrder.subtotal)}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-indigo-100">
                        <span className="text-gray-600">Delivery Charge:</span>
                        <span className="font-medium">{formatCurrency(selectedOrder.deliveryCharge)}</span>
                      </div>
                      <div className="flex justify-between py-1 mt-1 bg-indigo-50 px-4 rounded-lg">
                        <span className="font-bold text-indigo-800">Grand Total:</span>
                        <span className="font-bold text-indigo-800">{formatCurrency(selectedOrder.grandTotal)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Footer */}
            <div className="bg-gray-100 px-6 py-4 flex justify-end border-t">
              <button
                onClick={() => setDetailModalOpen(false)}
                className="bg-green-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal (Unchanged) */}
      {editModalOpen && selectedOrder && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg w-full max-w-2xl">
          <h2 className="text-xl font-bold mb-4">Edit Order Details</h2>
          <form onSubmit={handleUpdateOrder} className="space-y-4">
            {/* Customer Info Section */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium">Customer Name</label>
                <input
                  type="text"
                  value={selectedOrder.customerName}
                  onChange={(e) => setSelectedOrder({
                    ...selectedOrder,
                    customerName: e.target.value
                  })}
                  className="w-full p-2 border rounded mt-1"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Phone Number</label>
                <input
                  type="tel"
                  value={selectedOrder.phoneNumber}
                  onChange={(e) => setSelectedOrder({
                    ...selectedOrder,
                    phoneNumber: e.target.value
                  })}
                  className="w-full p-2 border rounded mt-1"
                  required
                />
              </div>
            </div>

            {/* Address Section */}
            <div className="space-y-2">
              <label className="block text-sm font-medium">Address</label>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="House Number"
                  value={selectedOrder.address.house}
                  onChange={(e) => setSelectedOrder({
                    ...selectedOrder,
                    address: {
                      ...selectedOrder.address,
                      house: e.target.value
                    }
                  })}
                  className="p-2 border rounded"
                  required
                />
                <input
                  type="text"
                  placeholder="Road (Optional)"
                  value={selectedOrder.address.road || ''}
                  onChange={(e) => setSelectedOrder({
                    ...selectedOrder,
                    address: {
                      ...selectedOrder.address,
                      road: e.target.value
                    }
                  })}
                  className="p-2 border rounded"
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <input
                  type="text"
                  placeholder="Area"
                  value={selectedOrder.address.area}
                  onChange={(e) => setSelectedOrder({
                    ...selectedOrder,
                    address: {
                      ...selectedOrder.address,
                      area: e.target.value
                    }
                  })}
                  className="p-2 border rounded"
                  required
                />
                <input
                  type="text"
                  placeholder="Police Station"
                  value={selectedOrder.address.policeStation}
                  onChange={(e) => setSelectedOrder({
                    ...selectedOrder,
                    address: {
                      ...selectedOrder.address,
                      policeStation: e.target.value
                    }
                  })}
                  className="p-2 border rounded"
                  required
                />
                <input
                  type="text"
                  placeholder="District"
                  value={selectedOrder.address.district}
                  onChange={(e) => setSelectedOrder({
                    ...selectedOrder,
                    address: {
                      ...selectedOrder.address,
                      district: e.target.value
                    }
                  })}
                  className="p-2 border rounded"
                  required
                />
              </div>
              <input
                type="text"
                placeholder="Division"
                value={selectedOrder.address.division}
                onChange={(e) => setSelectedOrder({
                  ...selectedOrder,
                  address: {
                    ...selectedOrder.address,
                    division: e.target.value
                  }
                })}
                className="p-2 border rounded"
                required
              />
            </div>

            {/* Products Section */}
            <div className="space-y-2">
              <label className="block text-sm font-medium">Products</label>
              {selectedOrder.products.map((product, index) => (
                <div key={index} className="grid grid-cols-5 gap-4 items-center">
                  <input
                    type="text"
                    value={product.name}
                    onChange={(e) => updateProduct(index, 'name', e.target.value)}
                    className="p-2 border rounded"
                    required
                  />
                  <input
                    type="text"
                    value={product.weight}
                    onChange={(e) => updateProduct(index, 'weight', e.target.value)}
                    className="p-2 border rounded"
                    required
                  />
                  <input
                    type="number"
                    value={product.price}
                    onChange={(e) => updateProduct(index, 'price', e.target.value)}
                    className="p-2 border rounded"
                    min="0"
                    required
                  />
                  <input
                    type="number"
                    value={product.quantity}
                    onChange={(e) => updateProduct(index, 'quantity', e.target.value)}
                    className="p-2 border rounded"
                    min="1"
                    required
                  />
                  <span className="text-sm">
                    {formatCurrency(product.price * product.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Status Section */}
            <div>
              <label className="block text-sm font-medium">Order Status</label>
              <select
                value={selectedOrder.currentStatus}
                onChange={(e) => setSelectedOrder({
                  ...selectedOrder,
                  currentStatus: e.target.value
                })}
                className="w-full p-2 border rounded mt-1"
              >
                {[
                  'ordered',
                  'confirmed',
                  'advanced',
                  'delivering',
                  'delivered',
                  'failed',
                  'rejected'
                ].map((status) => (
                  <option key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4">
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
  );
}
