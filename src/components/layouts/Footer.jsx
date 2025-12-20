import { Link } from "react-router";

const Footer = () => {
  const LogoIcon = () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="w-8 h-8 text-blue-600 drop-shadow-sm"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 8V15M9 12H15"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );

  return (
    <footer className="bg-slate-900 text-gray-400 py-16 px-8 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <LogoIcon />
              <span className="font-black text-white text-xl tracking-tight">
                ReliefPortal
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-6">
              Providing a unified platform for disaster response, resource
              allocation, and volunteer coordination.
            </p>
            <div className="flex gap-4">
              {["𝕏", "in", "fb"].map((social) => (
                <div
                  key={social}
                  className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all cursor-pointer text-xs font-bold"
                >
                  {social}
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">
              Platform
            </h4>
            <ul className="space-y-4 text-sm">
              <li>
                <Link to="/" className="hover:text-blue-400 transition">
                  Home
                </Link>
              </li>
              <li>
                <a href="#about" className="hover:text-blue-400 transition">
                  About Us
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-blue-400 transition">
                  Active Missions
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-blue-400 transition">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">
              Support
            </h4>
            <ul className="space-y-4 text-sm">
              <li>
                <a href="#" className="hover:text-blue-400 transition">
                  Help Center
                </a>
              </li>
              <li>
                <Link to="/signup" className="hover:text-blue-400 transition">
                  Volunteer Sign Up
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-blue-400 transition">
                  Citizen Login
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition">
                  Emergency Protocol
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter / Emergency Alert */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">
              Stay Informed
            </h4>
            <p className="text-xs mb-4">
              Get real-time emergency alerts in your region.
            </p>
            <div className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="Enter email"
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm outline-none focus:border-blue-500 transition"
              />
              <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-black uppercase py-2 rounded-lg transition-all tracking-widest">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:row justify-between items-center gap-4">
          <p className="text-xs font-medium uppercase tracking-tighter">
            &copy; 2025 Disaster Relief Portal. All rights reserved.
          </p>
          <div className="flex gap-8 text-[10px] font-black uppercase tracking-[0.2em]">
            <a href="#" className="hover:text-white transition">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition">
              Terms of Service
            </a>
            <a href="#" className="hover:text-white transition">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
