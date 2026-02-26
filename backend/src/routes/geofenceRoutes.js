import express from "express";
import { createGeofence, getGeofences, deleteGeofence } from "../controllers/geofenceController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/", createGeofence);
router.get("/", getGeofences);
router.delete("/:id", deleteGeofence);

export default router;
