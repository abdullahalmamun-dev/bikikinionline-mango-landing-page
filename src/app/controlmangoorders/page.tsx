/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useState, useEffect } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {SiyamRupaliFont} from "@/utils/fonts";

const MySwal = withReactContent(Swal);

declare module 'jspdf' {
  interface jsPDF {
    lastAutoTable: {
      finalY: number;
    };
  }
}

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch("https://xw0go80kwsgggkg40ooos8gw.92.112.181.229.sslip.io/api/orders");
      if (!response.ok) throw new Error("Failed to fetch orders");
      const { data } = await response.json();
      setOrders(Array.isArray(data) ? data : []);
    } catch (err) {
      setError("Failed to load orders");
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const initializeFonts = (doc: jsPDF) => {
    try {
      // Add to Virtual File System
    doc.addFileToVFS("SiyamRupali-normal.ttf", SiyamRupaliFont.normal);

       // Register font with Unicode encoding
    doc.addFont(
        "SiyamRupali-normal.ttf",
        "SiyamRupali",
        "normal",
        "Identity-H" // Critical for Unicode
      );

       // Check font existence properly
    const fontList = doc.getFontList();
    if (!("SiyamRupali" in fontList)) {
      throw new Error("SiyamRupali font not registered");
    }

      doc.setFont("SiyamRupali", "normal");
    } catch (e) {
      console.error("Font initialization failed:", e);
      doc.setFont("helvetica", "normal");
    }
  };

  const handleUpdateOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrder) return;

    try {
      const response = await fetch(`/api/orders/${selectedOrder._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(selectedOrder),
      });

      if (!response.ok) throw new Error("Update failed");

      setEditModalOpen(false);
      fetchOrders();
      MySwal.fire({
        title: "সফল!",
        text: "অর্ডার সফলভাবে আপডেট করা হয়েছে",
        icon: "success",
        confirmButtonText: "ঠিক আছে",
      });
    } catch (err) {
      MySwal.fire({
        title: "ত্রুটি!",
        text: "অর্ডার আপডেট ব্যর্থ হয়েছে",
        icon: "error",
        confirmButtonText: "ঠিক আছে",
      });
    }
  };

  const generateInvoice = (order: Order) => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
      filters: ["ASCIIHexEncode"], // Important for Bangla
      putOnlyUsedFonts: true

    });

    initializeFonts(doc);

    // Set document language and direction
    // doc.setLanguage("bn-BD");
// Explicitly set font before any text operations
doc.setFont("SiyamRupali", "normal");


    // Header Section
    doc.setFillColor(30, 136, 229);
    doc.rect(0, 0, 210, 30, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(20);
    doc.text("বিকিকিনি অনলাইন", 105, 15, { align: "center" });
    doc.setFontSize(12);
    doc.text("বাড়ি ৯৫, রোড ১৩, নবীনগর হাউজিং, মোহাম্মদপুর, ঢাকা-১২০৭", 105, 22, { align: "center" });

    // Invoice Details
    doc.setFillColor(255, 255, 255);
    doc.rect(10, 35, 190, 20, "F");
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(14);
    doc.text(`ইনভয়েস নং: #${order.orderNumber}`, 15, 40);
    doc.text(`তারিখ: ${formatBanglaDate(new Date())}`, 150, 40);

    // Customer Information
    autoTable(doc, {
      startY: 50,
      head: [
        [
          {
            content: "গ্রাহক তথ্য",
            styles: {
              fillColor: [76, 175, 80],
              textColor: [255, 255, 255],
              fontSize: 14,
              font: "SiyamRupali",
              fontStyle: "normal",
            },
          },
        ],
      ],
      body: [
        ["নাম", order.customerName],
        ["ফোন", order.phoneNumber],
        ["ঠিকানা", formatBanglaAddress(order.address)],
        ["ডেলিভারি এলাকা", order.deliveryArea],
      ],
      styles: {
        font: "SiyamRupali",
        fontStyle: "normal",
        fontSize: 12,
        cellPadding: 5,
      },
      theme: "grid",
      headStyles: {
        fontStyle: "normal",
        halign: "center",
      },
      bodyStyles: {
        halign: "left",
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245],
      },
    });
    

    // Products Table
    autoTable(doc, {
      startY: (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 10,

      head: [
        ["পণ্যের নাম", "ওজন", "দর", "পরিমাণ", "মোট"].map((text) => ({
          content: text,
          styles: {
            fillColor: [63, 81, 181],
            textColor: [255, 255, 255],
            font: "SiyamRupali",
          },
        })),
      ],
      body: order.products.map((product) => [
        product.name,
        product.weight,
        formatCurrency(product.price),
        product.quantity.toString(),
        formatCurrency(product.total),
      ]),
      styles: {
        font: "SiyamRupali",
        fontSize: 12,
        cellPadding: 5,
      },
      theme: "grid",
      headStyles: {
        fontStyle: "normal",
        halign: "center",
      },
      bodyStyles: {
        halign: "left",
      },
    });

    // Totals Section
    const finalY = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 10;
    doc.setFillColor(63, 81, 181);
    doc.rect(120, finalY, 80, 25, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFont("SiyamRupali", "normal");
    doc.setFontSize(14);
    doc.text("সর্বমোট:", 125, finalY + 10);
    doc.text(formatCurrency(order.grandTotal), 165, finalY + 10);

    // Footer
    doc.setFillColor(51, 51, 51);
    doc.rect(0, 280, 210, 20, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(12);
    doc.text("আমাদের সাথে কেনাকাটা করার জন্য ধন্যবাদ", 105, 287, {
      align: "center",
      // font: "SiyamRupali",
    });

    doc.save(`invoice-${order.orderNumber}.pdf`);
  };

  // Helper functions
  const formatCurrency = (amount: number): string => {
    return (
      new Intl.NumberFormat("bn-BD", {
        style: "currency",
        currency: "BDT",
        minimumFractionDigits: 0,
      })
        .format(amount)
        .replace("৳", "")
        .trim() + " টাকা"
    );
  };

  const formatBanglaDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Intl.DateTimeFormat("bn-BD", options).format(date);
  };
  const formatBanglaAddress = (address: unknown): string => {
    const typedAddress = address as Order['address'];
    return [
      typedAddress.house,
      typedAddress.road,
      `এলাকা: ${typedAddress.area}`,
      typedAddress.policeStation,
      typedAddress.district,
      typedAddress.division,
    ]
      .filter(Boolean)
      .join(", ");
  };
  
  

  if (loading) return <div>অর্ডার লোড হচ্ছে...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="p-6 text-gray-800">
      <h1 className="text-2xl font-bold mb-6">অর্ডার ব্যবস্থাপনা</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-3 px-4 text-left">অর্ডার নং</th>
              <th className="py-3 px-4 text-left">গ্রাহক</th>
              <th className="py-3 px-4 text-left">ফোন</th>
              <th className="py-3 px-4 text-left">মোট</th>
              <th className="py-3 px-4 text-left">স্ট্যাটাস</th>
              <th className="py-3 px-4 text-left">কার্যক্রম</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="border-b">
                <td className="py-3 px-4">{order.orderNumber}</td>
                <td className="py-3 px-4">{order.customerName}</td>
                <td className="py-3 px-4">{order.phoneNumber}</td>
                <td className="py-3 px-4">
                  {formatCurrency(order.grandTotal)}
                </td>
                <td className="py-3 px-4 capitalize">{order.currentStatus}</td>
                <td className="py-3 px-4 space-x-2">
                  <button
                    onClick={() => {
                      setSelectedOrder(order);
                      setEditModalOpen(true);
                    }}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    সম্পাদনা
                  </button>
                  <button
                    onClick={() => generateInvoice(order)}
                    className="bg-green-500 text-white px-3 py-1 rounded"
                  >
                    ইনভয়েস
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
            <h2 className="text-xl font-bold mb-4">অর্ডার সম্পাদনা</h2>
            <form onSubmit={handleUpdateOrder} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label>গ্রাহকের নাম</label>
                  <input
                    type="text"
                    value={selectedOrder.customerName}
                    onChange={(e) =>
                      setSelectedOrder({
                        ...selectedOrder,
                        customerName: e.target.value,
                      })
                    }
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label>ফোন নম্বর</label>
                  <input
                    type="text"
                    value={selectedOrder.phoneNumber}
                    onChange={(e) =>
                      setSelectedOrder({
                        ...selectedOrder,
                        phoneNumber: e.target.value,
                      })
                    }
                    className="w-full p-2 border rounded"
                  />
                </div>
              </div>

              <div>
                <label>স্ট্যাটাস</label>
                <select
                  value={selectedOrder.currentStatus}
                  onChange={(e) =>
                    setSelectedOrder({
                      ...selectedOrder,
                      currentStatus: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded"
                >
                  {[
                    "ordered",
                    "confirmed",
                    "delivering",
                    "delivered",
                    "cancelled",
                  ].map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setEditModalOpen(false)}
                  className="bg-gray-500 text-white p-2 rounded"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white p-2 rounded"
                >
                  আপডেট করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
