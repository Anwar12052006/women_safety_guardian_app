import IncidentTemplate from "../models/IncidentTemplate.js";

export const getTemplates = async (req, res) => {

  try {

    const templates =
      await IncidentTemplate.find();

    res.json({
      success: true,
      data: templates,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};
