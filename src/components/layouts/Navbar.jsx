import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { User, Menu, LogOut, LogIn, UserPlus } from "lucide-react";
import useAuthStore from "@/store/useAuthStore";
import { Button } from "../ui/button";

const Navbar = ({ onMenuClick }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // 1. Extract dynamic state and actions from Zustand
  const { profile, user, logout } = useAuthStore();

  // 2. Derive user details
  const userRole = profile?.role?.toLowerCase() || "guest";
  const fullName = profile
    ? `${profile.firstName} ${profile.lastName}`
    : "Guest User";

  const handleLogout = async () => {
    await logout();
    setIsProfileOpen(false);
    navigate("/login");
  };

  const LogoIcon = () => (
    <div className="relative group cursor-pointer transition-transform duration-300 hover:scale-110">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="w-8 h-8 sm:w-9 sm:h-9 text-blue-600 drop-shadow-md"
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
    </div>
  );

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-50 w-full">
      <div className="w-full mx-auto py-3 px-4 sm:px-6 flex justify-between items-center relative">
        {/* LEFT SIDE: Mobile Menu Toggle + Logo */}
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={onMenuClick}
            className="md:hidden p-2 -ml-2 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
            aria-label="Open Sidebar"
          >
            <Menu size={24} />
          </button>

          <div className="flex items-center gap-2 sm:gap-3">
            <LogoIcon />
            <Link to="/">
              <h1 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight transition-colors hover:text-blue-600">
                Relief<span className="text-blue-600">Connect</span>
              </h1>
            </Link>
          </div>
        </div>

        {/* RIGHT SIDE: Desktop Nav + User Profile/Auth Buttons */}
        <div className="flex items-center gap-4">
          {/* Navigation Links (Only shown on Desktop) */}
          <div className="hidden md:flex items-center gap-8 text-slate-500 font-semibold text-[13px] uppercase tracking-wider mr-4">
            {userRole === "guest" ? (
              <Link to="/" className="hover:text-blue-600 transition-colors">
                Home
              </Link>
            ) : (
              <>
                <Link
                  to={`/${userRole}`}
                  className={cn(
                    "hover:text-blue-600",
                    location.pathname.includes(userRole) && "text-blue-600"
                  )}
                >
                  Dashboard
                </Link>
                {userRole === "admin" && (
                  <Link to="/admin/requests" className="hover:text-blue-600">
                    Manage
                  </Link>
                )}
              </>
            )}
          </div>

          {/* User Authentication Section */}
          {user ? (
            /* Logged In: Show Profile Dropdown */
            <div className="relative">
              <div
                className="flex items-center gap-3 pl-2 cursor-pointer group"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
              >
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-bold text-slate-800 leading-tight">
                    {fullName}
                  </p>
                  <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-tighter">
                    {userRole}
                  </p>
                </div>
                <div className="w-9 h-9 sm:w-10 sm:h-10 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-200 group-hover:border-blue-400 transition-all shadow-sm">
                  <User
                    size={18}
                    className="text-slate-400 group-hover:text-blue-600"
                  />
                </div>
              </div>

              {/* Profile Dropdown Menu */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-3 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 overflow-hidden animate-in fade-in slide-in-from-top-2">
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-3 text-left text-sm font-bold text-red-500 hover:bg-red-50 flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <LogOut size={16} /> Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Logged Out: Show Auth Buttons */
            <div className="flex items-center gap-2 sm:gap-3">
              <Button
                variant="ghost"
                asChild
                className="hidden sm:flex text-slate-600 font-bold text-xs uppercase tracking-widest hover:text-blue-600"
              >
                <Link to="/login">Login</Link>
              </Button>
              <Button
                asChild
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl px-5 h-10 text-xs uppercase tracking-widest shadow-lg shadow-blue-100 transition-all active:scale-95"
              >
                <Link to="/signup">
                  <UserPlus size={16} className="mr-2 hidden xs:block" />
                  Join Now
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

const cn = (...classes) => classes.filter(Boolean).join(" ");
export default Navbar;
