import { Routes, Route, Navigate } from "react-router-dom";
import FAQPage from "./pages/legal/Faqpage";
import PrivacyPolicyPage from "./pages/legal/Privacypolicypage";
import TermsAndConditionsPage from "./pages/legal/Termsandconditionspage";
import OrderManagement from "./pages/Admin/Ordermanagement";
import Loginpage from "./pages/auth/Loginpage";
import CouponList from "./pages/Admin/CouponList";
import AddCoupon from "./pages/Admin/AddCoupon";
import EditCoupon from "./pages/Admin/EditCoupon";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/faq" replace />} />
      <Route path="/faq" element={<FAQPage />} />
      <Route path="/privacy" element={<PrivacyPolicyPage />} />
      <Route path="/terms" element={<TermsAndConditionsPage />} />
      <Route path="/admin/orders" element={<OrderManagement />} />
      <Route path="/admin/login" element={<Loginpage />} />
      <Route path="/admin/coupons" element={<CouponList />} />
      <Route path="/admin/coupons/add" element={<AddCoupon />} />
      <Route path="/admin/coupons/edit/:id" element={<EditCoupon />} />
    </Routes>
  );
}
