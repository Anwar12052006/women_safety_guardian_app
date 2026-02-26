
// import express from "express";
// import {
//   getDashboardStats,
//   getAllAlerts,
//   assignNearestPatrol,
//   getAllIncidents,
//   updateIncidentStatus,
// } from "../controllers/authorityController.js";

// import authMiddleware from "../middleware/authMiddleware.js";
// import authorizeRoles from "../middleware/authorizeRoles.js";

// const router = express.Router();

// /*
// ==================================================
// 📊 DASHBOARD STATS
// GET /api/authority/stats
// ==================================================
// */
// router.get("/stats", authMiddleware, getDashboardStats);

// /*
// ==================================================
// 🚨 GET ALL ALERTS
// GET /api/authority/alerts
// ==================================================
// */
// router.get("/alerts", authMiddleware, getAllAlerts);

// /*
// ==================================================
// 🚓 ASSIGN NEAREST PATROL
// POST /api/authority/assign
// Body: { alertId }
// ==================================================
// */
// router.post("/assign", authMiddleware, assignNearestPatrol);

// /*
// ==================================================
// 📄 GET ALL INCIDENT REPORTS
// GET /api/authority/incidents
// ==================================================
// */
// router.get("/incidents", authMiddleware, getAllIncidents);

// /*
// ==================================================
// ✏ UPDATE INCIDENT STATUS
// PATCH /api/authority/incidents/:id/status
// Body: { status }
// ==================================================
// */
// router.patch(
//   "/incidents/:id/status",
//   authMiddleware,
//   updateIncidentStatus
// );

// export default router;


import express from "express";
import {
  getDashboardStats,
  getAllAlerts,
  assignNearestPatrol,
  getAllIncidents,
  updateIncidentStatus,
  createPatrolOfficer,   // 👈 YAHAN ADD KARO
} from "../controllers/authorityController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/authorizeRoles.js";

const router = express.Router();

/*
==================================================
📊 DASHBOARD STATS
GET /api/authority/stats
==================================================
*/
router.get(
  "/stats",
  authMiddleware,
  authorizeRoles("admin"),
  getDashboardStats
);

/*
==================================================
🚨 GET ALL ALERTS
GET /api/authority/alerts
==================================================
*/
router.get(
  "/alerts",
  authMiddleware,
  authorizeRoles("admin"),
  getAllAlerts
);

/*
==================================================
🚓 ASSIGN NEAREST PATROL
POST /api/authority/assign
Body: { alertId }
==================================================
*/
router.post(
  "/assign",
  authMiddleware,
  authorizeRoles("admin"),
  assignNearestPatrol
);

/*
==================================================
📄 GET ALL INCIDENT REPORTS
GET /api/authority/incidents
==================================================
*/
router.get(
  "/incidents",
  authMiddleware,
  authorizeRoles("admin"),
  getAllIncidents
);

/*
==================================================
✏ UPDATE INCIDENT STATUS
PATCH /api/authority/incidents/:id/status
Body: { status }
==================================================
*/
router.patch(
  "/incidents/:id/status",
  authMiddleware,
  authorizeRoles("admin"),
  updateIncidentStatus
);


/*
==================================================
👮 CREATE PATROL OFFICER
POST /api/authority/create-patrol
==================================================
*/
router.post(
  "/create-patrol",
  authMiddleware,
  authorizeRoles("admin"),
  createPatrolOfficer
);

export default router;