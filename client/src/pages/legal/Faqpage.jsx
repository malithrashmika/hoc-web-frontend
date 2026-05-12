import { useState, useEffect } from "react";
import faqImage from "../../assets/faqimage.png";
import NewsletterBanner from "../../components/Newsletterbanner";

const categories = [
  { id: "orders", icon: "📦", label: "Orders & Shipping", count: 8 },
  { id: "returns", icon: "🔄", label: "Returns & Refunds", count: 6 },
  { id: "payment", icon: "💳", label: "Payment", count: 5 },
  { id: "loyalty", icon: "⭐", label: "Loyalty Points", count: 4 },
  { id: "brands", icon: "🏷️", label: "Brands & Products", count: 4 },
  { id: "privacy", icon: "🔒", label: "Privacy & Security", count: 3 },
];

const popularTopics = [
  "Track my order",
  "How to return an item",
  "Change my address",
  "Promo codes",
  "Size guide",
];

const allFaqSectionIds = [
  "orders",
  "returns",
  "payment",
  "loyalty",
  "brands",
  "privacy",
];

const faqData = {
  orders: {
    title: "Orders & Shipping",
    icon: "📦",
    items: [
      {
        id: "o1",
        question: "How do I track my order?",
        answer:
          "Once your order is dispatched, you will receive an email and SMS with a tracking number. You can use this number to track your parcel on the carrier's website, to see the live tracking status. Tracking information typically becomes active within 2–4 hours of dispatch.",
        tags: ["Tracking", "Shipping"],
        defaultOpen: true,
      },
      {
        id: "o2",
        question: "How long does delivery take?",
        answer:
          "Standard delivery takes 3–5 business days. Express delivery options are available at checkout for 1–2 business days. International shipping may take 7–14 business days depending on the destination.",
        tags: ["Delivery", "Shipping"],
      },
      {
        id: "o3",
        question: "Is free shipping available?",
        answer:
          "Yes! We offer free standard shipping on all orders over Rs 5,000. Orders below this threshold will have a flat shipping fee applied at checkout.",
        tags: ["Shipping", "Free Delivery"],
      },
      {
        id: "o4",
        question: "Can I change my delivery address after placing an order?",
        answer:
          "You can change your delivery address within 1 hour of placing the order by contacting our support team. After that window, the order may have already been processed for dispatch and changes cannot be guaranteed.",
        tags: ["Address", "Orders"],
      },
      {
        id: "o5",
        question: "Can I cancel my order?",
        answer:
          "Orders can be cancelled within 2 hours of placement. Once an order has been dispatched, it cannot be cancelled. Please contact our support team immediately if you wish to cancel.",
        tags: ["Cancel", "Orders"],
      },
    ],
  },
  returns: {
    title: "Returns & Refunds",
    icon: "🔄",
    items: [
      {
        id: "r1",
        question: "What is your return policy?",
        answer: (
          <>
            You may return most items within <strong>30 days</strong> of
            delivery, provided they are unworn, unwashed, and in their original
            packaging with all tags attached. Sale items and
            personalised/customised products are non-returnable. Please visit
            our full{" "}
            <a href="#" className="text-[#FFB700] underline">
              Return &amp; Refund Policy
            </a>{" "}
            for complete details.
          </>
        ),
        tags: ["Returns", "Policy"],
        defaultOpen: true,
      },
      {
        id: "r2",
        question: "How long does my refund take to process?",
        answer:
          "Once we receive your returned item and verify its condition, refunds are processed within 5–7 business days. The amount will be credited back to your original payment method.",
        tags: ["Refund", "Processing"],
      },
      {
        id: "r3",
        question: "How do I initiate a return?",
        answer:
          "To initiate a return, log in to your account, go to 'My Orders', select the item you wish to return, and follow the on-screen instructions. You will receive a return label via email.",
        tags: ["Returns", "Process"],
      },
    ],
  },
  payment: {
    title: "Payment",
    icon: "💳",
    items: [
      {
        id: "p1",
        question: "What payment methods do you accept?",
        answer: (
          <>
            We accept{" "}
            <strong>Visa, Mastercard, American Express, PayPal</strong>, and{" "}
            <strong>Stripe</strong>. All transactions are processed securely
            through PCI DSS compliant payment gateways. We do not store your
            full card details on our servers.
          </>
        ),
        tags: ["Payment", "Security"],
        defaultOpen: true,
      },
      {
        id: "p2",
        question: "How do I apply a promo code?",
        answer:
          "At checkout, you will find a 'Promo Code' field. Enter your code and click 'Apply'. The discount will be reflected in your order total before payment.",
        tags: ["Promo", "Discount"],
      },
    ],
  },
  loyalty: {
    title: "Loyalty Programme",
    icon: "⭐",
    items: [
      {
        id: "l1",
        question: "How do loyalty points work?",
        answer:
          "You earn 1 point for every Rs 100 spent. Points are credited to your account after a successful order delivery. You can redeem points for discounts on future orders (100 points = Rs 30 off). Points expire after 12 months of account inactivity.",
        tags: ["Loyalty", "Points"],
        defaultOpen: true,
      },
      {
        id: "l2",
        question: "What are the loyalty tiers?",
        answer:
          "We have three tiers: Silver (0–999 points), Gold (1,000–4,999 points), and Platinum (5,000+ points). Higher tiers unlock exclusive discounts, early access to sales, and priority customer support.",
        tags: ["Loyalty", "Tiers"],
      },
    ],
  },
  brands: {
    title: "Brands & Products",
    icon: "🏷️",
    items: [
      {
        id: "b1",
        question: "Are all products genuine?",
        answer:
          "Yes, all products sold on House of Cambridge are 100% authentic. We source directly from brands and authorised distributors. Each product comes with original packaging and documentation.",
        tags: ["Authenticity", "Products"],
        defaultOpen: true,
      },
      {
        id: "b2",
        question: "Do you sell pre-owned items?",
        answer:
          "Yes, we have a dedicated Pre-Owned UK Items section featuring quality second-hand products sourced from the UK. Each item is inspected and graded before listing.",
        tags: ["Pre-owned", "UK Items"],
      },
    ],
  },
  privacy: {
    title: "Privacy & Security",
    icon: "🔒",
    items: [
      {
        id: "pr1",
        question: "How is my personal data protected?",
        answer:
          "We use industry-standard SSL encryption to protect all data transmitted on our platform. Your personal information is never sold to third parties. Please read our Privacy Policy for full details.",
        tags: ["Privacy", "Data"],
        defaultOpen: true,
      },
      {
        id: "pr2",
        question: "How do I delete my account?",
        answer:
          "To request account deletion, please contact our support team. We will process your request within 7 business days and permanently remove all your personal data from our systems.",
        tags: ["Account", "Privacy"],
      },
    ],
  },
};

