# 🌟 ElevateFund - Crowdfunding Platform

<p align="center">
  <img src="public/screenshot.png" alt="ElevateFund Screenshot" width="100%" />
</p>

Welcome to **ElevateFund**, a next-generation crowdfunding platform built with the MERN stack (MongoDB, Express, React/Next.js, Node.js). This platform empowers creators to launch campaigns and supporters to fund them using a secure credit-based system.

## 🚀 Live Demo
🔗 **Live Site URL:** [https://elevatefund-client.vercel.app](https://elevatefund-client.vercel.app) *(Replace with actual live link if deployed)*

## 🔐 Admin Credentials
To access the Admin Dashboard and review platform management features, please use the following credentials:
- **Email:** `admin@gmail.com` (or the one you registered)
- **Password:** `123456`

## ✨ Key Features (Top 10)
1. **Multi-Role Authentication (Better-Auth):** Seamless login/signup system with distinct dashboards for Supporters, Creators, and Admins.
2. **Interactive Campaign Management:** Creators can easily launch, edit, and track their fundraising campaigns.
3. **Credit-Based Contribution System:** Supporters can purchase virtual credits and use them to seamlessly back campaigns.
4. **Real-Time Notification System:** Users receive live notifications (with a dynamic Bell Icon) for contributions, approvals, and withdrawals.
5. **Comprehensive Admin Dashboard:** Admins can view live statistics, manage user roles, and oversee all platform activities.
6. **Stripe Payment Integration:** Secure and reliable payment processing for purchasing platform credits.
7. **Withdrawal Request System:** Creators can convert their earned credits into real money through admin-approved withdrawal requests.
8. **Campaign Reporting System:** Supporters can flag suspicious campaigns, allowing admins to review, dismiss, or suspend them.
9. **Responsive & Premium UI/UX:** Built with a stunning dark-mode glassmorphism design, enhanced by fluid Framer Motion animations.
10. **Advanced Search & Filtering:** Users can easily explore campaigns with fast client-side filtering and pagination.

## 🛠️ Technology Stack
- **Frontend:** Next.js, React, Tailwind CSS, Framer Motion, Lucide Icons, Axios
- **Backend:** Node.js, Express.js, MongoDB, Mongoose, Stripe
- **Authentication:** Better-Auth

## 📦 Local Setup

1. **Clone the repositories:**
   ```bash
   git clone <client-repo-url>
   git clone <server-repo-url>
   ```

2. **Setup Server:**
   ```bash
   cd crowdfunding-server
   npm install
   # Create .env file with MONGODB_URI, BETTER_AUTH_SECRET, STRIPE_SECRET_KEY
   npm run dev
   ```

3. **Setup Client:**
   ```bash
   cd crowdfunding-client
   npm install
   # Create .env.local with NEXT_PUBLIC_API_URL
   npm run dev
   ```

---
*Developed with ❤️ as part of the Junior MERN Stack Developer Assessment.*
