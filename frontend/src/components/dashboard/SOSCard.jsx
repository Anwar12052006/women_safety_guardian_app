// const SOSCard = ({ handleSOS }) => {
//   return (
//     <div className="bg-white rounded-2xl shadow-xl p-6 flex flex-col items-center justify-center">
//       <h2 className="text-lg font-bold text-indigo-900 mb-4">
//         Emergency SOS
//       </h2>

//       <button
//         onClick={handleSOS}
//         className="w-40 h-40 rounded-full bg-red-600 hover:bg-red-500 text-white font-bold text-xl shadow-lg hover:shadow-2xl transition-all duration-300"
//       >
//         SOS
//       </button>

//       <p className="text-sm text-gray-600 mt-4 text-center">
//         Press in emergency to alert guardians & authorities.
//       </p>
//     </div>
//   );
// };

// export default SOSCard;



const SOSCard = ({ handleSOS }) => {
  return (
    <div className="bg-slate-900/70 backdrop-blur-md border border-slate-800 rounded-2xl shadow-md p-6 sm:p-8 flex flex-col items-center justify-center">

      <h2 className="text-lg font-semibold text-slate-100 mb-6 tracking-tight">
        Emergency SOS
      </h2>

      <button
        onClick={handleSOS}
        className="
          relative w-44 h-44 rounded-full
          bg-red-600 hover:bg-red-500
          text-white font-semibold text-2xl
          shadow-lg hover:shadow-red-500/40
          transition-all duration-300
          flex items-center justify-center
          before:absolute before:inset-0
          before:rounded-full
          before:border before:border-red-500/30
          before:animate-ping before:opacity-30
        "
      >
        SOS
      </button>

      <p className="text-sm text-slate-400 mt-6 text-center max-w-xs">
        Press in emergency to alert guardians & authorities.
      </p>

    </div>
  );
};

export default SOSCard;