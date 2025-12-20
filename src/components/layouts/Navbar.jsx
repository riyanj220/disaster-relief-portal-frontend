import { useState } from "react";
import { Link, useLocation } from "react-router";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Roles: 'guest', 'citizen', 'volunteer', 'admin'
  // Later, you will get this from your Auth Context/Backend
  const [userRole, setUserRole] = useState("admin");

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

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
        <div className="flex items-center gap-2">
          <LogoIcon />
          <Link to="/" onClick={closeMenu}>
            <h1 className="text-xl font-black text-slate-800 tracking-tight">
              ReliefPortal
            </h1>
          </Link>
          {/* Role Badge for Debugging/Dev */}
          {userRole !== "guest" && (
            <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-600 text-[10px] font-bold uppercase rounded-md">
              {userRole}
            </span>
          )}
        </div>

        {/* Dynamic Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-slate-600 font-bold text-sm uppercase tracking-wider">
          {userRole === "guest" ? (
            location.pathname === "/" ? (
              <>
                <a href="#about" className="hover:text-blue-600">
                  About
                </a>
                <a href="#services" className="hover:text-blue-600">
                  Missions
                </a>
                <a href="#contact" className="hover:text-blue-600">
                  Contact
                </a>
              </>
            ) : (
              <Link to="/">Home</Link>
            )
          ) : (
            <>
              <Link to="/dashboard" className="hover:text-blue-600">
                Dashboard
              </Link>
              {userRole === "admin" && (
                <Link
                  to="/admin/reports"
                  className="hover:text-blue-600 text-blue-600"
                >
                  System Logs
                </Link>
              )}
            </>
          )}
        </div>

        {/* Auth Buttons or Profile */}
        <div className="hidden md:flex items-center gap-4">
          {userRole === "guest" ? (
            <>
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
            </>
          ) : (
            <button
              onClick={() => setUserRole("guest")}
              className="px-5 py-2 text-red-500 font-bold border border-red-100 rounded-lg hover:bg-red-50"
            >
              Logout
            </button>
          )}
        </div>

        {/* Mobile toggle (same as before) */}
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
      {/* Mobile Menu Overlay logic remains the same, just add userRole checks for links */}
    </nav>
  );
};

export default Navbar;
