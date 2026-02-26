import { Activity } from "lucide-react";

export default function SafetyScoreCard({ score = 92 }) {
    const isSafe = score >= 80;

    return (
        <div className="bg-[#111827] p-6 rounded-xl border border-gray-800 h-full">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-white">Dynamic Safety Score</h3>
                <Activity className={isSafe ? "text-green-400" : "text-yellow-400"} />
            </div>
            <div className="flex items-end space-x-2">
                <span className={`text-5xl font-bold ${isSafe ? 'text-green-400' : 'text-yellow-400'}`}>
                    {score}%
                </span>
                <span className="text-sm text-gray-400 mb-1">/ 100</span>
            </div>

            <div className="w-full bg-gray-700 h-2.5 rounded-full mt-5 overflow-hidden">
                <div
                    className={`h-full rounded-full ${isSafe ? 'bg-green-400' : 'bg-yellow-400'} transition-all duration-1000`}
                    style={{ width: `${score}%` }}
                />
            </div>
            <p className="text-xs text-gray-400 mt-4 leading-relaxed">
                Based on user's live surroundings, network connectivity, and active check-ins.
            </p>
        </div>
    );
}
