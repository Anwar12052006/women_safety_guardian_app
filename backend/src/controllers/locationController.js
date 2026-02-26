import Incident from "../models/Incident.js";
import { calculateLocationRisk } from "../utils/locationRiskCalculator.js";

export const getLocationRisk = async (req, res) => {

  try {

    const { lat, lng } = req.query;

    if (!lat || !lng) {
      return res.status(400).json({
        success: false,
        message: "Location required",
      });
    }

    const radius = 5; // 5 km

    const incidents = await Incident.find({
      "location.lat": {
        $gte: parseFloat(lat) - 0.05,
        $lte: parseFloat(lat) + 0.05,
      },
      "location.lng": {
        $gte: parseFloat(lng) - 0.05,
        $lte: parseFloat(lng) + 0.05,
      },
    });

    // calculateLocationRisk gives { score, level, insight }
    const risk = calculateLocationRisk(incidents, new Date().getHours() >= 20 || new Date().getHours() <= 5 ? 30 : 10);

    res.json({
      success: true,
      data: risk,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Error calculating location risk",
    });

  }

};
