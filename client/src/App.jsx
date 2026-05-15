import { Routes, Route, Navigate } from 'react-router-dom';
import FAQPage from './pages/legal/Faqpage';
import PrivacyPolicyPage from './pages/legal/Privacypolicypage';
import TermsAndConditionsPage from './pages/legal/Termsandconditionspage';
import AboutPage from "./pages/home/Aboutpage";
import ContactPage from "./pages/home/Contactpage";


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/about" replace />} />
      <Route path="/faq" element={<FAQPage />} />
      <Route path="/privacy" element={<PrivacyPolicyPage />} />
      <Route path="/terms" element={<TermsAndConditionsPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
    </Routes>
  );
}