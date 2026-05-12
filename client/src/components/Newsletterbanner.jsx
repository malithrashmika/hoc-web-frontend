import headphone from "../assets/headphone.png";
import mail from "../assets/mail.png";

export default function NewsletterBanner() {
  return (
    <div className="bg-[#6B7280] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-8 py-12 flex items-center justify-between relative">
        {/* Text */}
        <div className="z-10">
          <p className="text-white text-base mb-1">Stay Updated with Us</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-1">
            Get <span className="text-[#FFB700]">20%</span> Off Discount Coupon
          </h2>
          <p className="text-white text-sm opacity-80">
            by Subscribe our Newsletter
          </p>
        </div>

        {/* Right side images */}
        <div className="hidden md:flex items-end absolute right-16 bottom-0 gap-6">
          {/* Arrow SVG */}
          <div className="mb-16 -mr-4">
            <svg
              width="80"
              height="80"
              viewBox="0 0 80 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="opacity-80"
            >
              <path
                d="M10 60 Q20 20 60 15"
                stroke="#a0b4c8"
                strokeWidth="2.5"
                strokeDasharray="5 4"
                fill="none"
              />
              <polygon points="55,8 65,18 52,20" fill="#a0b4c8" />
            </svg>
          </div>

          {/* Headphone */}
          <img
            src={headphone}
            alt="headphones"
            className="w-44 h-44 object-contain drop-shadow-2xl"
            onError={(e) => { e.target.style.display = "none"; }}
          />

          {/* Mail icon */}
          <div className="mb-20">
            <img
              src={mail}
              alt="mail"
              className="w-14 h-14 object-contain opacity-90"
              onError={(e) => { e.target.style.display = "none"; }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}