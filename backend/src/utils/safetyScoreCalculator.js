
export const calculateSafetyScore = ({
  crimeRate = 0,
  timeRisk = 0,
  nearbyIncidents = 0,
  inactivityRisk = 0,
}) => {

  let score = 100;

  score -= crimeRate * 0.4;

  score -= timeRisk * 0.25;

  score -= nearbyIncidents * 2;

  score -= inactivityRisk * 1.5;

  score = Math.max(0, Math.min(100, Math.round(score)));

  return score;
};
