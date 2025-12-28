import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import api from "@/lib/api";

const Signup = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("CITIZEN");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    primarySkill: "Medical Assistance",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setIsRegistering(true);
    setError("");

    try {
      // 1. Create User in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const firebaseUser = userCredential.user;

      // 2. Prepare payload for Spring Boot
      const userProfile = {
        uid: firebaseUser.uid,
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        role: role.toUpperCase(),
        primarySkill: role === "VOLUNTEER" ? formData.primarySkill : null,
        status: role === "VOLUNTEER" ? "OFF_DUTY" : null,
      };

      // 3. Save Profile to Backend (Interceptor handles the Bearer Token)
      await api.post("/auth/profile", userProfile);

      // 4. Force Logout after signup
      // Why? To ensure the next login gets a fresh token with the new 'role' claim
      await signOut(auth);

      setTimeout(() => {
        setIsRegistering(false);
        navigate("/login", {
          state: { message: "Account created! Please log in." },
        });
      }, 500);
    } catch (err) {
      setIsRegistering(false);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

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

        {error && (
          <p className="bg-red-50 text-red-500 p-3 rounded-lg mb-4 text-center">
            {error}
          </p>
        )}

        {/* Role Toggle Switch */}
        <div className="flex bg-gray-100 p-1 rounded-xl mb-8">
          <button
            type="button"
            onClick={() => setRole("CITIZEN")}
            className={`flex-1 py-2 text-sm font-bold rounded-lg transition ${
              role === "CITIZEN"
                ? "bg-white shadow text-blue-600"
                : "text-gray-500"
            }`}
          >
            I Need Help
          </button>
          <button
            type="button"
            onClick={() => setRole("VOLUNTEER")}
            className={`flex-1 py-2 text-sm font-bold rounded-lg transition ${
              role === "VOLUNTEER"
                ? "bg-white shadow text-blue-600"
                : "text-gray-500"
            }`}
          >
            I Want to Help
          </button>
        </div>

        <form className="grid grid-cols-1 gap-5" onSubmit={handleSignup}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>
              <input
                name="firstName"
                required
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Name
              </label>
              <input
                name="lastName"
                required
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              name="email"
              type="email"
              required
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {role === "VOLUNTEER" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Primary Skill
              </label>
              <select
                name="primarySkill"
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
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
              name="password"
              type="password"
              required
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 text-white font-bold rounded-lg shadow-lg transition transform mt-4 ${
              loading
                ? "opacity-50 cursor-not-allowed"
                : "hover:-translate-y-0.5"
            } ${
              role === "VOLUNTEER"
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-emerald-500 hover:bg-emerald-600"
            }`}
          >
            {loading
              ? "Registering..."
              : `Register as ${role === "VOLUNTEER" ? "Volunteer" : "Citizen"}`}
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
