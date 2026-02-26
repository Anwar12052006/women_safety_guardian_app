export default function TrackingLogPanel() {
  return (
    <div className="bg-[#111827] p-6 rounded-xl">
      <h3 className="font-semibold mb-2">Tracking Log</h3>
      <ul className="text-sm text-gray-400 space-y-1">
        <li>10:30 AM - Tracking Started</li>
        <li>10:35 AM - Location Updated</li>
        <li>10:40 AM - Battery Status Checked</li>
      </ul>
    </div>
  );
}