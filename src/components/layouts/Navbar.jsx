import { Link } from "react-router";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md py-4 px-8 flex justify-between items-center sticky top-0 z-50">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-blue-600 rounded-lg"></div>
        <Link to={"/"}>
          <h1 className="text-xl font-bold text-gray-800 tracking-tight cursor-pointer">
            ReliefPortal
          </h1>
        </Link>
      </div>

      <div className="hidden md:flex items-center gap-8 text-gray-600 font-medium">
        <a href="#" className="hover:text-blue-600 transition">
          About
        </a>
        <a href="#" className="hover:text-blue-600 transition">
          Services
        </a>
        <a href="#" className="hover:text-blue-600 transition">
          Contact
        </a>
      </div>

      <div className="flex gap-4">
        <Link
          to={"/login"}
          className="px-5 py-2 text-blue-600 font-semibold border border-blue-600 rounded-md hover:bg-blue-50 transition"
        >
          Login
        </Link>
        <Link
          to={"/signup"}
          className="px-5 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 shadow-lg transition"
        >
          Sign Up
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
