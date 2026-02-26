import { PhoneCall } from "lucide-react";
import { useState } from "react";
import axios from "axios";

export default function FakeCallPanel() {
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState("Idle");

    const triggerCall = async () => {
        setLoading(true);
        setStatus("Triggering...");
        try {
            const token = localStorage.getItem("token");
            await axios.post("https://new-women-safety-app.onrender.com/api/dashboard/fake-call", {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setStatus("Fake Call Sent");
        } catch (error) {
            console.error(error);
            setStatus("Failed");
        } finally {
            setLoading(false);
            setTimeout(() => setStatus("Idle"), 3000);
        }
    };

    return (
        <div className="bg-[#111827] p-6 rounded-xl border border-gray-800 flex flex-col items-center text-center justify-center space-y-4">
            <div className="bg-indigo-900/50 p-4 rounded-full">
                <PhoneCall className="text-indigo-400 w-8 h-8" />
            </div>
            <div className="w-full">
                <h3 className="font-semibold text-lg text-white mb-2">Fake Call Simulator</h3>
                <p className="text-sm text-gray-400">
                    Trigger an immediate simulated incoming call to your device to escape uncomfortable situations securely.
                </p>
            </div>
            <button
                onClick={triggerCall}
                disabled={loading}
                className="mt-2 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors"
            >
                {loading ? "Processing..." : status === "Fake Call Sent" ? "Call Incoming..." : "Trigger Fake Call"}
            </button>
            <p className="text-xs text-indigo-300">{status !== "Idle" && status}</p>
        </div>
    );
}
