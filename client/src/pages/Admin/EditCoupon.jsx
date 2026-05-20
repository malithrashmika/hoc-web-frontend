import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { getCouponById, updateCoupon } from "../../api/couponApi";
import CouponForm from "../../components/CouponForm";

export default function EditCoupon() {
  const { id } = useParams();
  const [initial, setInitial] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCouponById(id).then((data) => {
      if (data.success) {
        const c = data.coupon;
        setInitial({
          couponCode:             c.couponCode,
          campaignName:           c.campaignName,
          discountType:           c.discountType,
          discountValue:          c.discountValue,
          minPurchase:            c.minPurchase,
          maxDiscount:            c.maxDiscount,
          usageLimit:             c.usageLimit,
          startDate:              c.startDate?.slice(0, 10) ?? "",
          endDate:                c.endDate?.slice(0, 10) ?? "",
          redemptionLimitPerUser: c.redemptionLimitPerUser,
          applicableProducts:     c.applicableProducts,
          status:                 c.status,
        });
      }
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center py-24">
        <Loader2 size={28} className="animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-3xl mx-auto">

        <p className="text-xs text-gray-500 mb-1">
          <Link to="/admin/coupons" className="text-blue-500 hover:underline">Coupan List</Link>
          {" › Edit Coupan"}
        </p>
        <h1 className="text-xl font-bold text-gray-900 mb-1">Edit Coupan</h1>
        <p className="text-sm text-gray-400 mb-6">Update and manage existing coupon details</p>

        <CouponForm
          initial={initial}
          onSave={(data) => updateCoupon(id, data)}
          isEdit
        />
      </div>
    </div>
  );
}