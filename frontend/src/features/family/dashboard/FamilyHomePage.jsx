import SafetyScoreCard from "./SafetyScoreCard";
import AIThreatIndicator from "../analytics/AIThreatIndicator";
import FakeCallPanel from "../emergency/FakeCallPanel";

export default function FamilyHomePage() {
  return (
    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">

      <SafetyScoreCard score={92} />

      <div className="md:col-span-2">
        <AIThreatIndicator riskLevel="LOW" score={92} />
      </div>

      <FakeCallPanel />

      <div className="bg-[#111827] p-6 rounded-xl flex flex-col justify-center border border-gray-800">
        <h2 className="text-lg font-semibold mb-2 text-white">Live Tracking Status</h2>
        <p className="text-green-400 text-xl font-medium">SAFE & ACTIVE</p>
      </div>

      <div className="bg-[#111827] p-6 rounded-xl flex flex-col justify-center border border-gray-800">
        <h2 className="text-lg font-semibold mb-2 text-white">Smart Alerts</h2>
        <p className="text-gray-400">No active alerts detected in the vicinity.</p>
      </div>

    </div>
  );
}