# Muzammal Bilal - AI/ML Engineer Portfolio

A modern, dynamic portfolio web application built with React, Vite, TailwindCSS, and Firebase. Features a complete admin panel for content management without code changes.

## ✨ Features

### Public Site
- **Responsive Design**: Mobile, tablet, and desktop optimized
- **Dark/Light Mode**: Theme toggle with persistence
- **Smooth Animations**: Framer Motion powered transitions
- **SEO Optimized**: Meta tags, OpenGraph, and Twitter cards
- **Fast Performance**: Code splitting, lazy loading, skeleton loaders

### Admin Panel
- **Complete CRUD**: Create, Read, Update, Delete for all sections
- **Drag & Drop**: Reorder experience and projects
- **Publish Control**: Toggle visibility per item
- **Image Upload**: Profile pictures, project images, certificates
- **Rich Text**: HTML support for descriptions
- **Real-time Updates**: Changes reflect immediately

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Firebase account

### 1. Clone & Install
```bash
git clone https://github.com/Muzammal-Bilal Portfolio-AdminPanel
cd muzammal-portfolio
npm install
```

### 2. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Authentication (Email/Password)
4. Create Firestore Database
5. Enable Storage
6. Get config from Project Settings > Your apps > Web app

### 3. Create Admin User
1. Firebase Console > Authentication > Add user
2. Copy the User UID
3. In Firestore, create collection `admins` with document ID = User UID

### 4. Environment Variables
```bash
cp .env.example .env
# Edit .env with your Firebase config
```

### 5. Run Development
```bash
npm run dev
```

- Public site: http://localhost:5173
- Admin panel: http://localhost:5173/admin

### 6. Initialize Database
Login to admin, click "Initialize Database" on dashboard.

## 📁 Project Structure

```
src/
├── components/     # UI components
├── config/         # Firebase config
├── contexts/       # React contexts
├── data/           # Seed data
├── pages/          # Route pages
├── services/       # Firebase services
└── App.jsx         # Main app
```

## 🌐 Deployment

### Vercel
```bash
vercel
```

### Firebase Hosting
```bash
npm run build
firebase deploy --only hosting
```

## 🔒 Security

Deploy Firestore and Storage rules:
```bash
firebase deploy --only firestore:rules,storage:rules
```

## 📝 Routes

| Public | Admin |
|--------|-------|
| `/` Home | `/admin` Login |
| `/about` | `/admin/dashboard` |
| `/experience` | `/admin/profile` |
| `/projects` | `/admin/experience` |
| `/skills` | `/admin/projects` |
| `/certifications` | `/admin/skills` |
| `/contact` | `/admin/certifications` |
| `/resume` | `/admin/contact` |
| | `/admin/settings` |

## 🛠 Tech Stack

- React 19, Vite, TailwindCSS
- Firebase (Auth, Firestore, Storage)
- Framer Motion, dnd-kit
- Lucide React, React Hot Toast

## 👨‍💻 Author

**Muzammal Bilal** - AI/ML Engineer
- GitHub: [@Muzammal-Bilal](https://github.com/Muzammal-Bilal)
- Email: Muzammalbilal36@gmail.com
