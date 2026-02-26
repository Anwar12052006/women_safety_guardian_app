import PatrolMap from "./PatrolMap";
import PatrolStatusCard from "./PatrolStatusCard";

export default function PatrolPage() {
    return (
        <div className="space-y-6">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-white">Live Patrol Tracking</h2>
                <p className="text-gray-400 text-sm mt-1">Real-time sync with backend patrol dispatch maps.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-2 bg-[#111827] p-4 rounded-xl border border-gray-800 h-[500px]">
                    <PatrolMap />
                </div>
                <div>
                    <PatrolStatusCard />
                </div>
            </div>
        </div>
    );
}
