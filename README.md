# Job Application Tracker

A full-stack web application to track and manage job applications, built to solve a real problem — organizing my own internship search process.

🔗 **Live Demo:** [Add your Netlify link here]  
💻 **GitHub:** [Add your repo link here]

## Overview

Job Application Tracker helps job seekers manage their application pipeline from a single dashboard — tracking company details, application status, sources, and visualizing progress through analytics.

## Features

- **Authentication** — Secure signup/login using Firebase Auth
- **Application Management (CRUD)** — Add, edit, and delete job applications with details like company name, role, status, source, and notes
- **Status Pipeline** — Track applications through stages: Applied → OA/Test → Interview → Offer/Rejected
- **Analytics Dashboard** — Visual insights including:
  - Total applications count
  - Response rate percentage
  - Status breakdown (pie chart)
  - Applications trend over time (line chart)
  - Top application source
- **Search & Filter** — Quickly find applications by company name or filter by status
- **Protected Routes** — Dashboard and application data accessible only to logged-in users
- **Responsive Design** — Clean, functional UI built with Tailwind CSS

## Tech Stack

- **Frontend:** React (Vite)
- **State Management:** Redux Toolkit
- **Backend/Database:** Firebase Authentication + Cloud Firestore
- **Styling:** Tailwind CSS
- **Charts:** Recharts
- **Routing:** React Router DOM

## Project Structure

```
src/
├── app/                  # Redux store configuration
├── components/           # Reusable UI components (Form, Card, Navbar, Analytics)
├── context/              # Auth context for global auth state
├── features/             # Redux slices
├── firebase/             # Firebase config and Firestore helper functions
├── pages/                # Route-level pages (Login, Signup, Dashboard, Applications)
```

## Key Learnings

- Implementing Firebase Authentication and Firestore CRUD operations in a React application
- Managing complex application state with Redux Toolkit
- Building composite Firestore queries with indexes
- Creating data visualizations with Recharts based on real-time database data
- Structuring a scalable React application with protected routing

## Getting Started

1. Clone the repository
```bash
git clone <your-repo-url>
cd job-application-tracker
```

2. Install dependencies
```bash
npm install
```

3. Set up Firebase
   - Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
   - Enable Authentication (Email/Password) and Cloud Firestore
   - Add your Firebase config to `src/firebase/config.js`

4. Run the development server
```bash
npm run dev
```

## Future Enhancements

- Follow-up reminders for pending applications
- Resume version tracking per application
- CSV export of application data
- Dark mode support

## Author

**Tisha Lathwal**  
[LinkedIn](https://www.linkedin.com/in/tisha-lathwal) • [GitHub](https://github.com/Tishalathwal) • [Portfolio](https://tishalathwalportfolio.netlify.app)