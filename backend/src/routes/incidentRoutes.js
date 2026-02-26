
import express from "express";
import {
  createIncident,
  getAllIncidents,
  getIncidentById,
} from "../controllers/incidentController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

/*
  =========================================
  📌 GET ALL INCIDENTS (Authority Dashboard)
  GET /api/incidents
  =========================================
*/
router.get("/", authMiddleware, getAllIncidents);

/*
  =========================================
  📌 GET SINGLE INCIDENT (Details Page)
  GET /api/incidents/:id
  =========================================
*/
router.get("/:id", authMiddleware, getIncidentById);

/*
  =========================================
  📌 CREATE NEW INCIDENT REPORT
  POST /api/incidents
  =========================================
*/
router.post("/", authMiddleware, createIncident);

export default router;