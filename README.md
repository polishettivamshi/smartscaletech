# India Professionals Map

A high-performance, polished professional discovery platform focused on mapping talent across India. Built with a focus on speed, distinctive design, and community trust.

## 🚀 Concept
The platform allows professionals (Engineers, Designers, Marketers, etc.) to register their profile with a city-specific geographic location. Verified profiles appear on a zoomable interactive map of India, enabling regional discovery and collaboration.

## 🛠️ Tech Stack
- **Frontend**: React 18, Vite, Tailwind CSS, Framer Motion (for animations).
- **Backend/Database**: Firebase Firestore (NoSQL).
- **Authentication**: Firebase Authentication (Google Login).
- **Icons**: Lucide React.
- **Hosting**: Cloud Run (via AI Studio).

## ✨ Key Features
- **Interactive India Map**: Explore professionals by city with a custom-built, zoomable SVG map visualization.
- **Community Governance (Admin Flow)**:
  - All new profiles enter a `review` state by default.
  - Admins (identified by specific email or `isAdmin` flag in Firestore) have access to a dedicated **Admin Terminal** (`/admin`).
  - Admins can review, approve, or reject pending profiles.
  - Approved profiles transition to `active` and become visible on the global map.
- **Self-Service Onboarding**: Simple integration with Google Auth to create and manage professional profiles.
- **Smart Search & Filtering**: Filter talent by role (Engineering, Design, etc.) and search by name.
- **Responsive Design**: Designed for both large-screen landscape exploration and mobile-first listing views.

## 🔒 Security & Roles
- **Public**: Can view the map and verified profiles.
- **Professional**: Can create and edit their own profile.
- **Admin**: Can manage community health, view analytics, and moderate profiles.
- **Firestore Rules**: Hardened security rules prevent unauthorized data access or modification.

## 📦 Deployment & Setup
1. **Firebase Configuration**: Ensure `firebase-applet-config.json` is present with valid project credentials.
2. **Environment**: Standard Node.js environment.
3. **Admin Setup**: The first admin is bootstrapped via email whitelist (`polishettivamshi123@gmail.com`). Subsequent admins can be promoted by existing admins in the Firestore database.

## 🤝 Community Guidelines
To maintain quality, we use a manual verification flow. Once you submit your profile, a community moderator will review it within 24-48 hours.

---
*Built with ❤️ for India's professional community.*
