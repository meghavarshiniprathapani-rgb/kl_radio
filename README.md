# KL Radio Hub - The Central Hub for KL Radio

Welcome to the KL Radio Hub, the official web application for members and listeners of KL Radio. This platform provides a comprehensive suite of tools for station management, content creation, and listener interaction, all powered by a modern, role-based architecture.

The application features a public-facing site for listeners and a secure, multi-faceted dashboard for internal team members, with access and functionality tailored to specific roles like Station Head, Creative, RJ, and Technical staff.

## Tech Stack

This project is built with a modern, production-ready tech stack:

- **Framework**: [Next.js](https://nextjs.org/) (v15) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with [ShadCN/UI](https://ui.shadcn.com/) for components
- **Animations**: [GSAP](https://gsap.com/) & [Framer Motion](https://www.framer.com/motion/) for rich UI animations
- **State Management**: React Context API for authentication and global state
- **API Communication**: [Axios](https://axios-http.com/) for making requests to the backend
- **Generative AI**: [Genkit](https://firebase.google.com/docs/genkit) for AI-powered features like the announcement generator

## Getting Started

Follow these steps to get the development environment running on your local machine.

### Prerequisites

- Node.js (v18 or later recommended)
- npm or yarn

### 1. Installation

Clone the repository and install the project dependencies:

```bash
npm install
```

### 2. Backend Setup

This frontend application is designed to work with a corresponding backend service. Ensure your backend server is running, typically on `localhost:5000`.

The base URL for the API is configured in `src/lib/api.ts`. If your backend runs on a different port or URL, you must update it there:

```typescript
// src/lib/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // <-- Update this if needed
  headers: {
    'Content-Type': 'application/json',
  },
});

// ...
```

### 3. Running the Development Server

Once the dependencies are installed and the backend is running, start the Next.js development server:

```bash
npm run dev
```

The application will be available at `http://localhost:9002`.

## Project Structure

The codebase is organized to be modular and scalable:

- **`/src/app`**: Contains all pages and layouts, following the Next.js App Router structure.
  - **`/dashboard`**: Houses the role-based dashboard pages.
- **`/src/components`**: Reusable React components.
  - **`/ui`**: Core UI components from ShadCN.
  - **`/sections`**: Major sections for the public-facing homepage.
  - **`/dashboard`**: Components specific to the member dashboard.
- **`/src/context`**: React Context providers, primarily for authentication (`auth-context.tsx`).
- **`/src/lib`**: Utility functions, API client configuration (`api.ts`), and type definitions (`types.ts`).
- **`/src/ai`**: Genkit flows and configuration for generative AI features.

## Authentication and Roles

The application uses a role-based access control (RBAC) system. Authentication is handled via JWT (JSON Web Tokens).

### Login Process

1.  Users log in with a username, password, and their designated role on the `/login` page.
2.  The application sends these credentials to the `/api/auth/login` backend endpoint.
3.  Upon successful login, the backend returns a JWT, which is stored in the browser's `localStorage`.
4.  This token is automatically attached to the `Authorization` header for all subsequent protected API requests.

### User Roles

Each user is assigned a role that determines which parts of the dashboard they can access and what actions they can perform.

- **Station Head**: Full administrative access.
- **Creative**: Manages scripts, announcements, and podcasts.
- **RJ (Radio Jockey)**: Accesses live scripts, assigned news, and manages their assigned podcasts.
- **Technical**: Manages the live broadcast, music queue, and listener song suggestions.
- **PR, Designing, Video Editing, Broadcasting**: Specialized roles with access to their respective wings.

## Key Features

### Public Site

- **Listen Live**: A real-time audio player to stream the radio.
- **Announcements**: An animated, sticky-scroll section to display the latest station announcements.
- **Song Suggestions**: A form for listeners to suggest songs for the RJs.

### Member Dashboard

- **Creative Wing**: A comprehensive interface for writing show scripts, creating announcements, and managing podcast scripts. It also includes a news-fetcher to pull in and assign news articles to RJs.
- **RJ Wing**: A personalized dashboard for RJs showing the current live script, their assigned news for the day, and podcasts they need to record.
- **Technical Wing**: A control panel for managing the live broadcast, controlling the music streamer, and moderating song suggestions from listeners.
