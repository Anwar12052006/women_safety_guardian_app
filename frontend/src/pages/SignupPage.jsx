

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import signupIllustration from "../assets/main-section.jpg";
import LocationPicker from "../components/location/LocationPicker";

const SignupPage = () => {

  const navigate = useNavigate();

  const [location, setLocation] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSignup = async (e) => {

    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      alert("Please fill required fields");
      return;
    }

    if (!location) {
      alert("Please select location");
      return;
    }

    try {

      setLoading(true);

      const res = await fetch(
        "https://new-women-safety-app.onrender.com/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({

            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            password: formData.password,

            // 👇 FORCE USER ROLE
            role: "user",

            location: {
              type: "Point",
              coordinates: [
                location.lng,
                location.lat,
              ],
            },

          }),
        }
      );

      const data = await res.json();

      if (data.success) {
        alert("Account created successfully");
        navigate("/login");
      } else {
        alert(data.message || "Signup failed");
      }

    } catch (error) {
      console.error("Signup error:", error);
      alert("Server error");
    } finally {
      setLoading(false);
    }

  };

  return (
    <>
      <Navbar />

      <main className="min-h-[calc(100vh-64px)] bg-slate-950 flex items-center justify-center px-6">

        <div className="w-full max-w-6xl bg-[#111827] border border-gray-800 rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2 mt-4 mb-4">

          {/* LEFT */}
          <div className="hidden md:flex flex-col justify-center items-center bg-slate-900/50 border-r border-gray-800 px-10 py-10">

            <div className="bg-[#111827] border border-gray-800 rounded-3xl p-8 shadow-xl hover:shadow-indigo-500/10 hover:border-indigo-500/30 transition-all duration-300">
              <img
                src={signupIllustration}
                alt="Women Safety"
                className="w-72 mx-auto rounded-2xl opacity-90"
              />
            </div>

            <h2 className="mt-8 text-2xl font-bold text-white text-center">
              Safety Starts With Awareness
            </h2>

            <p className="mt-3 text-sm text-gray-400 text-center max-w-sm">
              Join our platform to stay safe and connected during emergencies.
            </p>

          </div>

          {/* RIGHT FORM */}
          <div className="p-8 flex flex-col justify-center">

            <h1 className="text-3xl font-extrabold text-white">
              Create Your Account
            </h1>

            <form onSubmit={handleSignup} className="mt-6 space-y-4">

              <input
                name="name"
                placeholder="Full Name"
                className="input text-white placeholder-gray-600"
                onChange={handleChange}
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                className="input text-white placeholder-gray-600"
                onChange={handleChange}
              />

              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                className="input text-white placeholder-gray-600"
                onChange={handleChange}
              />

              <div className="rounded-xl border border-gray-800 overflow-hidden">
                <LocationPicker
                  onLocationSelect={setLocation}
                />
              </div>

              <input
                type="password"
                name="password"
                placeholder="Create Password"
                className="input text-white placeholder-gray-600"
                onChange={handleChange}
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl font-semibold text-white bg-indigo-600 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 hover:-translate-y-0.5 transition-all duration-300 mt-6"
              >
                {loading ? "Creating..." : "Create Account"}
              </button>

            </form>

            <p className="text-center text-sm text-gray-400 mt-4">
              Already have an account?{" "}
              <Link to="/login" className="text-indigo-400 font-semibold hover:text-indigo-300 transition-colors">
                Login
              </Link>
            </p>

          </div>

        </div>
      </main>

      <style>
        {`
          .input {
            width: 100%;
            background: rgba(15, 23, 42, 0.5); /* slate-900/50 */
            border: 1px solid #1f2937; /* gray-800 */
            border-radius: 0.75rem;
            padding: 0.7rem 1rem;
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

export default SignupPage;