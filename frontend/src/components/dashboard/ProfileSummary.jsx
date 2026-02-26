// const ProfileSummary = ({ user }) => {
//   return (
//     <div className="bg-white/95 rounded-2xl shadow-lg p-5">
//       <h2 className="text-lg font-bold text-indigo-900 mb-4">
//         Profile Summary
//       </h2>

//       <div className="flex flex-col items-center text-center">
//         <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
//           {user?.name?.charAt(0)}
//         </div>

//         <h3 className="mt-3 font-bold text-indigo-900">
//           {user?.name}
//         </h3>

//         <p className="text-xs text-gray-500">
//           User
//         </p>
//       </div>
//     </div>
//   );
// };

// export default ProfileSummary;


const ProfileSummary = ({ user }) => {
  return (
    <div className="bg-slate-900/70 backdrop-blur-md border border-slate-800 rounded-2xl shadow-md p-6 sm:p-8">

      <h2 className="text-lg font-semibold text-slate-100 mb-6 tracking-tight">
        Profile Summary
      </h2>

      <div className="flex flex-col items-center text-center">

        <div className="w-20 h-20 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-2xl shadow-md">
          {user?.name?.charAt(0)}
        </div>

        <h3 className="mt-4 font-semibold text-slate-100 text-lg">
          {user?.name}
        </h3>

        <p className="text-xs text-slate-500 mt-1">
          User
        </p>

      </div>

    </div>
  );
};

export default ProfileSummary;