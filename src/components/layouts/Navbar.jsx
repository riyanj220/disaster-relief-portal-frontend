import { useState } from "react";
import { Link, useLocation } from "react-router";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  // SVG Logo Component for cleanliness
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
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto py-4 px-6 flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center gap-2">
          <LogoIcon />
          <Link to="/" onClick={closeMenu}>
            <h1 className="text-xl font-black text-slate-800 tracking-tight">
              ReliefPortal
            </h1>
          </Link>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-slate-600 font-bold text-sm uppercase tracking-wider">
          {location.pathname === "/" ? (
            <>
              <a href="#about" className="hover:text-blue-600 transition">
                About
              </a>
              <a href="#services" className="hover:text-blue-600 transition">
                Missions
              </a>
              <a href="#contact" className="hover:text-blue-600 transition">
                Contact
              </a>
            </>
          ) : (
            <Link to="/" className="hover:text-blue-600 transition">
              Home
            </Link>
          )}
        </div>

        {/* Auth Buttons (Desktop) */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            to="/login"
            className="px-5 py-2 text-blue-600 font-bold hover:text-blue-700 transition"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="px-6 py-2 bg-blue-600 text-white font-bold rounded-xl shadow-lg hover:bg-blue-700 transition transform active:scale-95"
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 text-slate-600 outline-none"
        >
          <div className="w-6 h-5 flex flex-col justify-between">
            <span
              className={`h-0.5 w-full bg-slate-800 transition-all ${
                isOpen ? "rotate-45 translate-y-2" : ""
              }`}
            ></span>
            <span
              className={`h-0.5 w-full bg-slate-800 transition-all ${
                isOpen ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`h-0.5 w-full bg-slate-800 transition-all ${
                isOpen ? "-rotate-45 -translate-y-2.5" : ""
              }`}
            ></span>
          </div>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-6 text-slate-600 font-bold uppercase tracking-widest text-center">
              {location.pathname === "/" ? (
                <>
                  <a
                    href="#about"
                    onClick={closeMenu}
                    className="hover:text-blue-600"
                  >
                    About
                  </a>
                  <a
                    href="#services"
                    onClick={closeMenu}
                    className="hover:text-blue-600"
                  >
                    Missions
                  </a>
                  <a
                    href="#contact"
                    onClick={closeMenu}
                    className="hover:text-blue-600"
                  >
                    Contact
                  </a>
                </>
              ) : (
                <Link to="/" onClick={closeMenu}>
                  Home
                </Link>
              )}
              <hr className="border-gray-100" />
              <div className="flex flex-col gap-4">
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="text-blue-600 py-2"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={closeMenu}
                  className="bg-blue-600 text-white py-3 rounded-xl shadow-md"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
