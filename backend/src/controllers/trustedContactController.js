// import TrustedContact from "../models/TrustedContact.js";
// import User from "../models/User.js";
// import { sendEmergencySMS } from "../utils/sendEmergencySMS.js";

// export const addTrustedContact = async (req, res) => {
//   try {
//     const userId = req.user.userId;

//     const { name, phone, relation, priority } = req.body;

//     const contact = await TrustedContact.create({
//       userId,
//       name,
//       phone,
//       relation,
//       priority,
//     });

//     res.json({ success: true, data: contact });

//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// export const getTrustedContacts = async (req, res) => {
//   try {
//     const userId = req.user.userId;

//     const contacts = await TrustedContact.find({ userId }).sort({ createdAt: -1 });

//     res.json({ success: true, data: contacts });

//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// export const deleteTrustedContact = async (req, res) => {
//   try {
//     await TrustedContact.findByIdAndDelete(req.params.id);

//     res.json({ success: true });

//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// export const sendSOSToAll = async (req, res) => {
//   try {

//     const userId = req.user.userId;

//     const user = await User.findById(userId);

//     const contacts = await TrustedContact.find({ userId });

//     for (const contact of contacts) {
//       await sendEmergencySMS(
//         contact.phone,
//         user.location,
//         user.name
//       );
//     }

//     res.json({ success: true });

//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };







import TrustedContact from "../models/TrustedContact.js";
import User from "../models/User.js";
import { sendEmergencySMS } from "../utils/sendEmergencySMS.js";

/**
 * ==========================
 * ADD TRUSTED CONTACT
 * ==========================
 */
export const addTrustedContact = async (req, res) => {
  try {
    const ownerId = req.user.userId;
    const { contactEmail, relation } = req.body;

    if (!contactEmail || !relation) {
      return res.status(400).json({
        success: false,
        message: "Email and relation are required",
      });
    }

    // Check if contact user exists
    const contactUser = await User.findOne({ email: contactEmail })
      .select("_id email role")
      .lean();

    if (!contactUser) {
      return res.status(404).json({
        success: false,
        message: "User with this email not found",
      });
    }

    // Prevent self add
    if (contactUser._id.toString() === ownerId.toString()) {
      return res.status(400).json({
        success: false,
        message: "You cannot add yourself",
      });
    }

    // Prevent duplicate
    const existing = await TrustedContact.findOne({
      owner: ownerId,
      contact: contactUser._id,
    }).lean();

    if (existing) {
      return res.status(409).json({
        success: false,
        message: "Contact already added",
      });
    }

    const contact = await TrustedContact.create({
      owner: ownerId,
      contact: contactUser._id,
      contactEmail,
      relation,
      status: "pending", // later we can change to pending for invite
    });

    return res.json({
      success: true,
      data: contact,
    });

  } catch (error) {
    console.error("Add contact error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/**
 * ==========================
 * GET TRUSTED CONTACTS
 * ==========================
 */
export const getTrustedContacts = async (req, res) => {
  try {
    const ownerId = req.user.userId;

    const contacts = await TrustedContact.find({ owner: ownerId })
      .populate("contact", "name email")
      .sort({ createdAt: -1 })
      .lean();

    return res.json({
      success: true,
      data: contacts,
    });

  } catch (error) {
    console.error("Fetch contacts error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/**
 * ==========================
 * DELETE TRUSTED CONTACT
 * ==========================
 */
export const deleteTrustedContact = async (req, res) => {
  try {
    const ownerId = req.user.userId;
    const contactId = req.params.id;

    await TrustedContact.findOneAndDelete({
      _id: contactId,
      owner: ownerId,
    });

    return res.json({ success: true });

  } catch (error) {
    console.error("Delete contact error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/**
 * ==========================
 * SEND SOS TO ALL CONTACTS
 * ==========================
 */
export const sendSOSToAll = async (req, res) => {
  try {
    const ownerId = req.user.userId;

    const user = await User.findById(ownerId)
      .select("name location")
      .lean();

    if (!user || !user.location) {
      return res.status(400).json({
        success: false,
        message: "Location not available",
      });
    }

    const contacts = await TrustedContact.find({
      owner: ownerId,
      status: "accepted",
    })
      .populate("contact", "phone")
      .lean();

    if (!contacts.length) {
      return res.status(404).json({
        success: false,
        message: "No trusted contacts found",
      });
    }

    // Send SMS in parallel (fast)
    await Promise.all(
      contacts.map((contact) =>
        sendEmergencySMS(
          contact.contact.phone,
          user.location,
          user.name
        )
      )
    );

    return res.json({ success: true });

  } catch (error) {
    console.error("SOS error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};