function AccordionItem({ item }) {
  const [open, setOpen] = useState(item.defaultOpen || false);
  const [helpful, setHelpful] = useState(null);

  return (
    <div className="border border-gray-200 rounded-lg mb-3 overflow-hidden bg-white">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors"
      >
        <span className="font-medium text-gray-800 text-sm md:text-base pr-4">
          {item.question}
        </span>
        <span className="text-gray-400 text-xl shrink-0 font-light">
          {open ? "−" : "+"}
        </span>
      </button>

      {open && (
        <div className="px-5 pb-5 border-t border-gray-100">
          <p className="text-gray-600 text-sm leading-relaxed mt-4">
            {item.answer}
          </p>

          {item.tags && (
            <div className="flex flex-wrap gap-2 mt-4">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 border border-gray-200 rounded text-xs text-gray-500 bg-gray-50"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-center gap-3 mt-4">
            <span className="text-sm text-gray-500">Was this helpful?</span>
            <button
              onClick={() => setHelpful("yes")}
              className={`flex items-center gap-1 px-3 py-1 rounded border text-sm transition-all ${
                helpful === "yes"
                  ? "border-[#FFB700] bg-yellow-50 text-yellow-700"
                  : "border-gray-200 text-gray-600 hover:border-[#FFB700]"
              }`}
            >
              👍 Yes
            </button>
            <button
              onClick={() => setHelpful("no")}
              className={`flex items-center gap-1 px-3 py-1 rounded border text-sm transition-all ${
                helpful === "no"
                  ? "border-gray-400 bg-gray-100 text-gray-700"
                  : "border-gray-200 text-gray-600 hover:border-gray-400"
              }`}
            >
              👎 No
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState("orders");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState(null);

  // Scroll spy — disabled when search is active
  useEffect(() => {
    if (searchResults !== null) return;
    const observers = [];
    allFaqSectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveCategory(id);
        },
        { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [searchResults]);

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setSearchResults(null);
      return;
    }
    const query = searchQuery.toLowerCase();
    const results = [];
    Object.values(faqData).forEach((section) => {
      section.items.forEach((item) => {
        const answerText =
          typeof item.answer === "string"
            ? item.answer.toLowerCase()
            : item.question.toLowerCase();
        if (
          item.question.toLowerCase().includes(query) ||
          answerText.includes(query) ||
          (item.tags && item.tags.some((t) => t.toLowerCase().includes(query)))
        ) {
          results.push({ ...item, sectionTitle: section.title });
        }
      });
    });
    setSearchResults(results);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults(null);
  };

  const handleCategoryClick = (id) => {
    setActiveCategory(id);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 py-3">
        <p className="text-sm text-gray-500">
          Home <span className="mx-1 text-gray-400">/</span>
          Pages <span className="mx-1 text-gray-400">/</span>
          <span className="text-gray-700">FAQ</span>
        </p>
      </div>

      {/* Hero Banner */}
      <div className="max-w-7xl mx-auto px-4 mb-10">
        <div className="bg-gray-100 rounded-2xl overflow-hidden relative flex flex-col md:flex-row items-center justify-between px-8 md:px-14 py-10 gap-6">
          <div className="flex-1 z-10">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              How Can We Help You?
            </h1>
            <p className="text-gray-500 mb-6 text-sm md:text-base">
              Browse our frequently asked questions or search for what you need
              below.
            </p>
            <div className="flex items-center gap-0 max-w-md">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search FAQs e.g. 'return policy', 'track order'..."
                className="flex-1 border border-gray-300 rounded-l-lg px-4 py-3 text-sm outline-none focus:border-[#FFB700] bg-white"
              />
              <button
                onClick={handleSearch}
                className="bg-[#FFB700] hover:bg-yellow-500 transition-colors text-black font-semibold px-6 py-3 rounded-r-lg text-sm whitespace-nowrap"
              >
                Search
              </button>
            </div>
          </div>
          <div className="shrink-0 w-64 md:w-80 opacity-90">
            <img
              src={faqImage}
              alt="FAQ Illustration"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      </div>

      {/* Search Results */}
      {searchResults !== null && (
        <div className="max-w-7xl mx-auto px-4 mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              {searchResults.length > 0
                ? `${searchResults.length} result${searchResults.length !== 1 ? "s" : ""} for "${searchQuery}"`
                : `No results found for "${searchQuery}"`}
            </h2>
            <button
              onClick={clearSearch}
              className="text-sm text-[#FFB700] underline hover:text-yellow-600"
            >
              Clear search
            </button>
          </div>
          {searchResults.length > 0 ? (
            searchResults.map((item) => (
              <div key={item.id}>
                <p className="text-xs text-gray-400 uppercase tracking-wide mb-1 mt-3">
                  {item.sectionTitle}
                </p>
                <AccordionItem item={{ ...item, defaultOpen: true }} />
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm">
              Try a different keyword or browse the categories below.
            </p>
          )}
        </div>
      )}

      {/* Main Content */}
      {searchResults === null && (
        <div className="max-w-7xl mx-auto px-4 pb-16 flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full md:w-56 shrink-0">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">
              Categories
            </p>
            <ul className="space-y-1">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => handleCategoryClick(cat.id)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-all ${
                      activeCategory === cat.id
                        ? "bg-[#FFB700] text-black font-semibold"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span>{cat.icon}</span>
                      <span>{cat.label}</span>
                    </span>
                    <span
                      className={`text-xs font-bold px-1.5 py-0.5 rounded ${
                        activeCategory === cat.id
                          ? "bg-black text-white"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {cat.count}
                    </span>
                  </button>
                </li>
              ))}
            </ul>

            {/* Popular Topics */}
            <div className="mt-8">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">
                Popular Topics
              </p>
              <ul className="space-y-2">
                {popularTopics.map((topic) => (
                  <li key={topic}>
                    <button
                      onClick={() => {
                        setSearchQuery(topic);
                        const query = topic.toLowerCase();
                        const results = [];
                        Object.values(faqData).forEach((section) => {
                          section.items.forEach((item) => {
                            const answerText =
                              typeof item.answer === "string"
                                ? item.answer.toLowerCase()
                                : item.question.toLowerCase();
                            if (
                              item.question.toLowerCase().includes(query) ||
                              answerText.includes(query)
                            ) {
                              results.push({
                                ...item,
                                sectionTitle: section.title,
                              });
                            }
                          });
                        });
                        setSearchResults(results);
                      }}
                      className="text-sm text-gray-500 hover:text-[#FFB700] transition-colors text-left"
                    >
                      {topic}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* FAQ Sections — all rendered for scroll spy */}
          <main className="flex-1 min-w-0">
            {Object.entries(faqData).map(([key, section]) => (
              <div key={key} id={key} className="mb-10 scroll-mt-6">
                <h2 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-2">
                  <span>{section.icon}</span>
                  <span>{section.title}</span>
                </h2>
                {section.items.map((item) => (
                  <AccordionItem key={item.id} item={item} />
                ))}
              </div>
            ))}

            {/* Didn't find your answer */}
            <div className="border border-gray-200 rounded-xl p-6 mt-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                Didn't find your answer?
              </h3>
              <p className="text-sm text-gray-500 mb-6">
                Our support team is ready to help you. Choose your preferred
                contact method below.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex flex-col items-center text-center border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow">
                  <span className="text-3xl mb-2">💬</span>
                  <p className="font-semibold text-gray-800 text-sm mb-1">
                    Live Chat
                  </p>
                  <p className="text-xs text-gray-500 mb-4">
                    Chat with a human agent. Available, 24/7
                  </p>
                  <button className="w-full bg-[#FFB700] hover:bg-yellow-500 transition-colors text-black font-semibold py-2 rounded-lg text-sm">
                    Start Chat
                  </button>
                </div>

                <div className="flex flex-col items-center text-center border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow">
                  <span className="text-3xl mb-2">📧</span>
                  <p className="font-semibold text-gray-800 text-sm mb-1">
                    Email Support
                  </p>
                  <p className="text-xs text-gray-500 mb-4">
                    support@dickwellafashion.lk
                    <br />
                    Response within 24 hours.
                  </p>
                  <button className="w-full bg-[#FFB700] hover:bg-yellow-500 transition-colors text-black font-semibold py-2 rounded-lg text-sm">
                    Send Email
                  </button>
                </div>

                <div className="flex flex-col items-center text-center border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow">
                  <span className="text-3xl mb-2">📞</span>
                  <p className="font-semibold text-gray-800 text-sm mb-1">
                    Phone Support
                  </p>
                  <p className="text-xs text-gray-500 mb-4">
                    +94 41 200 1234
                    <br />
                    Mon–Sat, 9 AM – 6 PM.
                  </p>
                  <button className="w-full bg-[#FFB700] hover:bg-yellow-500 transition-colors text-black font-semibold py-2 rounded-lg text-sm">
                    Call Us
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
      )}

      <NewsletterBanner />
    </div>
  );
}