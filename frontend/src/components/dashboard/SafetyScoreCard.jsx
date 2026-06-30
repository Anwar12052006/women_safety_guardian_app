

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