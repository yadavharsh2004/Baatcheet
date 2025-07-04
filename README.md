# Baatcheet - Your Personal AI Learning Companion 🤖

<!-- ![Baatcheet Demo](./public/images/logo.svg)  -->
<!-- Replace with a good screenshot or GIF of your app -->

**Live Demo:** [Deployed Link](https://baatcheet-dusky.vercel.app/) <!-- Replace with your live app link -->

**Baatcheet** is a full-stack, production-ready Software-as-a-Service (SaaS) platform that revolutionizes learning by providing users with personalized, voice-driven AI tutors. Engage in natural, real-time conversations on any topic, from coding with a virtual expert to exploring economics with a cheese capitalist.

This project was built to demonstrate modern web development practices, integrating cutting-edge technologies to create a scalable, interactive, and monetizable application.

## 🖼️ Screenshots

| Home Page                                    | Companion Session                                    |
| -------------------------------------------- | ---------------------------------------------------- |
| ![Home Page Screenshot](public/readme/HomePage.png) | ![Companion Session Screenshot](./public/readme/CompanionSession.png) |

---

## ✨ Key Features

-   **🎙️ Real-Time Voice Conversations:** Engage in smooth, interactive learning sessions with AI companions powered by **GPT-4** through the **Vapi** voice AI platform.
-   **🔒 Secure Authentication:** A complete and intuitive authentication system with email and Google providers, handled by **Clerk**.
-   **💳 Multi-Tiered Subscriptions:** A flexible subscription system with different plans, feature-gating, and seamless payment processing powered by **Clerk Billing** and **Stripe**.
-   **📚 Companion Library:** Discover and interact with a library of AI companions created by you and other users.
-   **🔍 Dynamic Search & Filtering:** Easily find the perfect learning companion by searching and filtering by subject or topic.
-   **📈 Session & Progress Tracking:** Keep track of your learning journey with a detailed session history and progress dashboard.
-   **🎨 Modern & Responsive UI:** A familiar yet custom user experience built with **Next.js**, **Tailwind CSS**, and **Shadcn/UI**, ensuring a seamless experience on all devices.
-   **🚀 Production-Ready & Scalable:** Built on a robust and scalable architecture, with real-time error tracking and performance monitoring via **Sentry**.

## 🛠️ Technology Stack

This project leverages a modern, powerful tech stack to deliver a high-quality user experience.

| Category          | Technology                                                                                                  |
| ----------------- | ----------------------------------------------------------------------------------------------------------- |
| **Frontend**      | ![Next.js](https://img.shields.io/badge/Next.js-000000?logo=nextdotjs) ![React](https://img.shields.io/badge/React-61DAFB?logo=react) ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss) ![Shadcn/UI](https://img.shields.io/badge/shadcn/ui-000000) |
| **Backend**       | ![Supabase](https://img.shields.io/badge/Supabase-3FCF8E?logo=supabase) ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql) |
| **Services & APIs** | ![Clerk](https://img.shields.io/badge/Clerk-6C47FF) ![Stripe](https://img.shields.io/badge/Stripe-6772E5?logo=stripe) ![Vapi](https://img.shields.io/badge/Vapi-1A1A1A) ![Sentry](https://img.shields.io/badge/Sentry-362D59?logo=sentry) |
| **Deployment**    | ![Vercel](https://img.shields.io/badge/Vercel-000000?logo=vercel) |

## 🚀 Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites

-   [Node.js](https://nodejs.org/) (v18 or later)
-   [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
-   A [Supabase](https://supabase.com/) account and project
-   A [Clerk](https://clerk.com/) account and application
-   A [Vapi](https://vapi.ai/) account for the voice API
-   A [Sentry](https://sentry.io/) account for error monitoring

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/baatcheet.git
cd baatcheet
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root of the project and add the following environment variables. Obtain these keys from your respective service dashboards.

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

# Supabase Database
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

# Vapi Voice AI
NEXT_PUBLIC_VAPI_WEB_TOKEN=

# Sentry Error Monitoring
SENTRY_AUTH_TOKEN=
```

### 4. Set Up the Supabase Database

1.  Navigate to your Supabase project.
2.  Use the SQL Editor to run the schema from `database.sql` (or manually create the `companions` and `session_history` tables as needed).
3.  Set up Row-Level Security (RLS) policies to ensure data is secure and user-specific.

### 5. Run the Development Server

```bash
npm run dev
```

The application should now be running on [http://localhost:3000](http://localhost:3000).
---

_This README was created by [Harsh Yadav](https://github.com/yadavharsh2004). Feel free to connect with me!_
