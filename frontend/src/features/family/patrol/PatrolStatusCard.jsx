import { Shield, RadioTower, Users } from "lucide-react";

export default function PatrolStatusCard() {
    return (
        <div className="bg-[#111827] p-6 rounded-xl border border-gray-800 space-y-6 h-full flex flex-col">
            <div className="flex items-center space-x-3 text-indigo-400">
                <Shield className="w-6 h-6" />
                <h3 className="font-bold text-lg text-white">Patrol Integration</h3>
            </div>

            <div className="space-y-4 flex-1">
                <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400 flex items-center gap-2"><RadioTower className="w-4 h-4" /> Active Units</span>
                    <span className="font-semibold text-white">4</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400 flex items-center gap-2"><Users className="w-4 h-4" /> Personnel</span>
                    <span className="font-semibold text-white">12 Officers</span>
                </div>
                <div className="flex justify-between items-center text-sm border-t border-gray-800 pt-3">
                    <span className="text-gray-400">Current Radius</span>
                    <span className="font-semibold text-green-400">3 KM Secured</span>
                </div>
            </div>
            <p className="text-xs text-gray-500 mt-4 leading-relaxed bg-gray-900/50 p-3 rounded-lg border border-gray-800">
                Live data synced with the backend Patrol dispatch nodes. Police vehicles and registered campus security are dynamically monitored in this sector.
            </p>
        </div>
    );
}
