import React from "react";
import { Phone, MessageCircle, Trash2 } from "lucide-react";

export default function TrustedContactCard({ contact, onDelete }) {

  const handleCall = () => {
    window.location.href = `tel:${contact.phone}`;
  };

  const handleMessage = () => {
    window.location.href = `sms:${contact.phone}`;
  };

  return (
    <div className="bg-slate-900/40 border border-slate-800 rounded-2xl shadow-lg p-5 flex flex-col gap-4 hover:border-slate-700 hover:bg-slate-900/60 transition-all">

      <div className="flex justify-between items-center">

        <div>
          <h3 className="font-semibold text-slate-100 text-lg">{contact.name}</h3>
          <p className="text-slate-400 text-sm mt-0.5">{contact.phone}</p>
        </div>

        <span className="bg-slate-800 text-indigo-400 border border-slate-700 px-3 py-1 rounded-full text-xs font-medium tracking-wide">
          {contact.relation}
        </span>

      </div>

      <div className="flex gap-3 mt-2">

        <button
          onClick={handleCall}
          className="flex-1 bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 py-2.5 rounded-xl flex justify-center items-center gap-2 hover:bg-emerald-600/30 transition-all text-sm font-medium"
        >
          <Phone size={16} /> Call
        </button>

        <button
          onClick={handleMessage}
          className="flex-1 bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 py-2.5 rounded-xl flex justify-center items-center gap-2 hover:bg-indigo-600/30 transition-all text-sm font-medium"
        >
          <MessageCircle size={16} /> Message
        </button>

        <button
          onClick={() => onDelete(contact._id)}
          className="bg-rose-600/20 text-rose-400 border border-rose-500/30 p-2.5 rounded-xl hover:bg-rose-600/30 transition-all flex items-center justify-center shrink-0"
        >
          <Trash2 size={16} />
        </button>

      </div>

    </div>
  );
}
