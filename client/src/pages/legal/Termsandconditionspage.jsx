import { useState, useEffect } from "react";
import termsWomen from "../../assets/termstwomen.png";
import termsMan from "../../assets/termsoneman.png";
import NewsletterBanner from "../../components/Newsletterbanner";

const sections = [
  { id: "acceptance", number: "01", label: "Acceptance of Terms" },
  { id: "definitions", number: "02", label: "Definitions" },
  {
    id: "use-of-website",
    number: "03",
    label: "Use of the Website",
    subsections: [
      { id: "eligibility", label: "3.1 Eligibility" },
      { id: "account-registration", label: "3.2 Account Registration" },
      { id: "prohibited-conduct", label: "3.3 Prohibited Conduct" },
    ],
  },
  {
    id: "products-pricing",
    number: "04",
    label: "Products & Pricing",
    subsections: [
      { id: "product-descriptions", label: "4.1 Product Descriptions" },
      { id: "pricing-policy", label: "4.2 Pricing Policy" },
      { id: "stock-availability", label: "4.3 Stock Availability" },
    ],
  },
  { id: "orders-payment", number: "05", label: "Orders & Payment" },
  { id: "delivery", number: "06", label: "Delivery" },
  { id: "returns-refunds", number: "07", label: "Returns & Refunds" },
  { id: "intellectual-property", number: "08", label: "Intellectual Property" },
  { id: "user-content", number: "09", label: "User-Generated Content" },
  { id: "loyalty", number: "10", label: "Loyalty Programme" },
  { id: "promo-codes", number: "11", label: "Promotional Codes" },
  { id: "liability", number: "12", label: "Limitation of Liability" },
  { id: "governing-law", number: "13", label: "Governing Law" },
];

const allSectionIds = [
  "acceptance",
  "definitions",
  "use-of-website",
  "eligibility",
  "account-registration",
  "prohibited-conduct",
  "products-pricing",
  "product-descriptions",
  "pricing-policy",
  "stock-availability",
  "orders-payment",
  "delivery",
  "returns-refunds",
  "intellectual-property",
  "user-content",
  "loyalty",
  "promo-codes",
  "liability",
  "governing-law",
];

