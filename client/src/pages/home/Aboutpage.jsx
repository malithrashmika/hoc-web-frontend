import { ShoppingCart, ShieldCheck, Star, RefreshCw, HeadphonesIcon, Package, Users, Award, CheckCircle, DollarSign, Lock, Heart } from "lucide-react";
import abouthero from "../../assets/abouthero.png";
import whoWeAre from "../../assets/whoweare.png";
import ctaCannon from "../../assets/Ctacannon.png";
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

const stats = [
  {
    icon: <Package size={48} strokeWidth={1.2} className="text-[#FFB700]" />,
    value: "5,000+",
    label: "Products",
  },
  {
    icon: <Users size={48} strokeWidth={1.2} className="text-[#FFB700]" />,
    value: "10,000+",
    label: "Happy customers",
  },
  {
    icon: <Award size={48} strokeWidth={1.2} className="text-[#FFB700]" />,
    value: "50+",
    label: "Trusted Brands",
  },
];

const testimonials = [
  {
    name: "Pavithra Perera",
    date: "12 Jan 2026",
    location: "Colombo, Sri Lanka",
    rating: 5,
    text: "HOC has completely changed how I shop online. The product range is incredible and delivery was faster than expected. Highly recommend to everyone!",
    avatar: "PP",
    color: "bg-pink-400",
  },
  {
    name: "Kasun Rajapaksha",
    date: "28 Feb 2026",
    location: "Kandy, Sri Lanka",
    rating: 5,
    text: "Amazing experience! The prices are unbeatable and all products are 100% genuine. The customer support team was very helpful when I had a question.",
    avatar: "KR",
    color: "bg-blue-400",
  },
  {
    name: "Nimasha Fernando",
    date: "05 Mar 2026",
    location: "Gampaha, Sri Lanka",
    rating: 5,
    text: "I love shopping at HOC. The website is so easy to use and I always find exactly what I need. The loyalty points programme is a great bonus too!",
    avatar: "NF",
    color: "bg-purple-400",
  },
  {
    name: "Dilshan Wickrama",
    date: "18 Mar 2026",
    location: "Matara, Sri Lanka",
    rating: 5,
    text: "Fast delivery, genuine products, and great prices. What more could you ask for? HOC is now my go-to platform for all online shopping needs.",
    avatar: "DW",
    color: "bg-green-400",
  },
  {
    name: "Sachini Mendis",
    date: "02 Apr 2026",
    location: "Negombo, Sri Lanka",
    rating: 5,
    text: "The return process was smooth and hassle-free. I returned an item and got my refund quickly. Really impressed with the professionalism of the team.",
    avatar: "SM",
    color: "bg-yellow-500",
  },
  {
    name: "Tharindu Jayasinghe",
    date: "10 Apr 2026",
    location: "Kurunegala, Sri Lanka",
    rating: 5,
    text: "Best online shopping platform in Sri Lanka without a doubt. Great selection of electronics and home appliances at prices you won't find anywhere else.",
    avatar: "TJ",
    color: "bg-red-400",
  },
  {
    name: "Oshadi Silva",
    date: "25 Apr 2026",
    location: "Kalutara, Sri Lanka",
    rating: 4,
    text: "Shopping at HOC has been a pleasure from start to finish. The website is clean, products are well described, and the packaging is always excellent.",
    avatar: "OS",
    color: "bg-indigo-400",
  },
];

