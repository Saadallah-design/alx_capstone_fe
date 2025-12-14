
## 🎨 Next.js Frontend Roadmap (Phuket Rental)

This roadmap uses the **Next.js App Router** architecture, prioritizing **Server Components (SC)** for content and **Client Components (CC)** for interactivity.

---

## ⚡ Sprint 1: Next.js Setup & Auth Integration (1 Week)

The focus is on setting up the environment, configuring routing, and securely handling the Django-issued JWT tokens.

| Task Category | Feature/Component | Implementation Detail (Next.js Focus) | Backend Dependency |
| :--- | :--- | :--- | :--- |
| **Setup & Routing** | Project Initialization | `npx create-next-app` using the **App Router**, Tailwind CSS, and TypeScript. | None |
| **Global Layout** | Root `layout.tsx` | Define the main structure (`Header`, `Footer`). These components should be **Server Components** by default. | None |
| **Auth Strategy** | **Token Management** | Use **Client-Side Cookies** (`js-cookie`) to store the Django-issued JWT Refresh and Access tokens. This must be managed securely on the client side. | Sprint 1 Django Auth |
| **Auth Context** | `AuthProvider` (CC) | Create a **Client Component** provider using `useState` and `useEffect` to manage user state, token refresh logic (hitting Django's `/api/auth/token/refresh/`), and handle protected routes. | Sprint 1 Django Auth |
| **Auth Pages** | Login/Registration Pages (CC) | Forms for Customer and Agency registration. These are **Client Components** (`'use client'`) as they handle user input and event handlers. | Sprint 1 Django Auth |

---

## 🛠️ Sprint 2: Agency Dashboard & Listing (2 Weeks)

The goal is to build the protected area where Agency Admins manage their inventory, using Next.js to handle API secrets securely.

| Task Category | Feature/Component | Implementation Detail (Next.js Focus) | Backend Dependency |
| :--- | :--- | :--- | :--- |
| **Protected Routes** | Agency Admin Middleware | Use **Next.js Middleware** to intercept requests to the `/dashboard` or `/agency` routes, checking for the presence/validity of the Auth Token before allowing access. | Sprint 1 Django Auth |
| **Data Fetching (SC)** | **`AgencyCarList` Page** | This page should be a **Server Component**. It fetches the agency's car data directly from the Django API using the `fetch` API on the server (using the Auth token stored securely). | Sprint 2 Django CRUD |
| **Car Form (CC)** | **`NewCarForm` Component** | A **Client Component** for interactivity. It posts data (including image URLs from S3/Cloudinary) to the Django `POST /api/v1/agency/cars/` endpoint. | Sprint 2 Django CRUD |
| **Image Optimization** | **`next/image`** | Replace all standard `<img>` tags with the optimized Next.js **`<Image>`** component for automatic resizing, lazy loading, and WebP conversion. | Sprint 2 Django Images |
| **API Abstraction** | Reusable Fetch Utility | Create a simple utility function that pre-configures headers (including the Authorization JWT header) for all API calls to Django. | Sprint 2 Django CRUD |

---

## 🔍 Sprint 3: SEO-Optimized Search & UX (2 Weeks)

This is where the SEO benefits of Next.js are fully realized by using SSR/SSG for indexable content.

| Task Category | Feature/Component | Implementation Detail (Next.js Focus) | Backend Dependency |
| :--- | :--- | :--- | :--- |
| **Search Results Page** | **`app/search/page.tsx` (SC)** | This must be a **Server Component** that fetches the initial list of available cars from the Django Search API based on query params (dates, location). | Sprint 3 Django Search |
| **SEO: Car Details** | **`app/cars/[id]/page.tsx` (SC)** | Use **Dynamic Routes** and the Next.js **`generateMetadata`** function to fetch the car's details and dynamically set the page `<title>`, `<meta description>`, and **Structured Data (JSON-LD)** for SEO. | Sprint 3 Django Search |
| **Interactive Filters** | **`FilterSidebar` (CC)** | A **Client Component** (marked `'use client'`) for dynamic controls (sliders, checkboxes). When filters change, it updates the URL query parameters, triggering a new data fetch in the parent **Server Component**. | Sprint 3 Django Search |
| **Visual Components** | **`CarCard` (SC)** | Render the listing cards as Server Components to speed up initial page load, passing only minimal interactive props to nested Client Components (e.g., a "View Details" button). | Sprint 3 Django Search |

---

## 💳 Sprint 4: Atomic Booking & Transaction UX (3 Weeks)

The focus shifts to secure data submission, a clear checkout process, and reliable display of booking status.

| Task Category | Feature/Component | Implementation Detail (Next.js Focus) | Backend Dependency |
| :--- | :--- | :--- | :--- |
| **Checkout Flow** | **`BookingCheckoutPage` (CC)** | A multi-step **Client Component** for data input and final submission. Requires secure token transmission for the final `POST /api/v1/bookings/` call. | Sprint 4 Django Booking |
| **Payment Integration** | Payment Wrapper (CC) | Integrate a payment SDK (e.g., Stripe React Elements). This must be a **Client Component** as it interacts with the browser's APIs and handles client-side payment tokens. | Sprint 4 Django Booking |
| **State Management** | Global Booking State | Use a lightweight Client-side state library (like **Zustand**) or a simple React Context to manage the user's booking details (dates, car, extras) across the checkout steps. | Sprint 4 Django Booking |
| **Booking Status** | **`MyBookings` Page (SC)** | Fetch customer bookings from Django on the server. Display the status (`Pending`, `Confirmed`) using **Server Components** for fast rendering. | Sprint 4 Django Booking |
| **Error Handling** | Global Error Boundaries | Implement React Error Boundaries to gracefully handle Django API errors (e.g., displaying a user-friendly message for a "Car is already booked" error). | Sprint 4 Django Booking |
