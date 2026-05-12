import { Routes, Route, Navigate } from 'react-router-dom';
import FAQPage from './pages/legal/Faqpage';
import PrivacyPolicyPage from './pages/legal/Privacypolicypage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/faq" replace />} />
      <Route path="/faq" element={<FAQPage />} />
      <Route path="/privacy" element={<PrivacyPolicyPage />} />
    </Routes>
  );
}