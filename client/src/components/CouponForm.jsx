import { useState } from "react";
import { useNavigate } from "react-router-dom";

const EMPTY_FORM = {
  couponCode: "", campaignName: "", discountType: "Fixed Amount",
  discountValue: 0, minPurchase: 0, maxDiscount: 0, usageLimit: 0,
  startDate: "", endDate: "", redemptionLimitPerUser: "", applicableProducts: "All Products",
  status: "Active",
};

export default function CouponForm({ initial = EMPTY_FORM, onSave, isEdit = false }) {
  const navigate = useNavigate();
  const [form, setForm]   = useState(initial);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const set = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (status) => {
    setError("");
    setLoading(true);
    const result = await onSave({ ...form, status });
    setLoading(false);
    if (!result.success) { setError(result.message); return; }
    navigate("/admin/coupons");
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h2 className="text-sm font-semibold text-gray-800 mb-5">Coupan Information</h2>

      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-3">
          {error}
        </div>
      )}

      <div className="space-y-5">
        <div>
          <label className="block text-xs text-gray-600 mb-1">Coupan Code <span className="text-red-500">*</span></label>
          <input
            value={form.couponCode}
            onChange={(e) => set("couponCode", e.target.value.toUpperCase())}
            placeholder="Enter coupan code (e.g. SAVE20)"
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        <div>
          <label className="block text-xs text-gray-600 mb-1">Campaign Name <span className="text-red-500">*</span></label>
          <input
            value={form.campaignName}
            onChange={(e) => set("campaignName", e.target.value)}
            placeholder="Enter Campaign name"
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        <div>
          <label className="block text-xs text-gray-600 mb-1">Discount Type <span className="text-red-500">*</span></label>
          <div className="grid grid-cols-3 gap-3">
            {["Fixed Amount", "Percentage", "Free Product"].map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => set("discountType", type)}
                className={`flex items-center gap-2 border rounded-lg px-4 py-2.5 text-sm transition-colors ${
                  form.discountType === type
                    ? "border-yellow-400 bg-yellow-50 text-gray-800"
                    : "border-gray-300 text-gray-600 hover:bg-gray-50"
                }`}
              >
                <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                  form.discountType === type ? "border-yellow-500" : "border-gray-400"
                }`}>
                  {form.discountType === type && (
                    <span className="w-2 h-2 rounded-full bg-yellow-500" />
                  )}
                </span>
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-gray-600 mb-1">Discount Value <span className="text-red-500">*</span></label>
            <input
              type="number"
              value={form.discountValue}
              onChange={(e) => set("discountValue", e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1">Minimum Purchace Amount</label>
            <input
              type="number"
              value={form.minPurchase}
              onChange={(e) => set("minPurchase", e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-gray-600 mb-1">Max Discount Amount</label>
            <input
              type="number"
              value={form.maxDiscount}
              onChange={(e) => set("maxDiscount", e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1">Usage Limit</label>
            <input
              type="number"
              value={form.usageLimit}
              onChange={(e) => set("usageLimit", e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-gray-600 mb-1">Start Date <span className="text-red-500">*</span></label>
            <input
              type="date"
              value={form.startDate}
              onChange={(e) => set("startDate", e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1">End Date <span className="text-red-500">*</span></label>
            <input
              type="date"
              value={form.endDate}
              onChange={(e) => set("endDate", e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-gray-600 mb-1">Redemption Limit Per User</label>
            <input
              value={form.redemptionLimitPerUser}
              onChange={(e) => set("redemptionLimitPerUser", e.target.value)}
              placeholder="Enter Redemption limit"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1">Applicable Products</label>
            <input
              value={form.applicableProducts}
              onChange={(e) => set("applicableProducts", e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs text-gray-600 mb-2">Status <span className="text-red-500">*</span></label>
          <div className="flex items-center justify-between">
            <div className="flex gap-3">
              {["Active", "Inactive"].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => set("status", s)}
                  className={`px-6 py-2 rounded-lg text-sm border transition-colors ${
                    form.status === s
                      ? "border-green-500 text-green-600 bg-white font-medium"
                      : "border-gray-300 text-gray-600 bg-white hover:bg-gray-50"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => navigate("/admin/coupons")}
              className="px-5 py-2 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-2">Active Coupons Are Visible To Customers</p>
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-100">
        {!isEdit && (
          <button
            type="button"
            onClick={() => handleSubmit("Inactive")}
            disabled={loading}
            className="px-5 py-2 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-50"
          >
            Save as Draft
          </button>
        )}
        <button
          type="button"
          onClick={() => handleSubmit(form.status)}
          disabled={loading}
          className="px-5 py-2 bg-yellow-400 hover:bg-yellow-500 text-white font-semibold rounded-lg text-sm disabled:opacity-50"
        >
          {loading ? "Saving..." : isEdit ? "Update Coupan" : "Publish Coupan"}
        </button>
      </div>
    </div>
  );
}