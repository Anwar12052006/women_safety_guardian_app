import mongoose from "mongoose";

const incidentTemplateSchema = new mongoose.Schema({

  key: {
    type: String,
    required: true,
    unique: true,
  },

  title: String,

  descriptionTemplate: String,

  category: String,

  priority: String,

}, { timestamps: true });

export default mongoose.model(
  "IncidentTemplate",
  incidentTemplateSchema
);