function StarRating({ count }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={i < count ? "#FFB700" : "#e5e7eb"}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen overflow-hidden">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 pt-3 pb-0">
        <p className="text-sm text-gray-500">
          Home <span className="mx-1">/</span>
          <span className="text-gray-700">About Us</span>
        </p>
      </div>

      <section className="relative bg-white overflow-hidden">
        {/* Dot pattern top-right */}
        <div className="absolute top-4 right-64 opacity-30 pointer-events-none">
          {[...Array(5)].map((_, row) => (
            <div key={row} className="flex gap-3 mb-3">
              {[...Array(6)].map((_, col) => (
                <div key={col} className="w-1.5 h-1.5 rounded-full bg-[#FFB700]" />
              ))}
            </div>
          ))}
        </div>

        <div className="absolute top-24 left-8 opacity-20 pointer-events-none">
          {[...Array(4)].map((_, row) => (
            <div key={row} className="flex gap-3 mb-3">
              {[...Array(4)].map((_, col) => (
                <div key={col} className="w-1.5 h-1.5 rounded-full bg-gray-400" />
              ))}
            </div>
          ))}
        </div>
        
        <div className="absolute top-8 right-8 w-16 h-16 rounded-full border-2 border-[#FFB700] opacity-20 pointer-events-none" />
        <div className="absolute bottom-20 left-1/3 w-8 h-8 rounded-full border-2 border-[#FFB700] opacity-15 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 py-12 flex flex-col md:flex-row items-center gap-8">
          
          <div className="flex-1 z-10">
            <p className="text-[#FFB700] font-bold text-sm uppercase tracking-widest mb-3">
              About Us
            </p>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-3">
              Your Trusted Partner For
              <br />
              <span className="text-[#FFB700]">Quality And Value</span>
            </h1>
            <p className="text-gray-500 text-base leading-relaxed mb-8 max-w-md">
              House of Cambridge (HOC) is Sri Lanka's premier e-commerce
              platform, offering customers a one-stop destination for
              high-quality products, unbeatable prices, and a seamless online
              shopping experience.
            </p>
            <a
              href="#"
              className="inline-block bg-[#FFB700] hover:bg-yellow-500 transition-colors text-black font-bold px-7 py-3 rounded-full text-sm shadow-md"
            >
              Discover our story
            </a>
          </div>

          
          <div className="flex-1 flex justify-center md:justify-end z-10">
            <img
              src={abouthero}
              alt="HOC Products"
              className="w-full max-w-lg object-contain drop-shadow-xl"
            />
          </div>
        </div>

        
        <div className="relative h-16 -mb-1">
          <svg viewBox="0 0 1440 64" className="absolute bottom-0 w-full" preserveAspectRatio="none">
            <path d="M0,32 C360,64 1080,0 1440,32 L1440,64 L0,64 Z" fill="#FFB700" opacity="0.15" />
            <path d="M0,48 C480,16 960,64 1440,48 L1440,64 L0,64 Z" fill="#FFB700" opacity="0.1" />
          </svg>
        </div>
      </section>

      
      <section className="max-w-7xl mx-auto px-4 py-16 flex flex-col md:flex-row items-center gap-12">
        
        <div className="flex-1">
          <img
            src={whoWeAre}
            alt="Who We Are"
            className="w-full rounded-2xl object-cover shadow-lg"
          />
        </div>

        
        <div className="flex-1">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-6">
            Who <span className="text-[#FFB700]">We Are</span>
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            House of Cambridge (HOC) is a leading online shopping destination in
            Sri Lanka, offering a wide range of trusted products across beauty,
            electronics, home appliances, baby care, and more.
          </p>
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            Our vision is to revolutionize digital retail in Sri Lanka, we bring
            together quality products, competitive prices, and outstanding
            customer service all in one convenient platform.
          </p>
          <p className="text-gray-600 text-sm leading-relaxed mb-8">
            At HOC, we understand the evolving needs of modern shoppers. Our
            mission is to make quality products accessible to everyone across Sri
            Lanka through a seamless, secure, and user-friendly online
            marketplace. We pride ourselves on our extensive product range,
            reliable delivery network, and commitment to customer satisfaction.
          </p>

          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { icon: <CheckCircle size={22} className="text-[#FFB700]" />, label: "Curated Products", sub: "Carefully selected for you" },
              { icon: <DollarSign size={22} className="text-[#FFB700]" />, label: "Great Prices", sub: "Unbeatable deals everyday" },
              { icon: <Lock size={22} className="text-[#FFB700]" />, label: "Safe & Secure", sub: "100% secure shopping" },
              { icon: <Heart size={22} className="text-[#FFB700]" />, label: "Customer Focused", sub: "Your satisfaction is our priority" },
            ].map((s, i) => (
              <div key={i} className="flex flex-col items-center text-center gap-1 p-3 rounded-xl bg-gray-50 border border-gray-100">
                {s.icon}
                <p className="text-xs font-bold text-gray-800">{s.label}</p>
                <p className="text-xs text-gray-400 leading-tight">{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      
      <section className="bg-gray-50 py-14">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-10">
            Why <span className="text-[#FFB700]">Choose Us</span>
          </h2>
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
      </section>

      
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-10">
            What <span className="text-[#FFB700]">Our Customers Say</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-3"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full ${t.color} flex items-center justify-center text-white font-bold text-sm shrink-0`}>
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">{t.name}</p>
                    <p className="text-xs text-gray-400">{t.date} · {t.location}</p>
                  </div>
                </div>
                <StarRating count={t.rating} />
                <p className="text-gray-500 text-xs leading-relaxed flex-1">{t.text}</p>
                {/* Quote mark */}
                <div className="text-[#FFB700] text-4xl font-serif leading-none self-end opacity-40">"</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      
      <section className="py-14 bg-[#FFFBF0]">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-10">
            Our <span className="text-[#FFB700]">Achievements</span>
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            {stats.map((s, i) => (
              <div
                key={i}
                className="flex-1 flex items-center gap-5 bg-white border border-gray-100 rounded-2xl px-8 py-6 shadow-sm max-w-xs w-full"
              >
                {s.icon}
                <div>
                  <p className="text-3xl font-extrabold text-gray-900">{s.value}</p>
                  <p className="text-sm text-gray-500">{s.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      
      <section className="bg-[#FFF4CC] py-0 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-6 min-h-40">
          
          <div className="hidden md:block shrink-0 w-52 self-end">
            <img
              src={ctaCannon}
              alt="Shop Now"
              className="w-full object-contain"
            />
          </div>
          
          <div className="flex-1 py-10">
            <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2">
              Start Shopping with Confidence
            </h3>
            <p className="text-gray-600 text-sm">
              Quality products, Best prices, and Dedicated support
              <br />
              All in one place.
            </p>
          </div>
         
          <div className="shrink-0">
            <a
              href="/shop"
              className="inline-block bg-gray-900 hover:bg-gray-700 transition-colors text-white font-bold px-8 py-3 rounded-lg text-sm"
            >
              Shop Now
            </a>
          </div>
        </div>
      </section>

      
      <BrandLogoStrip />

      <NewsletterBanner />
    </div>
  );
}