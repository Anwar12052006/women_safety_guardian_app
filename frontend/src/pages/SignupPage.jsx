

// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import Navbar from "../components/layout/Navbar";
// import signupIllustration from "../assets/main-section.jpg";
// import LocationPicker from "../components/location/LocationPicker";

// const SignupPage = () => {

//   const navigate = useNavigate();

//   /**
//    * ============================
//    * STATE
//    * ============================
//    */

//   const [role, setRole] = useState("user");

//   // location from LocationPicker
//   const [location, setLocation] = useState(null);

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     password: "",
//     badgeId: "",
//   });

//   const [loading, setLoading] = useState(false);


//   /**
//    * ============================
//    * HANDLE INPUT CHANGE
//    * ============================
//    */

//   const handleChange = (e) => {

//     const { placeholder, value } = e.target;

//     if (placeholder === "Full Name")
//       setFormData(prev => ({ ...prev, name: value }));

//     else if (placeholder === "Email Address")
//       setFormData(prev => ({ ...prev, email: value }));

//     else if (placeholder === "Phone Number")
//       setFormData(prev => ({ ...prev, phone: value }));

//     else if (placeholder === "Create Password")
//       setFormData(prev => ({ ...prev, password: value }));

//     else if (placeholder === "Police ID / Badge Number")
//       setFormData(prev => ({ ...prev, badgeId: value }));

//   };


//   /**
//    * ============================
//    * HANDLE LOCATION SELECT
//    * ============================
//    */

//   const handleLocationSelect = (loc) => {

//     console.log("Selected location:", loc);

//     setLocation(loc);

//   };


//   /**
//    * ============================
//    * SIGNUP SUBMIT
//    * ============================
//    */

//   const handleSignup = async (e) => {

//     e.preventDefault();

//     if (!formData.name || !formData.email || !formData.password) {

//       alert("Please fill required fields");

//       return;

//     }

//     if (!location) {

//       alert("Please select location");

//       return;

//     }

//     try {

//       setLoading(true);

//       const res = await fetch(
//         "https://new-women-safety-app.onrender.com/api/auth/register",
//         {
//           method: "POST",

//           headers: {
//             "Content-Type": "application/json",
//           },

//           body: JSON.stringify({

//             name: formData.name,

//             email: formData.email,

//             phone: formData.phone,

//             password: formData.password,

//             role,

//             // GeoJSON format (MongoDB required)
//             location: {
//               type: "Point",
//               coordinates: [
//                 location.lng,
//                 location.lat,
//               ],
//             },

//             badgeId:
//               role === "police"
//                 ? formData.badgeId
//                 : undefined,

//           }),

//         }
//       );

//       const data = await res.json();

//       if (data.success) {

//         alert("Account created successfully");

//         navigate("/login");

//       } else {

//         alert(data.message || "Signup failed");

//       }

//     } catch (error) {

//       console.error("Signup error:", error);

//       alert("Server error");

//     } finally {

//       setLoading(false);

//     }

//   };


//   /**
//    * ============================
//    * UI
//    * ============================
//    */

//   return (

//     <>
//       <Navbar />

//       <main className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-indigo-900 via-purple-800 to-indigo-700 flex items-center justify-center px-6">

//         <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">

//           {/* LEFT */}
//           <div className="hidden md:flex flex-col justify-center items-center bg-gradient-to-br from-indigo-100 to-purple-100 px-10">

//             <div className="backdrop-blur-lg bg-white/70 rounded-3xl p-8 shadow-xl">

//               <img
//                 src={signupIllustration}
//                 alt="Women Safety"
//                 className="w-72 mx-auto opacity-90 scale-95"
//               />

//             </div>

//             <h2 className="mt-8 text-2xl font-bold text-indigo-900 text-center">
//               Safety Starts With Awareness
//             </h2>

//             <p className="mt-3 text-sm text-gray-600 text-center max-w-sm">
//               A trusted platform built to protect women and children through
//               technology, community support, and rapid emergency response.
//             </p>

//             <ul className="mt-6 space-y-2 text-sm text-gray-700">
//               <li>✔ Real-time SOS alerts</li>
//               <li>✔ Family & police connectivity</li>
//               <li>✔ Verified authority access</li>
//             </ul>

//           </div>


//           {/* RIGHT FORM */}
//           <div className="p-6 flex flex-col justify-center">

//             <h1 className="text-3xl font-extrabold text-indigo-900">
//               Create Your Account
//             </h1>

//             <p className="text-gray-500 mt-1 text-sm">
//               Join the Women Safety Platform
//             </p>


//             <form
//               onSubmit={handleSignup}
//               className="mt-4 space-y-6 text-sm"
//             >

//               {/* PERSONAL INFO */}
//               <div className="space-y-3">

//                 <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
//                   Personal Information
//                 </p>

//                 <input
//                   placeholder="Full Name"
//                   className="input"
//                   onChange={handleChange}
//                 />

//                 <input
//                   type="email"
//                   placeholder="Email Address"
//                   className="input"
//                   onChange={handleChange}
//                 />

//                 <input
//                   type="tel"
//                   placeholder="Phone Number"
//                   className="input"
//                   onChange={handleChange}
//                 />

//               </div>


//               {/* ROLE & LOCATION */}
//               <div className="space-y-3">

//                 <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
//                   Role & Location
//                 </p>

//                 <select
//                   value={role}
//                   onChange={(e) =>
//                     setRole(e.target.value)
//                   }
//                   className="input"
//                 >
//                   <option value="user">
//                     User (Woman)
//                   </option>

//                   <option value="family">
//                     Family / Guardian
//                   </option>

//                   <option value="police">
//                     Police / Authority
//                   </option>
//                 </select>


//                 {/* LOCATION PICKER */}
//                 <LocationPicker
//                   onLocationSelect={
//                     handleLocationSelect
//                   }
//                 />


//                 {/* POLICE BADGE */}
//                 {role === "police" && (

//                   <input
//                     placeholder="Police ID / Badge Number"
//                     className="input"
//                     onChange={handleChange}
//                   />

//                 )}

//               </div>


//               {/* PASSWORD */}
//               <div className="space-y-2">

//                 <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
//                   Security
//                 </p>

//                 <input
//                   type="password"
//                   placeholder="Create Password"
//                   className="input"
//                   onChange={handleChange}
//                 />

//               </div>


//               {/* BUTTON */}
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="
//                   w-full mt-2 py-3 rounded-xl font-semibold text-indigo-900
//                   bg-gradient-to-r from-yellow-400 to-yellow-300
//                   hover:shadow-xl hover:-translate-y-0.5
//                   transition-all
//                 "
//               >

//                 {loading
//                   ? "Creating..."
//                   : "Create Account"}

//               </button>

//             </form>


//             <p className="text-center text-xs text-gray-600 mt-2">

//               Already have an account?{" "}

//               <Link
//                 to="/login"
//                 className="text-indigo-700 font-semibold"
//               >
//                 Login
//               </Link>

//             </p>

//           </div>

//         </div>

//       </main>


//       {/* STYLE (UNCHANGED) */}
//       <style>
//         {`
//           .input {
//             width: 100%;
//             background: #f9fafb;
//             border: 1px solid #e5e7eb;
//             border-radius: 0.75rem;
//             padding: 0.7rem 1rem;
//             transition: all 0.2s ease;
//           }

//           .input:focus {
//             background: #ffffff;
//             border-color: #6366f1;
//             box-shadow: 0 0 0 3px rgba(99,102,241,0.2);
//             outline: none;
//           }
//         `}
//       </style>

//     </>

//   );

// };

// export default SignupPage;





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