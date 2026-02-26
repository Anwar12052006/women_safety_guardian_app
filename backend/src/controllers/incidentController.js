import Incident from "../models/Incident.js";

export const createIncident = async (req, res) => {
  try {
    const userId = req.user.userId;

    const {
    type,
    suspectName,
    description,
    priority,
    severity,
    location,
    } = req.body;

    if (
    !type ||
    !location ||
    !location.coordinates ||
    location.coordinates.length !== 2
    ) {
      return res.status(400).json({
        success: false,
        message: "Type and location (lat, lng) are required",
      });
    }

    // const incident = await Incident.create({
    //   user: userId,
    //   type,
    //   suspectName: suspectName || "Unknown",
    //   description,
    //   priority: priority || "LOW",
    //   severity: severity || 1,
    //     location: {
    //     type: "Point",
    //     coordinates: location.coordinates,
    //     },
    // });

    const incident = await Incident.create({
        user: userId,
        type,
        suspectName: suspectName || "Unknown",
        description,
        priority: priority || "LOW",
        severity: severity || 1,
        location: {
            type: "Point",
            coordinates: location.coordinates,
        },
        statusHistory: [
            { status: "PENDING" }
        ],
    });

    res.json({
      success: true,
      data: incident,
    });
  } catch (error) {
    console.error("createIncident error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const getAllIncidents = async (req, res) => {
  try {
    const incidents = await Incident.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: incidents,
    });
  } catch (error) {
    console.error("getAllIncidents error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getIncidentById = async (req, res) => {
  try {
    const incident = await Incident.findById(req.params.id)
      .populate("user", "name email");

    if (!incident) {
      return res.status(404).json({
        success: false,
        message: "Incident not found",
      });
    }

    res.json({
      success: true,
      data: incident,
    });
  } catch (error) {
    console.error("getIncidentById error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};