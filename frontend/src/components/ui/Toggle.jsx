// const Toggle = ({ title, desc, active }) => (
//   <div className="flex items-center justify-between bg-indigo-50 p-3 rounded-xl">
//     <div>
//       <p className="font-semibold text-indigo-900">{title}</p>
//       <p className="text-xs text-gray-600">{desc}</p>
//     </div>
//     <div className={`w-12 h-6 rounded-full relative ${active ? "bg-green-500" : "bg-gray-400"}`}>
//       <div className={`absolute top-1 w-4 h-4 bg-white rounded-full ${active ? "right-1" : "left-1"}`} />
//     </div>
//   </div>
// );

// export default Toggle;


const Toggle = ({ title, desc, active }) => (
  <div className="flex items-center justify-between bg-slate-800/60 border border-slate-700 p-4 rounded-xl backdrop-blur-sm">

    <div>
      <p className="font-medium text-slate-100">
        {title}
      </p>

      <p className="text-xs text-slate-400 mt-1">
        {desc}
      </p>
    </div>

    <div
      className={`w-14 h-7 rounded-full relative transition-all duration-300 ${
        active ? "bg-emerald-500" : "bg-slate-600"
      }`}
    >
      <div
        className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all duration-300 shadow-md ${
          active ? "right-1" : "left-1"
        }`}
      />
    </div>

  </div>
);

export default Toggle;