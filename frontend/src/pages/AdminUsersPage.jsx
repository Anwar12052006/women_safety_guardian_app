import React, { useEffect, useState } from "react";
import AdminNavbar from "../components/layout/AdminNavbar";
import { getAllUsers, toggleBlockUser } from "../services/adminService";

export default function AdminUsersPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const data = await getAllUsers();
            if (data.success) {
                setUsers(data.users);
            }
        } catch (error) {
            console.error("Failed to fetch users", error);
        } finally {
            setLoading(false);
        }
    };

    const handleBlockToggle = async (id, currentStatus) => {
        try {
            if (!window.confirm(`Are you sure you want to ${currentStatus ? 'Unblock' : 'Block'} this user?`)) return;

            const res = await toggleBlockUser(id);
            if (res.success) {
                // Update local state without hitting API again
                setUsers(users.map(u => u._id === id ? { ...u, isBlocked: !currentStatus } : u));
            }
        } catch (error) {
            console.error("Failed to block user", error);
            alert("Failed to modify user status.");
        }
    };

    const filteredUsers = users.filter((u) => {
        const term = search.toLowerCase();
        return (u.name?.toLowerCase() || "").includes(term) || (u.email?.toLowerCase() || "").includes(term) || (u.phone?.toLowerCase() || "").includes(term);
    });

    return (
        <>
            <AdminNavbar />
            <div className="min-h-screen bg-slate-950 text-white py-10 px-4 sm:px-6">
                <div className="max-w-7xl mx-auto space-y-6">

                    <div className="bg-[#111827] border border-gray-800 p-6 rounded-2xl shadow-xl flex flex-col sm:flex-row justify-between items-center gap-4">
                        <div>
                            <h1 className="text-2xl font-bold">User Management</h1>
                            <p className="text-gray-400 text-sm mt-1">Total Registered Users: {users.length}</p>
                        </div>

                        <input
                            type="text"
                            placeholder="Search Name, Email, Phone..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="bg-slate-900 border border-gray-700 text-white text-sm rounded-lg px-4 py-2 w-full sm:w-72 focus:outline-none focus:border-indigo-500 transition-colors"
                        />
                    </div>

                    <div className="bg-[#111827] border border-gray-800 rounded-2xl shadow-xl overflow-hidden">
                        {loading ? (
                            <div className="p-10 text-center text-gray-400">Loading user database...</div>
                        ) : (
                            <div className="overflow-x-auto w-full">
                                <table className="w-full text-left text-sm whitespace-nowrap">
                                    <thead className="bg-slate-900/80 text-gray-300 uppercase text-xs font-semibold tracking-wider">
                                        <tr>
                                            <th className="px-6 py-4">Name</th>
                                            <th className="px-6 py-4">Email / Phone</th>
                                            <th className="px-6 py-4">Role</th>
                                            <th className="px-6 py-4">Status</th>
                                            <th className="px-6 py-4 text-center">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-800 max-h-[600px] overflow-y-auto">
                                        {filteredUsers.map((user) => (
                                            <tr key={user._id} className="hover:bg-slate-900/50 transition-colors duration-200">
                                                <td className="px-6 py-4 font-medium text-gray-200">{user.name}</td>
                                                <td className="px-6 py-4 text-gray-400">
                                                    <div>{user.email}</div>
                                                    <div className="text-xs mt-1 text-gray-500">{user.phone}</div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wide
                            ${user.role === 'admin' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' :
                                                            user.role === 'police' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                                                                user.role === 'family' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                                                                    'bg-gray-700 text-gray-300 border border-gray-600'}`
                                                    }>
                                                        {user.role}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    {user.isBlocked ? (
                                                        <span className="text-red-500 font-bold flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-red-500"></span> Banned</span>
                                                    ) : (
                                                        <span className="text-green-500 font-semibold flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-green-500"></span> Active</span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    {user.role !== 'admin' && ( // Prevent blocking other admins
                                                        <button
                                                            onClick={() => handleBlockToggle(user._id, user.isBlocked)}
                                                            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all shadow-lg ${user.isBlocked
                                                                    ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-500/20'
                                                                    : 'bg-red-600 hover:bg-red-500 text-white shadow-red-500/20'
                                                                }`}
                                                        >
                                                            {user.isBlocked ? 'UNBLOCK' : 'BLOCK'}
                                                        </button>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                        {filteredUsers.length === 0 && (
                                            <tr>
                                                <td colSpan="5" className="px-6 py-8 text-center text-gray-500">No users found matching your search.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
