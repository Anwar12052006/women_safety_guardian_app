import TripStarterPanel from "./TripStarterPanel";

// const FeatureCardsSection = () => {
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

//       <div className="bg-white rounded-2xl shadow-xl p-5 flex flex-col justify-between">
//         <div>
//           <h2 className="text-lg font-bold text-indigo-900 mb-2">
//             Fake Call
//           </h2>
//           <p className="text-sm text-gray-600">
//             Trigger a fake incoming call to escape unsafe situations.
//           </p>
//         </div>

//         <button
//           onClick={() => alert("📞 Fake call triggered")}
//           className="mt-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2 rounded-xl transition-all"
//         >
//           Trigger Fake Call
//         </button>
//       </div>

//       <div className="bg-white rounded-2xl shadow-xl p-5 flex flex-col justify-between">
//         <div>
//           <h2 className="text-lg font-bold text-indigo-900 mb-2">
//             Check-in Timer
//           </h2>
//           <p className="text-sm text-gray-600">
//             Set timer. If you don’t respond, guardians are alerted.
//           </p>
//         </div>

//         <button
//           onClick={() => alert("⏱ Check-in timer started")}
//           className="mt-4 bg-yellow-500 hover:bg-yellow-400 text-indigo-900 font-semibold py-2 rounded-xl transition-all"
//         >
//           Start Timer
//         </button>
//       </div>

//       <div className="bg-white rounded-2xl shadow-xl p-5 flex flex-col justify-between">
//         <div>
//           <h2 className="text-lg font-bold text-indigo-900 mb-2">
//             Safe Route
//           </h2>
//           <p className="text-sm text-gray-600">
//             Get safest route based on crime and safety data.
//           </p>
//         </div>

//         <button
//           onClick={() => alert("🛣 Finding safest route")}
//           className="mt-4 bg-green-600 hover:bg-green-500 text-white font-semibold py-2 rounded-xl transition-all"
//         >
//           Find Safe Route
//         </button>
//       </div>

//       <div className="bg-white rounded-2xl shadow-xl p-5 flex flex-col justify-between">
//         <div>
//           <h2 className="text-lg font-bold text-indigo-900 mb-2">
//             Area Safety
//           </h2>
//           <p className="text-sm text-gray-600">
//             Based on nearby reports and real-time risk analysis.
//           </p>
//         </div>

//         <div className="mt-4 text-center">
//           <div className="text-3xl font-bold text-green-600">
//             SAFE
//           </div>
//           <div className="text-xs text-gray-500 mt-1">
//             Low risk area
//           </div>
//         </div>
//       </div>

//     </div>
//   );
// };

// export default FeatureCardsSection;






const FeatureCardsSection = ({ user }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

      {/* ================= FAKE CALL ================= */}
      <div className="bg-slate-900/70 backdrop-blur-md border border-slate-800 rounded-2xl shadow-md p-6 flex flex-col justify-between">

        <div>
          <h2 className="text-lg font-semibold text-slate-100 mb-3 tracking-tight">
            Fake Call
          </h2>

          <p className="text-sm text-slate-400">
            Trigger a fake incoming call to escape unsafe situations.
          </p>
        </div>

        <button
          onClick={() => alert("📞 Fake call triggered")}
          className="mt-6 bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-2.5 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/20"
        >
          Trigger Fake Call
        </button>

      </div>


      {/* ================= CHECK-IN TIMER ================= */}
      <div className="bg-slate-900/70 backdrop-blur-md border border-slate-800 rounded-2xl shadow-md p-6 flex flex-col justify-between">

        <div>
          <h2 className="text-lg font-semibold text-slate-100 mb-3 tracking-tight">
            Check-in Timer
          </h2>

          <p className="text-sm text-slate-400">
            Set timer. If you don’t respond, guardians are alerted.
          </p>
        </div>

        <button
          onClick={() => alert("⏱ Check-in timer started")}
          className="mt-6 bg-amber-500 hover:bg-amber-400 text-slate-900 font-medium py-2.5 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/20"
        >
          Start Timer
        </button>

      </div>


      {/* ================= SAFE ROUTE -> TRIP STARTER ================= */}
      <TripStarterPanel />



      {/* ================= AREA SAFETY ================= */}
      <div className="bg-slate-900/70 backdrop-blur-md border border-slate-800 rounded-2xl shadow-md p-6 flex flex-col justify-between">

        <div>
          <h2 className="text-lg font-semibold text-slate-100 mb-3 tracking-tight">
            Area Safety
          </h2>

          <p className="text-sm text-slate-400">
            Based on nearby reports and real-time risk analysis.
          </p>
        </div>

        <div className="mt-6 text-center">
          <div className="text-4xl font-semibold text-emerald-400 tracking-wide">
            SAFE
          </div>

          <div className="text-xs text-slate-500 mt-2">
            Low risk area
          </div>
        </div>

      </div>

    </div>
  );
};

export default FeatureCardsSection;