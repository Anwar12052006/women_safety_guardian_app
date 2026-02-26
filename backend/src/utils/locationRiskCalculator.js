export const calculateLocationRisk = (incidents, timeRiskValue = 0) => {
  // Simulating an AI context analyzer
  const hour = new Date().getHours();
  const isNight = hour >= 20 || hour <= 5;

  if (!incidents || incidents.length === 0) {
    return {
      score: isNight ? 85 : 95,
      level: "SAFE",
      insight: isNight
        ? "Area is known to be very safe, but standard nighttime caution is advised."
        : "Excellent conditions. No recent risks detected in this area."
    };
  }

  let riskScore = 100;
  let severityCount = 0;

  incidents.forEach((incident) => {
    riskScore -= incident.severity * 5;
    severityCount += incident.severity;
  });

  riskScore -= timeRiskValue; // Apply time risk directly to score

  // Normalize score
  riskScore = Math.max(0, Math.min(100, Math.round(riskScore)));

  // AI-like Insights Generation based on patterns
  let insight = "";

  if (riskScore >= 80) {
    insight = incidents.length > 0
      ? `Generally safe, though ${incidents.length} minor incident(s) reported recently. Keep your phone handy.`
      : "Area analysis shows very safe conditions. You are good to go.";
    return { score: riskScore, level: "SAFE", insight };
  }

  if (riskScore >= 50) {
    insight = isNight
      ? "Moderate risk detected due to nighttime conditions and recent activity. Stay in well-lit areas."
      : `Moderate activity detected (${incidents.length} reports). Avoid isolated pathways if possible.`;
    return { score: riskScore, level: "MODERATE", insight };
  }

  insight = severityCount > 10
    ? "High risk alert: Multiple severe incidents reported here recently. Avoid this area if possible or travel in groups."
    : "High risk due to recent concerning activity in the vicinity. Please stay highly vigilant.";

  return { score: riskScore, level: "HIGH RISK", insight };
};
