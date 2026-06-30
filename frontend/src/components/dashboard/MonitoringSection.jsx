

import Toggle from "../ui/Toggle";

const MonitoringSection = ({ monitoring }) => {
  return (
    <div className="bg-slate-900/70 backdrop-blur-md border border-slate-800 rounded-2xl shadow-md p-6 sm:p-8">

      <h2 className="text-lg font-semibold text-slate-100 mb-6 tracking-tight">
        Safety Monitoring
      </h2>

      <div className="space-y-5">

        <Toggle
          title="Auto SOS Monitoring"
          desc="Automatically sends alert if risk detected"
          active={monitoring?.autoSOS}
        />

        <Toggle
          title="Guardian Live Tracking"
          desc="Share live location with trusted contacts"
          active={monitoring?.liveTracking}
        />

        <Toggle
          title="Check-in Timer"
          desc="Alert guardians if you don't check-in"
          active={monitoring?.checkInTimer}
        />

      </div>

    </div>
  );
};

export default MonitoringSection;