export default function TermsAndConditionsPage() {
  const [activeSection, setActiveSection] = useState("acceptance");

  useEffect(() => {
    const observers = [];
    allSectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
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
          <span className="text-[#FFB700]">Terms & Conditions</span>
        </p>
      </div>

      {/* Hero */}
      <div className="max-w-7xl mx-auto px-4 mb-10">
        <div className="border border-blue-200 rounded-2xl px-10 py-8 flex items-center justify-between gap-6 bg-white">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-1">
              Terms & Conditions
            </h1>
            <p className="text-gray-500 text-sm mb-6">
              Please read these terms carefully before using our website or
              placing any orders.
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
                <p className="text-xs text-gray-400 mb-0.5">Governing Law</p>
                <p className="text-sm font-semibold text-gray-700">
                  Sri Lanka
                </p>
              </div>
            </div>
          </div>
          <div className="hidden md:block shrink-0 w-56">
            <img
              src={termsWomen}
              alt="Terms and Conditions"
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
                    {parseInt(section.number)}. {section.label}
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
                src={termsMan}
                alt="Terms and Conditions"
                className="w-full h-auto object-contain opacity-90"
              />
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0 space-y-6">
          {/* Important Banner */}
          <div className="bg-gray-100 border border-gray-200 rounded-xl px-6 py-4">
            <p className="text-sm font-semibold text-gray-800 mb-1">
              ⚠️ Important — Please Read
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">
              By accessing houseofcambridge.co.uk or placing an order, you agree
              to be legally bound by these Terms & Conditions. If you do not
              agree, please do not use this website. These terms constitute a
              legally binding agreement between you and House of Cambridge.
            </p>
          </div>

          {/* Section 01 */}
          <Section id="acceptance" number="SECTION 01" title="Acceptance of Terms">
            <p className="text-gray-600 text-sm leading-relaxed mb-3">
              These Terms & Conditions ("Terms") govern your access to and use
              of the House of Cambridge website (houseofcambridge.co.uk) and all
              associated services, including the purchase of products, account
              registration, loyalty programme, live chat, and promotional
              activities.
            </p>
            <p className="text-gray-600 text-sm leading-relaxed">
              By using our website, creating an account, or completing a
              purchase, you confirm that: (a) you have read and understood these
              Terms; (b) you are at least 18 years of age or accessing the
              website under the supervision of a parent or guardian; and (c) you
              agree to be bound by these Terms.
            </p>
          </Section>

          {/* Section 02 */}
          <Section id="definitions" number="SECTION 02" title="Definitions">
            <div className="divide-y divide-gray-100">
              {[
                ['"We / Us / Our"', "House of Cambridge, the operator of houseofcambridge.co.uk."],
                ['"You / User / Customer"', "Any individual who accesses, browses, or makes a purchase through our website."],
                ['"Website"', "The e-commerce platform accessible at houseofcambridge.co.uk. and all related subdomains."],
                ['"Products"', "Cosmetics, Electronics, Home appliances, Baby Care, Kitchen appliances, and other goods listed for sale on our website."],
                ['"Order"', "A confirmed purchase of one or more Products submitted through the checkout process."],
                ['"Account"', "A registered user profile on our website, protected by login credentials."],
                ['"Loyalty Programme"', "The House of Cambridge points-based rewards scheme available to registered customers."],
                ['"Content"', "All text, images, logos, product descriptions, and other materials on the website."],
              ].map(([term, def], i) => (
                <div key={i} className="py-3 flex gap-6">
                  <span className="text-sm font-semibold text-gray-800 w-44 shrink-0">
                    {term}
                  </span>
                  <span className="text-sm text-gray-600 leading-relaxed">
                    {def}
                  </span>
                </div>
              ))}
            </div>
          </Section>

          {/* Section 03 */}
          <Section id="use-of-website" number="SECTION 03" title="Use of the Website">
            <div id="eligibility" className="scroll-mt-6 mb-6">
              <h3 className="text-sm font-bold text-gray-800 mb-2">
                3.1 Eligibility
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Our website is available to users who are 18 years of age or
                older. Users under 18 may use the website only with the
                involvement and consent of a parent or legal guardian who agrees
                to be bound by these Terms on their behalf.
              </p>
            </div>

            <div id="account-registration" className="scroll-mt-6 mb-6">
              <h3 className="text-sm font-bold text-gray-800 mb-2">
                3.2 Account Registration
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-3">
                To access certain features (order history, wishlist, loyalty
                points, saved addresses), you must register for an account. You
                agree to:
              </p>
              <BulletList
                items={[
                  "Provide accurate, complete, and current registration information",
                  "Maintain the security of your password and not share it with others",
                  "Notify us immediately of any unauthorised access to your account",
                  "Be responsible for all activity occurring under your account",
                ]}
              />
              <p className="text-gray-600 text-sm leading-relaxed mt-3">
                We reserve the right to suspend or terminate accounts that
                contain false information or are used in breach of these Terms.
              </p>
            </div>

            <div id="prohibited-conduct" className="scroll-mt-6">
              <h3 className="text-sm font-bold text-gray-800 mb-2">
                3.3 Prohibited Conduct
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-3">
                You agree not to use the website to:
              </p>
              <BulletList
                items={[
                  "Engage in any fraudulent, unlawful, or deceptive activity",
                  "Attempt to gain unauthorised access to our systems or other users' accounts",
                  "Transmit spam, malware, viruses, or any harmful code",
                  "Scrape, crawl, or harvest data from the website without written permission",
                  "Submit false, misleading, or defamatory product reviews",
                  "Resell or commercially exploit products purchased for personal use only",
                  "Interfere with the proper functioning of the website or our servers",
                ]}
              />
            </div>
          </Section>

          {/* Section 04 */}
          <Section id="products-pricing" number="SECTION 04" title="Products & Pricing">
            <div id="product-descriptions" className="scroll-mt-6 mb-6">
              <h3 className="text-sm font-bold text-gray-800 mb-2">
                4.1 Product Descriptions
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-3">
                We make every effort to display product images, colours, sizes,
                and descriptions as accurately as possible. However, we cannot
                guarantee that your device screen accurately represents product
                colours, and slight variations may exist between displayed images
                and the actual product.
              </p>
              <p className="text-gray-600 text-sm leading-relaxed">
                Product dimensions, materials, and care instructions are provided
                for guidance. We reserve the right to make minor adjustments to
                product specifications without prior notice.
              </p>
            </div>

            <div id="pricing-policy" className="scroll-mt-6 mb-6">
              <h3 className="text-sm font-bold text-gray-800 mb-2">
                4.2 Pricing Policy
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-3">
                All prices are displayed in Sri Lankan Rupees (LKR) unless
                otherwise stated and are inclusive of applicable taxes. We
                reserve the right to change prices at any time without notice.
                However, the price you see at the time of completing your order
                is the price you will be charged.
              </p>
              <p className="text-gray-600 text-sm leading-relaxed">
                In the event of a pricing error, we reserve the right to cancel
                the order and issue a full refund. We will notify you promptly
                in such cases.
              </p>
            </div>

            <div id="stock-availability" className="scroll-mt-6">
              <h3 className="text-sm font-bold text-gray-800 mb-2">
                4.3 Stock Availability
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                All orders are subject to product availability. In the rare
                event that an item becomes unavailable after your order is
                confirmed, we will notify you by email and offer a full refund
                or a suitable alternative.
              </p>
            </div>
          </Section>

          {/* Section 05 */}
          <Section id="orders-payment" number="SECTION 05" title="Orders & Payment">
            <p className="text-gray-600 text-sm leading-relaxed mb-3">
              Submitting an order constitutes an offer to purchase. An order is
              only confirmed when you receive an Order Confirmation email from us
              with an assigned Order ID.
            </p>
            <p className="text-gray-600 text-sm leading-relaxed mb-3">
              We accept payments via Stripe and PayPal. By providing payment
              details, you confirm that:
            </p>
            <BulletList
              items={[
                "You are the authorised holder of the payment method used",
                "The payment information provided is accurate and complete",
                "Your payment method has sufficient funds for the transaction",
              ]}
            />
            <p className="text-gray-600 text-sm leading-relaxed mt-3 mb-3">
              All payment processing is handled by PCI DSS Level 1 compliant
              gateways. We do not store or have access to your full card number
              or CVV code at any time.
            </p>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              We reserve the right to refuse or cancel any order at our
              discretion, including cases where suspected fraud is identified. In
              such cases, we will issue a full refund within 3–5 business days.
            </p>
            <NoteBox
              title="Payment Security"
              text="Your payment data is tokenised by our payment processor. Only a secure payment token reference is stored in our systems. Look for the padlock icon in your browser address bar confirming a secure HTTPS connection before entering payment details."
            />
          </Section>

          {/* Section 06 */}
          <Section id="delivery" number="SECTION 06" title="Delivery">
            <p className="text-gray-600 text-sm leading-relaxed mb-3">
              Estimated delivery timeframes are provided at checkout and in your
              Order Confirmation email. These are estimates only and are not
              guaranteed delivery dates. Delivery times may vary due to factors
              beyond our control, including carrier delays, public holidays, and
              adverse weather conditions.
            </p>
            <BulletList
              items={[
                "House of Cambridge is not liable for delays caused by third-party shipping carriers.",
                "Risk of loss and title for purchased items passes to you upon delivery.",
                "If your delivery address is incorrect or incomplete, we are not responsible for failed deliveries. Redelivery charges may apply.",
                "Orders are processed on business days (Monday–Friday, excluding public holidays).",
              ]}
            />
            <p className="text-gray-600 text-sm leading-relaxed mt-3">
              For orders that have not arrived within the expected timeframe,
              please contact our support team with your Order ID for assistance.
            </p>
          </Section>

          {/* Section 07 */}
          <Section id="returns-refunds" number="SECTION 07" title="Returns & Refunds">
            <p className="text-gray-600 text-sm leading-relaxed mb-3">
              Our full Returns & Refund Policy is detailed in a separate
              document. Key points are summarised below:
            </p>
            <BulletList
              items={[
                "Returns are accepted within 30 days of the delivery date.",
                "Items must be unworn, unwashed, and returned in original packaging with tags attached.",
                "Certain items (e.g., underwear, swimwear, pierced jewellery) are non-returnable for hygiene reasons.",
                "Refunds are processed to the original payment method within 5–7 business days of receiving the return.",
              ]}
            />
          </Section>

          {/* Section 08 */}
          <Section id="intellectual-property" number="SECTION 08" title="Intellectual Property">
            <p className="text-gray-600 text-sm leading-relaxed mb-3">
              All content on this website, including but not limited to text,
              product images, logos, icons, graphics, page layout, and software,
              is the property of House of Cambridge and is protected by
              applicable copyright, trademark, and intellectual property laws.
            </p>
            <p className="text-gray-600 text-sm leading-relaxed mb-3">
              You are granted a limited, non-exclusive, non-transferable licence
              to access and use the website for personal, non-commercial purposes
              only. You may not:
            </p>
            <BulletList
              items={[
                "Reproduce, distribute, modify, or create derivative works from any website content without prior written permission",
                "Use our brand name, logo, or trademarks in any manner without written authorisation",
                "Frame or embed our website within another website or application without permission",
              ]}
            />
          </Section>

          {/* Section 09 */}
          <Section id="user-content" number="SECTION 09" title="User-Generated Content (Reviews & Ratings)">
            <p className="text-gray-600 text-sm leading-relaxed mb-3">
              Registered customers who have completed a verified purchase may
              submit product reviews and ratings. By submitting a review, you
              grant us a non-exclusive, royalty-free licence to display,
              reproduce, and distribute that content on our website and marketing
              materials.
            </p>
            <p className="text-gray-600 text-sm leading-relaxed mb-3">
              You agree that reviews you submit will:
            </p>
            <BulletList
              items={[
                "Be truthful and based on genuine personal experience with the product",
                "Not contain offensive, defamatory, discriminatory, or inappropriate language",
                "Not impersonate any person or misrepresent your identity",
                "Not include spam, promotional content, or external links",
              ]}
            />
            <p className="text-gray-600 text-sm leading-relaxed mt-3">
              We reserve the right to remove reviews that violate these
              guidelines without notice.
            </p>
          </Section>

          {/* Section 10 */}
          <Section id="loyalty" number="SECTION 10" title="Loyalty Programme">
            <p className="text-gray-600 text-sm leading-relaxed mb-3">
              The House of Cambridge Loyalty Programme awards points on eligible
              purchases to registered customers. The following terms apply:
            </p>
            <BulletList
              items={[
                "Loyalty points have no monetary value and cannot be exchanged for cash.",
                "Points are awarded only on qualifying purchases and are not earned on gift cards, shipping fees, or promotional credit.",
                "Points may be redeemed against future eligible purchases as specified in the programme terms displayed on the Loyalty Dashboard.",
                "We reserve the right to modify, suspend, or terminate the Loyalty Programme at any time with 30 days' notice to enrolled members.",
                "Points expire after 12 months of account inactivity.",
                "Points are non-transferable and may not be combined between accounts.",
              ]}
            />
          </Section>

          {/* Section 11 */}
          <Section id="promo-codes" number="SECTION 11" title="Promotional Codes & Discounts">
            <p className="text-gray-600 text-sm leading-relaxed mb-3">
              Promotional codes and discount offers are subject to the following
              conditions:
            </p>
            <BulletList
              items={[
                "Only one promotional code may be applied per order unless explicitly stated otherwise.",
                "Codes are non-transferable and may not be exchanged for cash or combined with other promotions unless specified.",
                "We reserve the right to reject or revoke promotional codes obtained through fraudulent or unauthorised means.",
                "Promotional offers are valid for the stated time period only and may be withdrawn at any time without notice.",
                "We are not responsible for promotional codes that do not work due to user error or expired validity.",
              ]}
            />
          </Section>

          {/* Section 12 */}
          <Section id="liability" number="SECTION 12" title="Limitation of Liability">
            <p className="text-gray-600 text-sm leading-relaxed mb-3">
              To the fullest extent permitted by applicable law, House of
              Cambridge shall not be liable for any indirect, incidental,
              special, consequential, or punitive damages arising from your use
              of, or inability to use, our website or products.
            </p>
            <p className="text-gray-600 text-sm leading-relaxed mb-3">
              Our total liability to you for any claim arising from your use of
              the website or purchase of products shall not exceed the total
              amount paid by you for the specific order giving rise to the claim.
            </p>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              Nothing in these Terms shall limit our liability for: (a) death or
              personal injury caused by our negligence; (b) fraud or fraudulent
              misrepresentation; or (c) any other liability that cannot be
              excluded or limited by applicable law.
            </p>
            <NoteBox
              title="Website Availability"
              text="We do not guarantee that the website will be available at all times or be free from errors or interruptions. We may suspend access to the website for maintenance, updates, or unforeseen technical issues without prior notice."
            />
          </Section>

          {/* Section 13 */}
          <Section id="governing-law" number="SECTION 13" title="Governing Law & Dispute Resolution">
            <p className="text-gray-600 text-sm leading-relaxed mb-3">
              These Terms & Conditions are governed by and construed in
              accordance with the laws of Sri Lanka. Any disputes arising from or
              in connection with these Terms or your use of the website shall be
              subject to the exclusive jurisdiction of the courts of Sri Lanka.
            </p>
            <p className="text-gray-600 text-sm leading-relaxed">
              We encourage customers to contact us directly to resolve any
              disputes informally before pursuing formal legal remedies. Please
              reach out to our support team at{" "}
              <span className="font-semibold text-gray-800">
                houseofcambridge.co.uk
              </span>{" "}
              in the first instance.
            </p>
          </Section>
        </main>
      </div>

<NewsletterBanner />
    </div>
  );
}

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

function NoteBox({ title, text }) {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mt-2">
      <p className="text-xs font-semibold text-gray-500 mb-1">{title}</p>
      <p className="text-sm text-gray-600 leading-relaxed">{text}</p>
    </div>
  );
}