import FamilySidebar from "./FamilySidebar";
import FamilyNavbar from "./FamilyNavbar";

export default function FamilyLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-[#0F172A]">
      <FamilySidebar />
      <div className="flex-1 flex flex-col">
        <FamilyNavbar />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}