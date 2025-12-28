import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import useAuthStore from "../store/useAuthStore";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  // Get profile and loading state from Zustand
  const { profile, user } = useAuthStore();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      // 1. Sign in with Firebase.
      // This triggers onAuthStateChanged in your store's initialize()
      await signInWithEmailAndPassword(auth, email, password);

      // We don't call navigate here yet.
      // We wait for the profile to be fetched by the store's listener.
    } catch (err) {
      setError("Invalid email or password. Please try again.");
      setIsSubmitting(false);
    }
  };

  // 2. Watch for profile changes and redirect automatically
  useEffect(() => {
    if (user && profile) {
      const role = profile.role?.toUpperCase();

      if (role === "ADMIN") {
        navigate("/admin");
      } else if (role === "VOLUNTEER") {
        navigate("/volunteer");
      } else if (role === "CITIZEN") {
        navigate("/citizen");
      }
    }
  }, [user, profile, navigate]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-slate-900">Welcome Back</h2>
          <p className="text-gray-500 mt-2">
            Log in to manage your relief efforts
          </p>
        </div>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center bg-red-50 p-2 rounded">
            {error}
          </p>
        )}

        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 outline-none transition"
              placeholder="name@email.com"
              required
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 outline-none transition"
              placeholder="••••••••"
              required
              disabled={isSubmitting}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-lg transition transform hover:-translate-y-0.5 ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <p className="text-center mt-8 text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-600 font-bold hover:underline"
          >
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
