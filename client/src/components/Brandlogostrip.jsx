import brandLogo from "../assets/brandlogo.png";

export default function BrandLogoStrip() {
  return (
    <div className="py-6 bg-white">
      <h2 className="text-center text-3xl font-bold text-gray-900 mb-6">
        Trusted By <span className="text-[#FFB700]">Top Brands</span>
      </h2>

      {/* Sliding strip */}
      <div className="relative overflow-hidden">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-linear-to-r from-white to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-linear-to-l from-white to-transparent pointer-events-none" />

        <div className="flex items-center animate-slide-logos">
          {/* Render image twice for seamless infinite loop */}
          <img
            src={brandLogo}
            alt="Trusted Brands"
            className="h-10 object-contain shrink-0"
            draggable={false}
          />
          <img
            src={brandLogo}
            alt="Trusted Brands"
            className="h-10 object-contain shrink-0"
            draggable={false}
          />
        </div>
      </div>

      <style>{`
        @keyframes slideLogos {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-slide-logos {
          animation: slideLogos 18s linear infinite;
          width: max-content;
        }
        .animate-slide-logos:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}