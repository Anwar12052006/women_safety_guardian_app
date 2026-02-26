/**
 * Mock AI Route Controller
 * Simulates an ML model analyzing a route for safety.
 */

export const analyzeRoute = async (req, res) => {
    try {
        const { startLocation, destination } = req.body;

        if (!startLocation || !destination) {
            return res.status(400).json({ success: false, message: "Start location and destination are required." });
        }

        // Simulating a delay for the "ML Model Inference"
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Generate a mock pseudo-random but somewhat contextual AI response
        const baseRisk = Math.floor(Math.random() * 60) + 10; // Random risk between 10-70%
        let riskLevel = "Low";
        let color = "emerald";

        if (baseRisk > 40 && baseRisk <= 60) {
            riskLevel = "Moderate";
            color = "amber";
        } else if (baseRisk > 60) {
            riskLevel = "High";
            color = "rose";
        }

        // Mock Safety Analysis Report
        const safetyAnalysis = {
            overallRiskScore: baseRisk,
            riskLevel: riskLevel,
            colorCode: color,
            analysisSummary: `The route from **${startLocation}** to **${destination}** has a generalized risk score of ${baseRisk}/100 based on recent historical data and time of day.`,
            recommendedAction: baseRisk > 50 ? "Consider taking a well-lit alternative route or sharing your live trip with a guardian." : "The route is generally safe. Stay alert and keep your phone accessible.",
            dangerZones: baseRisk > 40 ? [
                { area: `${destination} outskirts`, reason: "Low lighting reported" },
                { area: `Midway transition road`, reason: "Lower foot traffic" }
            ] : [],
            safeHavens: [
                { name: "City Police Station 3", type: "Police Station" },
                { name: "24/7 Supermarket", type: "Public Area" }
            ]
        };

        res.status(200).json({ success: true, data: safetyAnalysis });
    } catch (error) {
        console.error("AI Route Analysis Error:", error);
        res.status(500).json({ success: false, message: "Failed to perform AI route analysis" });
    }
};
