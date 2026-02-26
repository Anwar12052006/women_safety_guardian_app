import IncidentTable from "./IncidentTable";
import SOSAlertTable from "./SOSAlertTable";

export default function IncidentsPage() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-white">Incident Reports Network</h2>
                    <p className="text-gray-400 text-sm mt-1">Live mapping of community and personal incident triggers.</p>
                </div>
                <span className="bg-red-500/10 text-red-500 text-xs px-3 py-1.5 rounded-full font-bold border border-red-500/20 tracking-wider">LIVE DATA</span>
            </div>

            <SOSAlertTable />
            <div className="bg-[#111827] rounded-xl border border-gray-800 overflow-hidden shadow-2xl">
                <IncidentTable />
            </div>
        </div>
    );
}
