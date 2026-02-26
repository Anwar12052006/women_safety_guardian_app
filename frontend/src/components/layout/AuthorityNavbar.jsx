// import { Link, useNavigate } from "react-router-dom";
// import { useState, useEffect } from "react";
// import logo from "../../assets/logo.png";

// const AuthorityNavbar = () => {
//   const navigate = useNavigate();
//   const [menuOpen, setMenuOpen] = useState(false);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     navigate("/login");
//   };

//   return (
//     <nav className="bg-gradient-to-r from-indigo-900 via-purple-800 to-indigo-700 shadow-lg sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">

//         {/* Logo */}
//         <Link to="/police-dashboard" className="flex items-center gap-3">
//           <img
//             src={logo}
//             alt="Women Safety App Logo"
//             className="h-9 sm:h-10 w-auto rotate-90"
//           />
//           <span className="text-white text-lg sm:text-xl font-bold tracking-wide">
//             Women Safety App
//           </span>
//         </Link>

//         {/* Desktop Menu */}
//         <div className="hidden md:flex items-center gap-8">

//           <Link
//             to="/police-dashboard"
//             className="text-white font-semibold hover:text-yellow-300 transition"
//           >
//             Dashboard
//           </Link>

//           <button
//             onClick={handleLogout}
//             className="text-white font-semibold hover:text-red-400 transition"
//           >
//             Logout
//           </button>
//         </div>

//         {/* Mobile Menu Button */}
//         <button
//           className="md:hidden text-white"
//           onClick={() => setMenuOpen(!menuOpen)}
//         >
//           ☰
//         </button>

//       </div>

//       {/* Mobile Menu */}
//       {menuOpen && (
//         <div className="md:hidden bg-indigo-900 px-6 pb-4 flex flex-col gap-4">

//           <Link
//             to="/police-dashboard"
//             className="text-white font-semibold"
//             onClick={() => setMenuOpen(false)}
//           >
//             Dashboard
//           </Link>

//           <button
//             onClick={handleLogout}
//             className="text-white font-semibold text-left"
//           >
//             Logout
//           </button>

//         </div>
//       )}
//     </nav>
//   );
// };

// export default AuthorityNavbar;


import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from "../../assets/logo.png";

const AuthorityNavbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-900 via-purple-800 to-indigo-700 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">

        <Link to="/police-dashboard" className="flex items-center gap-3">
          <img src={logo} alt="Women Safety App Logo" className="h-9 sm:h-10 w-auto rotate-90"/>
          <span className="text-white text-lg sm:text-xl font-bold tracking-wide">
            Women Safety App
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link to="/police-dashboard" className="text-white font-semibold hover:text-yellow-300">
            Dashboard
          </Link>

          {user?.role === "admin" && (
            <Link
              to="/manage-patrols"
              className="text-white font-semibold hover:text-green-300"
            >
              Manage Patrol Officers
            </Link>
          )}

          <button
            onClick={handleLogout}
            className="text-white font-semibold hover:text-red-400"
          >
            Logout
          </button>
        </div>

        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>
    </nav>
  );
};

export default AuthorityNavbar;