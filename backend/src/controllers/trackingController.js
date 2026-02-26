
import TrackingSession from "../models/TrackingSession.js";
import TrustedContact from "../models/TrustedContact.js";
import User from "../models/User.js";
import { sendEmergencySMS } from "../utils/sendEmergencySMS.js";
import { emitLocationUpdate } from "../utils/socketEmitter.js";


/**
 * USER shares live location with trusted contacts
 */
export const shareLiveLocation = async (req, res) =>
{
  try
  {
    const userId = req.user.userId;

    const user = await User.findById(userId);

    const contacts = await TrustedContact.find({ userId });

    if (!contacts.length)
    {
      return res.json({
        success: false,
        message: "No trusted contacts"
      });
    }

    const trackingLink =
      `${process.env.FRONTEND_URL}/track/${userId}`;

    for (const contact of contacts)
    {
      await sendEmergencySMS(
        contact.phone,
        user.location,
        `${user.name} shared live location\nTrack here: ${trackingLink}`
      );
    }

    // create tracking session
    const session =
      await TrackingSession.create({
        userId,
        isActive: true,
        startedAt: new Date()
      });

    res.json({
      success: true,
      message: "Location shared successfully",
      trackingLink,
      session
    });

  }
  catch (error)
  {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


export const updateLiveLocation = async (req, res) =>
{
  try
  {
    const userId = req.user.userId;

    const { lat, lng } = req.body;

    if (!lat || !lng)
    {
      return res.status(400).json({
        success: false,
        message: "Latitude and longitude required"
      });
    }


    // update location in DB
    const user = await User.findByIdAndUpdate(
      userId,
      {
        location:
        {
          type: "Point",
          coordinates: [lng, lat]
        }
      },
      { new: true }
    );


    if (!user)
    {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }


    console.log("📍 Location updated:", lat, lng);



    // ✅ FIX: find family members linked to this user
    const familyMembers = await TrustedContact.find({ userId });


//     // emit to user's own family room (PRIMARY FIX)
emitLocationUpdate(
  userId,
  user.familyId?.toString(),   // ✅ THIS MUST BE userId (same as family dashboard joins)
  {
    lat,
    lng
  }
);


// optional: also emit to each trusted contact if exists
for (const member of familyMembers)
{
  if (member.contactUserId)
  {
    emitLocationUpdate(
      userId,
      member.contactUserId.toString(),
      {
        lat,
        lng
      }
    );
  }
}


    res.json({
      success: true,
      location: { lat, lng }
    });

  }
  catch (error)
  {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * FAMILY dashboard initial load location
 */
export const getLiveLocation =
async (req, res) =>
{
  try
  {
    const { userId } = req.params;

    const user =
      await User.findById(userId);

    if (!user || !user.location)
    {
      return res.json({
        success: false,
        message: "No location found"
      });
    }

    res.json({
      success: true,
      location: {
        lat: user.location.coordinates[1],
        lng: user.location.coordinates[0]
      }
    });

  }
  catch (error)
  {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};



/**
 * Get tracking status
 */
export const getTrackingStatus =
async (req, res) =>
{
  try
  {
    const { userId } = req.params;

    const session =
      await TrackingSession.findOne({
        userId,
        isActive: true
      });

    res.json({
      success: true,
      trackers: session?.trackers || []
    });

  }
  catch (error)
  {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};



/**
 * When family member joins tracking
 */
export const trackerJoined =
async (req, res) =>
{
  try
  {
    const { userId } = req.params;
    const { name, phone } = req.body;

    const session =
      await TrackingSession.findOne({
        userId,
        isActive: true
      });

    if (!session)
    {
      return res.json({
        success: false,
        message: "No active session"
      });
    }

    session.trackers.push({
      name,
      phone,
      startedAt: new Date()
    });

    await session.save();

    res.json({
      success: true
    });

  }
  catch (error)
  {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
