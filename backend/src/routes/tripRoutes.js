import express from "express";
import { startTrip, getTrips, endTrip } from "../controllers/tripController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/", startTrip);
router.get("/", getTrips);
router.patch("/:id/end", endTrip);

export default router;
