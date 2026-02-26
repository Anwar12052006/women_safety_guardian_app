// const WelcomeSection = ({ user, areaSafety }) => {
//   return (
//     <div className="bg-white rounded-2xl shadow-xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//       <div>
//         <h1 className="text-xl sm:text-2xl font-bold text-indigo-900">
//           Welcome back, {user?.name || "User"} 👋
//         </h1>

//         <p className="text-sm text-gray-600 mt-1">
//           Your safety system is active and monitoring.
//         </p>

//         <div className="flex items-center gap-2 mt-2">
//           <span className="w-3 h-3 bg-green-500 rounded-full"></span>
//           <span className="text-sm font-medium text-green-600">
//             Status: {areaSafety}
//           </span>
//         </div>
//       </div>

//       <div className="text-sm text-gray-600">
//         <p>
//           Monitoring:{" "}
//           <span className="text-green-600 font-semibold">ACTIVE</span>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default WelcomeSection;



const WelcomeSection = ({ user, areaSafety }) => {
  return (
    <div className="bg-slate-900/70 backdrop-blur-md border border-slate-800 rounded-2xl shadow-md p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">

      <div>
        <h1 className="text-2xl sm:text-3xl font-semibold text-slate-100 tracking-tight">
          Welcome back, {user?.name || "User"} 👋
        </h1>

        <p className="text-sm text-slate-400 mt-2">
          Your safety system is active and monitoring.
        </p>

        <div className="flex items-center gap-2 mt-4">
          <span className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></span>
          <span className="text-sm font-medium text-emerald-400">
            Status: {areaSafety}
          </span>
        </div>
      </div>

      <div className="text-sm text-slate-400">
        <p>
          Monitoring:{" "}
          <span className="text-emerald-400 font-semibold">
            ACTIVE
          </span>
        </p>
      </div>

    </div>
  );
};

export default WelcomeSection;