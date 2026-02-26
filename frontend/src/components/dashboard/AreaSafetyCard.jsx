// const AreaSafetyCard = ({ areaSafety }) => {
//   return (
//     <div className="bg-white/95 rounded-2xl shadow-lg p-5 text-center">
//       <h2 className="text-lg font-bold text-indigo-900 mb-2">
//         Area Safety
//       </h2>

//       <div className="text-3xl font-bold text-green-600">
//         {areaSafety}
//       </div>
//     </div>
//   );
// };

// export default AreaSafetyCard;




const AreaSafetyCard = ({ areaSafety }) => {
  return (
    <div className="bg-slate-900/70 backdrop-blur-md border border-slate-800 rounded-2xl shadow-md p-6 sm:p-8 text-center">

      <h2 className="text-lg font-semibold text-slate-100 mb-4 tracking-tight">
        Area Safety
      </h2>

      <div className="text-4xl font-semibold text-emerald-400 tracking-wide">
        {areaSafety}
      </div>

      <p className="text-xs text-slate-500 mt-2">
        Real-time safety assessment
      </p>

    </div>
  );
};

export default AreaSafetyCard;