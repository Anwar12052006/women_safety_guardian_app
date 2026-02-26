import { useEffect, useState } from "react";

export default function BatteryNetworkStatus() {
  const [battery, setBattery] = useState(85);

  useEffect(() => {
    const interval = setInterval(() => {
      setBattery((prev) => (prev > 20 ? prev - 1 : prev));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#111827] p-6 rounded-xl">
      <h3 className="font-semibold mb-2">Device Status</h3>
      <p>Battery: {battery}%</p>
      <p>Network: 4G Connected</p>
    </div>
  );
}