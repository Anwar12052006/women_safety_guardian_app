// const ActionCard = ({ title, onClick }) => (
//   <button
//     onClick={onClick}
//     className="bg-indigo-50 hover:bg-indigo-100 rounded-xl p-4 text-indigo-900 font-semibold text-sm shadow hover:shadow-lg transition-all duration-200"
//   >
//     {title}
//   </button>
// );

// export default ActionCard;

const ActionCard = ({ title, onClick }) => (
  <button
    onClick={onClick}
    className="
      bg-slate-800/60
      hover:bg-slate-700/70
      border border-slate-700
      rounded-xl
      p-5
      text-slate-200
      font-medium
      text-sm
      shadow-sm
      hover:shadow-lg
      hover:shadow-indigo-500/10
      transition-all
      duration-300
      backdrop-blur-sm
      hover:-translate-y-1
      active:scale-95
    "
  >
    {title}
  </button>
);

export default ActionCard;