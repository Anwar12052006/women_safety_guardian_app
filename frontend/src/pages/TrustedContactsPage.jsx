// import React, { useEffect, useState } from "react";

// // import TrustedContactCard from "../components/TrustedContactCard";
// import TrustedContactCard from "../components/common/TrustedContactCard";

// import {
//   getContacts,
//   addContact,
//   deleteContact,
//   sendSOS,
// } from "../services/trustedContactService";

// export default function TrustedContactsPage() {

//   const [contacts, setContacts] = useState([]);

//   const [form, setForm] = useState({
//     name: "",
//     phone: "",
//     relation: "Father",
//     priority: "Primary",
//   });

//   useEffect(() => {
//     fetchContacts();
//   }, []);

//   const fetchContacts = async () => {
//     const res = await getContacts();
//     setContacts(res.data.data);
//   };

//   const handleAdd = async () => {
//     await addContact(form);

//     setForm({
//       name: "",
//       phone: "",
//       relation: "Father",
//       priority: "Primary",
//     });

//     fetchContacts();
//   };

//   const handleDelete = async (id) => {
//     await deleteContact(id);
//     fetchContacts();
//   };

//   const handleSOS = async () => {
//     await sendSOS();
//     alert("SOS sent to all contacts");
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-purple-600 to-purple-800 p-6">

//       <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-6">

//         <h1 className="text-2xl font-bold mb-6">Trusted Contacts</h1>

//         <div className="grid md:grid-cols-4 gap-4 mb-4">

//           <input
//             className="border p-2 rounded"
//             placeholder="Name"
//             value={form.name}
//             onChange={(e) =>
//               setForm({ ...form, name: e.target.value })
//             }
//           />

//           <input
//             className="border p-2 rounded"
//             placeholder="Phone"
//             value={form.phone}
//             onChange={(e) =>
//               setForm({ ...form, phone: e.target.value })
//             }
//           />

//           <select
//             className="border p-2 rounded"
//             value={form.relation}
//             onChange={(e) =>
//               setForm({ ...form, relation: e.target.value })
//             }
//           >
//             <option>Father</option>
//             <option>Mother</option>
//             <option>Brother</option>
//             <option>Police</option>
//           </select>

//           <button
//             onClick={handleAdd}
//             className="bg-purple-600 text-white rounded-lg"
//           >
//             Add Contact
//           </button>

//         </div>

//         <button
//           onClick={handleSOS}
//           className="bg-red-600 text-white px-6 py-2 rounded-lg mb-6"
//         >
//           Send SOS to All
//         </button>

//         <div className="grid md:grid-cols-3 gap-4">

//           {contacts.map((contact) => (
//             <TrustedContactCard
//               key={contact._id}
//               contact={contact}
//               onDelete={handleDelete}
//             />
//           ))}

//         </div>

//       </div>

//     </div>
//   );
// }






import React, { useEffect, useState, useCallback } from "react";
import TrustedContactCard from "../components/common/TrustedContactCard";

import {
  getContacts,
  addContact,
  deleteContact,
  sendSOS,
} from "../services/trustedContactService";

export default function TrustedContactsPage() {

  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sendingSOS, setSendingSOS] = useState(false);

  const [form, setForm] = useState({
    contactEmail: "",
    relation: "Father",
  });

  // ===============================
  // FETCH CONTACTS
  // ===============================
  const fetchContacts = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getContacts();
      setContacts(res.data.data || []);
    } catch (error) {
      console.error("Fetch contacts error:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  // ===============================
  // ADD CONTACT (INVITE BASED)
  // ===============================
  const handleAdd = async () => {
    if (!form.contactEmail) {
      alert("Please enter guardian email");
      return;
    }

    try {
      await addContact(form);

      setForm({
        contactEmail: "",
        relation: "Father",
      });

      fetchContacts();

      alert("Guardian invite sent");

    } catch (error) {
      console.error(error);
      alert("Failed to send invite");
    }
  };

  // ===============================
  // DELETE CONTACT
  // ===============================
  const handleDelete = async (id) => {
    try {
      await deleteContact(id);
      fetchContacts();
    } catch (error) {
      console.error(error);
      alert("Delete failed");
    }
  };

  // ===============================
  // SEND SOS
  // ===============================
  const handleSOS = async () => {
    try {
      setSendingSOS(true);
      await sendSOS();
      alert("SOS sent to all accepted guardians");
    } catch (error) {
      console.error(error);
      alert("SOS failed");
    } finally {
      setSendingSOS(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 p-6 sm:p-10">
      <div className="max-w-6xl mx-auto bg-slate-900/60 border border-slate-800 backdrop-blur-sm rounded-2xl shadow-xl p-6 sm:p-8">

        <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-8">
          Trusted Guardians
        </h1>

        {/* ========================= */}
        {/* INVITE FORM */}
        {/* ========================= */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">

          <input
            className="bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-slate-200 placeholder-slate-500"
            placeholder="Guardian Email"
            value={form.contactEmail}
            onChange={(e) =>
              setForm({ ...form, contactEmail: e.target.value })
            }
          />

          <select
            className="bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-slate-200"
            value={form.relation}
            onChange={(e) =>
              setForm({ ...form, relation: e.target.value })
            }
          >
            <option>Father</option>
            <option>Mother</option>
            <option>Brother</option>
            <option>Sister</option>
            <option>Friend</option>
            <option>Other</option>
          </select>

          <button
            onClick={handleAdd}
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3 rounded-xl transition-all shadow-lg flex justify-center items-center shadow-indigo-600/20"
          >
            Invite Guardian
          </button>

        </div>

        {/* ========================= */}
        {/* SOS BUTTON */}
        {/* ========================= */}
        <button
          onClick={handleSOS}
          disabled={sendingSOS}
          className="bg-rose-600 hover:bg-rose-500 text-white font-medium px-8 py-3 rounded-xl transition-all shadow-lg flex justify-center items-center shadow-rose-600/20 mb-10 w-full sm:w-auto"
        >
          {sendingSOS ? "Sending..." : "Send SOS to All"}
        </button>

        {/* ========================= */}
        {/* CONTACT LIST */}
        {/* ========================= */}
        {loading ? (
          <p className="text-slate-400 text-center py-10">Loading guardians...</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-4">
            {contacts.map((contact) => (
              <TrustedContactCard
                key={contact._id}
                contact={contact}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}