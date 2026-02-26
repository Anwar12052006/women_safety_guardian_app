
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import logo from "../../assets/logo.png";
// import NotificationBell from "../common/NotificationBell";


// const Navbar = () => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const [user, setUser] = useState(null);
//   const [menuOpen, setMenuOpen] = useState(false);

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     navigate("/login");
//     setMenuOpen(false);
//   };

//   const isActive = (path) => location.pathname === path;

//   const linkClass = (path) =>
//     `relative font-semibold transition px-2 py-2
//     ${
//       isActive(path)
//         ? "text-yellow-300"
//         : "text-white hover:text-yellow-300"
//     }`;

//   const underline = (path) =>
//     isActive(path)
//       ? "absolute left-0 -bottom-1 w-full h-[3px] bg-yellow-400 rounded-full"
//       : "";

//   return (
//     <nav className="bg-gradient-to-r from-indigo-900 via-purple-800 to-indigo-700 shadow-lg sticky top-0 z-50">

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">

//         {/* Logo */}
//         <Link to="/" className="flex items-center gap-3">
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
//         <div className="hidden md:flex items-center gap-6">

//           <Link to="/" className={linkClass("/")}>
//             Home
//             <span className={underline("/")}></span>
//           </Link>

//           <Link to="/report" className={linkClass("/report")}>
//             Report
//             <span className={underline("/report")}></span>
//           </Link>

//           {!user ? (
//             <>
//               <Link to="/login" className={linkClass("/login")}>
//                 Login
//                 <span className={underline("/login")}></span>
//               </Link>

//               <Link to="/signup" className={linkClass("/signup")}>
//                 Sign Up
//                 <span className={underline("/signup")}></span>
//               </Link>
//               {/* <Link to="/family-signup" className={linkClass("/signup")}>
//                 Family Access
//                 <span className={underline("/signup")}></span>
//               </Link> */}
//             </>
//           ) : (
//             <>
//               <Link to="/dashboard" className={linkClass("/dashboard")}>
//                 Dashboard
//                 <span className={underline("/dashboard")}></span>
//               </Link>

//                   <NotificationBell userId={user?._id || user?.id} />


//               <button
//                 onClick={handleLogout}
//                 className="text-white font-semibold hover:text-red-400 transition"
//               >
//                 Logout
//               </button>
//             </>
//           )}
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
//             to="/"
//             className={linkClass("/")}
//             onClick={() => setMenuOpen(false)}
//           >
//             Home
//           </Link>

//           <Link
//             to="/report"
//             className={linkClass("/report")}
//             onClick={() => setMenuOpen(false)}
//           >
//             Report
//           </Link>

//           {!user ? (
//             <>
//               <Link
//                 to="/login"
//                 className={linkClass("/login")}
//                 onClick={() => setMenuOpen(false)}
//               >
//                 Login
//               </Link>

//               <Link
//                 to="/signup"
//                 className={linkClass("/signup")}
//                 onClick={() => setMenuOpen(false)}
//               >
//                 Sign Up
//               </Link>
//             </>
//           ) : (
//             <>
//               <Link
//                 to="/dashboard"
//                 className={linkClass("/dashboard")}
//                 onClick={() => setMenuOpen(false)}
//               >
//                 Dashboard
//               </Link>

//               <button
//                 onClick={handleLogout}
//                 className="text-white font-semibold hover:text-red-400 text-left"
//               >
//                 Logout
//               </button>
//             </>
//           )}
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;







// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { useEffect, useState, useCallback } from "react";
// import logo from "../../assets/logo.png";
// import NotificationBell from "../common/NotificationBell";

// const Navbar = () => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const [user, setUser] = useState(null);
//   const [menuOpen, setMenuOpen] = useState(false);

//   // ================= LOAD USER =================
//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//   }, []);

//   // ================= LOGOUT =================
//   const handleLogout = useCallback(() => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     navigate("/login");
//     setMenuOpen(false);
//   }, [navigate]);

//   // ================= ACTIVE CHECK =================
//   const isActive = useCallback(
//     (path) => location.pathname === path,
//     [location.pathname]
//   );

//   const linkClass = useCallback(
//     (path) =>
//       `relative font-semibold transition px-2 py-2 ${
//         isActive(path)
//           ? "text-yellow-300"
//           : "text-white hover:text-yellow-300"
//       }`,
//     [isActive]
//   );

//   const underline = useCallback(
//     (path) =>
//       isActive(path)
//         ? "absolute left-0 -bottom-1 w-full h-[3px] bg-yellow-400 rounded-full"
//         : "",
//     [isActive]
//   );

//   return (
//     <nav className="bg-gradient-to-r from-indigo-900 via-purple-800 to-indigo-700 shadow-lg sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">

//         {/* ================= LOGO ================= */}
//         <Link to="/" className="flex items-center gap-3">
//           <img
//             src={logo}
//             alt="Women Safety App Logo"
//             className="h-9 sm:h-10 w-auto rotate-90"
//           />
//           <span className="text-white text-lg sm:text-xl font-bold tracking-wide">
//             Women Safety App
//           </span>
//         </Link>

//         {/* ================= DESKTOP MENU ================= */}
//         <div className="hidden md:flex items-center gap-6">

//           <Link to="/" className={linkClass("/")}>
//             Home
//             <span className={underline("/")}></span>
//           </Link>

//           <Link to="/report" className={linkClass("/report")}>
//             Report
//             <span className={underline("/report")}></span>
//           </Link>

//           {!user ? (
//             <>
//               <Link to="/login" className={linkClass("/login")}>
//                 Login
//                 <span className={underline("/login")}></span>
//               </Link>

