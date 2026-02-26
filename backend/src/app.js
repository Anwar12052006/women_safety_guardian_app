import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import locationRoutes from "./routes/locationRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import emergencyRoutes
  from "./routes/emergencyRoutes.js";
import templateRoutes from "./routes/templateRoutes.js";
import trustedContactRoutes from "./routes/trustedContactRoutes.js";
import authorityRoutes from "./routes/authorityRoutes.js";
import incidentRoutes from "./routes/incidentRoutes.js";
import patrolRoutes from "./routes/patrolRoutes.js";
import geofenceRoutes from "./routes/geofenceRoutes.js";
import tripRoutes from "./routes/tripRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import aiRouteRoutes from "./routes/aiRouteRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "API is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/location", locationRoutes);
app.use("/api/notifications", notificationRoutes);
app.use(
  "/api/emergency",
  emergencyRoutes
);
app.use("/api/templates", templateRoutes);
app.use("/api/trusted-contacts", trustedContactRoutes);
app.use("/api/authority", authorityRoutes);
app.use("/api/incidents", incidentRoutes);
app.use("/api/patrols", patrolRoutes);
app.use("/api/geofence", geofenceRoutes);
app.use("/api/trips", tripRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/saferoute", aiRouteRoutes);

export default app;
