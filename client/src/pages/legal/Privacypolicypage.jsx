import { useState, useEffect } from "react";
import girlSitting from "../../assets/girlsitting.png";
import privacyLaptop from "../../assets/privacylaptop.png";
import NewsletterBanner from "../../components/Newsletterbanner";

const sections = [
  { id: "introduction", number: "01", label: "Introduction" },
  {
    id: "information-we-collect",
    number: "02",
    label: "Information We Collect",
    subsections: [
      { id: "personal-data", label: "2.1 Personal Data" },
      { id: "usage-data", label: "2.2 Usage Data" },
      { id: "cookies-tracking", label: "2.3 Cookies" },
    ],
  },
  { id: "how-we-use", number: "03", label: "How We Use Your Data" },
  { id: "data-sharing", number: "04", label: "Data Sharing" },
  { id: "data-retention", number: "05", label: "Data Retention" },
  { id: "your-rights", number: "06", label: "Your Rights" },
  { id: "cookies-policy", number: "07", label: "Cookies Policy" },
  { id: "security-measures", number: "08", label: "Security Measures" },
  { id: "third-party", number: "09", label: "Third-Party Services" },
];

const allSectionIds = [
  "introduction",
  "information-we-collect",
  "personal-data",
  "usage-data",
  "cookies-tracking",
  "how-we-use",
  "data-sharing",
  "data-retention",
  "your-rights",
  "cookies-policy",
  "security-measures",
  "third-party",
];

