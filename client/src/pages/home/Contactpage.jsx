import { useState } from "react";
import emailjs from "@emailjs/browser";
import { ShoppingCart, ShieldCheck, Star, RefreshCw, HeadphonesIcon } from "lucide-react";
import NewsletterBanner from "../../components/Newsletterbanner";
import BrandLogoStrip from "../../components/Brandlogostrip";

const whyChooseUs = [
  {
    icon: <ShoppingCart size={36} strokeWidth={1.5} className="text-[#FFB700]" />,
    title: "Fast Delivery",
    desc: "Islandwide delivery to your doorstep",
  },
  {
    icon: <ShieldCheck size={36} strokeWidth={1.5} className="text-[#FFB700]" />,
    title: "Secure Payments",
    desc: "100% secure online payments",
  },
  {
    icon: <Star size={36} strokeWidth={1.5} className="text-[#FFB700]" />,
    title: "Genuine Products",
    desc: "Original products from trusted brands",
  },
  {
    icon: <RefreshCw size={36} strokeWidth={1.5} className="text-[#FFB700]" />,
    title: "Easy Returns",
    desc: "Hassle-free returns within 30 days",
  },
  {
    icon: <HeadphonesIcon size={36} strokeWidth={1.5} className="text-[#FFB700]" />,
    title: "Customer Support",
    desc: "Friendly support 24/7",
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({
    from_name: "",
    from_email: "",
    phone_number: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!form.from_name.trim()) newErrors.from_name = "Name is required.";
    if (!form.from_email.trim()) {
      newErrors.from_email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.from_email)) {
      newErrors.from_email = "Enter a valid email address.";
    }
    if (!form.phone_number.trim()) {
      newErrors.phone_number = "Phone number is required.";
    } else if (!/^[0-9+\s\-()]{7,15}$/.test(form.phone_number)) {
      newErrors.phone_number = "Enter a valid phone number.";
    }
    if (!form.message.trim()) newErrors.message = "Message is required.";
    return newErrors;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setLoading(true);
    setStatus(null);
    try {
      await emailjs.send(
        "service_75duacd",
        "template_gyjs6gg",
        form,
        "rBcoqzhyeVMCCZvO9"
      );
      setStatus("success");
      setForm({ from_name: "", from_email: "", phone_number: "", message: "" });
    } catch {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 pt-3 pb-0">
        <p className="text-sm text-gray-500">
          Home <span className="mx-1">/</span>
          <span className="text-gray-700">Contact Us</span>
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="bg-[#FFF8F0] rounded-2xl p-8 flex flex-col md:flex-row gap-12">
          <div className="flex-1">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
              Get <span className="text-[#FFB700]">In Touch</span>
            </h2>
            <p className="text-gray-500 text-sm mb-8">
              Questions, comments, or suggestions? Simply fill in the form and
              we'll be in touch shortly.
            </p>

            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-sm text-gray-700">
                <span className="text-[#FFB700] text-lg">📞</span>
                076 460 4227
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-700">
                <span className="text-[#FFB700] text-lg">📱</span>
                0112 847 846
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-700">
                <span className="text-[#FFB700] text-lg">✉️</span>
                info@houseofcambridge.co.uk
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-700">
                <span className="text-[#FFB700] text-lg">📍</span>
                No 63 Old Road, Pannipitiya
              </li>
            </ul>
          </div>

          <div className="flex-1">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-6">
              Drop Us <span className="text-[#FFB700]">A Message</span>
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div>
                <input
                  type="text"
                  name="from_name"
                  value={form.from_name}
                  onChange={handleChange}
                  placeholder="Name*"
                  className={`w-full border rounded-lg px-4 py-3 text-sm outline-none bg-white transition-colors ${
                    errors.from_name
                      ? "border-red-400 focus:border-red-400"
                      : "border-gray-300 focus:border-[#FFB700]"
                  }`}
                />
                {errors.from_name && (
                  <p className="text-red-500 text-xs mt-1">{errors.from_name}</p>
                )}
              </div>

              <div>
                <input
                  type="email"
                  name="from_email"
                  value={form.from_email}
                  onChange={handleChange}
                  placeholder="Email*"
                  className={`w-full border rounded-lg px-4 py-3 text-sm outline-none bg-white transition-colors ${
                    errors.from_email
                      ? "border-red-400 focus:border-red-400"
                      : "border-gray-300 focus:border-[#FFB700]"
                  }`}
                />
                {errors.from_email && (
                  <p className="text-red-500 text-xs mt-1">{errors.from_email}</p>
                )}
              </div>

              <div>
                <input
                  type="tel"
                  name="phone_number"
                  value={form.phone_number}
                  onChange={handleChange}
                  placeholder="Phone Number*"
                  className={`w-full border rounded-lg px-4 py-3 text-sm outline-none bg-white transition-colors ${
                    errors.phone_number
                      ? "border-red-400 focus:border-red-400"
                      : "border-gray-300 focus:border-[#FFB700]"
                  }`}
                />
                {errors.phone_number && (
                  <p className="text-red-500 text-xs mt-1">{errors.phone_number}</p>
                )}
              </div>

              <div>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Your message..."
                  rows={5}
                  className={`w-full border rounded-lg px-4 py-3 text-sm outline-none bg-white resize-none transition-colors ${
                    errors.message
                      ? "border-red-400 focus:border-red-400"
                      : "border-gray-300 focus:border-[#FFB700]"
                  }`}
                />
                {errors.message && (
                  <p className="text-red-500 text-xs mt-1">{errors.message}</p>
                )}
              </div>

              {status === "success" && (
                <p className="text-green-600 text-sm font-medium">
                   Message sent successfully! We'll get back to you soon.
                </p>
              )}
              {status === "error" && (
                <p className="text-red-500 text-sm font-medium">
                   Something went wrong. Please try again later.
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#FFB700] hover:bg-yellow-500 disabled:opacity-60 disabled:cursor-not-allowed transition-colors text-black font-bold py-3 rounded-lg text-sm"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-10">
        <div className="rounded-2xl overflow-hidden border border-gray-200 relative">
          <a
            href="https://maps.app.goo.gl/1uDLhJ8NEnt3ZkzC7"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg shadow text-sm font-semibold text-[#FFB700] hover:shadow-md transition-shadow"
          >
            Open in Maps
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.3663061154784!2d79.94315407456224!3d6.846616493151616!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2514a2ff0c509%3A0x38d84b6048bc3f96!2sEGI%20HOLDINGS%20PVT%20LIMITED!5e0!3m2!1sen!2slk!4v1778822316701!5m2!1sen!2slk"
            width="100%"
            height="420"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="HOC Location"
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {whyChooseUs.map((item, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-md hover:-translate-y-1 transition-all duration-200"
            >
              <div className="mb-4">{item.icon}</div>
              <p className="font-bold text-gray-800 text-sm mb-1">{item.title}</p>
              <p className="text-xs text-gray-500 leading-snug">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <BrandLogoStrip />
      <NewsletterBanner />
    </div>
  );
}