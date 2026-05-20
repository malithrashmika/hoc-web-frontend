import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, Loader2 } from "lucide-react";
import { getCoupons, getCouponStats, deleteCoupon } from "../../api/couponApi";

const STAT_CARDS = [
  { key: "totalActive",      label: "Total Active Coupons", bg: "bg-cyan-100",   text: "text-cyan-800",   val: "text-cyan-900"   },
  { key: "totalExpired",     label: "Expired Coupons",      bg: "bg-green-100",  text: "text-green-800",  val: "text-green-900"  },
  { key: "totalRedemptions", label: "Total Redemptions",    bg: "bg-yellow-50",  text: "text-yellow-700", val: "text-yellow-900" },
  { key: "lastRedeemed",     label: "Last Coupan Redeemed", bg: "bg-purple-100", text: "text-purple-700", val: "text-purple-900" },
];

const STATUS_FILTERS  = ["Active", "Pending", "Expired"];
const TYPE_FILTERS    = ["Fixed Amount", "Percentage", "Free Product"];

const formatLastRedeemed = (date) => {
  if (!date) return "N/A";
  const diff = Math.floor((Date.now() - new Date(date)) / 60000);
  if (diff < 60)   return `${diff} mins ago`;
  if (diff < 1440) return `${Math.floor(diff / 60)} hrs ago`;
  return `${Math.floor(diff / 1440)} days ago`;
};

const formatDate = (d) =>
  d ? new Date(d).toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" }) : "-";

