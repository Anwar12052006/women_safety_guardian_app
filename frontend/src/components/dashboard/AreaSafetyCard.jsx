

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