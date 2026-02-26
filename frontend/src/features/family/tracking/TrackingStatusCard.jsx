export default function TrackingStatusCard() {
  return (
    <div className="bg-[#111827] p-6 rounded-xl">
      <h3 className="font-semibold mb-2">Tracking Status</h3>
      <p className="text-green-400">Live Tracking Active</p>
      <p className="text-sm text-gray-400 mt-2">
        Last Updated: Just now
      </p>
    </div>
  );
}