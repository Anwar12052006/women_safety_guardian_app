import { useState } from "react";
import axios from "axios";
import { Navigation2, MapPin, ShieldAlert, CheckCircle2, AlertTriangle, ShieldCheck, ArrowLeft, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SafeRoutePage() {
    const navigate = useNavigate();
    const [startLocation, setStartLocation] = useState("");
    const [destination, setDestination] = useState("");
    const [loading, setLoading] = useState(false);
    const [analysis, setAnalysis] = useState(null);
    const [error, setError] = useState("");

    const handleAnalyze = async (e) => {
        e.preventDefault();
        if (!startLocation || !destination) {
            setError("Please provide both start and destination locations.");
            return;
        }

        setError("");
        setLoading(true);
        setAnalysis(null);

        try {
            const token = localStorage.getItem("token");
            const res = await axios.post(
                "https://new-women-safety-app.onrender.com/api/saferoute/analyze",
                { startLocation, destination },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (res.data.success) {
                setAnalysis(res.data.data);
            } else {
                setError(res.data.message || "Analysis failed.");
            }
        } catch (err) {
            console.error(err);
            setError("Failed to connect to AI service. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center py-10 px-4 md:px-8">
            <div className="w-full max-w-4xl">
                {/* Header */}
                <div className="flex items-center mb-8">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2 mr-4 bg-slate-800 hover:bg-slate-700 rounded-full transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5 text-slate-300" />
                    </button>
                    <div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                            AI Safe Route Analysis
                        </h1>
                        <p className="text-slate-400 text-sm mt-1">Get real-time ML-driven safety insights for your journey.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Input Panel */}
                    <div className="md:col-span-1 bg-slate-900/60 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-sm h-fit">
                        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                            <Navigation2 className="w-5 h-5 text-indigo-400" />
                            Plan Journey
                        </h2>

                        <form onSubmit={handleAnalyze} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-1">Start Location</label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                    <input
                                        type="text"
                                        value={startLocation}
                                        onChange={(e) => setStartLocation(e.target.value)}
                                        placeholder="E.g., Central Park"
                                        className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-slate-200"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-1">Destination</label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                    <input
                                        type="text"
                                        value={destination}
                                        onChange={(e) => setDestination(e.target.value)}
                                        placeholder="E.g., Times Square"
                                        className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-slate-200"
                                    />
                                </div>
                            </div>

                            {error && (
                                <div className="p-3 bg-red-900/30 border border-red-500/30 rounded-lg flex items-start gap-2 text-red-400 text-sm">
                                    <ShieldAlert className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                    <p>{error}</p>
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full mt-4 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-medium py-3 rounded-xl transition-all duration-300 shadow-lg shadow-indigo-600/20 flex justify-center items-center gap-2"
                            >
                                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                                {loading ? "Analyzing..." : "Analyze Route Safety"}
                            </button>
                        </form>
                    </div>

                    {/* Results Panel */}
                    <div className="md:col-span-2">
                        {loading ? (
                            <div className="h-full min-h-[400px] flex flex-col items-center justify-center bg-slate-900/30 border border-slate-800 border-dashed rounded-2xl">
                                <Loader2 className="w-10 h-10 text-indigo-500 animate-spin mb-4" />
                                <p className="text-slate-400 animate-pulse">Running ML Risk Analysis Models...</p>
                            </div>
                        ) : analysis ? (
                            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                {/* Overview Card */}
                                <div className={`p-6 rounded-2xl border bg-${analysis.colorCode}-900/10 border-${analysis.colorCode}-500/30 flex flex-col sm:flex-row items-center sm:items-start gap-6`}>
                                    <div className={`w-24 h-24 rounded-full flex items-center justify-center bg-${analysis.colorCode}-500/20 border-4 border-${analysis.colorCode}-500/50 shadow-[0_0_30px_rgba(0,0,0,0.2)] shadow-${analysis.colorCode}-500/20 flex-shrink-0`}>
                                        <div className="text-center">
                                            <span className={`text-2xl font-bold text-${analysis.colorCode}-400`}>{analysis.overallRiskScore}</span>
                                            <span className={`text-xs block text-${analysis.colorCode}-400/80 -mt-1`}>/100</span>
                                        </div>
                                    </div>
                                    <div className="flex-1 text-center sm:text-left">
                                        <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
                                            {analysis.riskLevel === "Low" ? <CheckCircle2 className={`w-6 h-6 text-${analysis.colorCode}-400`} /> : <AlertTriangle className={`w-6 h-6 text-${analysis.colorCode}-400`} />}
                                            <h3 className={`text-2xl font-bold text-${analysis.colorCode}-400`}>{analysis.riskLevel} Risk</h3>
                                        </div>
                                        <p className="text-slate-300 leading-relaxed text-sm">
                                            {analysis.analysisSummary}
                                        </p>
                                    </div>
                                </div>

                                {/* Detailed Insights */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    {/* Danger Zones */}
                                    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
                                        <h4 className="text-slate-200 font-semibold mb-4 flex items-center gap-2">
                                            <AlertTriangle className="w-4 h-4 text-rose-400" />
                                            Identified Danger Zones
                                        </h4>
                                        {analysis.dangerZones.length > 0 ? (
                                            <ul className="space-y-3">
                                                {analysis.dangerZones.map((zone, idx) => (
                                                    <li key={idx} className="bg-slate-950/50 p-3 rounded-xl border border-rose-900/30">
                                                        <span className="block text-sm font-medium text-slate-300">{zone.area}</span>
                                                        <span className="text-xs text-slate-500">{zone.reason}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <div className="h-24 flex items-center justify-center text-sm text-slate-500 italic bg-slate-950/30 rounded-xl">
                                                No high-risk zones detected.
                                            </div>
                                        )}
                                    </div>

                                    {/* Safe Havens */}
                                    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
                                        <h4 className="text-slate-200 font-semibold mb-4 flex items-center gap-2">
                                            <ShieldCheck className="w-4 h-4 text-emerald-400" />
                                            Nearby Safe Havens
                                        </h4>
                                        {analysis.safeHavens.length > 0 ? (
                                            <ul className="space-y-3">
                                                {analysis.safeHavens.map((haven, idx) => (
                                                    <li key={idx} className="bg-slate-950/50 p-3 rounded-xl border border-emerald-900/30">
                                                        <span className="block text-sm font-medium text-slate-300">{haven.name}</span>
                                                        <span className="text-xs text-slate-500">{haven.type}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <div className="h-24 flex items-center justify-center text-sm text-slate-500 italic bg-slate-950/30 rounded-xl">
                                                No safe havens identified nearby.
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Recommendation Banner */}
                                <div className="bg-indigo-900/20 border border-indigo-500/30 rounded-2xl p-5 flex gap-4 items-start">
                                    <div className="bg-indigo-500/20 p-2 rounded-lg mt-1">
                                        <ShieldCheck className="w-5 h-5 text-indigo-400" />
                                    </div>
                                    <div>
                                        <h4 className="text-indigo-300 font-semibold mb-1">AI Recommendation</h4>
                                        <p className="text-sm text-slate-300">{analysis.recommendedAction}</p>
                                    </div>
                                </div>

                            </div>
                        ) : (
                            <div className="h-full min-h-[400px] flex flex-col items-center justify-center bg-slate-900/30 border border-slate-800 border-dashed rounded-2xl text-center p-8">
                                <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4">
                                    <MapPin className="w-8 h-8 text-slate-500" />
                                </div>
                                <h3 className="text-xl font-semibold text-slate-300 mb-2">Awaiting Input</h3>
                                <p className="text-slate-500 max-w-sm">
                                    Enter your starting location and destination to generate a comprehensive AI safety analysis for your route.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
