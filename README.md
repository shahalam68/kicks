# Kicks - Premium E-commerce Platform

A high-performance, pixel-perfect e-commerce application built for the Zavisoft Frontend Implementation Task. This project translates a premium Figma design into a fully functional responsive web application.

## 🚀 Live Demo
[Insert Deployment URL Here]

## 🛠 Technology Stack

| Category | Tools |
| :--- | :--- |
| **Framework** | Next.js 15 (App Router) |
| **State Management** | Redux Toolkit |
| **Data Fetching** | RTK Query |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS |
| **Icons** | Lucide React |
| **Components** | Shadcn UI (Optional sections) |

## ✨ Key Features

- **Product Gallery**: High-fidelity 2x2 grid on desktop and interactive carousel on mobile.
- **Dynamic Seeding**: Custom script to populate the Platzi API with realistic shoe data.
- **Cart Functionality**: Local state management for adding, updating, and removing items.
- **Buy It Now**: Direct-to-cart-and-checkout flow for quick purchases.
- **Responsive Architecture**: Pixel-perfect implementation across mobile, tablet, and desktop.
- **Premium UI**: Glassmorphism effects, smooth transitions, and high-quality typography.

## 🧪 API Integration

This project integrates with the **Platzi Fake Store API** for:
- Product Listing (Landing Page)
- Product Details (Dynamic Routes)
- Category-based filtering

## 📦 Setup & Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/shahalam68/kicks.git
   cd kicks
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Seed the database (Optional):**
   ```bash
   npm run seed
   ```

## 📌 Implementation Notes

- **Fidelity**: Every margin, padding, and border-radius has been matched to the Figma design tokens.
- **State Flow**: Used RTK Query for efficient data fetching and caching, ensuring a smooth user experience.
- **Error Handling**: Implemented comprehensive loading, empty, and error states for all API-driven sections.
- **Performance**: Optimized images using Next.js `next/image` and implemented responsive remote patterns.

---
Built with ❤️ for Zavisoft by A.K.M Shah Alam