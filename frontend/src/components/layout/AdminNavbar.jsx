import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from "../../assets/logo.png";

const AdminNavbar = () => {
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
        <nav className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-lg sticky top-0 z-50 border-b border-gray-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">

                <Link to="/admin-dashboard" className="flex items-center gap-3">
                    <img src={logo} alt="Women Safety App Logo" className="h-9 sm:h-10 w-auto rotate-90 brightness-200" />
                    <span className="text-white text-lg sm:text-extrabold tracking-wide uppercase font-mono">
                        Admin Panel
                    </span>
                </Link>

                {/* Desktop */}
                <div className="hidden md:flex items-center gap-6">
                    <Link to="/admin-dashboard" className="text-gray-300 text-sm font-semibold hover:text-white transition">
                        Overview
                    </Link>
                    <Link to="/admin-users" className="text-gray-300 text-sm font-semibold hover:text-blue-400 transition">
                        Users
                    </Link>
                    <Link to="/admin-alerts" className="text-gray-300 text-sm font-semibold hover:text-red-400 transition">
                        SOS Alerts
                    </Link>
                    <Link to="/admin-incidents" className="text-gray-300 text-sm font-semibold hover:text-yellow-400 transition">
                        Incidents
                    </Link>

                    <div className="h-6 w-px bg-gray-600 mx-2"></div>

                    <button
                        onClick={handleLogout}
                        className="text-white text-sm font-bold bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition"
                    >
                        Logout ({user?.name || "Admin"})
                    </button>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden text-white text-2xl"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    ☰
                </button>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="md:hidden bg-gray-900 px-6 py-4 flex flex-col gap-4 border-t border-gray-800">
                    <Link to="/admin-dashboard" onClick={() => setMenuOpen(false)} className="text-white font-semibold">Overview</Link>
                    <Link to="/admin-users" onClick={() => setMenuOpen(false)} className="text-white font-semibold">Users</Link>
                    <Link to="/admin-alerts" onClick={() => setMenuOpen(false)} className="text-white font-semibold">SOS Alerts</Link>
                    <Link to="/admin-incidents" onClick={() => setMenuOpen(false)} className="text-white font-semibold">Incidents</Link>
                    <button onClick={handleLogout} className="text-red-400 font-bold text-left pt-4 border-t border-gray-800">
                        Logout
                    </button>
                </div>
            )}
        </nav>
    );
};

export default AdminNavbar;
