import twilio from "twilio";

const client = twilio(
  process.env.TWILIO_SID,
  process.env.TWILIO_TOKEN
);

export const sendEmergencySMS =
async (phone, location) => {

  await client.messages.create({

    body:
      `EMERGENCY! User needs help.
      Location:
      https://maps.google.com/?q=${location.lat},${location.lng}`,

    from: process.env.TWILIO_PHONE,

    to: phone,

  });

};
