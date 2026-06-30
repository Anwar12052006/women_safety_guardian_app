<p align="center">
  <img src="https://img.shields.io/badge/Status-Active-brightgreen?style=for-the-badge" alt="Status" />
  <img src="https://img.shields.io/badge/License-ISC-blue?style=for-the-badge" alt="License" />
  <img src="https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
</p>

# 🛡️ Women Safety Guardian App
> A comprehensive, real-time women's safety platform providing emergency SOS alerts, live GPS tracking, AI-powered route safety analysis, trusted contact management, incident reporting, geofencing, and multi-role dashboards — built with the MERN stack and WebSocket technology.

---

## 📑 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Architecture](#-architecture)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [API Reference](#-api-reference)
- [Real-Time Events](#-real-time-events-socketio)
- [User Roles](#-user-roles)
- [Database Models](#-database-models)
- [Background Jobs](#-background-jobs)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)
- [Author](#-author)

---

## 🌟 Overview

**Women Safety Guardian** is a full-stack web application designed to empower women with real-time safety tools. The platform connects users with trusted guardians, law enforcement authorities, and an admin control center — all orchestrated through real-time WebSocket communication and powered by intelligent risk assessment algorithms.

### 🎯 Problem Statement

Women face safety challenges during daily commutes, late-night travel, and in unfamiliar areas. Traditional safety apps offer limited functionality — usually just an SOS button. This platform goes beyond by providing a **complete safety ecosystem** with multi-stakeholder coordination, AI-driven insights, and proactive monitoring.

### 💡 Solution

A unified platform where:
- **Women (Users)** can trigger SOS alerts, share live locations, report incidents, start monitored trips, and receive real-time safety scores.
- **Family/Guardians** can track their loved ones in real-time, set geofences, view trips, and receive instant emergency notifications.
- **Police/Authorities** can monitor active alerts on a control room map, dispatch nearest patrol units, manage incidents, and coordinate responses.
- **Admins** can oversee the entire system — manage users, monitor all alerts/incidents, and access global statistics.

---

## ✨ Key Features

### 🚨 Emergency & SOS System
| Feature | Description |
|---------|-------------|
| **One-Tap SOS** | Instantly triggers a CRITICAL priority emergency with SMS alerts to all trusted contacts and police |
| **Smart Emergency Trigger** | Calculates priority (LOW → CRITICAL) based on real-time safety score |
| **Twilio SMS Alerts** | Sends emergency SMS with live Google Maps location link to all contacts |
| **Real-Time Police Notification** | Instantly pushes alerts to the authority control room via WebSocket |
| **Fake Call** | Triggers a simulated incoming call to help escape uncomfortable situations |

### 📍 Live Location & Tracking
| Feature | Description |
|---------|-------------|
| **Real-Time GPS Tracking** | Continuous location broadcasting via Socket.IO |
| **Live Location Sharing** | Share live location link with trusted contacts via SMS |
| **Family Live Tracking** | Guardians can see the user's location in real-time on an interactive map |
| **Tracking Sessions** | Managed sessions with tracker join/leave events |
| **Leaflet Maps Integration** | Interactive maps with markers, circles, and route visualization |

### 🧠 AI-Powered Safety Intelligence
| Feature | Description |
|---------|-------------|
| **Dynamic Safety Score** | Calculated using crime rate, time-of-day risk, nearby incidents, and inactivity factors |
| **Location Risk Assessment** | Evaluates area safety (SAFE / MODERATE / HIGH RISK) based on incident density and severity |
| **AI Safety Insights** | Context-aware safety recommendations (e.g., "Avoid isolated pathways", "Stay in well-lit areas") |
| **Safe Route Analysis** | Analyzes routes between two points for risk score, danger zones, and safe havens |
| **Background Safety Monitoring** | Cron job runs every minute to recalculate and push updated safety scores |

### 👨‍👩‍👧 Trusted Contacts & Guardian System
| Feature | Description |
|---------|-------------|
| **Invite-Based System** | Send guardian invitations via email with auto-linking on registration |
| **Role Auto-Assignment** | When an invited contact signs up, they're automatically assigned the "family" role |
| **Relation Types** | Categorize contacts as Father, Mother, Brother, Sister, Friend, Guardian, or Other |
| **SOS to All Contacts** | One-click SMS blast to all accepted trusted contacts |
| **TTL Expiry** | Pending invitations automatically expire via MongoDB TTL index |

### 📝 Incident Reporting
| Feature | Description |
|---------|-------------|
| **Incident Types** | Report theft, harassment, assault, suspicious activity, or other incidents |
| **Severity Scoring** | Rate incidents on a 1–5 severity scale |
| **Geo-Tagged Reports** | Every incident is pinned on the map with 2dsphere indexing |
| **Status Workflow** | Incidents flow through PENDING → UNDER_REVIEW → RESOLVED / REJECTED |
| **Status History** | Full audit trail of status changes with timestamps |
| **Pre-Built Templates** | Ready-made report templates for Stalking, Acid Attack Threats, Kidnapping, and Blackmail |

### 🗺️ Trip Monitoring
| Feature | Description |
|---------|-------------|
| **Start/End Trips** | Define start point, destination, and ETA for monitored journeys |
| **Progress Updates** | Track trip progress with intermediate location checkpoints |
| **Trip Status** | Active → Completed / Delayed / SOS |
| **Guardian Visibility** | Trusted contacts can view all active and past trips |

### 🔲 Geofencing
| Feature | Description |
|---------|-------------|
| **Create Safe Zones** | Define circular geofences with custom name, center, and radius |
| **Guardian-Created Fences** | Family members can create geofences for tracked users |
| **Active/Inactive Toggle** | Enable or disable geofences without deleting them |

### 👮 Authority (Police) Dashboard
| Feature | Description |
|---------|-------------|
| **Control Room Map** | Real-time map showing all active alerts with user locations |
| **Alert Management** | View, assign, and resolve active emergency alerts |
| **Nearest Patrol Dispatch** | Automatically finds and assigns the closest available officer using geospatial queries |
| **Incident Management** | Review and update incident statuses |
| **Patrol Officer Creation** | Register new police officers with badge ID and vehicle number |

### 🛠️ Admin Panel
| Feature | Description |
|---------|-------------|
| **Global Statistics** | Total users, emergencies, incidents broken down by role and status |
| **User Management** | View all users, block/unblock accounts |
| **Alert Oversight** | View all emergency alerts system-wide |
| **Incident Oversight** | View all community-reported incidents |

### 🔔 Notifications
| Feature | Description |
|---------|-------------|
| **In-App Notification Bell** | Real-time notification center with unread count |
| **Priority Levels** | LOW, INFO, MEDIUM, HIGH, CRITICAL notifications |
| **Mark as Read** | Individual and bulk read management |

### 📊 User Dashboard
| Feature | Description |
|---------|-------------|
| **Safety Score Display** | Prominent real-time safety score with color-coded indicators |
| **Area Safety Status** | Current zone safety level (SAFE / MODERATE / DANGER / HIGH RISK) |
| **Monitoring Controls** | Toggle Auto-SOS, Guardian Tracking, and Check-In Timer |
| **Recent Activity Feed** | Chronological log of safety-related events |
| **Quick Actions** | One-click access to SOS, Report, Trusted Contacts, and Live Tracking |
| **Real-Time Updates** | Dashboard data auto-refreshes via WebSocket events |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                        CLIENT (React + Vite)                        │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ │
│  │   User   │ │  Family  │ │  Police  │ │  Admin   │ │   Home   │ │
│  │Dashboard │ │Dashboard │ │Dashboard │ │Dashboard │ │   Page   │ │
│  └────┬─────┘ └────┬─────┘ └────┬─────┘ └────┬─────┘ └────┬─────┘ │
│       │             │            │             │            │       │
│       └─────────────┴────────────┴─────────────┴────────────┘       │
│                          │               │                          │
│                     Axios (REST)    Socket.IO Client                │
└─────────────────────────┬───────────────┬───────────────────────────┘
                          │               │
                          ▼               ▼
┌─────────────────────────────────────────────────────────────────────┐
│                     SERVER (Node.js + Express)                      │
│                                                                     │
│  ┌─────────────┐  ┌──────────────┐  ┌───────────────┐              │
│  │  REST API   │  │  Socket.IO   │  │  Cron Jobs    │              │
│  │  15 Routes  │  │  Server      │  │  (node-cron)  │              │
│  └──────┬──────┘  └──────┬───────┘  └───────┬───────┘              │
│         │                │                   │                      │
│  ┌──────┴──────┐  ┌──────┴───────┐  ┌───────┴───────┐              │
│  │ Controllers │  │  Rooms:      │  │ Safety Score  │              │
│  │ Middleware  │  │  - dashboard │  │ Recalculation │              │
│  │ Services    │  │  - tracking  │  │ (every 1 min) │              │
│  └──────┬──────┘  │  - family    │  └───────────────┘              │
│         │         │  - authority │                                  │
│         │         └──────────────┘                                  │
│         │                                                           │
│  ┌──────┴──────────────────┐  ┌──────────────┐                     │
│  │    Twilio SMS Service   │  │  JWT Auth +   │                     │
│  │  (Emergency Alerts)     │  │  RBAC Roles   │                     │
│  └─────────────────────────┘  └──────────────┘                     │
└─────────────────────────┬───────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    DATABASE (MongoDB Atlas)                          │
│                                                                     │
│  Collections: User, Dashboard, Emergency, Alert, Incident,          │
│  TrustedContact, Trip, Geofence, Patrol, TrackingSession,           │
│  Notification, IncidentTemplate                                     │
│                                                                     │
│  Indexes: 2dsphere (geo-queries), TTL (invite expiry),              │
│           Compound (owner+email+status)                             │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| **React 19** | UI library with functional components & hooks |
| **Vite 7** | Lightning-fast build tool and dev server |
| **React Router DOM 7** | Client-side routing with role-based navigation |
| **Tailwind CSS 3** | Utility-first CSS framework for responsive design |
| **Leaflet + React-Leaflet** | Interactive maps for tracking, geofencing, and alert visualization |
| **Google Maps API** | Route analysis and location services |
| **Socket.IO Client** | Real-time bidirectional communication |
| **Axios** | HTTP client for REST API calls |
| **Lucide React** | Modern icon library |

### Backend
| Technology | Purpose |
|------------|---------|
| **Node.js** | JavaScript runtime |
| **Express 4** | Web application framework |
| **MongoDB + Mongoose 8** | NoSQL database with ODM |
| **Socket.IO 4** | WebSocket server for real-time features |
| **JSON Web Tokens (JWT)** | Stateless authentication with 7-day expiry |
| **bcrypt.js** | Password hashing (10 salt rounds) |
| **Twilio** | SMS delivery for emergency alerts |
| **node-cron** | Background job scheduling |
| **express-rate-limit** | API rate limiting |
| **dotenv** | Environment variable management |

### Infrastructure
| Technology | Purpose |
|------------|---------|
| **MongoDB Atlas** | Cloud-hosted database |
| **Render** | Backend and frontend deployment |
| **Nodemon** | Development auto-reload |

---

## 📁 Project Structure

```
women-safety-app/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js                    # MongoDB connection setup
│   │   ├── controllers/
│   │   │   ├── adminController.js       # Admin stats, user management, alerts
│   │   │   ├── aiRouteController.js     # AI-powered route safety analysis
│   │   │   ├── authController.js        # Register & login with auto-linking
│   │   │   ├── authorityController.js   # Police dashboard, patrol dispatch
│   │   │   ├── dashboardController.js   # Safety score, monitoring, fake call
│   │   │   ├── emergencyController.js   # SOS trigger, emergency management
│   │   │   ├── geofenceController.js    # Geofence CRUD operations
│   │   │   ├── incidentController.js    # Incident reporting & retrieval
│   │   │   ├── locationController.js    # Location updates
│   │   │   ├── notificationController.js# Notification management
│   │   │   ├── templateController.js    # Incident report templates
│   │   │   ├── trackingController.js    # Live location sharing & tracking
│   │   │   ├── tripController.js        # Trip start/end/monitoring
│   │   │   └── trustedContactController.js # Guardian invite system
│   │   ├── jobs/
│   │   │   └── safetyScoreJob.js        # Cron job: recalculate scores every 1 min
│   │   ├── middleware/
│   │   │   ├── authMiddleware.js        # JWT verification & user attachment
│   │   │   ├── authorizeRoles.js        # Role-based access control
│   │   │   └── roleMiddleware.js        # Admin role enforcement
│   │   ├── models/
│   │   │   ├── Alert.js                 # Police alert with geo-index
│   │   │   ├── Dashboard.js             # User dashboard state
│   │   │   ├── Emergency.js             # Emergency records with priority
│   │   │   ├── Geofence.js              # Circular geofence zones
│   │   │   ├── Incident.js              # Community incident reports
│   │   │   ├── IncidentTemplate.js      # Pre-built report templates
│   │   │   ├── Notification.js          # In-app notifications
│   │   │   ├── Patrol.js                # Patrol unit tracking
│   │   │   ├── SafetyScore.js           # Safety score model
│   │   │   ├── TrackingSession.js       # Live tracking sessions
│   │   │   ├── Trip.js                  # Monitored trip journeys
│   │   │   ├── TrustedContact.js        # Guardian invite & linking
│   │   │   └── User.js                  # Multi-role user with geolocation
│   │   ├── routes/                      # Express route definitions (15 files)
│   │   ├── services/
│   │   │   └── emergencyService.js      # Emergency business logic
│   │   ├── utils/
│   │   │   ├── emergencyPriority.js     # Priority calculation from safety score
│   │   │   ├── locationRiskCalculator.js# AI-like risk assessment engine
│   │   │   ├── safetyScoreCalculator.js # Multi-factor safety score formula
│   │   │   ├── seedTemplates.js         # Database seeder for templates
│   │   │   ├── sendEmergencySMS.js      # Twilio SMS integration
│   │   │   ├── sendNotification.js      # In-app notification creator
│   │   │   └── socketEmitter.js         # Socket.IO emit helpers
│   │   ├── app.js                       # Express app with CORS & routes
│   │   ├── server.js                    # HTTP server, DB, socket init
│   │   └── socket.js                    # Socket.IO rooms & event handlers
│   ├── .env                             # Environment variables
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/                  # NotificationBell, TrackingStatus, TrustedContactCard
│   │   │   ├── dashboard/              # SafetyScoreCard, SOSCard, QuickActions, TripStarter, etc.
│   │   │   ├── layout/                 # Navbar, AdminNavbar, AuthorityNavbar
│   │   │   ├── location/              # LocationPicker, MapSelector
│   │   │   ├── ui/                    # ActionCard, ActivityItem, Toggle
│   │   │   └── ControlRoomMap.jsx     # Police control room map view
│   │   ├── features/
│   │   │   └── family/                # Full family feature module
│   │   │       ├── analytics/         # Family analytics components
│   │   │       ├── dashboard/         # Family dashboard components
│   │   │       ├── emergency/         # Emergency history & management
│   │   │       ├── geofence/          # Geofence management UI
│   │   │       ├── hooks/             # Family-specific custom hooks
│   │   │       ├── incidents/         # Incident viewing for guardians
│   │   │       ├── layout/            # Family layout components
│   │   │       ├── patrol/            # Patrol information
│   │   │       ├── services/          # Family API service layer
│   │   │       ├── settings/          # Family settings
│   │   │       ├── tracking/          # Family tracking components
│   │   │       └── trips/             # Trip monitoring for guardians
│   │   ├── hooks/
│   │   │   ├── useDashboardData.js    # Dashboard data fetching hook
│   │   │   ├── useLiveLocationEmitter.js # GPS emission hook
│   │   │   ├── useRealtimeDashboard.js   # Socket-based dashboard updates
│   │   │   └── useRealtimeLocation.js    # Socket-based location tracking
│   │   ├── pages/                     # 16 page components
│   │   │   ├── HomePage.jsx           # Landing page
│   │   │   ├── LoginPage.jsx          # Authentication
│   │   │   ├── SignupPage.jsx         # Registration with role selection
│   │   │   ├── DashboardPage.jsx      # Main user dashboard
│   │   │   ├── FamilyDashboardPage.jsx# Guardian dashboard
│   │   │   ├── AuthorityDashboard.jsx # Police control room
│   │   │   ├── AdminDashboard.jsx     # System admin panel
│   │   │   ├── AdminUsersPage.jsx     # User management
│   │   │   ├── AdminAlertsPage.jsx    # Alert management
│   │   │   ├── AdminIncidentsPage.jsx # Incident management
│   │   │   ├── ReportPage.jsx         # Incident reporting form
│   │   │   ├── TrustedContactsPage.jsx# Guardian management
│   │   │   ├── LiveTrackingPage.jsx   # Real-time location sharing
│   │   │   ├── SafeRoutePage.jsx      # AI route analysis
│   │   │   └── ManagePatrolPage.jsx   # Patrol management
│   │   ├── services/                  # API service layer (admin, family, tracking, trusted contacts)
│   │   ├── socket.js                  # Socket.IO client setup
│   │   ├── App.jsx                    # Route definitions
│   │   └── main.jsx                   # React entry point
│   ├── .env                           # Frontend environment variables
│   ├── index.html                     # HTML entry point
│   ├── tailwind.config.js             # Tailwind CSS configuration
│   ├── vite.config.js                 # Vite build configuration
│   └── package.json
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18.x
- **npm** ≥ 9.x
- **MongoDB Atlas** account (or local MongoDB instance)
- **Twilio** account (for SMS alerts)
- **Google Maps API Key** (for route analysis)

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/Anwar12052006/women-safety-app.git
cd women-safety-app
```

**2. Install backend dependencies**

```bash
cd backend
npm install
```

**3. Install frontend dependencies**

```bash
cd ../frontend
npm install
```

**4. Configure environment variables**

Create `.env` files in both `backend/` and `frontend/` directories (see [Environment Variables](#-environment-variables) section).

**5. Seed the database (optional)**

```bash
cd backend
node src/utils/seedTemplates.js
```

**6. Start the development servers**

Backend (runs on port 5000):
```bash
cd backend
npm run dev
```

Frontend (runs on port 5173):
```bash
cd frontend
npm run dev
```

**7. Open in browser**

```
http://localhost:5173
```

---

## 🔐 Environment Variables

### Backend (`backend/.env`)

```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<dbname>?retryWrites=true&w=majority

# Authentication
JWT_SECRET_KEY=your_strong_secret_key_here

# Twilio SMS Service
TWILIO_SID=your_twilio_account_sid
TWILIO_TOKEN=your_twilio_auth_token
TWILIO_PHONE=+1XXXXXXXXXX
```

### Frontend (`frontend/.env`)

```env
# API Base URL
VITE_API_URL=http://localhost:5000/api

# Google Maps
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

---

## 📡 API Reference

### Authentication

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/api/auth/register` | Register a new user (user/family) | ❌ |
| `POST` | `/api/auth/login` | Login and receive JWT token | ❌ |

### Dashboard

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/api/dashboard` | Get user dashboard with auto-calculated safety score | ✅ |
| `PUT` | `/api/dashboard/monitoring` | Update monitoring preferences | ✅ |
| `POST` | `/api/dashboard/activity` | Log a new activity | ✅ |
| `POST` | `/api/dashboard/checkin` | Start check-in timer | ✅ |
| `POST` | `/api/dashboard/fake-call` | Trigger fake incoming call | ✅ |

### Emergency

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/api/emergency/trigger` | Trigger emergency (auto-priority) | ✅ |
| `POST` | `/api/emergency/sos` | Manual SOS (CRITICAL priority + SMS) | ✅ |
| `GET` | `/api/emergency` | Get emergency history | ✅ |

### Trusted Contacts

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/api/trusted-contacts` | Add trusted contact by email | ✅ |
| `GET` | `/api/trusted-contacts` | Get all trusted contacts | ✅ |
| `DELETE` | `/api/trusted-contacts/:id` | Remove a trusted contact | ✅ |
| `POST` | `/api/trusted-contacts/sos` | Send SOS to all contacts | ✅ |

### Incidents

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/api/incidents` | Report a new incident | ✅ |
| `GET` | `/api/incidents` | Get all incidents | ✅ |
| `GET` | `/api/incidents/:id` | Get incident details | ✅ |

### Trips

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/api/trips/start` | Start a new monitored trip | ✅ |
| `GET` | `/api/trips` | Get all trips (own + tracked users) | ✅ |
| `PATCH` | `/api/trips/:id/end` | Complete a trip | ✅ |

### Geofencing

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/api/geofence` | Create a geofence zone | ✅ |
| `GET` | `/api/geofence` | Get all geofences | ✅ |
| `DELETE` | `/api/geofence/:id` | Delete a geofence | ✅ |

### Live Tracking

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/api/tracking/share` | Share live location | ✅ |
| `POST` | `/api/tracking/update` | Update current location | ✅ |
| `GET` | `/api/tracking/:userId/location` | Get user's last known location | ✅ |
| `GET` | `/api/tracking/:userId/status` | Get tracking session status | ✅ |

### AI Safe Route

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/api/saferoute/analyze` | Analyze route safety between two points | ✅ |

### Authority (Police)

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/api/authority/stats` | Get authority dashboard statistics | ✅ Police |
| `GET` | `/api/authority/alerts` | Get all active alerts | ✅ Police |
| `POST` | `/api/authority/assign` | Assign nearest patrol to alert | ✅ Police |
| `GET` | `/api/authority/incidents` | Get all incidents | ✅ Police |
| `PATCH` | `/api/authority/incidents/:id` | Update incident status | ✅ Police |
| `POST` | `/api/authority/patrols` | Create new patrol officer | ✅ Police |

### Admin

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/api/admin/stats` | Get global system statistics | ✅ Admin |
| `GET` | `/api/admin/users` | Get all registered users | ✅ Admin |
| `PATCH` | `/api/admin/users/:id/block` | Block/unblock a user | ✅ Admin |
| `GET` | `/api/admin/alerts` | Get all emergency alerts | ✅ Admin |
| `GET` | `/api/admin/incidents` | Get all incidents | ✅ Admin |

### Notifications

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/api/notifications` | Get user notifications | ✅ |

### Other

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/api/health` | API health check | ❌ |
| `GET` | `/api/templates` | Get incident report templates | ✅ |

---

## 🔌 Real-Time Events (Socket.IO)

### Socket Rooms

| Room | Pattern | Purpose |
|------|---------|---------|
| **Authority Control** | `authority:control` | Police receive all new alerts |
| **User Dashboard** | `dashboard:{userId}` | User receives dashboard updates |
| **User Tracking** | `tracking:{userId}` | User's location tracking stream |
| **Family Tracking** | `family:{familyId}` | Guardian receives family member locations |

### Client → Server Events

| Event | Payload | Description |
|-------|---------|-------------|
| `joinAuthority` | — | Police joins the authority control room |
| `joinDashboard` | `userId` | User subscribes to dashboard updates |
| `joinTracking` | `userId` | Subscribe to a user's location stream |
| `joinFamilyTracking` | `familyId` | Guardian subscribes to family tracking |
| `locationUpdate` | `{ userId, location }` | User broadcasts their current location |

### Server → Client Events

| Event | Payload | Description |
|-------|---------|-------------|
| `emergencyAlert` | `Emergency` object | Emergency triggered notification |
| `newAlert` | `Alert` object | New alert for police control room |
| `dashboard:update` | `Dashboard` object | Dashboard data update |
| `trackUserLocation` | `{ userId, location, timestamp }` | Live location update |
| `familyTrackLocation` | `{ userId, familyId, location, timestamp }` | Family tracking update |

---

## 👥 User Roles

| Role | Access Level | Description |
|------|-------------|-------------|
| **`user`** | Standard | Primary user — can trigger SOS, report incidents, manage contacts, start trips |
| **`family`** | Guardian | Trusted contact — can track user's location, view trips, set geofences |
| **`police`** | Authority | Law enforcement — manages alerts, dispatches patrols, reviews incidents |
| **`admin`** | System Admin | Full system oversight — user management, global statistics |

### Role-Based Registration Flow

```
User signs up as "user"
  └─→ Adds trusted contact by email
       └─→ If contact exists → linked immediately
       └─→ If contact doesn't exist → pending invite
            └─→ Contact signs up → auto-assigned "family" role → linked to owner
```

---

## 📊 Database Models

| Model | Key Fields | Indexes |
|-------|-----------|---------|
| **User** | name, email, phone, password, role, location, badgeId, vehicleNumber, isAvailable, isVerified, subscriptionPlan | `2dsphere` (location), email (unique) |
| **Dashboard** | userId, safetyScore, monitoring (autoSOS, guardianTracking, checkInTimer), areaSafety, aiInsight, recentActivity | userId (unique) |
| **Emergency** | userId, priority, safetyScore, location, status, message | — |
| **Alert** | user, location, status, priority, assignedPatrol | `2dsphere` (location) |
| **Incident** | user, type, location, suspectName, description, severity, priority, status, statusHistory | `2dsphere` (location) |
| **TrustedContact** | owner, contact, contactEmail, relation, status, inviteToken, expiresAt, isActive | Compound (owner+email+status), TTL (expiresAt) |
| **Trip** | userId, startLocation, destination, eta, status, progressUpdates | `2dsphere` (startLocation, destination) |
| **Geofence** | userId, ownerId, name, location, radius, isActive | `2dsphere` (location) |
| **TrackingSession** | userId, trackers, isActive | — |
| **Notification** | userId, title, message, type, read | userId (index) |
| **IncidentTemplate** | key, title, descriptionTemplate, category, priority | key (unique) |
| **Patrol** | officerName, location, status | `2dsphere` (location) |

---

## ⏱️ Background Jobs

| Job | Schedule | Description |
|-----|----------|-------------|
| **Safety Score Recalculation** | Every 1 minute | Iterates all dashboards, recalculates safety scores based on crime rate, time-of-day risk, nearby incidents, and inactivity. Pushes real-time updates and sends warning notifications when score drops below 50. |

---

## 🚀 Deployment

The application is deployed on **Render**:

- **Frontend**: `https://women-safety-proj.onrender.com`
- **Backend API**: `https://new-women-safety-app.onrender.com`

### Build Commands

**Frontend (Production Build):**
```bash
cd frontend
npm run build
```

**Backend (Production Start):**
```bash
cd backend
npm start
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Guidelines

- Follow the existing code structure and naming conventions
- Write descriptive commit messages
- Test your changes before submitting a PR
- Keep PRs focused and small

---

## 📄 License

This project is licensed under the **ISC License**.

---

## 👤 Author

**Anwar Raza**

- GitHub: [@Anwar12052006](https://github.com/Anwar12052006)

---

<p align="center">
  <b>Built with ❤️ for women's safety</b>
</p>
