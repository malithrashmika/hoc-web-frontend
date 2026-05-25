import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, Mail, MessageSquare, Smartphone, ChevronRight, Loader2 } from "lucide-react";
import { getNotifications, getNotificationStats } from "../../api/notificationApi";

const STAT_CARDS = [
  { key: "totalSent",  label: "Total Notifications Sent", bg: "bg-cyan-100",   text: "text-cyan-700",   val: "text-cyan-900"   },
  { key: "delivered",  label: "Delivered Notifications",  bg: "bg-green-100",  text: "text-green-700",  val: "text-green-900"  },
  { key: "scheduled",  label: "Scheduled Notifications",  bg: "bg-yellow-50",  text: "text-yellow-700", val: "text-yellow-900" },
  { key: "failed",     label: "Failed Notifications",     bg: "bg-purple-100", text: "text-purple-700", val: "text-purple-900" },
];

const CHANNEL_ICON = {
  Push:   { icon: Bell,          color: "bg-yellow-100", iconColor: "text-yellow-500" },
  Email:  { icon: Mail,          color: "bg-green-100",  iconColor: "text-green-500"  },
  SMS:    { icon: MessageSquare, color: "bg-blue-100",   iconColor: "text-blue-500"   },
  "In-App": { icon: Smartphone,  color: "bg-purple-100", iconColor: "text-purple-500" },
};

const STATUS_STYLE = {
  Sent:      "bg-green-100 text-green-700",
  Scheduled: "bg-yellow-100 text-yellow-700",
  Failed:    "bg-red-100 text-red-600",
};

const formatDate = (d) =>
  d ? new Date(d).toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" }) : "-";

