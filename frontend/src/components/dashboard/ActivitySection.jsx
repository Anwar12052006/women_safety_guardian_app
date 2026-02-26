// const ActivitySection = ({ activities }) => {
//   return (
//     <div className="bg-white/95 rounded-2xl shadow-lg p-5">
//       <h2 className="text-lg font-bold text-indigo-900 mb-4">
//         Recent Activity
//       </h2>

//       {activities?.length === 0 ? (
//         <p className="text-sm text-gray-500">
//           No recent activity
//         </p>
//       ) : (
//         activities.map((activity, index) => (
//           <div
//             key={index}
//             className="flex items-center gap-3 bg-indigo-50 p-3 rounded-xl"
//           >
//             <div className="w-3 h-3 bg-green-500 rounded-full"></div>
//             <p className="text-sm text-gray-700">
//               {activity.message}
//             </p>
//             <span className="ml-auto text-xs text-gray-500">
//               {new Date(activity.createdAt).toLocaleTimeString()}
//             </span>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default ActivitySection;


const ActivitySection = ({ activities }) => {
  return (
    <div className="bg-slate-900/70 backdrop-blur-md border border-slate-800 rounded-2xl shadow-md p-6 sm:p-8">

      <h2 className="text-lg font-semibold text-slate-100 mb-6 tracking-tight">
        Recent Activity
      </h2>

      {activities?.length === 0 ? (
        <p className="text-sm text-slate-500">
          No recent activity
        </p>
      ) : (
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div
              key={index}
              className="flex items-center gap-4 bg-slate-800/60 border border-slate-700 p-4 rounded-xl backdrop-blur-sm"
            >
              <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>

              <p className="text-sm text-slate-300">
                {activity.message}
              </p>

              <span className="ml-auto text-xs text-slate-500">
                {new Date(activity.createdAt).toLocaleTimeString()}
              </span>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default ActivitySection;