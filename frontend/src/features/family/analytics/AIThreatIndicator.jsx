import { BrainCircuit, AlertTriangle, ShieldCheck } from "lucide-react";

export default function AIThreatIndicator({ riskLevel = "LOW", score = 90 }) {
    const getRiskColor = () => {
        if (riskLevel === "HIGH" || score < 50) return "text-red-500 bg-red-500/10 border-red-500/20";
        if (riskLevel === "MODERATE" || score < 80) return "text-yellow-500 bg-yellow-500/10 border-yellow-500/20";
        return "text-green-500 bg-green-500/10 border-green-500/20";
    };

    return (
        <div className={`p-6 rounded-xl border h-full ${getRiskColor()} flex items-start space-x-4 transition-all`}>
            <div className="p-3 rounded-full bg-white/5">
                <BrainCircuit className="w-7 h-7" />
            </div>
            <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-lg text-white flex items-center gap-2">
                        AI Threat Analysis
                        {riskLevel === "HIGH" ? <AlertTriangle className="w-5 h-5 text-red-500" /> : <ShieldCheck className="w-5 h-5 text-green-500" />}
                    </h3>
                    <span className="font-bold text-2xl">{score}%</span>
                </div>
                <p className="text-sm text-gray-200">
                    Current AI Detected Risk Level: <strong className="uppercase ml-1">{riskLevel}</strong>
                </p>
                <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                    Analyzed using real-time location metrics, historical transit delays, and live incident mapping to accurately calculate active threats.
                </p>
            </div>
        </div>
    );
}