export default function NotificationHistory() {
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState([]);
  const [stats,    setStats]    = useState({ totalSent: 0, delivered: 0, scheduled: 0, failed: 0 });
  const [search,   setSearch]   = useState("");
  const [channel,  setChannel]  = useState("All Channel");
  const [startDate,setStartDate]= useState("");
  const [endDate,  setEndDate]  = useState("");
  const [page,     setPage]     = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState(null);

  const LIMIT = 5;

  const fetchStats = () => {
    getNotificationStats().then((data) => { if (data.success) setStats(data.stats); });
  };

  const fetchNotifications = useCallback(() => {
    setLoading(true);
    setError(null);
    getNotifications({ search, channel, startDate, endDate, page, limit: LIMIT })
      .then((data) => {
        if (data.success) {
          setNotifications(data.notifications);
          setTotalPages(data.totalPages);
          setTotalCount(data.total);
        } else {
          setError("Failed to load notifications.");
        }
      })
      .catch(() => setError("Server error. Please try again."))
      .finally(() => setLoading(false));
  }, [search, channel, startDate, endDate, page]);

  useEffect(() => { fetchStats(); }, []);
  useEffect(() => {
    const id = setTimeout(() => { fetchNotifications(); }, 0);
    return () => clearTimeout(id);
  }, [fetchNotifications]);

  const handleApply = () => {
    if (page !== 1) setPage(1);
    else fetchNotifications();
  };

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const visiblePages = pages.filter((p) => p <= 3 || p === totalPages || Math.abs(p - page) <= 1);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-xl font-bold text-gray-900 mb-1">Notification History</h1>
        <p className="text-sm text-gray-500 mb-5">View all notifications send to your customers.</p>

        {/* Stat Cards */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {STAT_CARDS.map((s) => (
            <div key={s.key} className={`${s.bg} rounded-xl p-4`}>
              <p className={`text-xs ${s.text} mb-1`}>{s.label}</p>
              <p className={`text-3xl font-bold ${s.val}`}>{stats[s.key]}</p>
            </div>
          ))}
        </div>

        {/* Main Card */}
        <div className="bg-white border border-gray-200 rounded-xl p-5">

          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-semibold text-gray-800">All Products</span>
            <div className="flex gap-2">
              <button className="px-4 py-1.5 border border-gray-300 rounded-lg text-xs text-gray-700 hover:bg-gray-50">
                Export CSV
              </button>
              <button
                onClick={() => navigate("/admin/send-notification")}
                className="px-4 py-1.5 bg-yellow-400 hover:bg-yellow-500 text-white font-semibold rounded-lg text-xs"
              >
                Adjust Points
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex items-end gap-4 mb-5">
            <div className="flex-1">
              <p className="text-xs font-medium text-gray-700 mb-1">Search Customer</p>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by title or message"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-700 mb-1">Channel</p>
              <select
                value={channel}
                onChange={(e) => setChannel(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none bg-white min-w-[130px]"
              >
                <option>All Channel</option>
                <option>Push</option>
                <option>Email</option>
                <option>SMS</option>
                <option>In-App</option>
              </select>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-700 mb-1">Date Range</p>
              <div className="flex items-center gap-2">
                <input
                  type="date" value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-xs outline-none"
                />
                <span className="text-xs text-gray-400">to</span>
                <input
                  type="date" value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-xs outline-none"
                />
                <button
                  onClick={handleApply}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-xs text-gray-700 hover:bg-gray-50"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>

          {/* Table */}
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-100 rounded-lg">
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-2.5 rounded-l-lg w-64">Notification Title</th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-2.5">Channel</th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-2.5">Audience</th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-2.5">Date</th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-2.5">Open Rate</th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-2.5">Click Rate</th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-2.5 rounded-r-lg">Status</th>
              </tr>
            </thead>
            <tbody>
              {error ? (
                <tr><td colSpan={7} className="text-center py-10 text-red-500 text-sm">{error}</td></tr>
              ) : loading ? (
                <tr><td colSpan={7} className="py-16"><div className="flex justify-center"><Loader2 size={24} className="animate-spin text-gray-400" /></div></td></tr>
              ) : notifications.length === 0 ? (
                <tr><td colSpan={7} className="text-center py-10 text-gray-400 text-sm">No notifications found.</td></tr>
              ) : (
                notifications.map((n) => {
                  const ch = n.channels?.[0] || "Push";
                  const { icon: Icon, color, iconColor } = CHANNEL_ICON[ch] || CHANNEL_ICON["Push"];
                  return (
                    <tr key={n._id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="px-4 py-4">
                        <p className="font-semibold text-gray-900 text-xs">{n.title}</p>
                        <p className="text-xs text-gray-400 truncate max-w-[200px]">{n.message}</p>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <div className={`w-8 h-8 rounded-lg ${color} flex items-center justify-center`}>
                            <Icon size={15} className={iconColor} />
                          </div>
                          <span className="text-xs text-gray-700">{ch}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <p className="text-xs text-gray-700">{n.audience}</p>
                        <p className="text-xs text-gray-400">({n.audienceCount})</p>
                      </td>
                      <td className="px-4 py-4 text-xs text-gray-600">{formatDate(n.createdAt)}</td>
                      <td className="px-4 py-4 text-xs text-gray-600">{n.openRate ? `${n.openRate}%` : "0"}</td>
                      <td className="px-4 py-4 text-xs text-gray-600">{n.clickRate ? `${n.clickRate}%` : "0"}</td>
                      <td className="px-4 py-4">
                        <span className={`text-xs font-medium px-3 py-1 rounded-full ${STATUS_STYLE[n.status] || "bg-gray-100 text-gray-600"}`}>
                          {n.status}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>

          {/* Footer */}
          {!loading && !error && (
            <div className="flex items-center justify-between mt-5">
              <p className="text-sm text-gray-500">
                Showing {(page - 1) * LIMIT + 1}-{Math.min(page * LIMIT, totalCount)} of {totalCount} Notifications
              </p>
              <div className="flex gap-1 items-center">
                {visiblePages.map((p, idx, arr) => (
                  <span key={p} className="flex items-center gap-1">
                    {idx > 0 && arr[idx - 1] !== p - 1 && (
                      <span className="w-8 h-8 flex items-center justify-center text-gray-400 text-xs">...</span>
                    )}
                    <button
                      onClick={() => setPage(p)}
                      className={`w-8 h-8 rounded-lg text-xs font-medium border ${
                        page === p
                          ? "bg-yellow-400 text-white border-yellow-400"
                          : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {p}
                    </button>
                  </span>
                ))}
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="w-8 h-8 rounded-lg border border-gray-300 bg-white flex items-center justify-center disabled:opacity-40 hover:bg-gray-50"
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