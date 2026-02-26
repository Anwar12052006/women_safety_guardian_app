export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div className="bg-[#111827] p-6 rounded-xl">
        <h2 className="font-semibold">Permission Control</h2>
        <p>Tracking permission: Always Allowed</p>
      </div>

      <div className="bg-[#111827] p-6 rounded-xl">
        <h2 className="font-semibold">Encryption</h2>
        <p>End-to-End Encryption Enabled</p>
      </div>
    </div>
  );
}