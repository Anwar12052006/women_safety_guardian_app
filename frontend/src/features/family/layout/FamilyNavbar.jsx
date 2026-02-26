export default function FamilyNavbar() {
  return (
    <header className="bg-[#111827] border-b border-[#1F2937] px-6 py-4 flex justify-between items-center">
      <h1 className="text-lg font-semibold">Family Dashboard</h1>
      <div className="flex items-center gap-4">
        <span className="text-green-400">User: SAFE</span>
        <button className="bg-indigo-600 px-4 py-2 rounded-lg">
          Logout
        </button>
      </div>
    </header>
  );
}