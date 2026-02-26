export const calculatePriority = (
  safetyScore
) => {

  if (safetyScore >= 70)
    return "LOW";

  if (safetyScore >= 50)
    return "MEDIUM";

  if (safetyScore >= 30)
    return "HIGH";

  return "CRITICAL";

};
