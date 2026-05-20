import { useState, useEffect } from "react";
import {
  Search,
  ChevronRight,
  FileText,
  Printer,
  SlidersHorizontal,
  Loader2,
} from "lucide-react";
import { getOrders, getOrderStats, updateOrderStatus } from "../../api/orderapi";

const TABS        = ["ALL", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"];
const TAB_LABELS  = ["All", "Processing", "Shipped", "Delivered", "Cancelled"];

const statusBadge = {
  PROCESSING: "bg-orange-500 text-white",
  SHIPPED:    "bg-green-600 text-white",
  DELIVERED:  "bg-blue-500 text-white",
  CANCELLED:  "bg-red-600 text-white",
};

export default function OrderManagement() {

  const [activeTab, setActiveTab]     = useState(0);
  const [activePage, setActivePage]   = useState(1);
  const [search, setSearch]           = useState("");
  const [timeFilter, setTimeFilter]   = useState("All Time");
  const [paymentFilter, setPaymentFilter] = useState("All Payment");
  const [selected, setSelected]       = useState([]);

  const [orders, setOrders]           = useState([]);
  const [totalPages, setTotalPages]   = useState(1);
  const [totalOrders, setTotalOrders] = useState(0);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState(null);
  const [stats, setStats]             = useState({
    total: 0, processing: 0, shipped: 0, delivered: 0, cancelled: 0,
  });

 
  const statCards = [
    { label: "Total Orders", value: stats.total,      bg: "bg-teal-100",   text: "text-teal-800",   val: "text-teal-900"   },
    { label: "Processing",   value: stats.processing, bg: "bg-green-100",  text: "text-green-800",  val: "text-green-900"  },
    { label: "Shipped",      value: stats.shipped,    bg: "bg-purple-100", text: "text-purple-800", val: "text-purple-900" },
    { label: "Delivered",    value: stats.delivered,  bg: "bg-lime-100",   text: "text-lime-800",   val: "text-lime-900"   },
    { label: "Cancelled",    value: stats.cancelled,  bg: "bg-red-100",    text: "text-red-800",    val: "text-red-900"    },
  ];


  const tabs = TAB_LABELS.map((label, i) => ({
    label,
    count: [stats.total, stats.processing, stats.shipped, stats.delivered, stats.cancelled][i],
  }));

 
  const fetchStats = () => {
    getOrderStats().then((data) => {
      if (data.success) setStats(data.stats);
    });
  };

  useEffect(() => { fetchStats(); }, []);
  useEffect(() => {
    let isActive = true;

    queueMicrotask(() => {
      if (!isActive) return;
      setLoading(true);
      setError(null);
    });

    getOrders({ status: TABS[activeTab], search, page: activePage })
      .then((data) => {
        if (!isActive) return;
        if (data.success) {
          setOrders(data.orders);
          setTotalPages(data.totalPages);
          setTotalOrders(data.total);
        } else {
          setError("Failed to load orders.");
        }
      })
      .catch(() => {
        if (isActive) setError("Server error. Please try again.");
      })
      .finally(() => {
        if (isActive) setLoading(false);
      });

    return () => {
      isActive = false;
    };
  }, [activeTab, search, activePage]);


  const toggleSelect = (id) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  const toggleAll = (e) =>
    setSelected(e.target.checked ? orders.map((o) => o._id) : []);

  const handleTabChange = (i) => {
    setActiveTab(i);
    setActivePage(1);
    setSelected([]);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setActivePage(1);
  };

  const handleStatusUpdate = async (id, status) => {
    const data = await updateOrderStatus(id, status);
    if (data.success) {
      setOrders((prev) => prev.map((o) => (o._id === id ? { ...o, status } : o)));
      fetchStats();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 font-sans">
      <div className="max-w-5xl mx-auto">


        <h1 className="text-xl font-semibold text-gray-900 mb-1">Order Management</h1>
        <p className="text-sm text-gray-500 mb-5">
          View and manage all customer orders across all statuses.
        </p>


        <div className="grid grid-cols-5 gap-3 mb-5">
          {statCards.map((s) => (
            <div key={s.label} className={`${s.bg} rounded-lg p-4`}>
              <p className={`text-xs ${s.text} mb-1`}>{s.label}</p>
              <p className={`text-2xl font-semibold ${s.val}`}>{s.value}</p>
            </div>
          ))}
        </div>


        <div className="bg-white rounded-xl border border-gray-200 p-5">


          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-semibold text-gray-900">All Orders</span>
            <div className="flex gap-2">
              <button className="flex items-center gap-1.5 text-xs px-3 py-1.5 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 text-gray-700">
                <FileText size={13} /> Export CSV
              </button>
              <button className="flex items-center gap-1.5 text-xs px-3 py-1.5 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 text-gray-700">
                <Printer size={13} /> Print List
              </button>
            </div>
          </div>

     
          <div className="flex border-b border-gray-200 mb-4">
            {tabs.map((tab, i) => (
              <button
                key={tab.label}
                onClick={() => handleTabChange(i)}
                className={`text-sm px-4 py-2 border-b-2 -mb-px transition-colors ${
                  activeTab === i
                    ? "border-gray-900 text-gray-900 font-medium"
                    : "border-transparent text-gray-500 hover:text-gray-800"
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>

          <div className="flex gap-2 mb-4">
            <div className="relative flex-1">
              <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={handleSearchChange}
                placeholder="Search by order ID, customer name or email..."
                className="w-full pl-8 pr-3 py-1.5 text-sm border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-gray-400 placeholder-gray-400"
              />
            </div>
            <select
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
              className="text-sm px-3 py-1.5 border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-gray-400 bg-white text-gray-700"
            >
              <option>All Time</option>
              <option>Today</option>
              <option>This Week</option>
              <option>This Month</option>
            </select>
            <select
              value={paymentFilter}
              onChange={(e) => setPaymentFilter(e.target.value)}
              className="text-sm px-3 py-1.5 border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-gray-400 bg-white text-gray-700"
            >
              <option>All Payment</option>
              <option>VISA</option>
              <option>PayPal</option>
              <option>MasterCard</option>
              <option>Cash on Delivery</option>
            </select>
            <button className="flex items-center gap-1.5 text-sm px-4 py-1.5 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 text-gray-700">
              <SlidersHorizontal size={14} /> Filter
            </button>
          </div>

      
          {error ? (
            <p className="text-center py-10 text-red-500 text-sm">{error}</p>
          ) : loading ? (
            <div className="flex justify-center py-16">
              <Loader2 size={24} className="animate-spin text-gray-400" />
            </div>
          ) : orders.length === 0 ? (
            <p className="text-center py-10 text-gray-400 text-sm">No orders found.</p>
          ) : (
            <table className="w-full text-sm table-fixed">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="w-9 pb-2 text-left">
                    <input
                      type="checkbox"
                      onChange={toggleAll}
                      checked={selected.length === orders.length && orders.length > 0}
                      className="cursor-pointer"
                    />
                  </th>
                  <th className="w-32 pb-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">Order ID</th>
                  <th className="w-40 pb-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">Customer</th>
                  <th className="w-28 pb-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">Date</th>
                  <th className="w-16 pb-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">Items</th>
                  <th className="w-24 pb-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">Total (RS)</th>
                  <th className="w-28 pb-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">Payment</th>
                  <th className="w-24 pb-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">Status</th>
                  <th className="pb-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-3">
                      <input
                        type="checkbox"
                        checked={selected.includes(order._id)}
                        onChange={() => toggleSelect(order._id)}
                        className="cursor-pointer"
                      />
                    </td>
                    <td className="py-3 font-medium text-gray-900 text-xs">{order.orderId}</td>
                    <td className="py-3">
                      <p className="font-medium text-gray-900">{order.customer?.name}</p>
                      <p className="text-xs text-gray-400">{order.customer?.email}</p>
                    </td>
                    <td className="py-3">
                      <p className="text-gray-800">
                        {new Date(order.createdAt).toLocaleDateString("en-GB", {
                          day: "2-digit", month: "short", year: "numeric",
                        })}
                      </p>
                      <p className="text-xs text-gray-400">
                        {new Date(order.createdAt).toLocaleTimeString("en-GB", {
                          hour: "2-digit", minute: "2-digit",
                        })}
                      </p>
                    </td>
                    <td className="py-3 text-gray-700">
                      {order.itemCount} item{order.itemCount !== 1 ? "s" : ""}
                    </td>
                    <td className="py-3 font-semibold text-gray-900">
                      {(order.total ?? 0).toLocaleString()}
                    </td>
                    <td className="py-3 text-gray-700">
                      {order.payment?.last4
                        ? `${order.payment.method} ····${order.payment.last4}`
                        : order.payment?.method ?? "-"}
                    </td>
                    <td className="py-3">
                      <span className={`inline-block text-xs font-bold px-2 py-1 rounded ${statusBadge[order.status]}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3">
                      <div className="flex gap-2">
                        <select
                          value={order.status}
                          onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                          className="text-xs text-gray-500 border border-gray-300 rounded px-2 py-1 bg-white outline-none hover:text-gray-900"
                        >
                          {["PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"].map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

       
          {!loading && !error && (
            <div className="flex items-center justify-between mt-4">
              <p className="text-sm text-gray-500">
                Showing {(activePage - 1) * 6 + 1}–{Math.min(activePage * 6, totalOrders)} of {totalOrders} orders
              </p>
              <div className="flex gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => setActivePage(p)}
                    className={`w-8 h-8 rounded-lg text-sm font-medium border transition-colors ${
                      activePage === p
                        ? "bg-yellow-400 text-white border-yellow-400"
                        : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {p}
                  </button>
                ))}
                <button
                  onClick={() => setActivePage((p) => Math.min(totalPages, p + 1))}
                  disabled={activePage === totalPages}
                  className="w-8 h-8 rounded-lg text-sm border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 flex items-center justify-center disabled:opacity-40"
                >
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}