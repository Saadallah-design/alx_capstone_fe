# 🚗 Vehicle Rental Marketplace

A premium, localized marketplace for renting cars, scooters, and more in Phuket. This project connects independent rental agencies with domestic and international customers through a seamless, mobile-responsive web application.

🚀 **[Live Demo on Vercel](https://alx-capstone-fe.vercel.app/)** | 📦 **[API Backend](https://alx-car-rental-api.onrender.com/)**

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** [React 19](https://react.dev/) with [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) (Modern, utility-first CSS)
- **Routing:** [React Router 7](https://reactrouter.com/)
- **State Management:** React Hooks (`useState`, `useContext`, `useEffect`)
- **API Interaction:** [Axios](https://axios-http.com/) with centralized `apiClient`
- **Authentication:** JWT (JSON Web Tokens) with secure cookie storage (`js-cookie`)
- **Icons:** [Flaticon](https://www.flaticon.com/) UI icons

### Backend
- **Framework:** [Django 5](https://www.djangoproject.com/)
- **API:** [Django REST Framework](https://www.django-rest-framework.org/)
- **Database:** [PostgreSQL](https://www.postgresql.org/)
- **Payments:** [Stripe API](https://stripe.com/docs/api) integration
- **Documentation:** [drf-spectacular](https://drf-spectacular.readthedocs.io/en/latest/) (OpenAPI 3.0)

---

## ✨ Key Features

- **Advanced Search:** Filter vehicles by location, category (Car, Scooter, SUV), and rental dates.
- **Agency Dashboard:** Comprehensive management for rental agencies:
  - **Fleet Management**: Add, update, and track vehicle inventory.
  - **Branch Management**: Manage multiple physical locations and staff.
  - **Booking Overview**: Real-time tracking of rental requests and status.
- **Secure Payments:** Full Stripe integration for security deposits and rental payments.
- **User Profiles:** Personalized settings for customers and agency owners.
- **Mobile Responsive:** Optimized for both tourists on-the-go and agency staff.
- **Detailed Role Guide:** See 🎭 **[Platform Roles & Actions](docs/ROLES.md)** for a full breakdown of permissions.

---

## 📁 Project Structure

```bash
.
├── car-rental-app/         # Vite/React Frontend
│   ├── src/
│   │   ├── components/     # UI Components (common, layout, home, etc.)
│   │   ├── pages/          # Route-level components
│   │   ├── context/        # Auth and global state
│   │   └── api/            # Centralized API client
│   └── vercel.json         # Vercel deployment configuration
├── car-rental-backend/     # Django REST API (Backend)
│   ├── users/              # User accounts & roles
│   ├── core/               # Agency management & shared models
│   ├── vehicles/           # Fleet inventory
│   ├── rentals/            # Booking lifecycle logic
│   └── payments/           # Stripe integration
└── docs/                   # Technical documentation and roadmap
```

---

## 🚀 Local Setup

### Prerequisites
- Node.js (v18+)
- Python (v3.10+)
- PostgreSQL

### Frontend Setup
1. `cd car-rental-app`
2. `npm install`
3. Create a `.env` file based on `.env.example`:
   ```env
   VITE_API_URL=http://127.0.0.1:8000
   ```
4. `npm run dev`

### Backend Setup
1. `cd car-rental-backend/alx_capstone_be`
2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. `pip install -r requirements.txt` (Note: Ensure your `requirements.txt` is updated)
4. Run migrations:
   ```bash
   python manage.py migrate
   ```
5. `python manage.py runserver`

---

## 🌐 Deployment

- **Frontend:** Hosted on **Vercel**. Configured for SPA behavior (client-side routing) via `vercel.json`.
- **Backend:** Hosted on **Render** with a managed PostgreSQL instance.
- **Environment Management:** Production URLs are managed via `VITE_API_URL` (frontend) and `SITE_URL` (backend).

---

## 🗺️ Roadmap Progress

- [x] Phase 1: MVP - Dual roles, Car Listing, and Public Search.
- [x] Phase 2: Booking Engine - Stripe integration and booking lifecycle.
- [x] Phase 3: Agency Tools - Dashboards for Fleet and Branch management.
- [/] Phase 4: Refinement - Advanced analytics, Reviews, and Mobile optimization.