//               <Link to="/signup" className={linkClass("/signup")}>
//                 Sign Up
//                 <span className={underline("/signup")}></span>
//               </Link>
//             </>
//           ) : (
//             <>
//               <Link to="/dashboard" className={linkClass("/dashboard")}>
//                 Dashboard
//                 <span className={underline("/dashboard")}></span>
//               </Link>

//               <NotificationBell userId={user?._id || user?.id} />

//               <button
//                 onClick={handleLogout}
//                 className="text-white font-semibold hover:text-red-400 transition"
//               >
//                 Logout
//               </button>
//             </>
//           )}
//         </div>

//         {/* ================= MOBILE MENU BUTTON ================= */}
//         <button
//           aria-label="Toggle Menu"
//           className="md:hidden text-white text-2xl"
//           onClick={() => setMenuOpen(!menuOpen)}
//         >
//           ☰
//         </button>
//       </div>

//       {/* ================= MOBILE MENU ================= */}
//       {menuOpen && (
//         <div className="md:hidden bg-indigo-900 px-6 pb-4 flex flex-col gap-4">

//           <Link
//             to="/"
//             className={linkClass("/")}
//             onClick={() => setMenuOpen(false)}
//           >
//             Home
//           </Link>

//           <Link
//             to="/report"
//             className={linkClass("/report")}
//             onClick={() => setMenuOpen(false)}
//           >
//             Report
//           </Link>

//           {!user ? (
//             <>
//               <Link
//                 to="/login"
//                 className={linkClass("/login")}
//                 onClick={() => setMenuOpen(false)}
//               >
//                 Login
//               </Link>

//               <Link
//                 to="/signup"
//                 className={linkClass("/signup")}
//                 onClick={() => setMenuOpen(false)}
//               >
//                 Sign Up
//               </Link>
//             </>
//           ) : (
//             <>
//               <Link
//                 to="/dashboard"
//                 className={linkClass("/dashboard")}
//                 onClick={() => setMenuOpen(false)}
//               >
//                 Dashboard
//               </Link>

//               <button
//                 onClick={handleLogout}
//                 className="text-white font-semibold hover:text-red-400 text-left"
//               >
//                 Logout
//               </button>
//             </>
//           )}
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;





import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import logo from "../../assets/logo.png";
import NotificationBell from "../common/NotificationBell";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  // ================= LOAD USER =================
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // ================= LOGOUT =================
  const handleLogout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
    setMenuOpen(false);
  }, [navigate]);

  // ================= ACTIVE CHECK =================
  const isActive = useCallback(
    (path) => location.pathname === path,
    [location.pathname]
  );

  const linkClass = useCallback(
    (path) =>
      `relative font-medium transition-all duration-200 px-3 py-2 rounded-lg ${isActive(path)
        ? "text-emerald-400 bg-slate-800"
        : "text-slate-300 hover:text-white hover:bg-slate-800"
      }`,
    [isActive]
  );

  return (
    <nav className="bg-slate-950 border-b border-slate-800 sticky top-0 z-50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">

        {/* ================= LOGO ================= */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src={logo}
            alt="Women Safety App Logo"
            className="h-9 sm:h-10 w-auto rotate-90"
          />
          <span className="text-slate-100 text-lg sm:text-xl font-semibold tracking-tight">
            Women Safety App
          </span>
        </Link>

        {/* ================= DESKTOP MENU ================= */}
        <div className="hidden md:flex items-center gap-4">

          <Link to="/" className={linkClass("/")}>
            Home
          </Link>

          <Link to="/report" className={linkClass("/report")}>
            Report
          </Link>

          {!user ? (
            <>
              <Link to="/login" className={linkClass("/login")}>
                Login
              </Link>

              <Link to="/signup" className={linkClass("/signup")}>
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <Link
                to={user.role === 'admin' ? '/admin-dashboard' : user.role === 'police' ? '/police-dashboard' : user.role === 'family' ? '/family-dashboard' : '/dashboard'}
                className={linkClass(user.role === 'admin' ? '/admin-dashboard' : user.role === 'police' ? '/police-dashboard' : user.role === 'family' ? '/family-dashboard' : '/dashboard')}
              >
                Dashboard
              </Link>

              <NotificationBell userId={user?._id || user?.id} />

              <button
                onClick={handleLogout}
                className="text-slate-300 hover:text-red-400 transition font-medium px-3 py-2 rounded-lg hover:bg-slate-800"
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* ================= MOBILE MENU BUTTON ================= */}
        <button
          aria-label="Toggle Menu"
          className="md:hidden text-slate-200 text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* ================= MOBILE MENU ================= */}
      {menuOpen && (
        <div className="md:hidden bg-slate-950 border-t border-slate-800 px-6 pb-4 flex flex-col gap-3">

          <Link
            to="/"
            className={linkClass("/")}
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>

          <Link
            to="/report"
            className={linkClass("/report")}
            onClick={() => setMenuOpen(false)}
          >
            Report
          </Link>

          {!user ? (
            <>
              <Link
                to="/login"
                className={linkClass("/login")}
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>

              <Link
                to="/signup"
                className={linkClass("/signup")}
                onClick={() => setMenuOpen(false)}
              >
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <Link
                to={user.role === 'admin' ? '/admin-dashboard' : user.role === 'police' ? '/police-dashboard' : user.role === 'family' ? '/family-dashboard' : '/dashboard'}
                className={linkClass(user.role === 'admin' ? '/admin-dashboard' : user.role === 'police' ? '/police-dashboard' : user.role === 'family' ? '/family-dashboard' : '/dashboard')}
                onClick={() => setMenuOpen(false)}
              >
                Dashboard
              </Link>

              <button
                onClick={handleLogout}
                className="text-slate-300 hover:text-red-400 font-medium text-left px-3 py-2 rounded-lg hover:bg-slate-800"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;