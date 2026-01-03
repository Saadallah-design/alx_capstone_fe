# 🚗 Phuket Car Rental - Frontend Application

A modern, premium car rental marketplace application built with React and Tailwind CSS v4, designed to connect travelers with local car rental agencies in Phuket, Thailand.

## 📋 Project Overview

This is the frontend application for the ALX Capstone Project - a localized car rental marketplace focusing on Phuket. The application provides an intuitive interface for customers to browse and rent vehicles, and for agencies to manage their inventory.

### Tech Stack

- **React 19.2.0** - UI framework
- **Tailwind CSS v4.1.18** - Utility-first CSS framework
- **Vite 7.2.4** - Build tool and dev server
- **@tailwindcss/vite** - Official Tailwind Vite plugin

## 🎨 Features Implemented

### ✅ Authentication & Security (New!)
- **JWT Infrastructure:** Custom `apiClient.js` with automatic access/refresh token management and 401 interceptors.
- **Secure State:** Global `AuthContext` managing user roles (Customer vs Agency) and session persistence.
- **CSRF Protection:** Automated `X-CSRFToken` header injection for all state-changing API requests.
- **Brute Force Defense:** Frontend rate limiting (30s lockout after 5 failures) and generic error messages to prevent email enumeration.
- **Password Policies:** Client-side enforcement of complexity rules (length, casing, digits).

### ✅ Navigation System
- **SPA Routing:** Integrated `react-router-dom` for seamless page transitions.
- **Role-Based UI:** Navbar dynamically adjusts for Guest, Customer, and Agency Admin roles.
- **Mobile Optimized:** Full-featured responsive menu with user profile integration.

### ✅ Dynamic Data Integration
- **Real-time Locations:** Hero Section fetches rental branches directly from the Django backend.
- **Modular Hero Units:** Choice between modern search-focused and classic showcase designs.

---

## 🛠️ Next Steps: Implementation Strategy

### 1. Advanced Search & Filtering
*   **Implementation:** Create a `VehicleList` page that consumes the `/api/vehicles/` endpoint based on query parameters.
*   **🔒 Security:** Sanitize all URL parameters. Ensure the backend handles pagination limits to prevent DoS via massive page sizes.
*   **✨ UX:** Use **Skeleton Loaders** for car cards and **Optimistic UI** for filter toggles. Implement a "Map View" toggle for location-based searching.

### 2. Vehicle Details & Dynamic Booking
*   **Implementation:** Multi-step booking form on the vehicle detail page.
*   **🔒 Security:** Never trust price calculations from the frontend; re-calculate everything on the server. Implement double-booking prevention at the database level (transactional checks).
*   **✨ UX:** Sticky "Price Summary" on mobile. Use a clear availability calendar that greys out unavailable dates in real-time.

### 3. Agency Dashboard & Fleet Management
*   **Implementation:** An administrative interface for agencies to manage inventory and view earnings.
*   **� Security:** **Strict Row-Level Permissions.** Ensure Agency A cannot access Agency B's cars via manual ID manipulation in URLs. Sanitize all image uploads with file-type validation.
*   **✨ UX:** Drag-and-drop car photo uploader. Quick-action buttons for marking cars as "Maintenance" or "Available".

### 4. Global UX & Error Handling
*   **🔒 Security:** Avoid leaking backend tech stacks (Django/Python versions) in error responses. Use meaningful but generic error codes.
*   **✨ UX:** Implement **Toast Notifications** for success/error feedback. Add "Empty States" (e.g., "No cars found for these filters") with suggestions to broaden the search.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Development Notes

- **Tailwind v4** doesn't require a `tailwind.config.js` file
- All Tailwind configuration is done via CSS
- Mock data is stored in components - will be replaced with Django API calls
- Demo controls are available in the app to test different user states

## 🎯 Project Goals

1. **User Experience**: Premium, modern UI that wows users on first glance
2. **Backend Ready**: Components structured for easy API integration
3. **Responsive**: Mobile-first design that works on all devices
4. **Accessible**: Keyboard navigation and screen reader support
5. **Performance**: Fast load times and smooth interactions

## 📝 Notes

- Currently using mock data for development
- Two hero section designs implemented for comparison
- Navigation system supports three user types (Guest, Customer, Agency)
- Component structure optimized for reusability and testing

---

**Project Type:** ALX Frontend Capstone Project  
**Timeline:** December 2025  
**Focus Area:** Car Rental Marketplace (Phuket, Thailand)