export default function CouponList() {
  const navigate = useNavigate();

  const [coupons, setCoupons]         = useState([]);
  const [stats, setStats]             = useState({ totalActive: 0, totalExpired: 0, totalRedemptions: 0, lastRedeemed: null });
  const [statusFilter, setStatusFilter] = useState("Active");
  const [typeFilter, setTypeFilter]   = useState([]);
  const [startDate, setStartDate]     = useState("");
  const [endDate, setEndDate]         = useState("");
  const [page, setPage]               = useState(1);
  const [totalPages, setTotalPages]   = useState(1);
  const [totalCoupons, setTotalCoupons] = useState(0);
  const [selected, setSelected]       = useState([]);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState(null);
  const [applyTrigger, setApplyTrigger] = useState(0);

  const LIMIT = 4;

  const fetchStats = () => {
    getCouponStats().then((data) => { if (data.success) setStats(data.stats); });
  };

  const fetchCoupons = useCallback(() => {
    setLoading(true);
    setError(null);
    getCoupons({
      status: statusFilter,
      type:   typeFilter.length === 1 ? typeFilter[0] : "All",
      startDate, endDate, page, limit: LIMIT,
    })
      .then((data) => {
        if (data.success) {
          setCoupons(data.coupons);
          setTotalPages(data.totalPages);
          setTotalCoupons(data.total);
        } else {
          setError("Failed to load coupons.");
        }
      })
      .catch(() => setError("Server error. Please try again."))
      .finally(() => setLoading(false));
  }, [statusFilter, typeFilter, startDate, endDate, page]);

  useEffect(() => { fetchStats(); }, []);
  useEffect(() => {
    let active = true;
    Promise.resolve().then(() => {
      if (active) fetchCoupons();
    });
    return () => {
      active = false;
    };
  }, [fetchCoupons, applyTrigger]);

  const toggleType = (type) => {
    setPage(1);
    setTypeFilter((prev) => prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]);
  };

  const toggleAll = (e) =>
    setSelected(e.target.checked ? coupons.map((c) => c._id) : []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this coupon?")) return;
    const data = await deleteCoupon(id);
    if (data.success) { fetchCoupons(); fetchStats(); }
  };

  const handleApply = () => {
    if (page === 1) {
      setApplyTrigger((prev) => prev + 1);
    } else {
      setPage(1);
    }
  };

  const statValues = {
    ...stats,
    lastRedeemed: formatLastRedeemed(stats.lastRedeemed),
  };

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const visiblePages = pages.filter((p) => p <= 3 || p === totalPages || Math.abs(p - page) <= 1);

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-xl font-bold text-gray-900 mb-1">Coupan List</h1>
        <p className="text-sm text-gray-500 mb-5">Manage and monitor all coupons easily</p>

        <div className="grid grid-cols-4 gap-4 mb-6">
          {STAT_CARDS.map((s) => (
            <div key={s.key} className={`${s.bg} rounded-lg p-4`}>
              <p className={`text-xs ${s.text} mb-1`}>{s.label}</p>
              <p className={`text-2xl font-bold ${s.val}`}>{statValues[s.key]}</p>
            </div>
          ))}
        </div>

        <div className="border border-gray-200 rounded-xl p-5">

          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-semibold text-gray-800">All Products</span>
            <div className="flex gap-2">
              <button className="px-4 py-1.5 border border-gray-300 rounded-lg text-xs text-gray-700 hover:bg-gray-50">
                Export CSV
              </button>
              <button
                onClick={() => navigate("/admin/coupons/add")}
                className="px-4 py-1.5 bg-yellow-400 hover:bg-yellow-500 text-white font-semibold rounded-lg text-xs"
              >
                + Add New Coupan
              </button>
            </div>
          </div>

          <div className="flex items-end gap-8 mb-4">
            <div>
              <p className="text-xs text-gray-500 mb-2">Status</p>
              <div className="flex gap-2">
                {STATUS_FILTERS.map((s) => (
                  <button
                    key={s}
                    onClick={() => { setStatusFilter(s); setPage(1); }}
                    className={`px-4 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                      statusFilter === s
                        ? s === "Active"  ? "bg-green-600 text-white border-green-600"
                        : s === "Pending" ? "border-blue-500 text-blue-600 bg-white"
                        :                  "border-red-500 text-red-500 bg-white"
                        : "border-gray-300 text-gray-500 bg-white hover:bg-gray-50"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs text-gray-500 mb-2">Type</p>
              <div className="flex gap-2">
                {TYPE_FILTERS.map((t) => (
                  <button
                    key={t}
                    onClick={() => toggleType(t)}
                    className={`px-4 py-1.5 rounded-lg text-xs border transition-colors ${
                      typeFilter.includes(t)
                        ? "border-gray-800 text-gray-800 bg-white font-medium"
                        : "border-gray-300 text-gray-500 bg-white hover:bg-gray-50"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs text-gray-500 mb-2">Date Range</p>
              <div className="flex items-center gap-2">
                <input
                  type="date" value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-1.5 text-xs outline-none"
                />
                <span className="text-xs text-gray-400">to</span>
                <input
                  type="date" value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-1.5 text-xs outline-none"
                />
                <button
                  onClick={handleApply}
                  className="px-4 py-1.5 border border-gray-300 rounded-lg text-xs text-gray-700 hover:bg-gray-50"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 mb-3">
            <input
              type="checkbox"
              checked={selected.length === coupons.length && coupons.length > 0}
              onChange={toggleAll}
              className="w-4 h-4 cursor-pointer"
            />
            <span className="text-xs text-gray-500">Select All</span>
          </div>

          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border border-gray-200 rounded-lg">
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-2.5 rounded-l-lg">Coupan Code</th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-2.5">Campaign Name</th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-2.5">Type</th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-2.5">Value</th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-2.5">Start Date</th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-2.5">End Date</th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-2.5">Redemptions</th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-2.5">Status</th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-2.5 rounded-r-lg">Actions</th>
              </tr>
            </thead>
            <tbody>
              {error ? (
                <tr><td colSpan={9} className="text-center py-10 text-red-500 text-sm">{error}</td></tr>
              ) : loading ? (
                <tr><td colSpan={9} className="py-16"><div className="flex justify-center"><Loader2 size={24} className="animate-spin text-gray-400" /></div></td></tr>
              ) : coupons.length === 0 ? (
                <tr><td colSpan={9} className="text-center py-10 text-gray-400 text-sm">No coupons found.</td></tr>
              ) : (
                coupons.map((c) => (
                  <tr key={c._id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-4 text-xs text-gray-700 font-medium">{c.couponCode}</td>
                    <td className="px-4 py-4 text-xs font-semibold text-gray-900">{c.campaignName}</td>
                    <td className="px-4 py-4 text-xs text-gray-500">{c.discountType}</td>
                    <td className="px-4 py-4 text-xs text-gray-700">
                      {c.discountType === "Percentage" ? `${c.discountValue}%` : `Rs.${c.discountValue}`}
                    </td>
                    <td className="px-4 py-4 text-xs text-gray-600">{formatDate(c.startDate)}</td>
                    <td className="px-4 py-4 text-xs text-gray-600">{formatDate(c.endDate)}</td>
                    <td className="px-4 py-4 text-xs text-gray-600">{c.redemptions}/{c.usageLimit}</td>
                    <td className="px-4 py-4">
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                        c.status === "Active"   ? "bg-green-600 text-white" :
                        c.status === "Expired"  ? "bg-red-100 text-red-600" :
                        c.status === "Pending"  ? "bg-blue-100 text-blue-600" :
                                                  "bg-gray-100 text-gray-600"
                      }`}>
                        {c.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-xs">
                      <button
                        onClick={() => navigate(`/admin/coupons/edit/${c._id}`)}
                        className="text-gray-600 hover:text-gray-900 underline mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(c._id)}
                        className="text-red-500 hover:text-red-700 underline"
                      >
                        Del
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {!loading && !error && (
            <div className="flex items-center justify-between mt-5">
              <p className="text-sm text-gray-500">
                Showing {(page - 1) * LIMIT + 1}-{Math.min(page * LIMIT, totalCoupons)} of {totalCoupons} Active Coupons
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