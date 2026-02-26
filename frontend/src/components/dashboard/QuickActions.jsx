// import ActionCard from "../ui/ActionCard";

// const QuickActions = ({ navigate }) => {
//   return (
//     <div className="bg-white rounded-2xl shadow-xl p-6">
//       <h2 className="text-lg font-bold text-indigo-900 mb-5">
//         Quick Actions
//       </h2>

//       <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
//         <ActionCard title="Report Incident" onClick={() => navigate("/report")} />
//         <ActionCard title="Trusted Contacts" onClick={() => navigate("/trusted-contacts")} />
//         <ActionCard title="Share Location" onClick={() => navigate("/share-location")} />
//         <ActionCard title="Safe Route" onClick={() => alert("Safe route feature coming soon")} />
//       </div>
//     </div>
//   );
// };

// export default QuickActions;




import ActionCard from "../ui/ActionCard";

const QuickActions = ({ navigate }) => {
  return (
    <div className="bg-slate-900/70 backdrop-blur-md border border-slate-800 rounded-2xl shadow-md p-6 sm:p-8">

      <h2 className="text-lg font-semibold text-slate-100 mb-6 tracking-tight">
        Quick Actions
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">

        <ActionCard
          title="Report Incident"
          onClick={() => navigate("/report")}
        />

        <ActionCard
          title="Trusted Contacts"
          onClick={() => navigate("/trusted-contacts")}
        />

        <ActionCard
          title="Share Location"
          onClick={() => navigate("/share-location")}
        />

        <ActionCard
          title="Safe Route"
          onClick={() => navigate("/safe-route")}
        />

      </div>

    </div>
  );
};

export default QuickActions;