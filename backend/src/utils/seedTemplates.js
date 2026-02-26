import mongoose from "mongoose";
import dotenv from "dotenv";
import IncidentTemplate
from "../models/IncidentTemplate.js";
import connectDB from "../config/db.js";

dotenv.config();


const templates = [

  {
    key: "FOLLOWING",
    title: "Suspicious Following Incident",

    descriptionTemplate: `
OFFICIAL INCIDENT REPORT

Report Type: Suspicious Following / Stalking Incident
Reported By: {reportedBy}
Suspect Name: {name}
Date: {date}
Time: {time}
Location: {location}

Incident Description:
I would like to formally report that the above-named suspect has been repeatedly following me without consent. The suspect's behavior has caused fear, mental distress, and a serious concern for my personal safety.

The suspect has been observed following me across multiple locations and monitoring my movements. This behavior appears intentional and poses a potential threat.

Risk Assessment:
Risk Level: MEDIUM
Category: STALKING
Threat Type: Personal Safety Threat

Requested Action:
I request immediate investigation, monitoring of suspect activities, and preventive safety measures to ensure my protection.

Declaration:
I confirm that the information provided above is true to the best of my knowledge.

Status: ACTIVE
Priority: MEDIUM
`,

    category: "STALKING",
    priority: "MEDIUM",
  },

  {
    key: "ACID_THREAT",
    title: "Acid Attack Threat Report",

    descriptionTemplate: `
OFFICIAL EMERGENCY INCIDENT REPORT

Report Type: Acid Attack Threat
Reported By: {reportedBy}
Suspect Name: {name}
Date: {date}
Time: {time}
Location: {location}

Incident Description:
I am reporting a serious life-threatening situation where the suspect has threatened to attack me using acid or other harmful substances.

This threat is extremely dangerous and poses immediate risk to my life and physical safety.

Risk Assessment:
Risk Level: CRITICAL
Category: LIFE THREAT
Threat Type: Acid Attack Threat

Requested Action:
Immediate police intervention, suspect identification, and emergency protection measures are required.

Status: CRITICAL
Priority: CRITICAL
`,

    category: "LIFE_THREAT",
    priority: "CRITICAL",
  },

  {
    key: "KIDNAP",
    title: "Kidnapping Threat Report",

    descriptionTemplate: `
OFFICIAL EMERGENCY INCIDENT REPORT

Report Type: Kidnapping Threat
Reported By: {reportedBy}
Suspect Name: {name}
Date: {date}
Time: {time}
Location: {location}

Incident Description:
The suspect has made direct or indirect threats of kidnapping or forced confinement.

This is a serious criminal threat and requires urgent action.

Risk Assessment:
Risk Level: CRITICAL
Category: KIDNAPPING
Threat Type: Abduction Threat

Requested Action:
Immediate law enforcement involvement and suspect monitoring.

Status: CRITICAL
Priority: CRITICAL
`,

    category: "KIDNAPPING",
    priority: "CRITICAL",
  },

  {
    key: "BLACKMAIL",
    title: "Blackmail Incident Report",

    descriptionTemplate: `
OFFICIAL INCIDENT REPORT

Report Type: Blackmail / Extortion
Reported By: {reportedBy}
Suspect Name: {name}
Date: {date}
Time: {time}
Location: {location}

Incident Description:
The suspect is attempting to blackmail me using threats, personal information, or coercion.

This has caused mental stress and safety concerns.

Risk Assessment:
Risk Level: HIGH
Category: BLACKMAIL
Threat Type: Emotional and Criminal Threat

Requested Action:
Immediate investigation and preventive action.

Status: HIGH
Priority: HIGH
`,

    category: "BLACKMAIL",
    priority: "HIGH",
  }

];

const seed = async () => {

  await connectDB();

  await IncidentTemplate.deleteMany();

  await IncidentTemplate.insertMany(templates);

  console.log("Templates seeded");

  process.exit();

};

seed();
