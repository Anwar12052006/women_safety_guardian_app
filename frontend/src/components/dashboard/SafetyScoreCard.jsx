// const SafetyScoreCard = ({ safetyScore }) => {
//   return (
//     <div className="bg-white rounded-2xl shadow-xl p-6">
//       <h2 className="text-lg font-bold text-indigo-900 mb-4">
//         Safety Score
//       </h2>

//       <div className="flex items-center justify-center">
//         <div className="relative w-36 h-36">
//           <svg className="w-36 h-36 transform -rotate-90">
//             <circle
//               cx="72"
//               cy="72"
//               r="60"
//               stroke="#e5e7eb"
//               strokeWidth="10"
//               fill="none"
//             />
//             <circle
//               cx="72"
//               cy="72"
//               r="60"
//               stroke="#10b981"
//               strokeWidth="10"
//               fill="none"
//               strokeDasharray="377"
//               strokeDashoffset={377 - (377 * safetyScore) / 100}
//               strokeLinecap="round"
//             />
//           </svg>

//           <div className="absolute inset-0 flex items-center justify-center">
//             <span className="text-xl font-bold text-indigo-900">
//               {safetyScore}%
//             </span>
//           </div>
//         </div>
//       </div>

//       <p className="text-center text-sm text-gray-600 mt-4">
//         Your current safety level is good.
//       </p>
//     </div>
//   );
// };

// export default SafetyScoreCard;



import { Sparkles } from "lucide-react";

const SafetyScoreCard = ({ safetyScore, aiInsight }) => {
  return (
    <div className="bg-slate-900/70 backdrop-blur-md border border-slate-800 rounded-2xl shadow-md p-6 sm:p-8">

      <h2 className="text-lg font-semibold text-slate-100 mb-6 tracking-tight">
        Safety Score
      </h2>

      <div className="flex items-center justify-center">
        <div className="relative w-40 h-40">

          <svg className="w-40 h-40 transform -rotate-90">
            <circle
              cx="80"
              cy="80"
              r="65"
              stroke="#1e293b"
              strokeWidth="12"
              fill="none"
            />

            <circle
              cx="80"
              cy="80"
              r="65"
              stroke="#10b981"
              strokeWidth="12"
              fill="none"
              strokeDasharray="408"
              strokeDashoffset={408 - (408 * safetyScore) / 100}
              strokeLinecap="round"
              className="transition-all duration-700 ease-in-out"
            />
          </svg>

          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-3xl font-semibold text-slate-100">
              {safetyScore}%
            </span>
          </div>

        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-slate-800/60">
        <div className="flex items-start gap-3 bg-indigo-900/10 p-4 rounded-xl border border-indigo-500/20">
          <Sparkles className="w-5 h-5 text-indigo-400 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="text-xs font-semibold text-indigo-300 uppercase tracking-wider mb-1">AI Safety Insight</h4>
            <p className="text-sm text-slate-300 leading-relaxed">
              {aiInsight || "Your current safety level is stable."}
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default SafetyScoreCard;