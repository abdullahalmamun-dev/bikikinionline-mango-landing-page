"use client";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

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
                {/* Keep table row contents the same */}
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

      {/* Detail Modal */}
      {detailModalOpen && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <h2 className="text-xl font-bold mb-4">Order Details</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium">Order Number</label>
                  <p className="mt-1 text-sm">{selectedOrder.orderNumber}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium">Order Date</label>
                  <p className="mt-1 text-sm">{new Date().toLocaleDateString()}</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium">Customer Information</label>
                <div className="mt-1 text-sm space-y-1">
                  <p>Name: {selectedOrder.customerName}</p>
                  <p>Phone: {selectedOrder.phoneNumber}</p>
                  <p>Address: {formatAddress(selectedOrder.address)}</p>
                  <p>Delivery Area: {selectedOrder.deliveryArea}</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium">Products</label>
                <table className="min-w-full mt-2">
                  <thead>
                    <tr>
                      <th className="py-2 px-4 text-left border-b">S/N</th>
                      <th className="py-2 px-4 text-left border-b">Product</th>
                      <th className="py-2 px-4 text-left border-b">Weight</th>
                      <th className="py-2 px-4 text-left border-b">Price</th>
                      <th className="py-2 px-4 text-left border-b">Qty</th>
                      <th className="py-2 px-4 text-left border-b">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedOrder.products.map((product, index) => (
                      <tr key={index}>
                        <td className="py-2 px-4">{index}</td>
                        <td className="py-2 px-4">{product.name}</td>
                        <td className="py-2 px-4">{product.weight}</td>
                        <td className="py-2 px-4">{formatCurrency(product.price)}</td>
                        <td className="py-2 px-4">{product.quantity}</td>
                        <td className="py-2 px-4">{formatCurrency(product.total)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <div>
                  <label className="block text-sm font-medium">Subtotal</label>
                  <p className="mt-1 text-sm">{formatCurrency(selectedOrder.subtotal)}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium">Delivery Charge</label>
                  <p className="mt-1 text-sm">{formatCurrency(selectedOrder.deliveryCharge)}</p>
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-semibold">Grand Total</label>
                  <p className="mt-1 text-lg font-bold">{formatCurrency(selectedOrder.grandTotal)}</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setDetailModalOpen(false)}
              className="mt-6 bg-gray-500 text-white px-4 py-2 rounded float-right"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Edit Modal */}
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
