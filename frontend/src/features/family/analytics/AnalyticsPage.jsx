export default function AnalyticsPage() {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="bg-[#111827] p-6 rounded-xl">
        <h2>AI Risk Detection</h2>
        <p className="text-yellow-400">Low Risk Area</p>
      </div>

      <div className="bg-[#111827] p-6 rounded-xl">
        <h2>Safety History</h2>
        <p>Graph Coming Soon</p>
      </div>
    </div>
  );
}