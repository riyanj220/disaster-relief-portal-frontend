import { useState } from "react";
import { Link } from "react-router";

const Signup = () => {
  const [role, setRole] = useState("citizen"); // 'citizen' or 'volunteer'

  return (
    <div className="min-h-screen py-12 flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-slate-900">
            Join the Mission
          </h2>
          <p className="text-gray-500 mt-2">
            Choose your role and start making an impact
          </p>
        </div>

        {/* Role Toggle Switch */}
        <div className="flex bg-gray-100 p-1 rounded-xl mb-8">
          <button
            onClick={() => setRole("citizen")}
            className={`flex-1 py-2 text-sm font-bold rounded-lg transition ${
              role === "citizen"
                ? "bg-white shadow text-blue-600"
                : "text-gray-500"
            }`}
          >
            I Need Help
          </button>
          <button
            onClick={() => setRole("volunteer")}
            className={`flex-1 py-2 text-sm font-bold rounded-lg transition ${
              role === "volunteer"
                ? "bg-white shadow text-blue-600"
                : "text-gray-500"
            }`}
          >
            I Want to Help
          </button>
        </div>

        <form className="grid grid-cols-1 gap-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Conditional Volunteer Field */}
          {role === "volunteer" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Primary Skill
              </label>
              <select className="w-full px-4 py-2 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                <option>Medical Assistance</option>
                <option>Rescue Ops</option>
                <option>Logistics/Food</option>
                <option>Technology/Comm</option>
              </select>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            className={`w-full py-3 text-white font-bold rounded-lg shadow-lg transition transform hover:-translate-y-0.5 mt-4 ${
              role === "volunteer"
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-emerald-500 hover:bg-emerald-600"
            }`}
          >
            Register as {role === "volunteer" ? "Volunteer" : "Citizen"}
          </button>
        </form>

        <p className="text-center mt-6 text-gray-600 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-bold hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
