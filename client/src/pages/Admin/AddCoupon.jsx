import { useNavigate, Link } from "react-router-dom";
import { createCoupon } from "../../api/couponApi";
import CouponForm from "../../components/CouponForm";

export default function AddCoupon() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-3xl mx-auto">

        <p className="text-xs text-gray-500 mb-1">
          <Link to="/admin/coupons" className="text-blue-500 hover:underline">Coupan List</Link>
          {" › Add New Coupan"}
        </p>
        <div className="flex items-center justify-between mb-1">
          <h1 className="text-xl font-bold text-gray-900">Add New Coupan</h1>
          <div className="flex gap-2">
            <button
              onClick={() => navigate("/admin/coupons")}
              className="px-5 py-2 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50"
            >
              Save as Draft
            </button>
            <button
              form="coupon-form"
              className="px-5 py-2 bg-yellow-400 hover:bg-yellow-500 text-white font-semibold rounded-lg text-sm"
            >
              Publish Coupan
            </button>
          </div>
        </div>
        <p className="text-sm text-gray-400 mb-6">Create and configure new discount coupons</p>

        <CouponForm onSave={(data) => createCoupon(data)} />
      </div>
    </div>
  );
}