

import dotenv from "dotenv";
dotenv.config();

import twilio from "twilio";

console.log("TWILIO_SID:", process.env.TWILIO_SID);
console.log("TWILIO_TOKEN:", process.env.TWILIO_TOKEN);
console.log("TWILIO_PHONE:", process.env.TWILIO_PHONE);

const client = twilio(
  process.env.TWILIO_SID,
  process.env.TWILIO_TOKEN
);


export const sendEmergencySMS = async (
  phone,
  location,
  name = "User"
) => {

  try {

    // SAFETY CHECK
    if (!phone) {

      console.error("SMS failed: phone is missing");

      return;

    }


    if (!location) {

  console.error("SMS failed: location is missing");

  return;

}

// SUPPORT BOTH FORMATS
let lat, lng;

if (location.coordinates) {

  // GeoJSON format from MongoDB
  lng = location.coordinates[0];
  lat = location.coordinates[1];

} else {

  // Normal format
  lat = location.lat;
  lng = location.lng;

}

if (lat == null || lng == null) {

  console.error("SMS failed: invalid location format");

  return;

}


    // FORMAT PHONE (ensure string)
    const formattedPhone = phone.toString();


    const message = await client.messages.create({

      body:
`🚨 EMERGENCY ALERT 🚨

${name} needs help immediately.

Live Location:
https://maps.google.com/?q=${lat},${lng}


Please contact immediately.`,

      from: process.env.TWILIO_PHONE,

      to: formattedPhone,

    });


    console.log("✅ SMS sent successfully");
    console.log("Message SID:", message.sid);
    console.log("To:", formattedPhone);


  } catch (error) {

    console.error("❌ SMS failed:");
    console.error(error.message);
    console.error(error.code);

  }

};

