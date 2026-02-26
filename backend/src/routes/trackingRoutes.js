// import express from "express";
// import
// {
//  shareLiveLocation,
//  getTrackingStatus,
//  trackerJoined
// }
// from "../controllers/trackingController.js";

// import authMiddleware
// from "../middleware/authMiddleware.js";

// const router = express.Router();

// router.post(
//  "/share-location",
//  authMiddleware,
//  shareLiveLocation
// );

// router.get(
//  "/status/:userId",
//  getTrackingStatus
// );

// router.post(
//  "/tracker-joined/:userId",
//  trackerJoined
// );

// export default router;



import express from "express";

import
{
  shareLiveLocation,
  getTrackingStatus,
  trackerJoined,

  // NEW ROUTES
  updateLiveLocation,
  getLiveLocation

}
from "../controllers/trackingController.js";

import authMiddleware
from "../middleware/authMiddleware.js";


const router = express.Router();



/**
 * USER shares live location with trusted contacts
 */
router.post(
  "/share-location",
  authMiddleware,
  shareLiveLocation
);



/**
 * USER updates live location continuously
 * Used for realtime tracking
 */
router.post(
  "/update-location",
  authMiddleware,
  updateLiveLocation
);



/**
 * FAMILY dashboard initial load location
 */
router.get(
  "/live-location/:userId",
  getLiveLocation
);



/**
 * Get tracking status
 */
router.get(
  "/status/:userId",
  getTrackingStatus
);



/**
 * When family member joins tracking
 */
router.post(
  "/tracker-joined/:userId",
  trackerJoined
);



export default router;
