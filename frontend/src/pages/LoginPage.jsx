import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import loginIllustration from "../assets/main-section.jpg";
import { useState } from "react";

const LoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Email and password are required");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("https://new-women-safety-app.onrender.com/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Login failed");
        return;
      }

      const user = data.user;


      // localStorage.setItem("token", data.token);
      // localStorage.setItem("user", JSON.stringify(data.user));

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("userId", user._id);

      // If normal user
      if (user.role === "user") {
        localStorage.setItem("familyId", user._id);
      }

      // If family
      if (user.role === "family") {
        localStorage.setItem("familyId", user.owner);
      }

      // navigate("/dashboard");
      if (user.role === "family") {
        navigate("/family-dashboard");
      }
      else if (user.role === "user") {
        navigate("/dashboard");
      }
      else if (user.role === "police") {
        navigate("/police-dashboard");
      }
      else if (user.role === "admin") {
        navigate("/admin-dashboard");
      }

    } catch (error) {
      console.error(error);
      alert("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Navbar />

      <main className="min-h-[calc(100vh-64px)] bg-slate-950 flex items-center justify-center px-6">
        <div className="w-full max-w-6xl bg-[#111827] border border-gray-800 rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">

          {/* LEFT : BRAND / TRUST */}
          <div className="hidden md:flex flex-col justify-center items-center bg-slate-900/50 border-r border-gray-800 px-12">

            <div className="bg-[#111827] border border-gray-800 rounded-3xl p-6 shadow-xl hover:shadow-indigo-500/10 hover:border-indigo-500/30 transition-all duration-300">
              <img
                src={loginIllustration}
                alt="Women Safety"
                className="w-72 object-contain rounded-2xl opacity-90"
              />
            </div>

            <h2 className="mt-8 text-2xl font-bold text-white text-center">
              Welcome Back
            </h2>

            <p className="mt-3 text-sm text-gray-400 text-center max-w-sm">
              Continue protecting yourself and your loved ones using real-time
              safety tools and trusted emergency support.
            </p>

            <ul className="mt-6 space-y-3 text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <span className="text-indigo-500 font-bold">✔</span> Instant SOS alerts
              </li>
              <li className="flex items-center gap-2">
                <span className="text-indigo-500 font-bold">✔</span> Family & police connectivity
              </li>
              <li className="flex items-center gap-2">
                <span className="text-indigo-500 font-bold">✔</span> Secure & verified access
              </li>
            </ul>
          </div>

          {/* RIGHT : LOGIN FORM */}
          <div className="flex flex-col justify-center px-10 py-12">

            <h1 className="text-3xl font-extrabold text-white">
              Login to your account
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              Stay connected. Stay safe.
            </p>

            <form className="mt-8 space-y-5" onSubmit={handleLogin}>

              {/* Email */}
              <div>
                <label className="text-xs font-medium text-gray-400">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="input text-white placeholder-gray-600"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label className="text-xs font-medium text-gray-400">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="input text-white placeholder-gray-600"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {/* Options */}
              <div className="flex items-center justify-between text-xs text-gray-400">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="accent-indigo-500 bg-slate-900 border-gray-700 rounded"
                  />
                  Remember me
                </label>

                <Link
                  to="/forgot-password"
                  className="text-indigo-400 font-semibold hover:text-indigo-300 hover:underline transition-colors"
                >
                  Forgot password?
                </Link>
              </div>

              {/* CTA */}
              <button
                type="submit"
                disabled={loading}
                className="
                  w-full mt-4 py-3 rounded-xl font-semibold
                  text-white bg-indigo-600 shadow-lg shadow-indigo-500/20
                  hover:shadow-indigo-500/40 hover:-translate-y-0.5
                  transition-all duration-300
                "
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            <p className="text-center text-xs text-gray-400 mt-6">
              Don’t have an account?{" "}
              <Link to="/signup" className="text-indigo-400 font-semibold hover:text-indigo-300 transition-colors">
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </main>

      {/* INPUT UTILITY */}
      <style>
        {`
          .input {
            width: 100%;
            margin-top: 0.35rem;
            background: rgba(15, 23, 42, 0.5); /* slate-900/50 */
            border: 1px solid #1f2937; /* gray-800 */
            border-radius: 0.75rem;
            padding: 0.7rem 1rem;
            font-size: 0.875rem;
            transition: all 0.2s ease;
          }
          .input:focus {
            background: rgba(15, 23, 42, 0.8);
            border-color: #6366f1; /* indigo-500 */
            box-shadow: 0 0 0 1px rgba(99,102,241,1);
            outline: none;
          }
        `}
      </style>
    </>
  );
};

export default LoginPage;