export default function PrivacyPolicyPage() {
  const [activeSection, setActiveSection] = useState("introduction");

  useEffect(() => {
    const observers = [];
    allSectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: "-30% 0px -60% 0px", threshold: 0 },
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const isActive = (id) => activeSection === id;
  const isParentActive = (section) => {
    if (isActive(section.id)) return true;
    if (section.subsections)
      return section.subsections.some((s) => isActive(s.id));
    return false;
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 py-3">
        <p className="text-sm text-gray-500">
          Home <span className="mx-1">/</span> Pages{" "}
          <span className="mx-1">/</span>
          <span className="text-[#FFB700]">Privacy Policy</span>
        </p>
      </div>

      {/* Hero */}
      <div className="max-w-7xl mx-auto px-4 mb-10">
        <div className="bg-gray-100 rounded-2xl px-10 py-8 flex items-center justify-between gap-6">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-1">
              Privacy Policy
            </h1>
            <p className="text-gray-500 text-sm mb-6">
              How House of Cambridge, uses, and protects your personal
              information.
            </p>
            <div className="flex flex-wrap gap-8">
              <div>
                <p className="text-xs text-gray-400 mb-0.5">Version</p>
                <p className="text-sm font-semibold text-gray-700">1.0</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-0.5">Last Updated</p>
                <p className="text-sm font-semibold text-gray-700">
                  31 March 2026
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-0.5">Effective Date</p>
                <p className="text-sm font-semibold text-gray-700">
                  01 April 2026
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-0.5">Applies To</p>
                <p className="text-sm font-semibold text-gray-700">
                  All users of houseofcambridge.co.uk
                </p>
              </div>
            </div>
          </div>
          <div className="hidden md:block shrink-0 w-56">
            <img
              src={girlSitting}
              alt="Privacy Policy"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-7xl mx-auto px-4 pb-16 flex gap-8">
        {/* Sidebar */}
        <aside className="hidden lg:block w-52 shrink-0">
          <div className="sticky top-6">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">
              Contents
            </p>
            <nav className="space-y-0.5">
              {sections.map((section) => (
                <div key={section.id}>
                  <button
                    onClick={() => scrollTo(section.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                      isParentActive(section)
                        ? "text-gray-900 font-semibold bg-gray-100 border-l-2 border-[#FFB700]"
                        : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"
                    }`}
                  >
                    {section.number
                      ? `${parseInt(section.number)}. ${section.label}`
                      : section.label}
                  </button>
                  {section.subsections && isParentActive(section) && (
                    <div className="ml-4 mt-0.5 space-y-0.5">
                      {section.subsections.map((sub) => (
                        <button
                          key={sub.id}
                          onClick={() => scrollTo(sub.id)}
                          className={`w-full text-left px-3 py-1.5 rounded text-xs transition-all ${
                            isActive(sub.id)
                              ? "text-[#FFB700] font-semibold"
                              : "text-gray-400 hover:text-gray-700"
                          }`}
                        >
                          {sub.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Sidebar illustration */}
            <div className="mt-8">
              <img
                src={privacyLaptop}
                alt="Privacy"
                className="w-full h-auto object-contain opacity-90"
              />
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0 space-y-6">
          {/* Section 01 */}
          <Section id="introduction" number="SECTION 01" title="Introduction">
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              House Of Cambridge ("we," "our," or "us") is committed to
              protecting your personal information and your right to privacy.
              This Privacy Policy explains how we collect, use, disclose, and
              safeguard your information when you visit our website
              dickwellafashion.lk and make purchases from us.
            </p>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              Please read this policy carefully. If you disagree with its terms,
              please discontinue use of our website. By accessing or using our
              platform, you consent to the data practices described in this
              policy.
            </p>
            <NoteBox text="This policy is compliant with applicable data protection regulations including GDPR principles and local Sri Lankan data protection guidelines. Our security systems implement AES-256 encryption and TLS 1.2+ for all data transmissions." />
          </Section>

          {/* Section 02 */}
          <Section
            id="information-we-collect"
            number="SECTION 02"
            title="Information We Collect"
          >
            <div id="personal-data" className="scroll-mt-6 mb-6">
              <h3 className="text-sm font-bold text-gray-800 mb-2">
                2.1 Personal Data You Provide
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-3">
                We collect personal information that you voluntarily provide to
                us when you register on our website, make a purchase,
                participate in activities, or contact us. This includes:
              </p>
              <BulletList
                items={[
                  "Full name, email address, and phone number",
                  "Shipping and billing addresses",
                  "Account username and password (stored as a bcrypt hash)",
                  "Payment information",
                  "Order history, wishlist items, and product reviews",
                  "Live chat messages and customer support correspondence",
                  "Loyalty programme data and preferences",
                ]}
              />
            </div>

            <div id="usage-data" className="scroll-mt-6 mb-6">
              <h3 className="text-sm font-bold text-gray-800 mb-2">
                2.2 Usage Data (Automatically Collected)
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-3">
                When you visit our website, we automatically collect certain
                technical information to improve your experience and the
                performance of our platform:
              </p>
              <BulletList
                items={[
                  "IP address, browser type and version, operating system",
                  "Pages visited, links clicked, time spent on pages",
                  "Referring URLs and exit pages",
                  "Device identifiers and screen resolution",
                  "Shopping cart and checkout behaviour (anonymised for analytics)",
                ]}
              />
            </div>

            <div id="cookies-tracking" className="scroll-mt-6">
              <h3 className="text-sm font-bold text-gray-800 mb-2">
                2.3 Cookies &amp; Tracking Technologies
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                We use cookies, pixel tags, and similar tracking technologies.
                See Section 7 for full details of our cookie usage and how to
                manage your preferences.
              </p>
            </div>
          </Section>

          {/* Section 03 */}
          <Section
            id="how-we-use"
            number="SECTION 03"
            title="How We Use Your Information"
          >
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              We use the information we collect for the following purposes:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide border-b border-gray-200">
                      Purpose
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide border-b border-gray-200">
                      Data Used
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide border-b border-gray-200">
                      Legal Basis
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    [
                      "Process and fulfil orders",
                      "Name, address, payment details, order info",
                      "Contractual necessity",
                    ],
                    [
                      "Send order confirmations & shipping updates",
                      "Email, order details, tracking info",
                      "Contractual necessity",
                    ],
                    [
                      "Loyalty programme management",
                      "Purchase history, points balance",
                      "Legitimate interest / consent",
                    ],
                    [
                      "Marketing emails & promotions",
                      "Email, browsing behaviour",
                      "Consent (opt-in only)",
                    ],
                    [
                      "Website analytics & improvement",
                      "Usage data, cookies",
                      "Legitimate interest",
                    ],
                    [
                      "Fraud prevention & security",
                      "IP address, device data, transaction data",
                      "Legitimate interest / legal obligation",
                    ],
                    [
                      "Customer support & live chat",
                      "Name, email, chat logs",
                      "Legitimate interest / consent",
                    ],
                  ].map(([purpose, data, basis], i) => (
                    <tr
                      key={i}
                      className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    >
                      <td className="px-4 py-3 text-gray-700 border-b border-gray-100">
                        {purpose}
                      </td>
                      <td className="px-4 py-3 text-gray-600 border-b border-gray-100">
                        {data}
                      </td>
                      <td className="px-4 py-3 text-gray-600 border-b border-gray-100">
                        {basis}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>

          {/* Section 04 */}
          <Section
            id="data-sharing"
            number="SECTION 04"
            title="Data Sharing & Disclosure"
          >
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              We do not sell, trade, or rent your personal information to third
              parties. We may share your information only in the following
              circumstances:
            </p>
            <ul className="space-y-2 mb-4">
              <li className="text-sm text-gray-600 leading-relaxed">
                <span className="font-semibold text-gray-800">Analytics:</span>{" "}
                Anonymised, aggregated data may be shared with Google Analytics
                to understand website usage patterns.
              </li>
              <li className="text-sm text-gray-600 leading-relaxed">
                <span className="font-semibold text-gray-800">
                  Legal Obligations:
                </span>{" "}
                We may disclose your information if required by law, court
                order, or regulatory authority in Sri Lanka or any applicable
                jurisdiction.
              </li>
              <li className="text-sm text-gray-600 leading-relaxed">
                <span className="font-semibold text-gray-800">
                  Business Transfers:
                </span>{" "}
                In the event of a merger, acquisition, or sale of assets, your
                data may be transferred to the acquiring entity, subject to
                equivalent privacy protections.
              </li>
            </ul>
            <p className="text-gray-600 text-sm leading-relaxed">
              All third-party service providers are contractually required to
              keep your personal information confidential and to use it only for
              the specific purpose for which it was shared.
            </p>
          </Section>

          {/* Section 05 */}
          <Section
            id="data-retention"
            number="SECTION 05"
            title="Data Retention"
          >
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              We retain your personal data only for as long as necessary for the
              purposes described in this policy or as required by law.
            </p>
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide border-b border-gray-200">
                      Data Type
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide border-b border-gray-200">
                      Retention Period
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide border-b border-gray-200">
                      Reason
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Order records", "7 years", "Legal / tax compliance"],
                    [
                      "Customer account data",
                      "Until deletion request",
                      "Service continuity",
                    ],
                    [
                      "Live chat logs",
                      "2 years",
                      "Support & dispute resolution",
                    ],
                    ["Inventory logs", "3 years", "Business operations"],
                    [
                      "Marketing consent records",
                      "3 years from last activity",
                      "Compliance with consent obligations",
                    ],
                  ].map(([type, period, reason], i) => (
                    <tr
                      key={i}
                      className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    >
                      <td className="px-4 py-3 text-gray-700 border-b border-gray-100">
                        {type}
                      </td>
                      <td className="px-4 py-3 text-gray-600 border-b border-gray-100">
                        {period}
                      </td>
                      <td className="px-4 py-3 text-gray-600 border-b border-gray-100">
                        {reason}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Upon account deletion request, personal identifiers are anonymised
              (soft delete) while order records are retained for legal
              compliance. See Section 6 for your rights regarding data deletion.
            </p>
          </Section>

          {/* Section 06 */}
          <Section id="your-rights" number="SECTION 06" title="Your Rights">
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              You have the following rights with respect to your personal data
              held by us:
            </p>
            <ul className="space-y-2 mb-4">
              {[
                [
                  "Right of Access",
                  "Request a copy of the personal data we hold about you.",
                ],
                [
                  "Right to Rectification",
                  "Request correction of inaccurate or incomplete data.",
                ],
                [
                  "Right to Erasure",
                  "Request deletion of your personal data (subject to legal retention obligations).",
                ],
                [
                  "Right to Restrict Processing",
                  "Request that we limit the processing of your data in certain circumstances.",
                ],
                [
                  "Right to Data Portability",
                  "Request your data in a structured, machine-readable format.",
                ],
                [
                  "Right to Object",
                  "Object to processing of your data for marketing purposes at any time.",
                ],
                [
                  "Right to Withdraw Consent",
                  "Withdraw consent for marketing communications at any time via the unsubscribe link in any email or via your account settings.",
                ],
              ].map(([right, desc], i) => (
                <li key={i} className="text-sm text-gray-600 leading-relaxed">
                  <span className="font-semibold text-gray-800">{right}:</span>{" "}
                  {desc}
                </li>
              ))}
            </ul>
            <p className="text-gray-600 text-sm leading-relaxed">
              To exercise any of these rights, please contact us at{" "}
              <a
                href="mailto:info@houseofcambridge.co.uk"
                className="text-[#FFB700] underline"
              >
                info@houseofcambridge.co.uk
              </a>
              . We will respond within 30 days of receiving your request.
            </p>
          </Section>

          {/* Section 07 */}
          <Section
            id="cookies-policy"
            number="SECTION 07"
            title="Cookies Policy"
          >
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              We use cookies and similar tracking technologies to enhance your
              browsing experience and analyse website traffic. Cookies are small
              text files stored on your device.
            </p>
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide border-b border-gray-200">
                      Cookie Type
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide border-b border-gray-200">
                      Purpose
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide border-b border-gray-200">
                      Duration
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    [
                      "Essential / Strictly Necessary",
                      "Session management, authentication (JWT refresh token), cart persistence",
                      "Session / 7 days",
                    ],
                    [
                      "Functional",
                      "Remember language, region, and UI preferences",
                      "1 year",
                    ],
                    [
                      "Analytics",
                      "Google Analytics — anonymised usage tracking",
                      "Up to 2 years",
                    ],
                    [
                      "Marketing",
                      "Retargeting and personalised advertisements (opt-in only)",
                      "Up to 1 year",
                    ],
                  ].map(([type, purpose, duration], i) => (
                    <tr
                      key={i}
                      className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    >
                      <td className="px-4 py-3 text-gray-700 border-b border-gray-100">
                        {type}
                      </td>
                      <td className="px-4 py-3 text-gray-600 border-b border-gray-100">
                        {purpose}
                      </td>
                      <td className="px-4 py-3 text-gray-600 border-b border-gray-100">
                        {duration}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              You may manage your cookie preferences at any time through the
              Cookie Settings panel accessible in the website footer. Essential
              cookies cannot be disabled as they are required for basic
              functionality.
            </p>
          </Section>

          {/* Section 08 */}
          <Section
            id="security-measures"
            number="SECTION 08"
            title="Security Measures"
          >
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              We implement industry-standard technical and organisational
              measures to protect your personal data against unauthorised
              access, alteration, disclosure, or destruction:
            </p>
            <ul className="space-y-2 mb-4">
              <li className="text-sm text-gray-600 leading-relaxed">
                All data transmitted between your browser and our servers is
                encrypted using <strong>TLS 1.2+</strong> (HTTPS).
              </li>
              <li className="text-sm text-gray-600 leading-relaxed">
                Passwords are hashed using <strong>bcrypt</strong> with a
                minimum work factor of 10 — they are never stored in plain text.
              </li>
              <li className="text-sm text-gray-600 leading-relaxed">
                Sensitive database data is encrypted at rest using{" "}
                <strong>AES-256</strong> via Amazon RDS encryption.
              </li>
              <li className="text-sm text-gray-600 leading-relaxed">
                Payment processing is handled entirely by{" "}
                <strong>PCI DSS Level 1</strong> compliant gateways (Stripe,
                PayPal) — we never transmit or store full card numbers or CVV
                codes.
              </li>
              <li className="text-sm text-gray-600 leading-relaxed">
                JWT tokens expire after 1 hour; refresh tokens are stored in
                HTTP-only, Secure, SameSite=Strict cookies.
              </li>
              <li className="text-sm text-gray-600 leading-relaxed">
                API rate limiting (100 requests / 15 minutes) and login
                throttling (5 attempts / 15 minutes) are enforced.
              </li>
              <li className="text-sm text-gray-600 leading-relaxed">
                Database backups are encrypted with AES-256 and stored in a
                geographically separate AWS S3 bucket.
              </li>
            </ul>
            <p className="text-gray-600 text-sm leading-relaxed">
              While we employ robust security measures, no method of
              transmission over the internet or electronic storage is 100%
              secure. We cannot guarantee absolute security, but we will notify
              you and relevant authorities in the event of a data breach as
              required by law.
            </p>
          </Section>

          {/* Section 09 */}
          <Section
            id="third-party"
            number="SECTION 09"
            title="Third-Party Services"
          >
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              Our website may contain links to third-party websites and we
              integrate with the following external services. We are not
              responsible for the privacy practices of these third parties and
              encourage you to review their policies:
            </p>
            <ul className="space-y-2">
              {[
                [
                  "Stripe / PayPal",
                  "payment processing (their privacy policies apply to payment data)",
                ],
                [
                  "SendGrid (Twilio)",
                  "transactional and marketing email delivery",
                ],
                [
                  "Amazon Web Services (AWS)",
                  "cloud hosting, storage, and CDN",
                ],
                ["Google Analytics", "anonymised website analytics"],
                [
                  "Shipping carriers",
                  "tracking information shared as necessary for order fulfilment",
                ],
              ].map(([name, desc], i) => (
                <li key={i} className="text-sm text-gray-600 leading-relaxed">
                  <span className="font-semibold text-gray-800">{name}</span> —{" "}
                  {desc}
                </li>
              ))}
            </ul>
          </Section>
        </main>
      </div>

<NewsletterBanner />
    </div>
  );
}

// Reusable Section wrapper
function Section({ id, number, title, children }) {
  return (
    <div id={id} className="scroll-mt-6 border border-gray-200 rounded-xl p-7">
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">
        {number}
      </p>
      <h2 className="text-xl font-bold text-gray-900 mb-4 pb-4 border-b border-gray-100">
        {title}
      </h2>
      {children}
    </div>
  );
}

// Reusable bullet list
function BulletList({ items }) {
  return (
    <ul className="space-y-1.5 ml-4">
      {items.map((item, i) => (
        <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0" />
          {item}
        </li>
      ))}
    </ul>
  );
}

// Note box
function NoteBox({ text }) {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mt-2">
      <p className="text-xs font-semibold text-gray-500 mb-1">Note</p>
      <p className="text-sm text-gray-600 leading-relaxed">{text}</p>
    </div>
  );
}
